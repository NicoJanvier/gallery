import * as React from "react";
import { Button } from "@/components/ui/button";
import { usePictures } from "./PicturesContext";
import { useFrames } from "./FramesContext";
import logo from "/src/assets/logo.svg";
import Modal from "./Modal";
import { FramesListSummary } from "./FramesListSummary";

type Props = { foo?: string };

export const Header: React.FC<Props> = () => {
  const [showResumeModal, setShowResumeModal] = React.useState(false);

  const { pictures, loadPictures } = usePictures();
  const { frames, loadFrames } = useFrames();
  const hasFrames = Object.values(frames).some((f) => f.pictureId);

  const [loading, setLoading] = React.useState(false);
  const onSave = () => {
    setLoading(true);
    const json = { pictures, frames };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(json)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "gallery.json";

    link.click();
    setLoading(false);
  };

  const onImportSave: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoading(true);
    const fileReader = new FileReader();
    if (!e.target.files?.[0]) return;
    fileReader.readAsText(e.target.files?.[0], "UTF-8");
    fileReader.onload = (e) => {
      if (e.target === null) return;
      const data = JSON.parse(e.target.result as string);
      if (data.pictures && Array.isArray(data.pictures)) {
        loadPictures(data.pictures);
      }
      if (data.frames) {
        loadFrames(data.frames);
      }
      setLoading(false);
    };
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <>
      <header className="border-primary text-primary bg-background flex h-16 items-center gap-4 border-b-2 border-solid px-4 py-1">
        <p className="mr-auto flex items-center gap-2 font-serif text-2xl tracking-wider">
          <img src={logo} className="inline-block h-6 w-6" />
          Gallery
        </p>
        <Button
          variant="ghost"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          Load
        </Button>
        <input
          type="file"
          onChange={onImportSave}
          ref={inputRef}
          className="hidden"
        />
        <Button
          variant="ghost"
          onClick={onSave}
          disabled={loading || !hasFrames}
        >
          Save
        </Button>
        <Button onClick={() => setShowResumeModal(true)} disabled={!hasFrames}>
          Summary
        </Button>
      </header>
      <Modal
        open={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        title="Summary"
      >
        <FramesListSummary />
      </Modal>
    </>
  );
};
