import React from "react";
import { Frame, useFrames } from "./FramesContext";
import { SIZES } from "../lib/utils/size";
import { usePictures } from "./PicturesContext";
import { Picture } from "./PicturesContext";

type EnhancedFrame = Frame & Pick<Picture, "dataUrl" | "name">;
export const FramesListSummary: React.FC = () => {
  const { getPictures } = usePictures();
  const { frames } = useFrames();

  // Filter out frames with no dataUrl and sort them by first dimension
  const filteredFrames = Object.values(frames)
    .filter((frame) => frame.pictureId)
    .sort((a, b) => {
      const [aWidth] = SIZES[a.size][0];
      const [bWidth] = SIZES[b.size][0];
      return aWidth - bWidth;
    })
    .map((f) => {
      const [picture] = getPictures([f.pictureId!]);
      return {
        ...f,
        dataUrl: picture.dataUrl,
        name: picture.name,
      };
    });

  // Group frames by effective size (taking mask into account)
  const groupedFrames: Record<string, EnhancedFrame[]> = {};
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
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 divide-y ">
      {Object.entries(groupedFrames).map(([key, frames]) => (
        <div key={key} className="flex flex-col gap-2 pb-4">
          <h2 className="mb-2 text-xl font-medium">Print size: {key}</h2>
          {frames.map((frame) => (
            <div key={frame.id} className="flex items-start gap-2">
              <img
                src={frame.dataUrl}
                alt={frame.name}
                className="w-20 rounded border"
              />
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
