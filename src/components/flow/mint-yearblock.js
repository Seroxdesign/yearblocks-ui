import * as fcl from "@onflow/fcl";
import { useState } from "react";
import OverlayLoading from "components/OverlayLoading";

// id = 1 type number
// link = https://drive.google.com/file/d/1ahYRs7qeKMRgZwXMokaGYR6oOtd4Swdk/view?usp
// allowList = []
// name = 'year-2023' type string
fcl.authenticate();
function MintYearBlockComponent({ className = "buttonPrimary" }) {
  const [loading, setLoading] = useState(false);

  async function mintYearBlockNFT(id, link, allowList, name) {
    const user = fcl.currentUser().authorization;
    console.log(user, "user");
    setLoading(true);
    try {
      const res = await fcl.mutate({
        cadence: `
            import YearBlocks from 0x770b3ddf7db51dd1
            import NonFungibleToken from 0x770b3ddf7db51dd1
            
            transaction (id: UInt64, link: String, allowList: [String], name: String) {
            
              let collectionRef: &{YearBlocks.CollectionPublic}
            
              prepare(signer: AuthAccount) {
                // Get a reference to the signer''s YearBlocks Collection
                self.collectionRef = signer.getCapability<&{YearBlocks.CollectionPublic}>(
                  YearBlocks.CollectionPublicPath
                ).borrow()
                ?? panic("Signer does not have a CollectionPublic Capability configured")
              }
            
              execute {
                // Deposit a newly minted NFT
                self.collectionRef.deposit(
                  token: <-YearBlocks.mintNFT(id: id, link: link, allowList: allowList, name: name)
                )
              }
            }`,

        args: (arg, t) => [
          arg(id, t.UInt64),
          arg(link, t.String),
          arg(allowList, t.Array(t.String)),
          arg(name, t.String),
        ],
        proposer: user,
        payer: user,
        authorizations: [user],
        limit: 999,
      });
      const transaction = await fcl.tx(res).onceSealed();
      console.log(transaction, "transaction", fcl.currentUser);
      setLoading(false);
    } catch (error) {
      console.log("err", fcl.currentUser, error);
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <OverlayLoading />}
      <>
        {/* <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={e => uploadImg(e)}
          style={{ padding: '1em' }}
        /> */}
        <button
          className={className}
          onClick={() =>
            mintYearBlockNFT(
              3,
              "https://drive.google.com/file/d/1ahYRs7qeKMRgZwXMokaGYR6oOtd4Swdk/view?usp/",
              ["steady@steadystudios.org"],
              "year-2023-part2"
            )
          }
        >
          Mint YearBlock NFT
        </button>
      </>
      {/* <img src={imgData} alt="NFT" style={{ marginTop: '2em' }} /> */}
    </>
  );
}

export default MintYearBlockComponent;
