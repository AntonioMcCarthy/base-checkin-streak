import type { ReactNode } from "react";
import { AppProviders } from "@/components/providers";
import { BottomNav } from "@/components/bottom-nav";
import { TrailHeader } from "@/components/trail-header";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="base:app_id" content="69c64bd7638fc70642e549d7" />
      </head>
      <body>
        <AppProviders>
          <div className="app-shell">
            <TrailHeader />
            <main className="page-shell">{children}</main>
            <BottomNav />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
