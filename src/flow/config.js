import { config } from "@onflow/fcl";
import * as fcl from "@onflow/fcl";

config({
  "flow.network": "testnet", // Mainnet: "mainnet
   "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
   "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
   "discovery.authn.endpoint":
   "https://fcl-discovery.onflow.org/api/testnet/authn",
   "0xProfile": "0x770b3ddf7db51dd1", // The account address where the Profile smart contract lives on Testnet
});
