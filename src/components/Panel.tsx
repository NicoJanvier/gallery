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
        "border-l-solid h-full border-l-[1px] border-l-gray-300 bg-white"
      )}
    >
      {children}
    </section>
  );
};
