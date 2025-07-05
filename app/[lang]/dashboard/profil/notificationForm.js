"use client";

import { useState } from "react";
import { pushNotoficationData } from "@/app/actions/formAction";

export default function NotificationFrom({ params, dict }) {
  const [checkboxes, setCheckboxes] = useState({
    mo: false,
    di: false,
    mi: false,
    do: false,
    fr: false,
  });

  const allChecked = Object.values(checkboxes).every(Boolean);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setCheckboxes({
      mo: checked,
      di: checked,
      mi: checked,
      do: checked,
      fr: checked,
    });
  };

  return (
    <div>
      TODO: überlegen wie wir mit dem update Umgehen sollen? update im
      localstorage oder cookies? oder neuladen der seite?
      <form action={pushNotoficationData}>
        <label>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={allChecked}
          />
          {dict.options[5]}
        </label>
        <br />
        <label>
          {dict.options[0]}
          <input
            type="checkbox"
            name="mo"
            value="1"
            checked={checkboxes.mo}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <label>
          {dict.options[1]}
          <input
            type="checkbox"
            name="di"
            value="1"
            checked={checkboxes.di}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <label>
          {dict.options[2]}
          <input
            type="checkbox"
            name="mi"
            value="1"
            checked={checkboxes.mi}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <label>
          {dict.options[3]}
          <input
            type="checkbox"
            name="do"
            value="1"
            checked={checkboxes.do}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <label>
          {dict.options[4]}
          <input
            type="checkbox"
            name="fr"
            value="1"
            checked={checkboxes.fr}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <button type="submit">{dict.save}</button>
      </form>
    </div>
  );
}
