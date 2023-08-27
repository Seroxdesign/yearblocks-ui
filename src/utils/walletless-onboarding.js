export const WALLETLESS_ONBOARDING = `
import MetadataViews from 0x24a3cbe995e718ff
import FungibleToken from 0x24a3cbe995e718ff
import NonFungibleToken from 0x24a3cbe995e718ff

import AccountCreator from 0x24a3cbe995e718ff

import YearBlocks from 0x24a3cbe995e718ff
import Signatures from 0x24a3cbe995e718ff

/// This transaction creates a signer-funded account, adding the given public key. The new account is additionally funded
/// with specified amount of Flow from the signer's account. The newly created account is then configured with resources
/// & Capabilities necessary to play RockPaperScissorsGame Matches.
///
transaction(
        pubKey: String,
        fundingAmt: UFix64,
    ) {

    prepare(signer: AuthAccount) {
        /* --- Create a new account using AccountCreator --- */
        //
        // **NOTE:** AccountCreator is used here to keep the demo app client-side & simple and should be replaced by an
        // an an account creation + database or custodial service in a production environment.
        //
        // Ensure resource is saved where expected
        if signer.type(at: AccountCreator.CreatorStoragePath) == nil {
            signer.save(
                <-AccountCreator.createNewCreator(),
                to: AccountCreator.CreatorStoragePath
            )
        }
        // Ensure public Capability is linked
        if !signer.getCapability<&AccountCreator.Creator{AccountCreator.CreatorPublic}>(
            AccountCreator.CreatorPublicPath).check() {
            // Link the public Capability
            signer.unlink(AccountCreator.CreatorPublicPath)
            signer.link<&AccountCreator.Creator{AccountCreator.CreatorPublic}>(
                AccountCreator.CreatorPublicPath,
                target: AccountCreator.CreatorStoragePath
            )
        }
        // Get a reference to the client's AccountCreator.Creator
        let creatorRef = signer.borrow<&AccountCreator.Creator>(
                from: AccountCreator.CreatorStoragePath
            ) ?? panic("No AccountCreator in signer's account!")

        // Create the account
        let newAccount = creatorRef.createNewAccount(
            signer: signer,
            initialFundingAmount: fundingAmt,
            originatingPublicKey: pubKey
        )

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
        // prepare
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
`


