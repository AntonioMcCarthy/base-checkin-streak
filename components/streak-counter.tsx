"use client";

import { useCheckInData } from "@/hooks/use-checkin-data";

export function StreakCounter({ variant = "hero" }: { variant?: "hero" | "board" }) {
  const { summary } = useCheckInData();
  const large = variant === "hero";

  return (
    <section className="stack" style={{ gap: 10 }}>
      <div className="stats-grid">
        <div className="stat-card" style={large ? { gridColumn: "1 / -1" } : undefined}>
          <div className="stat-label">当前连续</div>
          <div className="display-number">{summary.currentStreak}</div>
          <div className="muted">{summary.todayStatusLabel}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">最佳记录</div>
          <div className="stat-value">{summary.bestStreak}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">累计打卡</div>
          <div className="stat-value">{summary.totalCheckins}</div>
        </div>
      </div>
    </section>
  );
}
