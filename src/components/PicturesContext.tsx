import * as React from "react";
import { parseImage } from "../utils/images";

export type Picture = {
  id: string;
  name: string;
  dataUrl: string;
};

type PicturesContextType = {
  pictures: Picture[];
  loading: number;
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
  const [loading, setLoading] = React.useState(0);

  const loadPictures: PicturesContextType["loadPictures"] = (ps) => {
    if (ps.every((p) => p.id && p.name && p.dataUrl)) {
      setPictures(ps);
    } else {
      throw new Error("Couldn't load pictures");
    }
  };

  const importImages: PicturesContextType["importImages"] = (files) => {
    setLoading(files.length);
    const ids = Promise.all(
      Array.from(files).map(async (file) => {
        const existing = pictures.find((p) => p.name === file.name);
        if (existing) {
          setLoading((l) => --l);
          return existing.id;
        } else {
          const { name, dataUrl } = await parseImage(file);
          const id = crypto.randomUUID();
          setPictures((p) => [...p, { id, name, dataUrl }]);
          setLoading((l) => --l);
          return id;
        }
      })
    );
    return ids;
  };

  const getPictures: PicturesContextType["getPictures"] = (ids) =>
    pictures.filter(({ id }) => ids.includes(id));

  const removePictures: PicturesContextType["removePictures"] = (ids) =>
    setPictures((p) => p.filter(({ id }) => !ids.includes(id)));

  return (
    <Context.Provider
      value={{
        pictures,
        loading,
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
