import * as React from "react";
import cx from "classnames";

type Props = {
  className?: string;
};

export const Panel: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <section
      className={cx(
        className,
        "border-l-solid h-full flex-shrink-0 flex-grow-0 overflow-hidden border-l-[1px] border-l-gray-300 bg-white"
      )}
    >
      {children}
    </section>
  );
};
