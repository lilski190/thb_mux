"use client";

import { useState } from "react";
import { pushNotoficationData } from "@/app/actions/formAction";

export default function NotificationFrom({ params }) {
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
      <h2>NOTIFICATION FORM</h2>
      <form action={pushNotoficationData}>
        <label>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={allChecked}
          />{" "}
          Alle auswählen
        </label>
        <br />
        <label>
          MO{" "}
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
          DI{" "}
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
          MI{" "}
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
          DO{" "}
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
          FR{" "}
          <input
            type="checkbox"
            name="fr"
            value="1"
            checked={checkboxes.fr}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <button type="submit">Speichern</button>
      </form>
    </div>
  );
}
