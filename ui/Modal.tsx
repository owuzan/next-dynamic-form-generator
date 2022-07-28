import React, { useMemo } from "react";
import { Dialog } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import classNames from "classnames";

type Props = {
  isOpen: boolean;
  close: () => void;
  size?: "none" | "sm" | "md" | "lg" | "xl";
  children?: React.ReactNode;
  hiddenCloseButton?: boolean;
};

const Modal = (props: Props) => {
  const {
    size = "none",
    close,
    isOpen,
    children,
    hiddenCloseButton = false,
  } = props;

  const modalWrapperClasses = useMemo(
    () =>
      classNames("relative m-24 max-h-screen overflow-y-scroll", [
        size !== "none" && "w-full",
        size === "none" && "max-w-screen-xl",
        size === "sm" && "max-w-screen-sm",
        size === "md" && "max-w-screen-md",
        size === "lg" && "max-w-screen-lg",
        size === "xl" && "max-w-screen-xl",
      ]),
    [size]
  );
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog
      onClose={close}
      open={isOpen}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black/50 -z-50 focus:outline-none" />
      <div className={modalWrapperClasses}>
        {children}
        {!hiddenCloseButton && (
          <button
            className="p-4 inline-flex items-center justify-center absolute right-0 top-0 focus:outline-none"
            onClick={close}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </Dialog>
  );
};

export default Modal;
