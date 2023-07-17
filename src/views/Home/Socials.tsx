import Image from "next/image";
import routes from "routes";

const socialMedias = [
  {
    label: "Twitter",
    image: "/images/twitter.svg",
    link: routes.twitter,
  },
  {
    label: "Facebook",
    image: "/images/facebook.svg",
    link: routes.facebook,
  },
  {
    label: "instagram",
    image: "/images/instagram.svg",
    link: routes.instagram,
  },
];

function Socials() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full margins max-w-8xl">
        <div className="w-full">
          <div
            className="bgImage min-h-[300px] sm:min-h-[400px] rounded-xl relative flex flex-col justify-center overflow-hidden"
            style={{ backgroundImage: `url(/images/about-callout.jpg)` }}
          >
            <div className="absolute inset-0 bg-black/40 z-0" />
            <div className="w-full h-full flex flex-col items-center justify-center z-10 margins py-6">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-5 text-center">
                Order Your YearBlocks
              </div>
              <div className="text-sm sm:text-base leading-5 sm:leading-7 font-medium text-white mb-6 text-center">
                With a Jostens yearbook, you’re able to treasure the names,
                faces and events that make this time so special — for always and
                always.
              </div>
              <button className="buttonPrimary">Shope YearBlocks</button>
            </div>
          </div>
        </div>
        <div className="w-full py-12 sm:py-16 lg:py-20">
          <div className="text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] font-bold text-center uppercase mb-8 sm:mb-12 lg:mb-16">
            FOLLOW OUR SOCIALS
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 xl:gap-8">
            {socialMedias.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                className="w-full !h-[220px] flex items-center justify-center animations border-solid border-[1px] border-gray-900/10 hover:border-primary-700 cursor-pointer"
              >
                <Image
                  src={item.image}
                  width={90}
                  height={90}
                  alt={item.label}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Socials;
