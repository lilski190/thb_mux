"use client";
import { ICONS } from "@/lib/globals";
import React from "react";
import { logoutAction } from "@/app/actions/authAction";

const MenuBar = ({ title, mode, icon }) => {
  return (
    <div className="w-full my-3">
      <form action={logoutAction} className="w-full">
        <button type="submit" className="w-full ">
          <div className="card bg-base-100  p-0 m-0 hoverButtonBase">
            <div className="card-body text h-10 p-0 m-0 flex items-center justify-center  border border-base-300 rounded-lg">
              <div className="text100  text-center text-accent"> {title}</div>
            </div>
          </div>
        </button>
      </form>
    </div>
  );
};

export default MenuBar;
