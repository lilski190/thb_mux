import React from "react";

/**
 * Tooltip Komponent von DaisyUI
a
 */
const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip tooltip-top z-20">
      <div className="tooltip-content w-32 rounded-md">
        <div className="">{text}</div>
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
