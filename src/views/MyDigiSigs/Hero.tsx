function Hero() {
  return (
    <div
      className="bgImage min-h-[220px] sm:min-h-[380px] md:min-h-[480px] lg:min-h-[600px] relative flex flex-col justify-center overflow-hidden"
      style={{ backgroundImage: `url(/images/digiSign.webp)` }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="w-full h-full flex flex-col items-center justify-center z-10 margins py-6">
        <div className="text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] font-bold text-white text-center">
          My DigiSigs
        </div>
      </div>
    </div>
  );
}

export default Hero;
