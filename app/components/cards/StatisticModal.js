"use client";
import React from "react";

const StatisticModal = ({ title, children }) => {
  return (
    <div className="">
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="text100 text">{title}</div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default StatisticModal;
