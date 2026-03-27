"use client";

import { useCheckInData } from "@/hooks/use-checkin-data";

export function RouteProgressCard({ expanded = false }: { expanded?: boolean }) {
  const { summary } = useCheckInData();

  return (
    <section className="paper-panel">
      <div className="panel-inner stack">
        <div>
          <div className="page-brow">Route Progress</div>
          <h2 className="section-title" style={{ fontSize: 24 }}>旅程进度</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">今日状态</div>
            <div className="stat-value" style={{ fontSize: 20 }}>{summary.todayStatusLabel}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">本周完成</div>
            <div className="stat-value">{summary.weeklyCheckins}</div>
          </div>
        </div>
        {expanded ? (
          <p className="section-subtitle" style={{ marginTop: 0 }}>
            连续天数越高，路线会从日常步道逐渐走向长线旅程。现在已经累计了 {summary.totalCheckins} 次营地章。
          </p>
        ) : null}
      </div>
    </section>
  );
}
