import { Frame } from "./Frame";
import { SizeProvider } from "./SizeContext";

export const Template = () => {
  const MULTIPLER = 5;
  return (
    <SizeProvider multiplier={MULTIPLER}>
      <div className="flex w-full flex-col items-start gap-6 p-10">
        <div className="ml-24 flex items-end gap-6">
          <Frame id="0" size="xs" />
          <Frame id="1" size="m" />
          <Frame id="2" size="xl" />
          <Frame id="3" size="m-square" />
          <Frame id="4" size="xs" />
        </div>
        <div className=" flex gap-6">
          <Frame id="5" size="xs" />
          <Frame id="6" size="l" />
          <div className="flex flex-col gap-4 self-start">
            <Frame id="7" size="s" />
            <Frame id="8" size="s" />
          </div>
          <Frame id="9" size="m" col />
          <Frame id="10" size="xs" />
        </div>
      </div>
    </SizeProvider>
  );
};
