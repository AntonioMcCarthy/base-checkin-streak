export function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDayNumber(dayNumber: number) {
  return new Date(dayNumber * 86400000).toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric"
  });
}
