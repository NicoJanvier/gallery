import cx from "classnames";
import * as React from "react";
import { FaTimes } from "react-icons/fa";
import { Panel } from "./Panel";
import { usePictures } from "./PicturesContext";
import { useFrames } from "./FramesContext";

type Props = {
  onSelect: (id: string) => void;
};

export const PictureLibrary: React.FC<Props> = ({ onSelect }) => {
  const { progress, pictures, importImages, removePictures } = usePictures();
  const progression = Math.round(
    progress.length
      ? progress.reduce((acc, curr) => acc + curr, 0) / progress.length
      : 100
  );
  const isLoading = progression < 100;

  const handlePictureLoad = async (files: FileList | null) => {
    if (files !== null) {
      importImages(files);
    }
  };

  const handleSectionDrop: React.DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (e.dataTransfer.files.length) {
      const files = e.dataTransfer.files;
      handlePictureLoad(files);
    } else if (e.dataTransfer.items[0]?.kind === "string") {
      //
    }
  };

  const { frames } = useFrames();
  const handleRemove = (id: string) => {
    const used = Object.values(frames).some(
      ({ pictureId }) => pictureId === id
    );
    if (
      used &&
      !confirm(
        `This image is used in a frame, are you sure you want to delete it?`
      )
    )
      return;
    removePictures([id]);
  };

  return (
    <Panel>
      <div className="flex h-full w-80 flex-col p-4">
        <label
          className={cx(
            "flex w-full flex-shrink-0 basis-20 items-center justify-center rounded border-2 border-dashed border-gray-200 text-gray-400",
            !isLoading && "hover:cursor-pointer hover:border-indigo-400"
          )}
          onDrop={handleSectionDrop}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {isLoading
            ? `Loading ${progress.length} file(s)... ${progression}%`
            : "Drop files"}
          <input
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handlePictureLoad(e.target.files)}
            disabled={isLoading}
          />
        </label>
        <div className="flex flex-wrap gap-4 overflow-scroll pt-4">
          {pictures.map(({ id, name, dataUrl }) => (
            <div className="relative" key={id}>
              <img
                src={dataUrl}
                className="peer h-20 w-20 object-cover hover:cursor-pointer"
                alt={name}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.items.add(
                    JSON.stringify({ source: "library", id }),
                    "text/plain"
                  );
                }}
                onClick={() => onSelect(id)}
              />
              <button
                onClick={() => handleRemove(id)}
                className="absolute right-[-.75rem] top-[-.75rem] hidden h-6 w-6 rounded-full bg-indigo-700 text-white hover:block hover:bg-indigo-900 peer-hover:block"
              >
                <FaTimes className="mx-auto" />
              </button>
            </div>
          ))}
          {progress
            .filter((v) => v && v !== 100)
            .map(() => (
              <div className=" h-20 w-20 animate-pulse bg-slate-200 " />
            ))}
        </div>
      </div>
    </Panel>
  );
};
