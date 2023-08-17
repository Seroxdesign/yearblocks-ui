import Link from "next/link";

function Hero() {
  return (
    <div className="w-full relative">
      <div className="w-full h-8 sm:h-10 bg-service-900 flex items-center justify-center">
        <Link
          href="/"
          className="font-semibold text-sm sm:text-base text-white underline"
        >
          ORDER TODAY!
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-8xl margins py-12 sm:py-16 lg:py-24 flex items-center justify-between flex-col lg:flex-row gap-y-10 gap-x-10">
          <div className="flex-1 flex flex-col max-w-[460px]">
            <div className="font-bold text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] text-service-900 text-center lg:text-start mb-4 lg:mb-5">
              Introducing YearBlocks
            </div>
            <div className="text-sm sm:text-base lg:text-[22px] leading-6 sm:leading-[28px] lg:leading-[34px] text-service-700 text-center lg:text-start mb-8 xl:mb-12">
              Empowering schools and students worldwide with blockchain
              technology for seamless yearbook minting, secure ownership, and
              lasting memories.
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-x-0 sm:gap-x-3 lg:gap-x-5">
              <Link href="/create-yearblock" className="buttonPrimary">
                Claim my YearBlock
              </Link>
            </div>
          </div>
          <div
            className="bgImage min-h-[250px] sm:min-h-[320px] max-w-[650px]"
            style={{ backgroundImage: `url(/images/homeHero.webp)` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
