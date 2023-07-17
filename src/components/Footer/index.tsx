import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagramAlt,
} from "react-icons/bi";
import routes from "routes";

function Footer() {
  const linksLeft = [
    {
      label: "My YearBlocks",
      link: routes.myYearBlock,
    },
    {
      label: "My DigiSigs",
      link: routes.myDigiSigs,
    },
  ];

  const linksRight = [
    {
      label: "Sign a YearBlock",
      link: routes.signYearBlock,
    },
    {
      label: "About Us",
      link: routes.aboutUs,
    },
  ];

  const socialLinks = [
    {
      label: "Twitter",
      icon: <BiLogoTwitter />,
      link: routes.twitter,
    },
    {
      label: "Facebook",
      icon: <BiLogoFacebook />,
      link: routes.facebook,
    },
    {
      label: "Instagram",
      icon: <BiLogoInstagramAlt />,
      link: routes.instagram,
    },
  ];

  return (
    <div className="w-full margins flex justify-center">
      <div className="w-full max-w-8xl py-8 sm:py-10 lg:py-16 flex items-center">
        <div className="w-full flex flex-col">
          <div className="flex-1 items-center justify-center mb-10 flex lg:hidden">
            <Link href={routes.home}>
              <img
                src="/images/logo.svg"
                alt="logo"
                className="h-[28px] sm:h-[38px] cursor-pointer"
              />
            </Link>
          </div>
          <div className="w-full flex items-center flex-col lg:flex-row border-b-[1px] border-solid border-gray-900/10 pb-8 mb-8 lg:mb-20">
            <div className="flex-1 flex items-center flex-col lg:flex-row gap-8 lg:gap-[100px] xl:gap-[170px] mb-8 lg:mb-0">
              {linksLeft.map((item, index) => (
                <Link key={index} href={item.link}>
                  <div className="text-service-900 text-sm sm:text-base font-semibold hover:text-primary-700 cursor-pointer animation">
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex-1 items-center justify-center hidden lg:flex lg:mr-8">
              <Link href={"/"}>
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="h-[40px] cursor-pointer"
                />
              </Link>
            </div>
            <div className="flex-1 flex items-center flex-col lg:flex-row gap-8 lg:gap-[100px] xl:gap-[170px]">
              {linksRight.map((item, index) => (
                <Link key={index} href={item.link}>
                  <div className="text-service-900 text-sm sm:text-base font-semibold hover:text-primary-700 cursor-pointer animation">
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex items-center gap-2 lg:gap-[18px] mb-5 lg:mb-[30px]">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 rounded-full flex items-center justify-center text-service-900 bg-gray-100 cursor-pointer animation hover:bg-primary-700 hover:text-white text-base sm:text-[22px]"
                >
                  {item.icon}
                </a>
              ))}
            </div>
            <div className="text-sm lg:text-base text-service-900 leading-5 lg:leading-[24px]">
              {`© ${new Date().getFullYear()} YearBlocks, Inc. All rights reserved.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
