import * as React from "react";
import { Panel } from "./Panel";
import { usePictures } from "./PicturesContext";

type Props = {
  onSelect: (id: string) => void;
};

export const PictureLibrary: React.FC<Props> = ({ onSelect }) => {
  const { loading, pictures, importImages } = usePictures();

  const handlePictureLoad = async (files: FileList | null) => {
    if (files !== null) {
      importImages(files);
    }
  };

  const handleSectionDrop: React.DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      const files = e.dataTransfer.files;
      handlePictureLoad(files);
    } else if (e.dataTransfer.items[0]?.kind === "string") {
      //
    }
  };

  return (
    <Panel>
      <div className="flex h-full w-80 flex-col gap-4 p-4">
        <label
          className="flex w-full flex-shrink-0 basis-20 items-center justify-center rounded border-2 border-dashed border-gray-200 text-gray-400 hover:cursor-pointer hover:border-indigo-400"
          onDrop={handleSectionDrop}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {loading ? `Loading ${loading} file(s)...` : "Drop files"}
          <input
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handlePictureLoad(e.target.files)}
          />
        </label>
        <div className="flex flex-wrap gap-4 overflow-scroll">
          {pictures.map(({ id, name, dataUrl }) => (
            <img
              key={id}
              src={dataUrl}
              className="h-20 w-20 object-cover hover:cursor-pointer"
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
          ))}
        </div>
      </div>
    </Panel>
  );
};