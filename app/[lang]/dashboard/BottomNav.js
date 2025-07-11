"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICONS } from "@/lib/globals";
import Tooltip from "@/app/components/tooltips/InformationTooltip";

export default function BottomNav({ lang, dict }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="h-16 bg-base-300 w-full fixed bottom-0 z-50 flex justify-evenly items-center text">
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
          <div className="flex flex-col items-center">
            <div
              className={` rounded-xl ${
                isActive(item.href) ? "bg-accent" : "bg-transparent"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="none"
                className="w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.icon}
                />
              </svg>
            </div>
            <div className={isActive(item.href) ? "font-bold" : ""}>
              {item.label}
            </div>
          </div>
        );

        return item.tooltip ? (
          <Tooltip key={idx} text={item.tooltip}>
            {content}
          </Tooltip>
        ) : (
          <Link key={idx} href={item.href}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
