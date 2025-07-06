"use client";
import React from "react";
import { ICONS } from "@/lib/globals";

const MenuModal = ({ icon, title }) => {
  let stroke = "none";
  let fill = "currentColor";
  if (icon == "bike" || icon == "walk") {
    stroke = "currentColor";
    fill = "none";
  }
  return (
    <div className="">
      <div className="card bg-base-100 border border-base-300 p-0 m-0 ">
        <div className="card-body h-10 p-0 m-0">
          <div className="flex justify-between items-center h-full ">
            <div className=" text100 text "> {title}</div>

            <div className="text-base-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS.arrowRight}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
