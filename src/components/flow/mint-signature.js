import * as fcl from "@onflow/fcl";
import { useState } from "react";
import OverlayLoading from "components/OverlayLoading";

fcl.authenticate();
function MintSignatureComponent({ className }) {
  const [loading, setLoading] = useState(false);

  //Id should be a unique number, comment is a string, link is a string url to an img of a signature, name is a string
  async function mintSignatureNFT(id, comment, link, name) {
    const user = fcl.currentUser().authorization;
    console.log(user, "user");
    setLoading(true);
    try {
      const res = await fcl.mutate({
        cadence: `
            import Signatures from 0x770b3ddf7db51dd1
            import NonFungibleToken from 0x770b3ddf7db51dd1
            
            transaction (id: UInt64, comment: String, image: String, name: String)  {

              let collectionRef: &{Signatures.CollectionPublic}
          
              prepare(signer: AuthAccount) {
                  // Get a reference to the signer's YearBlocks Collection
                  self.collectionRef = signer.getCapability<&{Signatures.CollectionPublic}>(
                         Signatures.CollectionPublicPath
                      ).borrow()
                      ?? panic("Signer does not have a CollectionPublic Capability configured")
              }
          
              execute {
                  // Deposit a newly minted NFT
                  self.collectionRef.deposit(
                      token: <-Signatures.mintNFT(id: id, comment: comment, image: image, name: name)
                  )
              }
          }`,

        args: (arg, t) => [
          arg(id, t.UInt64),
          arg(comment, t.String),
          arg(link, t.String),
          arg(name, t.String),
        ],
        proposer: user,
        payer: user,
        authorizations: [user],
        limit: 999,
      });
      const transaction = await fcl.tx(res).onceSealed();
      console.log(transaction, "transaction", fcl.currentUser);
    } catch (error) {
      console.log("err", fcl.currentUser, error);
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
            mintSignatureNFT(
              3,
              "Beautiful yearblock you have there",
              "https://i.imgur.com/7FkSPHg.jpg",
              "Sero"
            )
          }
        >
          Mint Signature
        </button>
      </>
    </>
  );
}

export default MintSignatureComponent;
