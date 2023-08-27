import Link from "next/link";
import { getUserUnattachedSignatures } from "utils/flow";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

function DigiSigsFeature() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ loggedIn: false, addr: undefined });

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, [user.addr]);

  //Use this to get connected user's unattached signatures
  const getData = async () => {
    const response = await getUserUnattachedSignatures({
      setLoading,
      addr: user.addr,
    });
    console.log("user sigs list...", response);
  };

  return (
    <div className="w-full flex justify-center my-8 lg:my-12">
      <div className="w-full max-w-8xl margins flex flex-col gap-y-8 sm:gap-y-12 lg:gap-y-16">
        <div className="flex items-center flex-col-reverse md:flex-row gap-y-6 md:gap-y-0 md:gap-x-8 lg:gap-x-12">
          <div
            className="bgImage min-h-[220px] sm:min-h-[320px] md:min-h-[400px] md:max-w-[650px]"
            style={{ backgroundImage: `url(/images/find.webp)` }}
          />
          <div className="w-full flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4">
            <div className="font-bold text-2xl sm:text-3xl md:text-4xl leading-[32px] sm:leading-[36px] md:leading-[50px] text-service-900">
              Create My DigiSigs
            </div>
            <div className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-600 mb-2">
              {`Using the platform, you can easily capture your digital signature, allowing you to personalize your YearBlocks and leave a unique mark to commemorate your school memories.`}
            </div>

            <div className="flex items-center gap-x-4">
              <Link href="/create-digisigs" className="buttonPrimary max-w-fit">
                Create My DigiSigs
              </Link>
              <Link
                href={`/digisigs/${user.addr}`}
                className="buttonPrimary"
                onClick={getData}
              >
                View My DigiSigs
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-y-6 md:gap-y-0 md:gap-x-8 lg:gap-x-12">
          <div className="w-full flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4">
            <div className="font-bold text-2xl sm:text-3xl md:text-4xl leading-[32px] sm:leading-[36px] md:leading-[50px] text-service-900">
              Mint My DigiSigs
            </div>
            <div className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
              {`After capturing your DigiSigs, you can securely mint it to the blockchain, ensuring its immutability and authenticity for long-term preservation and verification purposes.`}
            </div>
          </div>
          <div
            className="bgImage min-h-[220px] sm:min-h-[320px] md:min-h-[400px] md:max-w-[650px]"
            style={{ backgroundImage: `url(/images/help.webp)` }}
          />
        </div>
        <div className="flex items-center flex-col-reverse md:flex-row gap-y-6 md:gap-y-0 md:gap-x-8 lg:gap-x-12">
          <div
            className="bgImage min-h-[220px] sm:min-h-[320px] md:min-h-[400px] md:max-w-[650px]"
            style={{ backgroundImage: `url(/images/help.webp)` }}
          />
          <div className="w-full flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4">
            <div className="font-bold text-2xl sm:text-3xl md:text-4xl leading-[32px] sm:leading-[36px] md:leading-[50px] text-service-900">
              Sign with My DigiSigs
            </div>
            <div className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
              {`Using DigiSigs, you can easily sign and comment on a classmate's YearBlock, adding your unique digital signature to their memories.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigiSigsFeature;
