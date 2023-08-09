import * as fcl from "@onflow/fcl";
import { useState } from "react";
import { toast } from "react-toastify";
import OverlayLoading from "components/OverlayLoading";

fcl.authenticate();
function AttachSignatureToYearBlockComponent({ className }) {
  const [loading, setLoading] = useState(false);

  //Need ID of existing YearBlock NFT, Need ID of existing Signature
  async function attachSignatureToYearBlockNFT(signatureID, yearblockID) {
    const user = fcl.currentUser().authorization;
    console.log(user, "user");
    setLoading(true);
    try {
      const res = await fcl.mutate({
        cadence: `
            import Signatures from 0x770b3ddf7db51dd1
            import NonFungibleToken from 0x770b3ddf7db51dd1
            import YearBlocks from 0x770b3ddf7db51dd1
            
            transaction(signatureID: UInt64, yearblockID: UInt64) {

              let yearblocksCollectionRef: &YearBlocks.Collection
              let signaturesCollectionRef: &Signatures.Collection
          
              prepare(signer: AuthAccount) {
                  // Get a reference to the signer's YearBlocks Collection
                  self.yearblocksCollectionRef = signer.borrow<&YearBlocks.Collection>(
                          from: YearBlocks.CollectionStoragePath
                      ) ?? panic("Signer does not have a YearBlocks Collection in storage")
                  // Get a reference to the signer's Signatures Collection
                  self.signaturesCollectionRef = signer.borrow<&Signatures.Collection>(
                          from: Signatures.CollectionStoragePath
                      ) ?? panic("Signer does not have a Signatures Collection in storage")
              }
          
              execute {
                  // Withdraw the YearBlocks NFT we want to put a signature on
                  let YearBlocksNFT: @YearBlocks.NFT <- self.yearblocksCollectionRef.withdraw(withdrawID: yearblockID) as! @YearBlocks.NFT
          
                  // Put the signature on the yearblock
                  let yearblockWithSignature: @YearBlocks.NFT <- self.signaturesCollectionRef.attachSignatureToYearBlock(signatureId: signatureID, toYearBlocks: <- YearBlocksNFT)
          
                  // Deposit the yearblock into it's storage ref
                  self.yearblocksCollectionRef.deposit(token: <- yearblockWithSignature)
              }
          }
           
          `,

        args: (arg, t) => [
          arg(signatureID, t.UInt64),
          arg(yearblockID, t.UInt64),
        ],
        proposer: user,
        payer: user,
        authorizations: [user],
        limit: 999,
      });
      const transaction = await fcl.tx(res).onceSealed();
      setLoading(false);
      toast("Transaction Successfully!", {
        type: "success",
      });
      console.log(transaction, "transaction", fcl.currentUser);
    } catch (error) {
      console.log("err", fcl.currentUser, error);
      toast("Something is wrong. Try again", {
        type: "error",
      });
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <OverlayLoading />}
      <>
        <button
          className={className}
          onClick={() =>
            attachSignatureToYearBlockNFT(
              3, //signatureID
              3 //yearblockID
            )
          }
        >
          Attach Signature to YearBlock
        </button>
      </>
    </>
  );
}

export default AttachSignatureToYearBlockComponent;
