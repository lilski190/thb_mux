import React from "react";

/**
 * DefaultButton-Komponente für einen einfachen Button mit optionaler Farbklasse und Text.
 *
 * @param {Object} props - Komponenten-Props
 * @param {string} [props.text] - Text, der im Button angezeigt wird (Standard: "Default text")
 * @param {string} [props.colorClass] - CSS-Klassenname für die Farbe des Buttons (Standard: "btn-neutral")
 *
 * @returns {JSX.Element} JSX-Element mit dem Button
 */
const DefaultButton = ({ text, colorClass }) => {
  return (
    <button className={`btn ${colorClass ? colorClass : "btn-neutral"}`}>
      {text ? text : "Default text"}
    </button>
  );
};

export default DefaultButton;
