"use client";

import { useCheckInData } from "@/hooks/use-checkin-data";

export function StatusChip() {
  const { isConnected, canCheckIn, summary } = useCheckInData();

  if (!isConnected) return <span className="status-chip idle">待连接</span>;
  if (canCheckIn) return <span className="status-chip ready">可打卡</span>;
  return <span className="status-chip done">{summary.todayStatusLabel}</span>;
}
