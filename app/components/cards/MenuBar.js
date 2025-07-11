"use client";
import { ICONS } from "@/lib/globals";
import React from "react";

const MenuBar = ({ title, mode, icon }) => {
  return (
    <div className="w-full">
      <div className="card bg-base-100 border border-base-300 p-0 m-0 ">
        <div className="card-body text h-10 p-0 m-0 flex items-center justify-center">
          <div></div>
          <div className="text100  text-center text-accent"> {title}</div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
