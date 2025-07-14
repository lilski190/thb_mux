import { getDictionary } from "@/lib/getDictionary";
import ArivalFrom from "./arivalForm";
import MealFrom from "./mealForm";
import Modal from "@/app/components/modals/Modal";
import DashboardHeader from "@/app/components/header";

export default async function InputPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <DashboardHeader title={dict.routes.input} />

      <div className="py-20 bg-base-200 px-3 grid grid-cols-1 gap-1.5">
        <p className="text text96 mb-5 px-2 mt-10">{dict.input.description}</p>
        <Modal
          id="arival"
          button={dict.input.arivalTitle}
          title={dict.input.arival.title}
          description={dict.input.arival.description}
        >
          <ArivalFrom dict={dict.input.arival} />
        </Modal>
        <Modal
          id="meal"
          button={dict.input.mealTitel}
          title={dict.input.meal.title}
          description={dict.input.meal.description}
        >
          <MealFrom dict={dict.input.meal} />
        </Modal>
      </div>
    </div>
  );
}
