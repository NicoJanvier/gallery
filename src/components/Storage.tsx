import { FrameMap, useFrames } from "./FramesContext";
import { Picture, usePictures } from "./PicturesContext";

type StoredData = {
  pictures: Picture[];
  frames: FrameMap;
};

function isValidStoredData(data: unknown): data is StoredData {
  return (
    data !== null &&
    typeof data === "object" &&
    Object.hasOwn(data, "pictures") &&
    Object.hasOwn(data, "frames")
  );
}

export const useStorage = (): [
  (name: string) => void,
  () => string | undefined
] => {
  const { pictures, loadPictures } = usePictures();
  const { frames, loadFrames } = useFrames();

  const saveToStorage = (name: string) => {
    const data: StoredData = {
      pictures,
      frames,
    };
    if (localStorage.getItem(name)) {
      const override = confirm(
        `"${name}" already exists on this device, do you want to overide?`
      );
      if (!override) return null;
    }
    localStorage.setItem(name, JSON.stringify(data));
  };

  const loadFromStorage = (): string | undefined => {
    const name = prompt(
      "Which gallery would you like to load?",
      localStorage.length ? (localStorage.key(0) as string) : ""
    );
    if (!name) return;
    const jsonData = localStorage.getItem(name);
    if (!jsonData) {
      alert("No gallery found with this name!");
    } else {
      const data = JSON.parse(jsonData);

      if (isValidStoredData(data)) {
        const { pictures, frames } = data;
        loadPictures(pictures);
        loadFrames(frames);
        return name;
      } else {
        // localStorage.removeItem(name);
        alert("No gallery found with this name! 222");
      }
    }
  };
  return [saveToStorage, loadFromStorage];
};
