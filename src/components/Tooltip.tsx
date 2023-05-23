import * as React from "react";
import cx from "classnames";

type Props = React.PropsWithChildren<{
  content: React.ReactNode;
}>;

export const Tooltip: React.FC<Props> = ({ content, children }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);
  const [points, setPoints] = React.useState<[number, number]>([0, 0]);

  const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setShow(true);
    const rect = wrapperRef.current!.getBoundingClientRect();
    setPoints([e.clientX - rect.x, e.clientY - rect.y]);
  };
  React.useEffect(() => {
    const handleClick = () => setShow(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className="relative" ref={wrapperRef}>
      <div onContextMenu={handleContextMenu}>{children}</div>
      <div
        ref={tooltipRef}
        className={cx(
          "absolute z-10 scale-0 overflow-hidden rounded border-solid border-gray-200 bg-indigo-900 text-xs text-white",
          show && "scale-100"
        )}
        style={{ top: points[1] + 8, left: points[0] + 8 }}
      >
        {content}
      </div>
    </div>
  );
};
