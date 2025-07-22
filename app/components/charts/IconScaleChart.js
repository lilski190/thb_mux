import React from "react";
import { ICONS } from "@/lib/globals";

/**
 * IconScaleChart-Komponente zur Darstellung von skalierten Symbolen basierend auf Datenwerten.
 *
 * @param {Object} props - Komponenten-Props
 * @param {number[]} props.data - Array von numerischen Werten zur Skalierung der Symbole
 * @param {string[]} props.labels - Array von Labels, die den Datenwerten entsprechen
 * @param {Object} props.dict - Wörterbuch für Barrierefreiheit und Beschriftungen
 * @param {Object.<string,string>} props.dict.labels - Mapping von Label-Keys zu lesbaren Strings
 * @param {string} [props.dict.altText] - Alternativer Text für das Diagramm (aria-label)
 * @param {string} [props.dict.title] - Fallback-Titel für das Diagramm (aria-label)
 * @param {string} [props.dict.altTableLabel] - Beschriftung für die unsichtbare Tabelle (Screenreader)
 * @param {string} [props.dict.colLabel] - Spaltenüberschrift Kategorie für die Tabelle
 * @param {string} [props.dict.colValue] - Spaltenüberschrift Wert für die Tabelle
 * @param {string} [props.ariaDescribedBy] - Optionaler Wert für aria-describedby (ID-Referenz)
 *
 * @returns {JSX.Element} JSX-Element mit skalierten Symbolen und einer Screenreader-Tabelle
 */
const IconScaleChart = ({ data, labels, dict, ariaDescribedBy }) => {
  const max = Math.max(...data);
  const maxSize = 80;
  const minSize = 30;

  const items = data
    .map((value, i) => ({ value, label: labels[i] }))
    .sort((a, b) => b.value - a.value);

  const sortedItems = data
    .map((value, index) => ({ value, label: labels[index] }))
    .sort((a, b) => b.value - a.value);

  const getSize = (value) => {
    if (max === 0) return minSize;
    const scaled = (value / max) * (maxSize - minSize) + minSize;
    return scaled;
  };

  const srTable = (
    <table
      className="sr-only"
      aria-label={dict.altTableLabel || "Statistikwerte"}
    >
      <thead>
        <tr>
          <th scope="col">{dict.colLabel || "Kategorie"}</th>
          <th scope="col">{dict.colValue || "Wert"}</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ label, value }) => (
          <tr key={label}>
            <td>{dict.labels[label]}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className=" flex justify-between w-full mt-5">
      {sortedItems.map((item, i) => {
        const size = getSize(item.value);
        const isFirst = i === 0;
        const isStrokeIcon = item.label === "walk" || item.label === "bike";

        return (
          <figure
            role="img"
            aria-label={dict.altText || dict.title || "Symbol‑Skalendiagramm"}
            aria-describedby={ariaDescribedBy}
            key={i}
            className={`${
              isFirst ? "w-16 Textbold mx-2" : "w-14"
            } flex flex-col items-center justify-between `}
          >
            <span className={`${isFirst ? "Textbold" : ""} text text75`}>
              {item.value.toFixed(0)}
            </span>
            <div
              className="flex items-end justify-end h-full"
              style={{
                width: `${size}px`,
              }}
              aria-hidden="true"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill={isStrokeIcon ? "none" : "currentColor"}
                stroke={isStrokeIcon ? "currentColor" : "none"}
                strokeWidth={isStrokeIcon ? 2 : 0}
                viewBox="0 0 96 96"
                style={{
                  width: `${size}px`,
                }}
                className=""
              >
                <path d={ICONS[item.label]} />
              </svg>
            </div>
            <span className={`${isFirst ? "Textbold" : ""} text text75 `}>
              {dict.labels[item.label]}
            </span>
            {srTable}
          </figure>
        );
      })}
    </div>
  );
};

export default IconScaleChart;
