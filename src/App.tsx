import * as React from "react";
import { FramesProvider, useFrames } from "./components/FramesContext";
import { Template } from "./components/Template";
import Modal from "./components/Modal";
import { FramesListSummary } from "./components/FramesListSummary";
import { PictureLibrary } from "./components/PictureLibrary";
import { PicturesProvider } from "./components/PicturesContext";
import { PictureModal } from "./components/PictureModal";
import { Header } from "./components/Header";

export const App = function () {
  const { frames } = useFrames();
  const [showResumeModal, setShowResumeModal] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string>();
  const showSummaryButton = Object.values(frames).some((f) => f.pictureId);

  return (
    <div className="relative h-screen">
      <Header
        showResume={showSummaryButton}
        onResumeClick={() => setShowResumeModal(true)}
      />
      <main className="flex h-[calc(100vh-4rem)] w-screen flex-auto items-center justify-center bg-gray-200">
        <Template onSelect={setSelectedId} />
        <PictureLibrary onSelect={setSelectedId} />
      </main>
      <Modal
        open={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        title="Summary"
      >
        <FramesListSummary />
      </Modal>
      <PictureModal id={selectedId} onClose={() => setSelectedId("")} />
    </div>
  );
};

export const WrapperApp = () => (
  <PicturesProvider>
    <FramesProvider>
      <App />
    </FramesProvider>
  </PicturesProvider>
);
