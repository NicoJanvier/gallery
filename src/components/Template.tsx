import * as React from "react";
import cx from "classnames";
import { Frame } from "./Frame";
import { SizeProvider } from "./SizeContext";

type Props = {
  className?: string;
  onSelect: (id: string) => void;
};

export const Template: React.FC<Props> = ({ className, onSelect }) => {
  const MULTIPLER = 5;
  const frameProps = { onClick: onSelect };
  return (
    <SizeProvider multiplier={MULTIPLER}>
      <div
        className={cx(
          className,
          "flex w-full flex-auto flex-col items-center gap-6 pl-10 pr-10"
        )}
      >
        <div className="flex items-end gap-5 self-end">
          <Frame id="0" {...frameProps} size="xs" />
          <Frame id="1" {...frameProps} size="m" />
          <Frame id="2" {...frameProps} size="xl" />
          <Frame id="3" {...frameProps} size="m-square" />
          <Frame id="4" {...frameProps} size="xs" />
        </div>
        <div className="flex gap-4 self-start">
          <Frame id="5" {...frameProps} size="xs" />
          <Frame id="6" {...frameProps} size="l" />
          <div className="flex flex-col gap-4 self-start">
            <Frame id="7" {...frameProps} size="s" />
            <Frame id="8" {...frameProps} size="s" />
          </div>
          <Frame id="9" {...frameProps} size="m" col />
          <Frame id="10" {...frameProps} size="s" />
        </div>
      </div>
    </SizeProvider>
  );
};
