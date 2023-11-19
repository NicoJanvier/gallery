import * as React from "react";
import { parseImage } from "../utils/images";

export type Picture = {
  id: string;
  name: string;
  dataUrl: string;
};

type PicturesContextType = {
  pictures: Picture[];
  progress: number[];
  loadPictures: (pictures: Picture[]) => void;
  importImages: (files: FileList) => Promise<string[]>;
  getPictures: (ids: string[]) => Picture[];
  removePictures: (ids: string[]) => void;
};
const Context = React.createContext<PicturesContextType | null>(null);

export const PicturesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [pictures, setPictures] = React.useState<Picture[]>([]);
  const [progress, setProgress] = React.useState<number[]>([]);

  const loadPictures: PicturesContextType["loadPictures"] = (ps) => {
    if (ps.every((p) => p.id && p.name && p.dataUrl)) {
      setPictures(ps);
    } else {
      throw new Error("Couldn't load pictures");
    }
  };

  const importImages: PicturesContextType["importImages"] = (files) => {
    setProgress(Array.from(files).map(() => 0));
    const ids = Promise.all(
      Array.from(files).map(async (file, idx) => {
        const existing = pictures.find((p) => p.name === file.name);
        if (existing) {
          setProgress((pp) => {
            pp[idx] = 100;
            return [...pp];
          });
          return existing.id;
        } else {
          const { name, dataUrl } = await parseImage(file, {
            onProgress: (p) =>
              setProgress((pp) => {
                pp[idx] = p;
                return [...pp];
              }),
          });
          const id = crypto.randomUUID();
          setPictures((p) => [...p, { id, name, dataUrl }]);
          return id;
        }
      })
    ).finally(() => setProgress([]));
    return ids;
  };

  const getPictures: PicturesContextType["getPictures"] = (ids) =>
    pictures.filter(({ id }) => ids.includes(id));

  const removePictures: PicturesContextType["removePictures"] = (ids) =>
    setPictures((p) => p.filter(({ id }) => !ids.includes(id)));

  return (
    <Context.Provider
      value={{
        progress,
        pictures,
        importImages,
        getPictures,
        removePictures,
        loadPictures,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePictures = () => {
  const context = React.useContext(Context);
  if (context === null) {
    throw new Error(
      "Error: usePictures isn't used within a <PicturesProvider>"
    );
  }
  return context;
};
