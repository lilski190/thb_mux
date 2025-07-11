import React from "react";

/**
 * Tooltip Komponent von DaisyUI
a
 */
const Tooltip = ({ text, children }) => {
  return (
    <div className="">
      <div className="tooltip tooltip-top z-20 w-full">
        <div className="tooltip-content rounded-md w-38">
          <div className="">{text}</div>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Tooltip;
