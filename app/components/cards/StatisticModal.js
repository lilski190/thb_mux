"use client";
import React from "react";

const StatisticModal = ({ title, children, sr, id }) => {
  return (
    <article className="card bg-base-100 border border-base-300 p-3 py-5">
      <h3 className="text100 text mb-3 ml-2 rtl:text-right rtl:bg-primary">
        {title}
      </h3>
      {sr && (
        <p id={`${id}-summary`} className="sr-only">
          {sr}
        </p>
      )}
      <div className="">{children}</div>
    </article>
  );
};

export default StatisticModal;
