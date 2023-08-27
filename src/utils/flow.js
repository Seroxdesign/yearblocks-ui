import * as fcl from "@onflow/fcl";
import { toast } from "react-toastify";
import {WALLETLESS_ONBOARDING} from "./walletless-onboarding";
import { adminAuthorizationFunction } from "./authz-functions";
import { generateKeys } from "./crypto";

const executeScript = async (cadence, args = () => []) => {
  try {
    return await fcl.query({
      cadence: cadence,
      args,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Prepare YearBlock Account Function
async function prepareAccountYearBlock({ setLoading }) {
  setLoading(true);
  try {
    const res = await fcl.mutate({
      cadence: `
          import YearBlocks from 0x24a3cbe995e718ff
          import NonFungibleToken from 0x24a3cbe995e718ff
          
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
      } else {
        setLoading(false);
        toast(res.errorMessage, {
          type: "error",
        });
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
async function mintYearBlockNFT({
  setLoading,
  id,
  link,
  allowList,
  name,
  thumbnail,
  description,
}) {
  const user = fcl.currentUser().authorization;
  console.log(user, "user");
  setLoading(true);
  try {
    const res = await fcl.mutate({
      cadence: `
            import YearBlocks from 0x24a3cbe995e718ff
            import NonFungibleToken from 0x24a3cbe995e718ff
            
            transaction (id: UInt64, link: String, allowList: [String], name: String, thumbnail: String, description: String) {

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
                  token: <-YearBlocks.mintNFT(id: id, link: link, allowList: allowList, name: name, thumbnail: thumbnail, description: description)
                )
              }
            }
            `,

      args: (arg, t) => [
        arg(id, t.UInt64),
        arg(link, t.String),
        arg(allowList, t.Array(t.String)),
        arg(name, t.String),
        arg(thumbnail, t.String),
        arg(description, t.String),
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
    console.log("mintYearBlockNFT....", fcl.currentUser, error);
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
          import YearBlocks from 0x24a3cbe995e718ff
          import NonFungibleToken from 0x24a3cbe995e718ff

          pub struct MetaDataStruct {
            pub var name: String?
            pub var allowList: [String]?
            pub var link: String?   
            pub var description: String?
            pub var thumbnail: String?  
          
            init(_ id: UInt64, _ NFT: &YearBlocks.NFT?) {
              self.description = NFT?.getDescription()
              self.thumbnail = NFT?.getThumbnail()
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
      import Signatures from 0x24a3cbe995e718ff
      import NonFungibleToken from 0x24a3cbe995e718ff
      
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

  setLoading(true);
  try {
    const res = await fcl.mutate({
      cadence: `
            import Signatures from 0x24a3cbe995e718ff
            import NonFungibleToken from 0x24a3cbe995e718ff
            
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

async function attachSignatureToYearblock({
  setLoading,
  signatureID,
  yearblockID,
}) {
  console.log(signatureID, yearblockID, setLoading);
  const user = fcl.currentUser().authorization;
  console.log(user, "user");
  setLoading(true);
  try {
    const res = await fcl.mutate({
      cadence: `
            import YearBlocks from 0x24a3cbe995e718ff
            import Signatures from 0x24a3cbe995e718ff
            import NonFungibleToken from 0x24a3cbe995e718ff
            
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
          }`,

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
    toast("Signature Created!", {
      type: "success",
    });
    console.log(transaction, "transaction", fcl.currentUser);
  } catch (error) {
    console.log("err", fcl.currentUser, error, signatureID, yearblockID);
    setLoading(false);
    toast("Something is wrong. Try again", {
      type: "error",
    });
  }
}

async function prepareAccountHybridCustody({ setLoading }) {
  setLoading(true);
  try {
    const res = await fcl.mutate({
      cadence: `
          import AccountCreator from 0x24a3cbe995e718ff
          
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
      console.log("prepare-account-creator res...", res);
      if (res.status === 4 && res.errorMessage === "") {
        toast("Your account is ready created", {
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

//Id should be a unique number, comment is a string, link is a string url to an img of a signature, name is a string
async function createAccount(
  signerPublicKey,
  initialFundingAmount
) {
  const user = fcl.currentUser().authorization;
  console.log(user, "user");
  console.log('in here')
  const keys = await generateKeys()

  //store the data from here in Firebase:
  const data = {
    address: keys.publicKey,
    privateKey: keys.privateKey,
    proposer: adminAuthorizationFunction,
    payer: adminAuthorizationFunction,
    authorizations: [adminAuthorizationFunction],
    googleAccount: '', //put an account here
    userAddress: '',
  }
  try {
    const res = await fcl.mutate({
      cadence: WALLETLESS_ONBOARDING,

      args: (arg, t) => [
        arg(keys.publicKey, t.String),
        arg(initialFundingAmount, t.UFix64),
      ],
      proposer: adminAuthorizationFunction,
      payer: adminAuthorizationFunction,
      authorizations: [adminAuthorizationFunction],
      limit: 999,
    });
    const transaction = await fcl.tx(res).onceSealed();
    toast("account created", {
      type: "success",
    });
    console.log(transaction, "transaction", fcl.currentUser);
    data.userAddress = transaction.events[5].data.address
    return data
  } catch (error) {
    console.log("err", fcl.currentUser, error);
    toast("Something is wrong. Try again", {
      type: "error",
    });
  }
}

// Retrieves or get all users signatures that have not been attacked with YearBlocks
async function getUserUnattachedSignatures({ setLoading, addr }) {
  setLoading(true);
  try {
    const res = await fcl.query({
      cadence: `
          import Signatures from 0x24a3cbe995e718ff
          import NonFungibleToken from 0x24a3cbe995e718ff

          pub struct MetaDataStruct {
            pub var name: String?
            pub var comment: String?
            pub var signature: String?
           
            init(_ NFT: &Signatures.NFT?) {
              self.name = NFT?.getSignatureName()
              self.comment = NFT?.getSignatureComment()
              self.signature = NFT?.getSignature()
            }
          }
          
          pub fun main(address: Address): {UInt64: MetaDataStruct?} {
              
              var nftDataMap: {UInt64: MetaDataStruct?} = {}
              // Get a reference to the CollectionPublic Capability from the specified Address
              let signaturesCollectionRef = getAccount(address).getCapability<&{Signatures.CollectionPublic}>(
                  Signatures.CollectionPublicPath
              ).borrow() ?? panic("Couldn't find CollectionPublic Capability at given Address!")
          
              // Return the IDs of the NFTs in the KittyHats Collection
              let ids = signaturesCollectionRef.getIDs()
              for id in ids {
                  let NFT: &Signatures.NFT? = signaturesCollectionRef.borrowSignatureNFT(id: id)
                  let comment: String? = NFT?.getSignatureComment()
                  nftDataMap[id] = MetaDataStruct(NFT)
              }
          
              // Return the final mapping
              return nftDataMap
          }`,
      args: (arg, t) => [arg(addr, t.Address)],
    });
    setLoading(false);
    return res;
  } catch (error) {
    setLoading(false);
    console.log("get user unattached signatures error...", error, addr);
    toast("Something is wrong. Try again", {
      type: "error",
    });
    return [];
  }
}

// Get List of all Signatures YearBlocks of user address
async function getYearBlocksSignatures({ setLoading, addr }) {
  setLoading(true);
  try {
    const res = await fcl.query({
      cadence: `
          import YearBlocks from 0x24a3cbe995e718ff
          import NonFungibleToken from 0x24a3cbe995e718ff
          import Signatures from 0x24a3cbe995e718ff

          pub struct MetaDataStruct {
            pub var name: String?
            pub var comment: String?
            pub var signature: String?
           
            init(_ NFT: &Signatures.NFT?) {
              self.name = NFT?.getSignatureName()
              self.comment = NFT?.getSignatureComment()
              self.signature = NFT?.getSignature()
            }
          }
          
          pub fun main(address: Address):{String: [MetaDataStruct]?} {
          
              // Assign a return mapping
              let yearblocksAndSignatures:{String: [MetaDataStruct]} = {"start": []}
              
              // Get a reference to the CollectionPublic Capability from the specified Address
              let collectionPublicRef = getAccount(address).getCapability<&{YearBlocks.CollectionPublic}>(
                  YearBlocks.CollectionPublicPath
              ).borrow()
              ?? panic("Couldn't find CollectionPublic Capability at given Address!")
          
              for id in collectionPublicRef.getIDs() {
                  let yearblockNFTRef: &YearBlocks.NFT = collectionPublicRef.borrowYearBlockNFT(id: id)!
                  // Assign our initial return mapping values
                  let name: String = yearblockNFTRef.getName()
                  var sig: String? = nil
                  // Reference the KittyHats attachment if there is one
                  if let attachment = yearblockNFTRef[Signatures.SignatureAttachment] {
                  // Get the name of the hat in the attachment if one exists
                  yearblocksAndSignatures[name] = []
                  if let attachment = yearblockNFTRef[Signatures.SignatureAttachment] {
                      // Get the name of the hat in the attachment if one exists
                    for _id in attachment.getIDsFromAttachment() {
                        let sig: &Signatures.NFT? = attachment.borrowSignature(id: _id) 
                        yearblocksAndSignatures[name]?.append(MetaDataStruct(sig))
                    }
                  }
                  }
              }
          
              // Return the final mapping
              return yearblocksAndSignatures
          
          }`,
      args: (arg, t) => [arg(addr, t.Address)],
    });
    setLoading(false);
    console.log("getYearBlocksSignatures.....", res);
    return res;
  } catch (error) {
    setLoading(false);
    console.log("get yearblocks signatures...", error);
    toast("Something is wrong. Try again", {
      type: "error",
    });
    return [];
  }
}

export {
  createAccount,
  prepareAccountHybridCustody,
  attachSignatureToYearblock,
  mintYearBlockNFT,
  prepareAccountYearBlock,
  getUserYearBlock,
  prepareAccountSignature,
  mintSignatureNFT,
  executeScript,
  getUserUnattachedSignatures,
  getYearBlocksSignatures,
};
