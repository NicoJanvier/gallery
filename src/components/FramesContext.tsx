import * as React from "react";
import { SizeKeys } from "../utils/size";
import { parseImage } from "../utils/images";

type FrameStaticProps = {
  id: string;
  size: SizeKeys;
  col?: boolean;
};
type FrameProps = {
  mask: boolean;
} & FrameStaticProps;

export type Frame = {
  dataUrl?: string;
  name?: string;
  id: string;
} & FrameProps;

type FrameMap = Record<string, Frame>;
type ContextType = {
  frames: FrameMap;
  loadFrames: (data: any) => void;
  addFrame: (f: Frame) => void;
  setPicture: (id: string, file: File) => Promise<null>;
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
  const [frames, setFrames] = React.useState<FrameMap>({});

  const loadFrames = (data: any) => {
    try {
      setFrames(data as FrameMap);
    } catch (error) {
      alert("Couldn't load data!");
    }
  };

  const addFrame = (frame: Frame) => {
    if (!frames[frame.id]) {
      setFrames((f) => ({ ...f, [frame.id]: frame }));
    }
  };

  const setPicture = async (id: string, file: File) => {
    if (!frames[id]) return null;
    const image = await parseImage(file);
    setFrames((f) => ({ ...f, [id]: { ...f[id], ...image } }));
    return null;
  };

  const removePicture = (id: string) => {
    if (!frames[id]) return null;
    setFrames((f) => ({
      ...f,
      [id]: { ...f[id], name: undefined, dataUrl: undefined },
    }));
  };

  const movePicture = (fromId: string, toId: string, twoWay: boolean) => {
    if (!frames[fromId] || !frames[toId]) return null;
    setFrames((f) => ({
      ...f,
      [fromId]: {
        ...f[fromId],
        name: twoWay ? f[toId].name : undefined,
        dataUrl: twoWay ? f[toId].dataUrl : undefined,
      },
      [toId]: { ...f[toId], name: f[fromId].name, dataUrl: f[fromId].dataUrl },
    }));
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

export const usePicture = (id: string) => {
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
    setPicture: (file: File) => setPicture(id, file),
    removePicture: () => removePicture(id),
    movePicture: (fromId: string, twoWay: boolean) =>
      movePicture(fromId, id, twoWay),
    toggleMask: () => toggleMask(id),
    frame: frames[id] ?? ({ id: "", mask: false } as Frame),
  };
};
