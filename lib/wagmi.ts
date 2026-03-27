import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";

const projectRpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://mainnet.base.org";

export const builderCode = "bc_8n5a55jl";
export const attributionDataSuffix = "0x62635f386e356135356a6c0b0080218021802180218021802180218021";

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(projectRpcUrl)
  },
  dataSuffix: attributionDataSuffix,
  ssr: true
});
