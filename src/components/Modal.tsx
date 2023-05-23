import React from "react";
import { FaTimes } from "react-icons/fa";
import ReactDOM from "react-dom";

type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  children,
  footer,
  onClose,
}) => {
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-900 opacity-50"
        onClick={handleClose}
      ></div>
      <div className="relative w-2/3 rounded bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-scroll">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
