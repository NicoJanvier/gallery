import * as React from "react";

type Context = { multiplier: number };
const SizeContext = React.createContext<Context>({ multiplier: 1 });

export const SizeProvider: React.FC<React.PropsWithChildren<Context>> = ({
  children,
  ...value
}) => {
  return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
};

export const useSize = () => {
  const context = React.useContext(SizeContext);
  if (context === null) {
    throw new Error("useSize not in context provider");
  }
  return context;
};
