import React from "react";
import { Frame, useFrames } from "./FramesContext";
import { SIZES } from "../utils/size";
import { FaExclamationTriangle } from "react-icons/fa";

export const FramesListSummary: React.FC = () => {
  const { frames } = useFrames();

  // Filter out frames with no dataUrl and sort them by first dimension
  const filteredFrames = Object.values(frames)
    .filter((frame) => frame.dataUrl)
    .sort((a, b) => {
      const [aWidth] = SIZES[a.size][0];
      const [bWidth] = SIZES[b.size][0];
      return aWidth - bWidth;
    });

  // Group frames by effective size (taking mask into account)
  const groupedFrames: Record<string, Frame[]> = {};
  filteredFrames.forEach((frame) => {
    const { size, mask } = frame;
    const effectiveSize = mask ? SIZES[size][1] : SIZES[size][0];
    const key = `${effectiveSize[0]}x${effectiveSize[1]}`;

    if (!groupedFrames[key]) {
      groupedFrames[key] = [];
    }

    groupedFrames[key].push(frame);
  });

  const handleCopyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      //
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(groupedFrames).map(([key, frames]) => (
        <div
          key={key}
          className="flex flex-col gap-2 border-b-2 border-solid border-b-gray-200 pb-4 last:border-b-0"
        >
          <h2 className="mb-2 text-xl font-medium">Print size: {key}</h2>
          {frames.map((frame) => (
            <div key={frame.id} className="flex gap-2">
              <img src={frame.dataUrl} alt={frame.name} className="w-20" />
              <div>
                <a
                  href=""
                  className="font-medium hover:cursor-copy hover:underline"
                  title="Copy to clipboard"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCopyContent(frame.name!);
                  }}
                >
                  {frame.name}
                </a>
                {frame.col && (
                  <p className="flex items-center gap-2">
                    <FaExclamationTriangle className="inline-block text-red-500" />{" "}
                    This image is to be printed in portrait, remember to rotate
                    it!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
