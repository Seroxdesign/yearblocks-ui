import Layout from "components/Layout";

function AboutUs() {
  return (
    <Layout>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-8xl margins py-12 sm:py-16 lg:py-24">
          <div className="flex items-center flex-col-reverse md:flex-row gap-y-6 md:gap-y-0 md:gap-x-8 lg:gap-x-12">
            <div
              className="bgImage min-h-[220px] sm:min-h-[320px] md:min-h-[400px] md:max-w-[650px]"
              style={{ backgroundImage: `url(/images/homeHero.webp)` }}
            />
            <div className="w-full flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4">
              <div className="font-bold text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] text-service-900 text-center lg:text-start mb-4">
                About Us
              </div>
              <div className="text-sm sm:text-base lg:text-[22px] leading-6 sm:leading-[28px] lg:leading-[36px] text-service-700 text-center lg:text-start">
                {`YearBlocks, created by the non-profit Steady Studios, is an innovative and groundbreaking solution designed to ensure everyone can preserve their cherished moments.  YearBlocks leverages the power of blockchain technology to store and safeguard these invaluable keepsakes, guaranteeing their longevity and accessibility for generations to come.`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
