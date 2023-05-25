import * as React from "react";
import { SizeKeys } from "../utils/size";
import { usePictures } from "./PicturesContext";

type FrameStaticProps = {
  id: string;
  size: SizeKeys;
  col?: boolean;
};
type FrameProps = {
  mask: boolean;
} & FrameStaticProps;

export type Frame = {
  pictureId?: string;
} & FrameProps;

export type FrameMap = Record<string, Frame>;
type ContextType = {
  frames: FrameMap;
  loadFrames: (data: any) => void;
  addFrame: (f: Frame) => void;
  setPicture: (id: string, files: FileList) => Promise<null>;
  removePicture: (id: string) => void;
  movePicture: (from: string, to: string, twoWay: boolean) => void;
  toggleMask: (id: string) => void;
};

const Context = React.createContext<ContextType>({
  frames: {},
  loadFrames: () => null,
  addFrame: () => null,
  setPicture: async () => null,
  removePicture: () => null,
  movePicture: () => null,
  toggleMask: () => null,
});

export const FramesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { getPictures, importImages } = usePictures();
  const [frames, setFrames] = React.useState<FrameMap>({});

  const loadFrames = (frames: FrameMap) => {
    if (
      Object.entries(frames).every(
        ([key, value]) =>
          typeof key === "string" &&
          value.id &&
          value.size &&
          typeof value.mask === "boolean" &&
          typeof value.col === "boolean"
      )
    ) {
      setFrames(frames);
    } else {
      throw new Error("Couldn't load pictures");
    }
  };

  const addFrame = (frame: Frame) => {
    if (!frames[frame.id]) {
      setFrames((f) => ({ ...f, [frame.id]: frame }));
    }
  };

  const setPicture = async (id: string, files: FileList | null) => {
    if (!frames[id] || files === null || files.length !== 1) return null;
    const [pictureId] = await importImages(files);
    setFrames((f) => ({ ...f, [id]: { ...f[id], pictureId } }));
    return null;
  };

  const removePicture = (id: string) => {
    if (!frames[id]) return null;
    setFrames((f) => ({
      ...f,
      [id]: { ...f[id], pictureId: undefined },
    }));
  };

  const movePicture = (fromId: string, toId: string, twoWay: boolean) => {
    if (frames[fromId]?.pictureId) {
      const [fromPicture, toPicture] = getPictures(
        [frames[fromId].pictureId, frames[toId].pictureId].filter(
          (id) => !!id
        ) as string[]
      );
      setFrames((f) => ({
        ...f,
        [fromId]: {
          ...f[fromId],
          pictureId: twoWay && toPicture ? toPicture.id : undefined,
        },
        [toId]: {
          ...f[toId],
          pictureId: fromPicture.id,
        },
      }));
    }
  };

  const toggleMask = (id: string) => {
    if (!frames[id]) return null;
    setFrames((f) => ({ ...f, [id]: { ...f[id], mask: !f[id].mask } }));
  };

  return (
    <Context.Provider
      value={{
        frames,
        loadFrames,
        addFrame,
        setPicture,
        removePicture,
        movePicture,
        toggleMask,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useFrames = () => {
  const context = React.useContext(Context);
  return context;
};

export const withFramesProvider = <P extends object>(
  Component: React.ComponentType<P>
) =>
  class WithLoading extends React.Component<P> {
    render() {
      return (
        <FramesProvider>
          <Component {...(this.props as P)} />
        </FramesProvider>
      );
    }
  };

export const useFramePicture = (id: string) => {
  const { frames } = React.useContext(Context);
  return frames[id];
};

export const useFrame = ({ id, size, col }: FrameStaticProps) => {
  const {
    addFrame,
    setPicture,
    removePicture,
    movePicture,
    toggleMask,
    frames,
  } = React.useContext(Context);

  React.useEffect(() => {
    addFrame({ id, col: col ?? false, size, mask: false });
  }, [col, size, id, addFrame]);

  return {
    setPicture: (files: FileList) => setPicture(id, files),
    removePicture: () => removePicture(id),
    movePicture: (fromId: string, twoWay: boolean) =>
      movePicture(fromId, id, twoWay),
    toggleMask: () => toggleMask(id),
    frame: frames[id] ?? ({ id: "", mask: false } as Frame),
  };
};
