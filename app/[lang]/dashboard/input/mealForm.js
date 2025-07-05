"use client";
import { getDictionary } from "@/lib/getDictionary";
import { pushMealData } from "@/app/actions/formAction";

export default function MealFrom({ params, dict }) {
  return (
    <div>
      <form action={pushMealData}>
        {dict.options[0]} <input type="radio" name="meal" value="vegan" />
        {dict.options[1]} <input type="radio" name="meal" value="vegetarian" />
        {dict.options[2]} <input type="radio" name="meal" value="fish" />
        {dict.options[3]} <input type="radio" name="meal" value="meat" />
        {dict.options[4]} <input type="radio" name="meal" value="salat" />
        {dict.options[5]}
        <input type="radio" name="meal" value="none" />
        <button type="submit"> {dict.save}</button>
      </form>
    </div>
  );
}
