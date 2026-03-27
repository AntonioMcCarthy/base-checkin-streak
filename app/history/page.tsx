"use client";

import { CheckInTimeline } from "@/components/check-in-timeline";
import { EmptyState } from "@/components/empty-state";
import { useCheckInData } from "@/hooks/use-checkin-data";
import { buildRecentCalendar } from "@/lib/history";

export default function HistoryPage() {
  const { summary, history, isConnected } = useCheckInData();
  const days = buildRecentCalendar(history, 28);

  return (
    <>
      <section className="paper-panel">
        <div className="panel-inner stack">
          <div>
            <div className="page-brow">Trail Map</div>
            <h1 className="section-title">路线打点</h1>
            <p className="section-subtitle">最近 28 天的营地记录，完成的日子会留下足迹。</p>
          </div>
          <div className="route-grid">
            {days.map((day) => (
              <div key={day.dateKey} className={`route-cell${day.checked ? " checked" : ""}${day.today ? " today" : ""}`}>
                {day.day}
              </div>
            ))}
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">本周完成</div>
              <div className="stat-value">{summary.weeklyCheckins}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">累计打卡</div>
              <div className="stat-value">{summary.totalCheckins}</div>
            </div>
          </div>
        </div>
      </section>

      {isConnected ? <CheckInTimeline /> : <EmptyState title="连接钱包后查看完整轨迹" body="未连接时先展示示例路线，连接后会读取真实链上记录。" />}
    </>
  );
}
