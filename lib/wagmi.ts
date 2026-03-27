import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";

const projectRpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://mainnet.base.org";

// TODO: Replace `builderCode` with the official Base builder code suffix when provided.
// Keep this structure stable so the same attribution value can be reused across the app.
const builderCode = "TODO_BUILDER_CODE";

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(`${projectRpcUrl}${projectRpcUrl.includes("?") ? "&" : "?"}builderCode=${builderCode}`)
  },
  ssr: true
});

export { builderCode };
