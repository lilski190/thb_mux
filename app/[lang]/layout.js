import { ToastProvider } from "../components/modals/Toast";

export default async function Layout({ children }) {
  return (
    <div className={`text-base-content `}>
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
