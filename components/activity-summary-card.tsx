"use client";

import { useCheckInData } from "@/hooks/use-checkin-data";

export function ActivitySummaryCard({ expanded = false }: { expanded?: boolean }) {
  const { summary } = useCheckInData();

  return (
    <section className="paper-panel">
      <div className="panel-inner stack">
        <div>
          <div className="page-brow">Trail Summary</div>
          <h2 className="section-title" style={{ fontSize: 24 }}>个人摘要</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">最近打卡</div>
            <div className="stat-value" style={{ fontSize: 18 }}>{summary.lastCheckInLabel}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">下一节点</div>
            <div className="stat-value" style={{ fontSize: 18 }}>{summary.nextMilestoneLabel}</div>
          </div>
        </div>
        {expanded ? (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">最长连续</div>
              <div className="stat-value">{summary.bestStreak}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">本周节奏</div>
              <div className="stat-value">{summary.weeklyCheckins}/7</div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
