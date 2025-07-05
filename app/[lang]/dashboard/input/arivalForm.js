"use client";
import { getDictionary } from "@/lib/getDictionary";
import { pushArivalData } from "@/app/actions/formAction";

export default function ArivalFrom({ params, dict }) {
  return (
    <div>
      <form action={pushArivalData}>
        {dict.options[0]}
        <input type="radio" name="transportation" value="walk" />
        {dict.options[1]}
        <input type="radio" name="transportation" value="bike" />
        {dict.options[2]}
        <input type="radio" name="transportation" value="train" />
        {dict.options[3]}
        <input type="radio" name="transportation" value="car" />
        <div>{dict.distance}</div>
        <input type="number" name="distance" />
        <div>TODO: Daten übergeben + State managememt - {dict.usual}</div>
        <button type="submit"> {dict.save}</button>
      </form>
    </div>
  );
}
