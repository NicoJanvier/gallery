import * as React from "react";
import { FramesProvider } from "./components/FramesContext";
import { Template } from "./components/Template";
import { PictureLibrary } from "./components/PictureLibrary";
import { PicturesProvider } from "./components/PicturesContext";
import { PictureModal } from "./components/PictureModal";
import { Header } from "./components/Header";

export const App = function () {
  const [selectedId, setSelectedId] = React.useState<string>();

  return (
    <div className="relative h-screen">
      <Header />
      <main className="flex h-[calc(100vh-4rem)] w-screen flex-auto items-center justify-center bg-gray-200">
        <Template onSelect={setSelectedId} />
        <PictureLibrary onSelect={setSelectedId} />
      </main>
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
