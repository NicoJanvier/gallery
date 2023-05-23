import * as React from "react";

import cx from "classnames";
import { useSize } from "./SizeContext";
import { FaBorderStyle, FaTimes, FaPlus } from "react-icons/fa";
import { SIZES } from "../utils/size";
import { useFrame } from "./FramesContext";
import { Tooltip } from "./Tooltip";

type Props = {
  className?: string;
  id: string;
  size: keyof typeof SIZES;
  col?: boolean;
  onClick: (id: string) => void;
};

export const Frame: React.FC<Props> = ({
  id,
  col,
  size: sizeKey,
  className,
  onClick,
}) => {
  const {
    frame: { mask, dataUrl, name },
    setPicture,
    removePicture,
    movePicture,
    toggleMask,
  } = useFrame({
    id,
    size: sizeKey,
    col,
  });
  const [loading, setLoading] = React.useState(false);
  const { multiplier } = useSize();
  const frameSize = SIZES[sizeKey][0];
  const fw = col ? frameSize[0] : frameSize[1];
  const fh = col ? frameSize[1] : frameSize[0];

  const maskSize = SIZES[sizeKey][1];
  const mw = col ? maskSize[0] : maskSize[1];
  const mh = col ? maskSize[1] : maskSize[0];

  const handlePictureLoad = (file: File) => {
    setLoading(true);
    setPicture(file).finally(() => setLoading(false));
  };
  const onDrop = (acceptedFiles: FileList | null) => {
    if (!acceptedFiles) return;
    for (const file of acceptedFiles) {
      handlePictureLoad(file);
    }
  };

  const handleDelete = () => {
    removePicture();
  };

  return (
    <div
      style={{
        width: fw * multiplier,
        height: fh * multiplier,
        borderWidth: 2 * multiplier,
      }}
      className={cx(
        "group box-content flex items-center justify-center border-solid border-black bg-white",
        className
      )}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const item = e.dataTransfer.items[0];
        if (item.kind === "file") {
          handlePictureLoad(item.getAsFile()!);
        } else if (item.kind === "string") {
          item.getAsString((s) => movePicture(s, !!dataUrl));
        }
      }}
    >
      {dataUrl ? (
        <Tooltip
          content={
            <>
              <button
                onClick={toggleMask}
                className="flex h-8 w-full min-w-[8rem] items-center gap-1 bg-transparent px-2 py-3 text-xs hover:bg-indigo-700"
              >
                <FaBorderStyle className="inline-block" /> Mask
              </button>
              <button
                onClick={handleDelete}
                className="flex h-8 w-full min-w-[8rem] items-center gap-1 bg-transparent px-2 py-3 text-xs hover:bg-indigo-700"
              >
                <FaTimes className="inline-block" /> Remove
              </button>
            </>
          }
        >
          <div
            style={{
              width: (mask ? mw : fw) * multiplier,
              height: (mask ? mh : fh) * multiplier,
            }}
            className="flex items-center justify-center overflow-hidden"
          >
            <img
              src={dataUrl}
              alt={name}
              className={cx(
                "object-cover hover:cursor-pointer",
                col && "max-h-full max-w-none"
              )}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.items.add(id, "text/plain");
              }}
              onClick={() => onClick(id)}
            />
          </div>
        </Tooltip>
      ) : (
        <label
          className="box-border flex items-center justify-center rounded-none border-solid border-gray-200 bg-transparent text-xs text-gray-400 hover:cursor-pointer hover:border-indigo-400"
          style={{
            width: mw * multiplier,
            height: mh * multiplier,
            borderWidth: 1,
          }}
        >
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => onDrop(e.target.files)}
          />
          {loading ? (
            <div
              className="text-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : (
            <FaPlus />
          )}
        </label>
      )}
    </div>
  );
};
