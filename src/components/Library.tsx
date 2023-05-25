import * as React from "react";
import { Panel } from "./Panel";
import { usePictures } from "./PicturesContext";

type Props = {
  // foo: string;
};

export const PictureLibrary: React.FC<Props> = () => {
  const { loading, pictures, importImages } = usePictures();

  const handlePictureLoad = async (files: FileList | null) => {
    if (files !== null) {
      importImages(files);
    }
  };
  const handleSectionDrop: React.DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    // console.log(e.dataTransfer);
    if (e.dataTransfer.files.length) {
      const files = e.dataTransfer.files;
      handlePictureLoad(files);
    } else if (e.dataTransfer.items[0]?.kind === "string") {
      //
    }

    // const item = e.dataTransfer.items[0];
    // if (item.kind === "file") {
    //   handlePictureLoad(item.getAsFile()!);
    // } else if (item.kind === "string") {
    //   item.getAsString((s) => movePicture(s, !!dataUrl));
    // }
  };

  return (
    <Panel className="flex gap-4 p-8">
      <label
        className="flex min-w-[12rem] flex-auto items-center justify-center rounded border-2 border-dashed border-gray-200 text-gray-400 hover:border-indigo-400"
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
      {pictures.length ? (
        <div className="flex flex-wrap gap-4">
          {pictures.map(({ id, name, dataUrl }) => (
            <img
              key={id}
              src={dataUrl}
              className="h-20 w-20 object-cover"
              alt={name}
            />
          ))}
        </div>
      ) : null}
    </Panel>
  );
};
