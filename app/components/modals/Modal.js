"use client";
import React from "react";
import MenuModal from "../cards/MenuModal";

const Modal = ({ button, children, title, description, id, icon }) => {
  return (
    <div className="">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="w-full"
        onClick={() => document.getElementById(id).showModal()}
      >
        <MenuModal title={button} icon={icon} />
      </button>

      <dialog id={id} className="modal ">
        <div className="bg-base-200 w-full h-full flex items-center justify-center">
          <div className="modal-box bg-base-100 h-[95%]  overflow-x-clip ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="text btn btn-md border-none btn-circle btn-ghost absolute right-2 top-2 hoverButtonX">
                ✕
              </button>
            </form>
            <div className="h-full flex flex-col items-center justify-evenly">
              <h3 className="title pt-[25%]">{title}</h3>
              <div className="text100 text text-center">{description}</div>
              <div className="">{children}</div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
