"use client";
import { getDictionary } from "@/lib/getDictionary";
import { pushArivalData } from "@/app/actions/formAction";

export default function ArivalFrom({ params }) {
  return (
    <div>
      ARIVAL FORM
      <form action={pushArivalData}>
        WALK <input type="radio" name="transportation" value="walk" />
        BIKE <input type="radio" name="transportation" value="bike" />
        TRAIN <input type="radio" name="transportation" value="train" />
        CAR <input type="radio" name="transportation" value="car" />
        KM <input type="number" name="distance" />
        <button type="submit"> speichern</button>
      </form>
    </div>
  );
}
