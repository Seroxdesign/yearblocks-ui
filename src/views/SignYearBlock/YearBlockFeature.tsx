import React from "react";

function YearBlockFeature() {
  return (
    <div className="w-full flex justify-center my-8 lg:my-12">
      <div className="w-full max-w-8xl margins flex flex-col gap-y-8 sm:gap-y-12 lg:gap-y-16">
        <div className="flex items-center flex-col md:flex-row gap-y-6 md:gap-y-0 md:gap-x-8 lg:gap-x-12">
          <div className="w-full flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4">
            <div className="font-bold text-2xl sm:text-3xl md:text-4xl leading-[32px] sm:leading-[36px] md:leading-[50px] text-service-900">
              Find a classmate’s YearBlock
            </div>
            <div className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
              {`Finding a classmate's YearBlock to request a signature is
              effortless with DigiSigs—simply enter their school-provided email
              address, and the platform will quickly locate their YearBlock,
              allowing you to request a signature and preserve your shared
              memories.`}
            </div>
          </div>
          <div
            className="bgImage min-h-[220px] sm:min-h-[320px] md:min-h-[400px] md:max-w-[650px]"
            style={{ backgroundImage: `url(/images/find.webp)` }}
          />
        </div>
        <div className="flex items-center flex-col-reverse md:flex-row gap-y-6 md:gap-y-0 md:gap-x-8 lg:gap-x-12">
          <div
            className="bgImage min-h-[220px] sm:min-h-[320px] md:min-h-[400px] md:max-w-[650px]"
            style={{ backgroundImage: `url(/images/help.webp)` }}
          />
          <div className="w-full flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4">
            <div className="font-bold text-2xl sm:text-3xl md:text-4xl leading-[32px] sm:leading-[36px] md:leading-[50px] text-service-900">
              Request for classmate to sign your YearBlock
            </div>
            <div className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
              {`Requesting a classmate to sign your YearBlock is a breeze with DigiSigs—simply enter their school-provided email address, and the platform will facilitate the process, making it easy to invite them to leave their personalized mark on your cherished memories.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearBlockFeature;
