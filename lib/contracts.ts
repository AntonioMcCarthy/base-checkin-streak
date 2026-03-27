import type { Address } from "viem";

export const checkInContractAddress = "0x0e5e78fcf40f96109f48653ffbe7c49560242c9b" as Address;

export const baseCheckInAbi = [
  { type: "function", name: "lastCheckinDay", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "streak", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalCheckins", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "checkIn", stateMutability: "nonpayable", inputs: [], outputs: [] },
  {
    type: "event",
    name: "CheckedIn",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "dayNumber", type: "uint256", indexed: false },
      { name: "streakCount", type: "uint256", indexed: false }
    ]
  }
] as const;
