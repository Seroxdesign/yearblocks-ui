import * as fcl from "@onflow/fcl";
import OverlayLoading from "components/OverlayLoading";
import { useState } from "react";
import { toast } from "react-toastify";

function PrepareAccountYearBlock({ className = "buttonPrimary" }) {
  const [loading, setLoading] = useState(false);

  async function prepare() {
    setLoading(true);
    try {
      const res = await fcl.mutate({
        cadence: `
        import YearBlocks from 0x770b3ddf7db51dd1
        import NonFungibleToken from 0x770b3ddf7db51dd1
        
        /// This transaction sets up the signer with a YearBlocks Collection
        ///
        transaction {
          prepare(signer: AuthAccount) {
            // Check if a Collection is already in Storage where expected
            if signer.type(at: YearBlocks.CollectionStoragePath) == nil {
              // Create and save
              signer.save(<-YearBlocks.createEmptyCollection(), to: YearBlocks.CollectionStoragePath)
            }
        
            // Prepare to link PublicPath
            signer.unlink(YearBlocks.CollectionPublicPath)
            // Link public Capabilities
            signer.link<&{YearBlocks.CollectionPublic}>(
              YearBlocks.CollectionPublicPath,
              target: YearBlocks.CollectionStoragePath
            )
        
            // Prepare to link PrivatePath
            signer.unlink(YearBlocks.CollectionPrivatePath)
            // Link private Capabilities
            signer.link<&{NonFungibleToken.Receiver}>(
              YearBlocks.CollectionPrivatePath,
              target: YearBlocks.CollectionStoragePath
            )
          }
        }`,
      });
      fcl.tx(res).subscribe((res) => {
        console.log("prepare-account-yearblock res...", res);
        if (res.status === 4 && res.errorMessage === "") {
          toast("Your account is ready to create YearBlocks!", {
            type: "success",
          });
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("err", error);
      toast("Something is wrong. Try again", {
        type: "error",
      });
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <OverlayLoading />}
      <div>
        {/* <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={e => uploadImg(e)}
        style={{ padding: '1em' }}
      /> */}
        <button onClick={() => prepare()} className={className}>
          Prepare Your Account
        </button>
        {/*     <img src={imgData} alt="NFT" style={{ marginTop: '2em' }} /> */}
      </div>
    </>
  );
}

export default PrepareAccountYearBlock;
