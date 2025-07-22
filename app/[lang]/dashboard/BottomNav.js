"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICONS } from "@/lib/globals";
import Tooltip from "@/app/components/tooltips/InformationTooltip";

/**
 * Bottom Navigation Component für die Dashboard-Navigation.
 *
 * Zeigt eine fixe Leiste am unteren Bildschirmrand mit Icons und Labels
 * für verschiedene Dashboard-Routen an. Aktiver Tab wird hervorgehoben.
 * Manche Tabs können Tooltips haben, wenn Funktionen noch nicht implementiert sind.
 *
 * @param {Object} props
 * @param {string} props.lang - Aktuelle Sprachkennung, z.B. 'de' oder 'en'.
 * @param {Object} props.dict - Wörterbuch mit Routen-Labels und allgemeinen Texten.
 * @param {string} [props.mode="main"] - Farbmodus der Navigation ("main" oder "contrast").
 *
 * @returns {JSX.Element} Navigationsleiste am unteren Bildschirmrand.
 */
export default function BottomNav({ lang, dict, mode }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  let colormode = mode || "main";

  return (
    <div
      className={`h-16 ${
        colormode == "contrast"
          ? "bg-base-200 border-base-300 border-t-2"
          : "bg-base-300"
      }  w-full max-w-screen fixed bottom-0 z-50 flex justify-evenly items-center text`}
      dir="ltr"
    >
      {[
        {
          href: `/${lang}/dashboard`,
          icon: ICONS.home,
          label: dict.routes.home,
        },
        {
          href: `/${lang}/dashboard/input`,
          icon: ICONS.inputSheet,
          label: dict.routes.input,
        },
        {
          href: `/${lang}/dashboard/statistic`,
          icon: ICONS.statistic,
          label: dict.routes.statistic,
        },
        {
          href: `/${lang}/dashboard/inbox`,
          icon: ICONS.inbox,
          label: dict.routes.inbox,
          tooltip: dict.general.notImplementet,
        },
        {
          href: `/${lang}/dashboard/profil`,
          icon: ICONS.profil,
          label: dict.routes.profil,
        },
      ].map((item, idx) => {
        const content = (
          <div className="flex flex-col items-center ">
            <div
              className={` rounded-xl ${
                isActive(item.href)
                  ? colormode == "contrast"
                    ? "bg-accent/20"
                    : "bg-accent"
                  : "bg-transparent"
              } hover:bg-base-100/30 -mb-0`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="none"
                className="w-9"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.icon}
                />
              </svg>
            </div>
            <span className={isActive(item.href) ? "font-bold" : ""}>
              {item.label}
            </span>
          </div>
        );

        return item.tooltip ? (
          <Tooltip key={idx} text={item.tooltip} aria-hidden="true">
            {content}
          </Tooltip>
        ) : (
          <Link
            key={idx}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            tabIndex={0}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
