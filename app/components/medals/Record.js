import React from "react";
import { ICONS } from "@/lib/globals";

/**
 * Zeigt eine grafische Darstellung eines "Records" (Erfolg/Streak) basierend auf der Dauer.
 * Die Darstellung ändert sich farblich je nach Dauer mit unterschiedlichen SVG-Farben.
 *
 * @param {Object} props
 * @param {number} props.duration - Dauer (z.B. Tage), die den Record bestimmt.
 * @param {Object} props.dict - Objekt mit Texten/HTML, das die Beschreibung des aktuellen Records enthält.
 *                              Der Schlüssel ist die errechnete Stufe (0 bis 6).
 * @returns {JSX.Element} JSX mit SVG-Grafik und Beschreibungstext.
 */
const Record = ({ duration, dict }) => {
  let record = 0;
  let band = "fill-[#EFE9E5]";
  let star = "fill-[#EFE9E5]";
  let starShadow = "fill-[#EFE9E5] stroke-[#EFE9E5] stroke-1";
  let body = "fill-[#EFE9E5]";
  let circle = "fill-none stroke-1 stroke-[#EFE9E5]";

  //.cls-1{fill:none;stroke:#deb87c;}.cls-1,.cls-2,.cls-3{stroke-miterlimit:10;}.cls-4{fill:#dab683;}.cls-2{fill:#efc11a;}.cls-2,.cls-3{stroke:#56542c;stroke-width:.1px;}.cls-5{fill:#f3ca91;}.cls-6{fill:#fffcf9;opacity:.5;}.cls-3{fill:#f8333c;}
  if (duration >= 3 && duration < 7) {
    record = 1;
    star = "fill-[#cd7f32]";
    starShadow = "fill-[#965A38] stroke-[#965A38] stroke-1";
    body = "fill-[#b87333]";
    circle = "fill-none stroke-1 stroke-[#965A38]";
    band = "fill-[#f8333c]";
  } else if (duration >= 7 && duration < 14) {
    record = 2;
    star = "fill-[#c0c0c0]";
    starShadow = "fill-[#b0b0b0] stroke-[#b0b0b0] stroke-1";
    body = "fill-[#d9d9d9]";
    circle = "fill-none stroke-1 stroke-[#b0b0b0]";
    band = "fill-[#f8333c]";
  } else if (duration >= 14 && duration < 21) {
    record = 3;
    star = "fill-[#FFDE77]";
    starShadow = "fill-[#E9AA05] stroke-[#E9AA05] stroke-1";
    body = "fill-[#FFCE35]";
    circle = "fill-none stroke-1 stroke-[#EAAB05]";
    band = "fill-[#f8333c]";
  } else if (duration >= 21 && duration < 28) {
    record = 4;
    star = "fill-[#4f83ff]"; // Hellblau, strahlend
    starShadow = "fill-[#1942a6] stroke-[#1942a6] stroke-1"; // Weicher Glanz
    body = "fill-[#82b1ff]"; // Helles Königsblau
    circle = "fill-none stroke-1 stroke-[#1942a6]"; // Gleicher Ton w
    band = "fill-[#f8333c]";
  } else if (duration >= 28 && duration < 35) {
    record = 5;
    star = "fill-[#9b111e]";
    starShadow = "fill-[#7c0a02] stroke-[#7c0a02] stroke-1";
    body = "fill-[#c40233]";
    circle = "fill-none stroke-1 stroke-[#7c0a02]";
    band = "fill-[#f8333c]";
  } else if (duration >= 35) {
    record = 6;
    star = "fill-[#2F9A6E]";
    starShadow = "fill-[#27731a] stroke-[#27731a] stroke-1";
    body = "fill-[#2F9A6E]";
    circle = "fill-none stroke-1 stroke-[#27731a]";
    band = "fill-[#f8333c]";
  }
  return (
    <div className="flex text text100 ">
      <div className="w-1/3" aria-hidden="true">
        <svg
          id="Ebene_5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 96 96"
          className="w-38 -ml-5 rtl:-mr-5"
        >
          <path
            className={band}
            d="M26,48c.51,1.3-2.13,4.44-1,6,.48.66,3.22-.02,4,1s-1.21,4.2-.1,5.26c1.04.99,2.3.51,3.34.72l-5.73,17.19,7.78-1.35c1.27.29,4.99,7.09,6.06,6.13l5.26-15.76c.58-.28,1.14-1.39,2.15-1.42s1.79,1.04,2.63,1.42l5.26,15.76c.93.24.92-.39,1.34-.8.8-.78,3.9-5.37,4.23-5.44l8.27,1.46-6.21-16.71c1.42-.56,2.36-.34,3.63-.91,1.18-.92.21-2.87,1.11-4.15,1.23-1.75,4.27-.31,4.36-3.79"
          />
          <path
            className={body}
            d="M32.48,61.61c-1.04-.22-2.3.27-3.34-.72-1.11-1.06-.6-3.29-1.4-4.33s-2.95-.79-3.43-1.46c-1.13-1.56.25-3.99-.26-5.29-.35-.89-2.56-1.52-2.96-2.87-.64-2.2,1.3-3.03,1.33-4.19.05-1.4-2.22-2.59-1.91-4.75.23-1.57,2.44-1.9,2.44-3.84,0-1.24-1.1-2.08-.92-3.24.33-2.26,3-2.16,3.52-3.2.66-1.34-.31-3.32.96-4.77,1.08-1.24,2.76-.64,3.84-1.41,1.2-.86.99-3.35,2.41-4.29,1.57-1.04,2.69.3,4.14-.11,1.16-.33,1.68-2.79,3.07-3.2,1.8-.52,2.73.96,4.16.87,1.68-.1,2.83-2.42,4.26-2.29,1.29.12,2.11,1.93,3.04,2.21,2.02.6,4.09-2.04,6.23-.28.87,4.24,4.2,1.93,6.33,2.98,1.43.71,1.09,3.76,1.89,4.32s2.98.06,4.07,1.18c1.54,1.59-.13,3.68.68,4.91.62.94,3.08.79,3.67,2.71.53,1.58-1.12,2.89-.7,4.44.25.91,1.71,1.49,2.07,2.26,1.34,2.91-1.63,3.64-1.63,5.49,0,1.05,1.14,2,1.32,2.98.57,3.11-2.37,2.65-2.96,4.07-.54,1.29.23,2.23.2,3.44-.09,3.48-3.13,2.04-4.36,3.79-.9,1.28.08,3.23-1.11,4.15-1.27.57-2.21.34-3.63.91-2.47.98-1.66,2.93-2.97,3.51-1.85.81-2.96-.36-4.4-.18-1.93.24-2.38,3.81-5.52,2.4-.83-.37-1.61-1.45-2.63-1.42s-1.57,1.13-2.15,1.42c-2.93,1.43-3.64-2.11-5.52-2.4s-3.85,1.54-5.41-.76c-.9-1.33-.16-2.57-2.44-3.05Z"
          />
          <path
            className={starShadow}
            d="M49.18,28.16l2.75,8.46c.07.21.26.35.48.35h8.89c.48,0,.69.62.29.9l-7.19,5.23c-.18.13-.25.35-.18.56l2.75,8.46c.15.46-.38.84-.77.56l-7.19-5.23c-.18-.13-.41-.13-.59,0l-7.19,5.23c-.39.28-.92-.1-.77-.56l2.75-8.46c.07-.21,0-.43-.18-.56l-7.19-5.23c-.39-.28-.19-.9.29-.9h8.89c.22,0,.41-.14.48-.35l2.75-8.46c.15-.46.8-.46.95,0Z"
          />
          <path
            className={star}
            d="M48.35,28.2l2.75,8.46c.07.21.26.35.48.35h8.89c.48,0,.69.62.29.9l-7.19,5.23c-.18.13-.25.35-.18.56l2.75,8.46c.15.46-.38.84-.77.56l-7.19-5.23c-.18-.13-.41-.13-.59,0l-7.19,5.23c-.39.28-.92-.1-.77-.56l2.75-8.46c.07-.21,0-.43-.18-.56l-7.19-5.23c-.39-.28-.19-.9.29-.9h8.89c.22,0,.41-.14.48-.35l2.75-8.46c.15-.46.8-.46.95,0Z"
          />
          <circle className={circle} cx="48" cy="40" r="20" />
          <path
            className="fill-white"
            d="M26.51,33.62l1.06,2.87c.02.05.06.1.12.12l2.87,1.06c.17.06.17.31,0,.38l-2.87,1.06c-.05.02-.1.06-.12.12l-1.06,2.87c-.06.17-.31.17-.38,0l-1.06-2.87c-.02-.05-.06-.1-.12-.12l-2.87-1.06c-.17-.06-.17-.31,0-.38l2.87-1.06c.05-.02.1-.06.12-.12l1.06-2.87c.06-.17.31-.17.38,0Z"
          />
          <path
            className="fill-white"
            d="M39.51,25.28l.76,2.06c.02.05.06.1.12.12l2.06.76c.17.06.17.31,0,.38l-2.06.76c-.05.02-.1.06-.12.12l-.76,2.06c-.06.17-.31.17-.38,0l-.76-2.06c-.02-.05-.06-.1-.12-.12l-2.06-.76c-.17-.06-.17-.31,0-.38l2.06-.76c.05-.02.1-.06.12-.12l.76-2.06c.06-.17.31-.17.38,0Z"
          />
        </svg>
      </div>
      <p
        className="w-2/3 mt-6 ml-4 rtl:mr-4"
        dangerouslySetInnerHTML={{ __html: dict[record] }}
      ></p>
    </div>
  );
};

export default Record;
