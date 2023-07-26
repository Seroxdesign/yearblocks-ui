import * as fcl from "@onflow/fcl";
import { useState } from "react";

function PrepareAccountYearBlock() {
  const [loading, setLoading] = useState(false);

  console.log("fcl....", fcl);

  async function prepare() {
    setLoading(true);
    try {
      const res = await fcl.mutate({
        cadence: `
        import YearBlocks from 0x9b14c9b53986a492
        import NonFungibleToken from 0x9b14c9b53986a492
        
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
            signer.link<&{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, YearBlocks.CollectionPublic}>(
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
        console.log(res);
        if (res.status === 4 && res.errorMessage === "") {
          window.alert("Flovatar NFT Minted!");
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("err", error);
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "1em" }}>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#303030",
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "2",
          }}
        >
          <h2 style={{ color: "white", marginTop: "40vh" }}>
            {" "}
            Preparing your account...{" "}
          </h2>
        </div>
      ) : (
        ""
      )}
      <h1>Prepare your account!</h1>
      <main>
        <div style={{ marginTop: "1em", width: "100%" }}>
          {/*          <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={e => uploadImg(e)}
                  style={{ padding: '1em' }}
                /> */}
          <button
            onClick={() => prepare()}
            style={{
              border: "none",
              width: "100px",
              backgroundColor: loading ? "gray" : "#1B5BD3",
              color: "white",
              padding: "5px",
              textAlign: "center",
              marginRight: "10px",
            }}
          >
            Prepare Your Account
          </button>
        </div>
      </main>
      {/*     <img src={imgData} alt="NFT" style={{ marginTop: '2em' }} /> */}
    </div>
  );
}

export default PrepareAccountYearBlock;
