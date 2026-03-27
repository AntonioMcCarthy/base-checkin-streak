import { formatDayNumber, shortAddress } from "@/lib/format";

export type HistoryEntry = {
  dateKey: string;
  dayNumber: number;
  label: string;
  description: string;
  txHash: string;
  txHashShort: string;
  streakCount: number;
};

type RawLog = {
  transactionHash?: `0x${string}`;
  args?: {
    dayNumber?: bigint;
    streakCount?: bigint;
  };
};

export function buildHistoryEntries(logs: RawLog[]): HistoryEntry[] {
  return [...logs].reverse().map((log) => {
    const dayNumber = Number(log.args?.dayNumber ?? 0n);
    const txHash = log.transactionHash ?? "0x0";

    return {
      dateKey: String(dayNumber),
      dayNumber,
      label: `${formatDayNumber(dayNumber)} 打卡完成`,
      description: `连续天数到达 ${Number(log.args?.streakCount ?? 1n)} 天`,
      txHash,
      txHashShort: shortAddress(txHash),
      streakCount: Number(log.args?.streakCount ?? 1n)
    };
  });
}

export function buildMockHistory(): HistoryEntry[] {
  const today = Math.floor(Date.now() / 86400000);
  const values = [today - 5, today - 4, today - 3, today - 1].reverse();

  return values.map((dayNumber, index) => ({
    dateKey: String(dayNumber),
    dayNumber,
    label: `${formatDayNumber(dayNumber)} 打卡完成`,
    description: `示例轨迹节点 ${index + 1}`,
    txHash: `0xmock${index}`,
    txHashShort: `0xmock${index}`,
    streakCount: index + 1
  }));
}

export function deriveSummary({
  currentStreak,
  totalCheckins,
  lastCheckinDay,
  history,
  hasCheckedToday
}: {
  currentStreak: number;
  totalCheckins: number;
  lastCheckinDay: number;
  history: HistoryEntry[];
  hasCheckedToday: boolean;
}) {
  const bestStreak = Math.max(currentStreak, ...history.map((item) => item.streakCount), 0);
  const lastCheckInLabel = lastCheckinDay ? formatDayNumber(lastCheckinDay) : "暂无";
  const nextMilestone = [3, 7, 14, 30, 60].find((value) => value > currentStreak) ?? currentStreak;
  const weeklyCheckins = history.filter((item) => item.dayNumber >= Math.floor(Date.now() / 86400000) - 6).length;

  return {
    currentStreak,
    totalCheckins,
    bestStreak,
    weeklyCheckins,
    lastCheckInLabel,
    todayStatusLabel: hasCheckedToday ? "今日已打卡" : "等待今日打卡",
    nextMilestoneLabel: nextMilestone === currentStreak ? "已到终点" : `${nextMilestone} 天节点`
  };
}

export function buildRecentCalendar(history: HistoryEntry[], count: number) {
  const today = new Date();
  const checkedSet = new Set(history.map((item) => item.dateKey));

  return Array.from({ length: count }, (_, offset) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (count - 1 - offset));
    const dayNumber = Math.floor(date.getTime() / 86400000);
    const dateKey = String(dayNumber);

    return {
      dateKey,
      day: date.getDate(),
      checked: checkedSet.has(dateKey),
      today: offset === count - 1
    };
  });
}
