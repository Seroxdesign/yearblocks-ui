import * as fcl from "@onflow/fcl";
import flowJSON from "./flowDev.json";

export const loadFCLConfig = () => {
  fcl
    .config({
      "flow.network": "testnet", // Mainnet: "mainnet
      "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
      "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
      "discovery.authn.endpoint":
        "https://fcl-discovery.onflow.org/api/testnet/authn",
      "0xProfile": "0x24a3cbe995e718ff", // The account address where the Profile smart contract lives on Testnet
    })
    .load({ flowJSON });
};
