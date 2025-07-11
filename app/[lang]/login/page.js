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
    <div>
      <Toaster position="top-center" />

      <div className="bg-base-200 min-h-screen p-3">
        <div className="card bg-base-100 shadow-sm p-3 border-1 border-base-300 ">
          <div className="card-body ">
            <div className="text-primary h-20 flex justify-left items-center m-0 p-0">
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
            <div className="title">{dict.login.title}</div>
            <div className="text mt-4 -mb-3">{dict.login.description}</div>
            <LoginForm dict={dict} />
          </div>

          <div className="flex justify-evenly text65 mt-14">
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
    </div>
  );
}
