import { ToastProvider } from "../components/modals/Toast";

/**
 * Async React Layout-Komponente, die die Kind-Komponenten in einen Toast-Provider
 * einschließt und das Basis-Textfarb-Styling anwendet.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Kind-Elemente, die innerhalb des Layouts gerendert werden.
 *
 * @returns {JSX.Element} Layout-Komponente mit ToastProvider um die Kinder.
 */
export default async function Layout({ children }) {
  return (
    <main className={`text-base-content `}>
      <ToastProvider>{children}</ToastProvider>
    </main>
  );
}
