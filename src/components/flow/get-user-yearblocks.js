import * as fcl from "@onflow/fcl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import OverlayLoading from "components/OverlayLoading";

fcl.authenticate();
function ViewYearblock(className = "buttonPrimary") {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ loggedIn: false, addr: undefined });

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, [user.addr]);
  console.log(user.addr);
  //user address
  async function displayYearblock(addr) {
    setLoading(true);
    try {
      const res = await fcl.query({
        cadence: `
            import YearBlocks from 0x770b3ddf7db51dd1
            import NonFungibleToken from 0x770b3ddf7db51dd1

            pub struct MetaDataStruct {
              pub var name: String?
              pub var allowList: [String]?
              pub var link: String?
            
              init(_ id: UInt64, _ NFT: &YearBlocks.NFT?) {
            
                self.name = NFT?.getName()
                self.allowList = NFT?.getAllowList()
                self.link = NFT?.getLink()
              }
            }
            /// This script returns the IDs of the KittyVerse NFTs in the Collection of the given Address
            ///
            pub fun main(address: Address): {UInt64: MetaDataStruct} {
            
                var nftDataMap: {UInt64: MetaDataStruct} = {}
                // Get a reference to the CollectionPublic Capability from the specified Address
                let collectionPublicRef = getAccount(address).getCapability<&{YearBlocks.CollectionPublic}>(
                  YearBlocks.CollectionPublicPath 
                ).borrow()
                ?? panic("Couldn't find CollectionPublic Capability at given Address!")
                let ids = collectionPublicRef.getIDs()
                for id in ids {
                  let NFT: &YearBlocks.NFT? = collectionPublicRef.borrowYearBlockNFT(id: id)
                  nftDataMap[id] = MetaDataStruct(id, NFT)
                }
            
                return nftDataMap
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
        <button onClick={() => displayYearblock()} className={className}>
          View Yearblock
        </button>
      </>
    </>
  );
}

export default ViewYearblock;
