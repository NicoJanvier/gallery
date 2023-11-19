import * as React from "react";
import Modal from "./Modal";
import { usePictures } from "./PicturesContext";

type Props = {
  id?: string;
  onClose: () => void;
};

export const PictureModal: React.FC<Props> = ({ id, onClose }) => {
  const { getPictures } = usePictures();
  const [picture] = id ? getPictures([id]) : [];
  return (
    <Modal
      open={Boolean(picture?.id)}
      onClose={onClose}
      title={picture?.name ?? ""}
    >
      <img src={picture?.dataUrl} className="h-80" />
    </Modal>
  );
};
