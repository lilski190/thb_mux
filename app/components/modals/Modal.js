"use client";
import React from "react";
import MenuModal from "../cards/MenuModal";

const Modal = ({ button, children, title, description, id }) => {
  return (
    <div className="">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="w-full"
        onClick={() => document.getElementById(id).showModal()}
      >
        <MenuModal title={button} />
      </button>

      <dialog id={id} className="modal ">
        <div className="bg-base-200 w-full h-full flex items-center justify-center">
          <div className="modal-box bg-base-100 ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 text-lg font-light">
                ✕
              </button>
            </form>
            <h3 className="title">{title}</h3>
            <div className="text100 text">{description}</div>
            {children}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
