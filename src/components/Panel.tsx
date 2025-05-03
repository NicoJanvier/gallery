import * as React from "react";
import clsx from "clsx";

type Props = {
  className?: string;
};

export const Panel: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <section
      className={clsx(
        className,
        "bg-background h-full flex-shrink-0 flex-grow-0 overflow-hidden border-l"
      )}
    >
      {children}
    </section>
  );
};
