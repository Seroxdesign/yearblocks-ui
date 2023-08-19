import * as fcl from "@onflow/fcl";
import { toast } from "react-toastify";

// Prepare YearBlock Account Function
async function prepareAccountYearBlock({ setLoading }) {
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
    console.log("prepare account yearblock errror....", error);
    // toast("Something is wrong. Try again", {
    //   type: "error",
    // });
    setLoading(false);
  }
}

// id = 1 type number
// allowList = []
// name = 'year-2023' type string
// thumbnail = https://drive.google.com/file/d/1ahYRs7qeKMRgZwXMokaGYR6oOtd4Swdk/view?usp
// link/media = https://bafybeicov5maw7ztte6rz6inrlovmkcpxfsbej3ohqvqk7ycv2hxlsbd5m.ipfs.nftstorage.link/
async function mintYearBlockNFT({ setLoading, id, link, allowList, name }) {
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
    toast("YearBlock Created!", {
      type: "success",
    });
  } catch (error) {
    console.log("err", fcl.currentUser, error);
    setLoading(false);
    toast("Something is wrong. Try again", {
      type: "error",
    });
  }
}

// Get User YearBlocks
async function getUserYearBlock({ setLoading, addr }) {
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
      args: (arg, t) => [arg(addr, t.Address)],
    });
    setLoading(false);
    return res;
  } catch (error) {
    setLoading(false);
    console.log("get user YearBlock error...", error);
    toast("Something is wrong. Try again", {
      type: "error",
    });
    return [];
  }
}

// Prepare Account for Signature
async function prepareAccountSignature({ setLoading }) {
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

//Id should be a unique number, comment is a string, link is a string url to an img of a signature, name is a string
async function mintSignatureNFT({ setLoading, id, comment, link, name }) {
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
    setLoading(false);
    toast("Signature Created!", {
      type: "success",
    });
    console.log(transaction, "transaction", fcl.currentUser);
  } catch (error) {
    console.log("err", fcl.currentUser, error);
    setLoading(false);
    toast("Something is wrong. Try again", {
      type: "error",
    });
  }
}

export {
  mintYearBlockNFT,
  prepareAccountYearBlock,
  getUserYearBlock,
  prepareAccountSignature,
  mintSignatureNFT,
};
