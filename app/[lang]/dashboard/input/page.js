import { getDictionary } from "@/lib/getDictionary";
import ArivalFrom from "./arivalForm";
import MealFrom from "./mealForm";

export default async function InputPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">{dict.routes.input}</h1>
      <ArivalFrom />
      <MealFrom />
    </div>
  );
}
