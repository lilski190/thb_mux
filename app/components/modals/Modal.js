"use client";
import React, { useRef } from "react";
import MenuModal from "../cards/MenuModal";

const Modal = ({ button, children, title, description, id, icon }) => {
  const dialogRef = useRef();
  const buttonRef = useRef();

  const openModal = () => {
    dialogRef.current?.showModal();
    // Fokus ins Modal setzen
    setTimeout(() => {
      const firstFocusable = dialogRef.current?.querySelector(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      firstFocusable?.focus();
    }, 0);
  };

  const closeModal = () => {
    dialogRef.current?.close();
    buttonRef.current?.focus(); // Fokus zurück
  };

  return (
    <div>
      <button
        ref={buttonRef}
        className="w-full"
        onClick={openModal}
        aria-haspopup="dialog"
        aria-controls={id}
        aria-expanded={dialogRef.current?.open || false}
      >
        <MenuModal title={button} icon={icon} />
      </button>

      <dialog
        id={id}
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
      >
        <div className="bg-base-200 w-full h-full flex items-center justify-center">
          <div className="modal-box bg-base-100 h-[95%] overflow-x-clip">
            <form method="dialog">
              <button
                onClick={closeModal}
                className="text btn btn-md border-none btn-circle btn-ghost absolute right-2 top-2 hoverButtonX"
                aria-label="Close"
              >
                ✕
              </button>
            </form>
            <div className="h-full flex flex-col items-center justify-evenly">
              <h3 id={`${id}-title`} className="title pt-[25%] text-center">
                {title}
              </h3>
              <div
                id={`${id}-description`}
                className="text100 text text-center"
              >
                {description}
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
