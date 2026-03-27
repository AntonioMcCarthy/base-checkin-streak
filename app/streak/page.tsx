"use client";

import { MilestonePanel } from "@/components/milestone-panel";
import { RouteProgressCard } from "@/components/route-progress-card";
import { StreakCounter } from "@/components/streak-counter";
import { useCheckInData } from "@/hooks/use-checkin-data";

export default function StreakPage() {
  const { summary } = useCheckInData();

  const nodes = [
    { label: "Camp 3", value: "3天", active: summary.currentStreak >= 3, left: "8%" },
    { label: "Camp 7", value: "7天", active: summary.currentStreak >= 7, left: "30%" },
    { label: "Camp 14", value: "14天", active: summary.currentStreak >= 14, left: "56%" },
    { label: "Camp 30", value: "30天", active: summary.currentStreak >= 30, left: "86%" }
  ];

  return (
    <>
      <section className="paper-panel">
        <div className="panel-inner stack">
          <div>
            <div className="page-brow">Streak Board</div>
            <h1 className="section-title">连续记录板</h1>
            <p className="section-subtitle">像沿着山径前进，每一天都算一个营地章。</p>
          </div>
          <StreakCounter variant="board" />
          <div className="trail-wave">
            <div className="trail-path" />
            {nodes.map((node) => (
              <div key={node.label} className={`trail-stop${node.active ? " active" : ""}`} style={{ left: node.left }}>
                <div className="trail-stop-mark" />
                <span>{node.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RouteProgressCard expanded />
      <MilestonePanel />
    </>
  );
}
