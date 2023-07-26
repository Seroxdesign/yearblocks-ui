import * as fcl from "@onflow/fcl";
import { useState } from "react";
import OverlayLoading from "components/OverlayLoading";

// id = 1 type number
// link = https://drive.google.com/file/d/1ahYRs7qeKMRgZwXMokaGYR6oOtd4Swdk/view?usp
// allowList = []
// name = 'year-2023' type string

function MintYearBlockComponent({ buttonStyle }) {
  const [loading, setLoading] = useState(false);

  async function mintYearBlockNFT(id, link, allowList, name) {
    setLoading(true);
    try {
      const res = await fcl.mutate({
        cadence: `
            import YearBlocks from 0x9b14c9b53986a492
            import NonFungibleToken from 0x9b14c9b53986a492
            
            /// This transaction mints a new YearBlocks NFT and saves it in the signer's Collection
            ///
            transaction (id: UInt64, link: String, allowList: [String], name: String) {
            
              let collectionRef: &{YearBlocks.CollectionPublic}
            
              prepare(signer: AuthAccount) {
                // Get a reference to the signer's YearBlocks Collection
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
          arg(allowList, t.Array),
          arg(name, t.String),
        ],
        limit: 9999,
      });
      fcl.tx(res).subscribe((res) => {
        if (res.status === 4 && res.errorMessage === "") {
          window.alert("Flovatar NFT Minted!");
          setImgData("");
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("err", error);
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
          className={buttonStyle}
          onClick={() =>
            mintYearBlockNFT(
              2,
              "https://drive.google.com/file/d/1ahYRs7qeKMRgZwXMokaGYR6oOtd4Swdk/view?usp",
              [],
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
