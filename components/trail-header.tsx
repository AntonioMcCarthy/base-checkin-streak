"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "@/components/wallet-button";

export function TrailHeader() {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <header className="paper-panel" style={{ marginBottom: 16 }}>
      <div className="panel-inner row space-between" style={{ gap: 12 }}>
        <Link href="/" style={{ display: "grid", gap: 4 }}>
          <div className="page-brow">{home ? "Base Mini App" : "Base Trail Log"}</div>
          <strong style={{ fontFamily: "var(--title-font)", fontSize: 22 }}>base-checkin-streak</strong>
        </Link>
        <WalletButton compact />
      </div>
    </header>
  );
}
