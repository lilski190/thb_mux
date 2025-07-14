import { loginAction } from "@/app/actions/authAction";
import { Toaster, toast } from "react-hot-toast";
import { getDictionary } from "@/lib/getDictionary";
import LoginForm from "@/app/components/login/loginForm";
import Tooltip from "@/app/components/tooltips/InformationTooltip";
import { ICONS } from "@/lib/globals";

export default async function LoginPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="bg-base-200 min-h-screen p-3 flex items-center jusitfy-center">
      <Toaster position="top-center" />

      <div className="card w-full bg-base-100 shadow-sm border-1 border-base-300 min-h-2/3 flex items-center py-5 px-3">
        <div className=" ">
          <div
            className="text-primary h-20 flex justify-left items-center m-0 px-3 mt-5"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 96 96"
              strokeWidth={1.5}
              stroke="none"
              className="w-38 -mt-10 -ml-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={ICONS.sustainAble}
              />
            </svg>
          </div>
          <h2 className="title my-5">{dict.login.title}</h2>
          <p className="text96  mt-5 mb-2 px-8">{dict.login.description}</p>
          <LoginForm dict={dict} lang={lang} />
        </div>

        <div
          className="flex justify-evenly text65 mt-14 w-full"
          aria-hidden="true"
        >
          <Tooltip text={dict.general.notImplementet}>
            <div className="hover:underline"> {dict.login.help}</div>
          </Tooltip>
          <Tooltip text={dict.general.notImplementet}>
            <div className="hover:underline"> {dict.login.setting}</div>
          </Tooltip>
          <Tooltip text={dict.general.notImplementet}>
            <div className="hover:underline"> {dict.login.cookies}</div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
