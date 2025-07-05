"use client";
import React from "react";

const Modal = ({ button, children, title, description, id }) => {
  return (
    <div className="">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn neutral"
        onClick={() => document.getElementById(id).showModal()}
      >
        {button}
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{title}</h3>
          <div>{description}</div>
          {children}
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
