"use client";

import { EmptyState } from "@/components/empty-state";
import { useCheckInData } from "@/hooks/use-checkin-data";

export function CheckInTimeline({ limit }: { limit?: number }) {
  const { history, isConnected } = useCheckInData();
  const items = typeof limit === "number" ? history.slice(0, limit) : history;

  return (
    <section className="paper-panel">
      <div className="panel-inner stack">
        <div>
          <div className="page-brow">Recent Camps</div>
          <h2 className="section-title" style={{ fontSize: 24 }}>最近打卡</h2>
        </div>
        {!isConnected ? (
          <EmptyState title="等待连接钱包" body="连接后这里会显示真实链上打卡事件。" />
        ) : items.length === 0 ? (
          <EmptyState title="还没有打卡记录" body="完成第一次打卡后，这里会出现你的路线节点。" />
        ) : (
          <div className="timeline-list">
            {items.map((item) => (
              <article key={item.txHash + item.dateKey} className="timeline-item">
                <strong>{item.label}</strong>
                <span className="muted" style={{ fontSize: 14 }}>{item.description}</span>
                <span className="muted" style={{ fontSize: 12 }}>{item.txHashShort}</span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
