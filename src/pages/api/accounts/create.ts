import { type NextApiRequest, type NextApiResponse } from "next";
import { generateKeys } from "../../../utils/crypto";
import { createAccount as createAccountUtil } from "../../../utils/flowAuth";
import { loadFCLConfig } from "../../../utils/fcl-setup";
loadFCLConfig();

const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log("req.....", req.method);
  // if (req.method !== "POST") {
  //   res.status(405).send({ message: "Only POST requests allowed" });
  //   return;
  // }

  const keys = await generateKeys();
  const address = await createAccountUtil(keys.publicKey);

  console.log("address....", address);

  // res.status(200).json({
  //   message: "successfully!",
  //   keys: keys,
  // });

  res.status(200).json({
    publicKey: keys.publicKey,
    privateKey: keys.privateKey,
    address,
  });
};

export default createAccount;
