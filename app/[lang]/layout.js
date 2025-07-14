import { ToastProvider } from "../components/modals/Toast";

export default async function Layout({ children }) {
  return (
    <main className={`text-base-content `}>
      <ToastProvider>{children}</ToastProvider>
    </main>
  );
}
