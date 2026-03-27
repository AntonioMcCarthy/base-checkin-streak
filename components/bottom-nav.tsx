"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";

const items: Array<{ href: Route; label: string; icon: string }> = [
  { href: "/", label: "今日", icon: "◉" },
  { href: "/streak", label: "记录", icon: "↟" },
  { href: "/history", label: "路线", icon: "⋯" },
  { href: "/me", label: "我的", icon: "⌂" },
  { href: "/about", label: "规则", icon: "?" }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={`nav-item${active ? " active" : ""}`}>
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
