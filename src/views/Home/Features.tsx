import React from "react";

function Features() {
  return (
    <div className="w-full flex justify-center bg-gray-50">
      <div className="w-full margins max-w-8xl py-12 sm:py-16 lg:py-24 flex flex-col gap-y-10 sm:gap-y-12">
        <div className="flex flex-col-reverse sm:grid grid-cols-2 items-center gap-y-4 sm:gap-x-12">
          <div
            className="bgImage min-h-[250px] sm:min-h-[300px] lg:min-h-[350px]"
            style={{ backgroundImage: `url(/images/create.webp)` }}
          />
          <div className="w-full flex flex-col items-center">
            <div className="font-bold text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] text-service-900 uppercase mb-2">
              CREATE
            </div>
            <div className="text-sm sm:text-base lg:text-[22px] leading-6 sm:leading-[28px] lg:leading-[34px] text-service-700 text-center">
              {`YearBlocks revolutionizes yearbooks with blockchain technology, enabling schools to mint on Flow, offering walletless onboarding, and mobile-first accessibility, empowering students with secure ownership and lasting memories.`}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:grid grid-cols-2 items-center gap-y-4 sm:gap-x-12">
          <div className="w-full flex flex-col items-center">
            <div className="font-bold text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] text-service-900 uppercase mb-2">
              DISTRIBUTE
            </div>
            <div className="text-sm sm:text-base lg:text-[22px] leading-6 sm:leading-[28px] lg:leading-[34px] text-service-700 text-center">
              {`Schools benefit from YearBlocks' ease of distribution as it eliminates physical copies, simplifies yearbook access for students and parents, reduces costs, and ensures secure and convenient digital delivery of yearbooks through the Flow blockchain.`}
            </div>
          </div>
          <div
            className="bgImage min-h-[250px] sm:min-h-[300px] lg:min-h-[350px]"
            style={{ backgroundImage: `url(/images/distribute.jpeg)` }}
          />
        </div>
        <div className="flex flex-col-reverse sm:grid grid-cols-2 items-center gap-y-4 sm:gap-x-12">
          <div
            className="bgImage min-h-[250px] sm:min-h-[300px] lg:min-h-[350px]"
            style={{ backgroundImage: `url(/images/sign.webp)` }}
          />
          <div className="w-full flex flex-col items-center">
            <div className="font-bold text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] text-service-900 uppercase mb-2">
              SIGN
            </div>
            <div className="text-sm sm:text-base lg:text-[22px] leading-6 sm:leading-[28px] lg:leading-[34px] text-service-700 text-center">
              {`Signing a YearBlock digitally brings benefits such as streamlined verification, enhanced security, and ease of access. It simplifies the signing process, eliminates the need for physical signatures, and ensures the integrity and authenticity of the yearbook content in a convenient and efficient manner.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
