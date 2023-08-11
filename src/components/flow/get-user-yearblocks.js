import * as fcl from "@onflow/fcl";
import { useState } from "react";
import { toast } from "react-toastify";
import OverlayLoading from "components/OverlayLoading";

fcl.authenticate();
function ViewYearblock({ className }) {
  const [loading, setLoading] = useState(false);

  //user address
  async function displayYearblock() {
    const user = fcl.currentUser().authorization;
    console.log(user, "user");
    setLoading(true);
    try {
      const res = await fcl.query({
        cadence: `
            import "YearBlocks" from 0x770b3ddf7db51dd1
            import NonFungibleToken from 0x770b3ddf7db51dd1
            
            /// This script returns the IDs of the KittyVerse NFTs in the Collection of the given Address
              ///
              pub fun main(address: Address): {UInt64: String?} {
              
                  var idsToNames: {UInt64: String?} = {}
                  // Get a reference to the CollectionPublic Capability from the specified Address
                  let collectionPublicRef = getAccount(address).getCapability<&{YearBlocks.CollectionPublic}>(
                    YearBlocks.CollectionPublicPath 
                  ).borrow()
                  ?? panic("Couldn't find CollectionPublic Capability at given Address!")
                  let ids = collectionPublicRef.getIDs()
                  for id in ids {
                    let NFT: &YearBlocks.NFT? = collectionPublicRef.borrowYearBlockNFT(id: id)
                    let name = NFT?.getName()
                    idsToNames.insert(key: id, name)
                  }
              
                  return idsToNames
              }`,
          args: (arg, t) => [arg(user.addr, t.Address)],
      });
      console.log(res);
    } catch (error) {
      console.log("err", fcl.currentUser, error);
      setLoading(false);
      toast("Something is wrong. Try again", {
        type: "error",
      });
    }
  }

  return (
    <>
      {loading && <OverlayLoading />}
      <>
        <button
          className={className}
          onClick={() =>
            displayYearblock()
          }
        >
          View Yearblock
        </button>
      </>
    </>
  );
}

export default ViewYearblock;
