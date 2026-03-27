"use client";

import { useCheckInData } from "@/hooks/use-checkin-data";

export function MilestonePanel({ compact = false }: { compact?: boolean }) {
  const { summary } = useCheckInData();
  const milestones = [
    { day: 3, title: "暖营", note: "完成第一个连续节点" },
    { day: 7, title: "周线", note: "一周路线成形" },
    { day: 14, title: "远足", note: "开始进入稳定节奏" },
    { day: 30, title: "长线", note: "整月旅程达成" }
  ];

  return (
    <section className="paper-panel">
      <div className="panel-inner stack">
        <div>
          <div className="page-brow">Milestones</div>
          <h2 className="section-title" style={{ fontSize: 24 }}>{compact ? "旅程节点" : "里程徽记"}</h2>
        </div>
        <div className="milestone-list">
          {milestones.map((milestone) => {
            const active = summary.currentStreak >= milestone.day;
            return (
              <div key={milestone.day} className="milestone-item">
                <div className="badge" style={active ? undefined : { opacity: 0.35 }}>{milestone.day}</div>
                <div>
                  <div style={{ fontWeight: 800 }}>{milestone.title}</div>
                  <div className="muted" style={{ fontSize: 14 }}>{milestone.note}</div>
                </div>
                <div className={`status-chip ${active ? "done" : "idle"}`}>{active ? "已达成" : "未到达"}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
