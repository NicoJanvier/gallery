import * as React from "react";
// import { useStorage } from "./Storage";

type Props = {
  onResumeClick: () => void;
  showResume: boolean;
};

export const Header: React.FC<Props> = ({ onResumeClick, showResume }) => {
  //   const [save, load] = useStorage();

  //   const [name, setName] = React.useState("");

  //   const handleSave = () => {
  //     if (!name) {
  //       return;
  //     }
  //     save(name);
  //   };

  //   const loadSave = () => {
  //     const name = load();
  //     if (name) {
  //       setName(name);
  //     }
  //   };

  //   const btnClasses =
  //     "box-content rounded border-[1px] border-solid border-transparent bg-transparent px-4 py-2 transition-all hover:border-indigo-600";

  return (
    <header className="flex h-16 items-center gap-4 border-b-2 border-solid border-indigo-600 bg-white px-4 py-1 text-indigo-600">
      <p className="mr-auto font-serif text-2xl tracking-wider">Gallery</p>
      {/* <button className={`ml-auto ${btnClasses}`} onClick={handleSave}>
        Save
      </button>
      <button className={btnClasses} onClick={loadSave}>
        Load
      </button> */}
      <button
        className={`box-content rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-900 disabled:bg-indigo-300`}
        onClick={onResumeClick}
        disabled={!showResume}
      >
        Summary
      </button>
    </header>
  );
};
