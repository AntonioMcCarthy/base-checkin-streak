"use client";

import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAccount, usePublicClient, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useToast } from "@/components/toast-provider";
import { checkInContractAddress, baseCheckInAbi } from "@/lib/contracts";
import { buildHistoryEntries, buildMockHistory, deriveSummary } from "@/lib/history";
import { attributionDataSuffix } from "@/lib/wagmi";
import { trackTransaction } from "@/utils/track";

export function useCheckInData() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { pushToast } = useToast();
  const readsEnabled = Boolean(address);

  const { data: contractData, refetch: refetchReads } = useReadContracts({
    allowFailure: false,
    query: { enabled: readsEnabled },
    contracts: address
      ? [
          { address: checkInContractAddress, abi: baseCheckInAbi, functionName: "lastCheckinDay", args: [address] },
          { address: checkInContractAddress, abi: baseCheckInAbi, functionName: "streak", args: [address] },
          { address: checkInContractAddress, abi: baseCheckInAbi, functionName: "totalCheckins", args: [address] }
        ]
      : []
  });

  const historyQuery = useQuery({
    queryKey: ["checkin-history", address],
    enabled: Boolean(address && publicClient),
    queryFn: async () => {
      const logs = await publicClient!.getLogs({
        address: checkInContractAddress,
        event: {
          type: "event",
          name: "CheckedIn",
          inputs: [
            { type: "address", name: "user", indexed: true },
            { type: "uint256", name: "dayNumber", indexed: false },
            { type: "uint256", name: "streakCount", indexed: false }
          ]
        },
        args: { user: address! },
        fromBlock: "earliest",
        toBlock: "latest"
      });

      return buildHistoryEntries(logs);
    },
    placeholderData: buildMockHistory()
  });

  const { data: hash, isPending: isCheckingIn, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const [lastCheckinDay, streak, totalCheckins] = contractData ?? [0n, 0n, 0n];
  const today = Math.floor(Date.now() / 86400000);
  const hasCheckedToday = Number(lastCheckinDay ?? 0n) >= today;
  const history = historyQuery.data ?? buildMockHistory();

  const summary = useMemo(
    () =>
      deriveSummary({
        currentStreak: Number(streak ?? 0n),
        totalCheckins: Number(totalCheckins ?? 0n),
        lastCheckinDay: Number(lastCheckinDay ?? 0n),
        history,
        hasCheckedToday
      }),
    [streak, totalCheckins, lastCheckinDay, history, hasCheckedToday]
  );

  useEffect(() => {
    if (!isSuccess || !hash || !address) {
      return;
    }

    pushToast("今日打卡已上链，路线记录已更新。");
    void trackTransaction("app-001", "base-checkin-streak", address, hash);
    void refetchReads();
    void historyQuery.refetch();
  }, [isSuccess, hash, address, pushToast, refetchReads, historyQuery]);

  async function checkIn() {
    if (!address) {
      pushToast("请先连接钱包。");
      return;
    }

    if (hasCheckedToday) {
      pushToast("今天已经打过卡了，明天再来。");
      return;
    }

    try {
      await writeContractAsync({
        address: checkInContractAddress,
        abi: baseCheckInAbi,
        functionName: "checkIn",
        dataSuffix: attributionDataSuffix
      });
      pushToast("交易已发送，等待链上确认。");
    } catch {
      pushToast("交易未完成，请稍后重试。");
    }
  }

  return {
    address,
    isConnected,
    canCheckIn: !hasCheckedToday,
    checkIn,
    isCheckingIn: isCheckingIn || isConfirming,
    checkInLabel: !isConnected ? "连接后开始" : hasCheckedToday ? "今日已完成" : "今日打卡",
    hasCheckedToday,
    history,
    summary
  };
}
