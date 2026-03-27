"use client";

import { ActivitySummaryCard } from "@/components/activity-summary-card";
import { EmptyState } from "@/components/empty-state";
import { StatusChip } from "@/components/status-chip";
import { WalletButton } from "@/components/wallet-button";
import { useCheckInData } from "@/hooks/use-checkin-data";
import { shortAddress } from "@/lib/format";

export default function MePage() {
  const { address, isConnected, summary } = useCheckInData();

  return (
    <>
      <section className="paper-panel">
        <div className="panel-inner stack">
          <div className="row space-between">
            <div>
              <div className="page-brow">Trail Passport</div>
              <h1 className="section-title">我的进度</h1>
              <p className="section-subtitle">个人旅程摘要与最近一次营地签到。</p>
            </div>
            <StatusChip />
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">当前地址</div>
              <div className="stat-value" style={{ fontSize: "18px" }}>{isConnected && address ? shortAddress(address) : "未连接"}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">最近打卡</div>
              <div className="stat-value" style={{ fontSize: "18px" }}>{summary.lastCheckInLabel}</div>
            </div>
          </div>
          <WalletButton />
        </div>
      </section>

      {isConnected ? <ActivitySummaryCard expanded /> : <EmptyState title="先带上你的钱包通行证" body="连接后就能看到当前 streak、累计记录和最近旅程摘要。" />}
    </>
  );
}
