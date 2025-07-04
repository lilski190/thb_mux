"use client";
import { getDictionary } from "@/lib/getDictionary";
import { pushMealData } from "@/app/actions/formAction";

export default function MealFrom({ params }) {
  return (
    <div>
      MEAL FORM
      <form action={pushMealData}>
        VEGGI <input type="radio" name="meal" value="vegetarian" />
        VEGAN <input type="radio" name="meal" value="vegan" />
        FISH <input type="radio" name="meal" value="fish" />
        MEAT <input type="radio" name="meal" value="meat" />
        SALAT <input type="radio" name="meal" value="salat" />
        <button type="submit"> speichern</button>
      </form>
    </div>
  );
}
