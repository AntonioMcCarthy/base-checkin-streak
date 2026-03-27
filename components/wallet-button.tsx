"use client";

import { injected, useAccount, useConnect, useDisconnect } from "wagmi";
import { shortAddress } from "@/lib/format";

export function WalletButton({ compact = false }: { compact?: boolean }) {
  const { address, isConnected } = useAccount();
  const { connectAsync, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  async function handleClick() {
    if (isConnected) {
      disconnect();
      return;
    }

    await connectAsync({ connector: injected() });
  }

  const label = isConnected && address ? shortAddress(address) : compact ? "连接" : "连接钱包";

  return (
    <button className="wallet-button" onClick={() => void handleClick()} disabled={isPending} type="button">
      {isPending ? "连接中..." : label}
    </button>
  );
}
