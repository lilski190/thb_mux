"use client";
import React from "react";
import { ICONS } from "@/lib/globals";

const DashboardHeader = ({ title }) => {
  return (
    <div className="mb-5 font-bold fixed bg-base-200 w-full z-20">
      <div className="flex items-center justify-between">
        <div className="text-primary w-32 flex justify-left items-center -mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 96 96"
            strokeWidth={1.5}
            stroke="none"
            className="h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={ICONS.sustainAble}
            />
          </svg>
        </div>
        <div className="title pt-5"> {title}</div>
        <div className="w-32"></div>
      </div>
    </div>
  );
};

export default DashboardHeader;
