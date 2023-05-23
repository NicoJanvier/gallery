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
        "border-t-solid h-60 w-full border-t-[1px] border-t-indigo-600 bg-white"
      )}
    >
      {children}
    </section>
  );
};
