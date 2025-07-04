import { loginAction } from "@/app/actions/authAction";
import { Toaster, toast } from "react-hot-toast";
import { getDictionary } from "@/lib/getDictionary";
import LoginForm from "@/app/components/login/loginForm";
import Tooltip from "@/app/components/tooltips/InformationTooltip";

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
            <div>LOGO</div>
            <h2 className="card-title">{dict.login.title}</h2>
            <p>{dict.login.description}</p>
            <LoginForm dict={dict} />
            <div className="card-actions justify-center">
              <Tooltip text={dict.general.notImplementet}></Tooltip>
            </div>
          </div>
          <div className="flex justify-evenly">
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
