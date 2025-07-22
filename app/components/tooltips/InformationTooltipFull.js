import React from "react";

/**
 * Tooltip-Komponente, die einen Hinweistext anzeigt, wenn man über das Kind-Element hovert.
 *
 * Nutzt DaisyUI-Klassen für das Styling.
 *
 * @param {Object} props
 * @param {string} props.text - Der Text, der im Tooltip angezeigt wird
 * @param {React.ReactNode} props.children - Das Element, auf das der Tooltip angewendet wird
 *
 * @returns {JSX.Element} Tooltip-Wrapper mit Text und Kind-Element
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
