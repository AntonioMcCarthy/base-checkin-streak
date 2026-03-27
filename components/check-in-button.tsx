"use client";

import { useCheckInData } from "@/hooks/use-checkin-data";

export function CheckInButton() {
  const { isConnected, canCheckIn, checkInLabel, checkIn, isCheckingIn } = useCheckInData();
  const disabled = !isConnected || !canCheckIn || isCheckingIn;

  return (
    <div className="stamp-ring">
      <button className="stamp-core" onClick={() => void checkIn()} disabled={disabled} type="button">
        <div className="stamp-label">
          <span className="stamp-title">{isCheckingIn ? "提交中" : checkInLabel}</span>
          <span className="stamp-caption">{!isConnected ? "CONNECT WALLET" : canCheckIn ? "STAMP TODAY" : "SEE YOU TOMORROW"}</span>
        </div>
      </button>
    </div>
  );
}
