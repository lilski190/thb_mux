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

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">{dict.login.login}</h1>
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm m-3 border-1 border-base-300 h-fit">
          <div className="card-body">
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
            <div className="text">{dict.login.description}</div>
            <LoginForm dict={dict} />
          </div>
          <div className="flex justify-evenly text65">
            <Tooltip text={dict.general.notImplementet}>
              {dict.login.help}
            </Tooltip>
            <Tooltip text={dict.general.notImplementet}>
              {dict.login.setting}
            </Tooltip>
            <Tooltip text={dict.general.notImplementet}>
              {dict.login.cookies}
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
