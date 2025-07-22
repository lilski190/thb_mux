"use client";
import React from "react";

/**
 * StatisticModal-Komponente zum Anzeigen eines Statistikbereichs mit Titel und optionalem Screenreader-Text.
 *
 * @param {Object} props - Komponenten-Props
 * @param {string} props.title - Titel des Statistikbereichs
 * @param {React.ReactNode} props.children - Inhalt des Statistikbereichs (z.B. Diagramme, Tabellen)
 * @param {string} [props.sr] - Optionaler Screenreader-Text zur zusätzlichen Beschreibung
 * @param {string} props.id - Eindeutige ID zur Verknüpfung des Screenreader-Textes
 *
 * @returns {JSX.Element} JSX-Element mit Statistikbereich
 */
const StatisticModal = ({ title, children, sr, id }) => {
  return (
    <article className="card bg-base-100 border border-base-300 p-3 py-5 ">
      <h3 className=" Textbold  text124 text ml-2 ">{title}</h3>
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
