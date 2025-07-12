"use client";
import React from "react";

const StatisticModal = ({ title, children }) => {
  return (
    <div className="">
      <div className="card bg-base-100 border border-base-300">
        <div className="py-3 p-5 pr-1">
          <div className="text100 text">{title}</div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default StatisticModal;
