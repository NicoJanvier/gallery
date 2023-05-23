import * as React from "react";
import { useFrames, withFramesProvider } from "./components/FramesContext";
import { PictureDetails } from "./components/PictureDetails";
import { Template } from "./components/Template";
import { Panel } from "./components/Panel";
import Modal from "./components/Modal";
import { FramesListSummary } from "./components/FramesListSummary";

export const App = withFramesProvider(function () {
  const [selectedId, setSelectedId] = React.useState<string>();
  const { frames, loadFrames } = useFrames();
  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = React.useState("");

  const showSummaryButton = Object.values(frames).some((f) => f.dataUrl);

  const handleSave = () => {
    if (!name) {
      return;
    }
    if (localStorage.getItem(name)) {
      const override = confirm(
        `"${name}" already exists on this device, do you want to overide?`
      );
      if (!override) return null;
    }
    localStorage.setItem(name, JSON.stringify(frames));
  };

  const loadSave = () => {
    const name = prompt(
      "Which gallery would you like to load?",
      localStorage.length ? (localStorage.key(0) as string) : ""
    );
    if (!name) return;
    const data = localStorage.getItem(name);
    if (!data) {
      alert("No gallery found with this name!");
    } else {
      const frames = JSON.parse(data);
      loadFrames(frames);
      setName(name);
    }
  };

  const btnClasses =
    "box-content rounded border-[1px] border-solid border-transparent bg-transparent px-4 py-2 transition-all hover:border-indigo-600";
  return (
    <div className="relative flex h-screen flex-col">
      <header className="flex h-16 items-center gap-4 border-b-2 border-solid border-indigo-600 bg-white px-4 py-1 text-indigo-600">
        <p className="font-serif text-2xl tracking-wider">Gallery</p>
        <button className={`ml-auto ${btnClasses}`} onClick={handleSave}>
          Save
        </button>
        <button className={btnClasses} onClick={loadSave}>
          Load
        </button>
        <button
          className={`box-content rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-900 disabled:bg-indigo-300`}
          onClick={() => setShowModal(true)}
          disabled={!showSummaryButton}
        >
          Summary
        </button>
      </header>
      <main className="flex w-screen  flex-auto items-center justify-center bg-gray-200">
        <div className="flex h-full w-full flex-col items-center justify-between gap-8">
          <div className="my-10">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              className="h-[1.5em] self-center bg-transparent text-center text-6xl font-extrabold text-indigo-800 focus-within:outline-none"
              onBlur={() => {
                if (!name) {
                  setName("My gallery");
                }
              }}
            />
          </div>
          <Template
            onSelect={(id) => setSelectedId((i) => (i === id ? "" : id))}
          />
          {selectedId ? (
            <Panel>
              <PictureDetails id={selectedId} />
            </Panel>
          ) : null}
        </div>
      </main>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Summary"
      >
        <FramesListSummary />
      </Modal>
    </div>
  );
});
