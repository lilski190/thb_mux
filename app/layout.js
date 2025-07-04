import { getDictionary } from "@/lib/getDictionary";
export const metadata = {
  title: "SustainAble",
  description: "Die Nachhaltigkeitsapp der THB",
};

export default async function RootLayout({ children, params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  return (
    <html lang="de">
      <body className="bg-base-200">{children}</body>
    </html>
  );
}
