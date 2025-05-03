import { FramesProvider } from "./components/FramesContext";
import { Template } from "./components/Template";
import { PictureLibrary } from "./components/PictureLibrary";
import { PicturesProvider } from "./components/PicturesContext";
import { Header } from "./components/Header";

export const App = function () {
  return (
    <div className="relative h-screen">
      <Header />
      <main className="bg-secondary flex h-[calc(100vh-4rem)] w-screen flex-auto items-center justify-center">
        <Template />
        <PictureLibrary />
      </main>
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
