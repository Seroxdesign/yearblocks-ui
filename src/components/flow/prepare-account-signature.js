import * as fcl from "@onflow/fcl";
import { useState } from "react";
import { toast } from "react-toastify";
import OverlayLoading from "components/OverlayLoading";

function PrepareAccountSignature({ className = "buttonPrimary" }) {
  const [loading, setLoading] = useState(false);

  console.log("fcl....", fcl);

  async function prepare() {
    setLoading(true);
    try {
      const res = await fcl.mutate({
        cadence: `
        import Signatures from 0x770b3ddf7db51dd1
        import NonFungibleToken from 0x770b3ddf7db51dd1
        
        /// This transaction sets up the signer with a Signatures Collection
        ///
        transaction {
          prepare(signer: AuthAccount) {
            // Check if a Collection is already in Storage where expected
            if signer.type(at: Signatures.CollectionStoragePath) == nil {
              // Create and save
              signer.save(<-Signatures.createEmptyCollection(), to: Signatures.CollectionStoragePath)
              
              // Prepare to link PublicPath
              signer.unlink(Signatures.CollectionPublicPath)
              // Link public Capabilities
              signer.link<&{Signatures.CollectionPublic}>(
                Signatures.CollectionPublicPath,
                target: Signatures.CollectionStoragePath
              )
        
              // Prepare to link PrivatePath
              signer.unlink(Signatures.ProviderPrivatePath)
              // Link private Capabilities
              signer.link<&{NonFungibleToken.Receiver}>(
                Signatures.ProviderPrivatePath,
                target: Signatures.CollectionStoragePath
              )
            }
          }
        }
        `,
      });
      fcl.tx(res).subscribe((res) => {
        console.log("prepare account signature res...", res);
        if (res.status === 4 && res.errorMessage === "") {
          toast("Account is ready to mint a Signature!", {
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
      <main>
        {/* <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={e => uploadImg(e)}
          style={{ padding: '1em' }}
        /> */}
        <button onClick={() => prepare()} className={className}>
          Prepare Your Signatures Account
        </button>
      </main>
      {/*<img src={imgData} alt="NFT" style={{ marginTop: '2em' }} /> */}
    </>
  );
}

export default PrepareAccountSignature;
