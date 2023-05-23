import * as React from "react";
import { SIZES } from "../utils/size";
import { usePicture } from "./FramesContext";
import { FaCopy } from "react-icons/fa";

type Props = {
  id?: string;
};

export const PictureDetails: React.FC<Props> = ({ id = "" }) => {
  const frame = usePicture(id);
  if (!frame?.dataUrl) return null;
  const handleCopyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      //
    }
  };
  return (
    <div className="flex h-full gap-4 p-8">
      <img src={frame.dataUrl} className="h-full max-w-xs object-cover" />
      <div className="text-gray-600">
        <p>
          File name:{" "}
          <a
            className="text-black hover:cursor-copy hover:underline "
            onClick={(e) => {
              e.preventDefault();
              handleCopyContent(frame.name!);
            }}
          >
            {frame.name!}
          </a>
        </p>
        <p>
          Print size:{" "}
          <span className="text-black">
            {SIZES[frame.size][frame.mask ? 1 : 0].join("x")}
          </span>
        </p>
      </div>
    </div>
  );
};
