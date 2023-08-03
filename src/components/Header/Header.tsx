import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosMenu, IoIosArrowDown } from "react-icons/io";
import routes from "routes";
import * as fcl from "@onflow/fcl";
import { Menu, Transition } from "@headlessui/react";
import "flow/config";
// import { config } from "@onflow/fcl";

export interface HeaderType {
  title: string;
  link: string;
}

const headerLink: HeaderType[] = [
  {
    title: "My YearBlocks",
    link: routes.myYearBlock,
  },
  {
    title: "My DigiSigs",
    link: routes.myDigiSigs,
  },
  {
    title: "Sign a YearBlock",
    link: routes.signYearBlock,
  },
  {
    title: "About Us",
    link: routes.aboutUs,
  },
];

const userLinks = [
  {
    label: "Create New YearBlocks",
    link: routes.createYearBlock,
  },
  {
    label: "Create Sign YearBlocks",
    link: routes.createSignYearBlock,
  },
  {
    label: "Create New DigiSigs",
    link: routes.createDigiSigns,
  },
];

function Header() {
  const [expend, setExpend] = useState(false);
  const [user, setUser] = useState({ loggedIn: null, addr: null });

  useEffect(() => {
    
    fcl.currentUser.subscribe(setUser);
  
  }, []);

  useEffect(() => {
    if (expend) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [expend]);

  const handleLoginButton = () => {
    setExpend(false);
    fcl.logIn();
  };

  const handleSignUpButton = () => {
    setExpend(false);
    fcl.signUp();
  };

  const UserMenu = ({ buttonClassName }: { buttonClassName?: string }) => (
    <div className="relative">
      <Menu as="div">
        <div>
          <Menu.Button className={`buttonHole ${buttonClassName}`}>
            {user.addr}
            <IoIosArrowDown className="ml-2 -mr-1 h-5 w- text-primary-700" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="w-full min-w-56 absolute left-0 right-0 mt-2  origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {userLinks.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link
                      href={item.link}
                      className={`${
                        active
                          ? "bg-primary-700 text-white"
                          : "text-service-900"
                      } group flex w-full items-center rounded-md px-3.5 py-2 text-base`}
                    >
                      {item.label}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary-700 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-3.5 py-2 text-base`}
                    onClick={() => fcl.unauthenticate()}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );

  return (
    <>
      <div className="bg-white w-full sticky left-0 right-0 top-0 hidden lg:flex justify-center h-20 border-solid border-b-[1px] border-gray-900/10 z-[999]">
        <div className="w-full max-w-8xl margins flex items-center">
          <div className="flex-1 flex items-center gap-x-4 xl:gap-x-8">
            <Link href={routes.home} className="-ml-7">
              <Image
                src="/images/logo.svg"
                width={224}
                height={224}
                alt="Logo"
              />
            </Link>
            <div className="flex items-center gap-x-6 xl:gap-x-8">
              {headerLink.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="animation text-base font-semibold text-service-900 hover:text-primary-700"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          {user.loggedIn && user.addr ? (
            <div className="flex items-center gap-x-4">
              <UserMenu />
            </div>
          ) : (
            <div className="flex items-center gap-x-6 xl:gap-x-8">
              <button
                onClick={handleLoginButton}
                className="animation text-base font-semibold text-service-900 hover:text-primary-700"
              >
                Login
              </button>
              <button onClick={handleSignUpButton} className="buttonPrimary">
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Small Header */}
      <div className="bg-white w-full sticky left-0 right-0 top-0 flex lg:hidden justify-center h-20 border-solid border-b-[1px] border-gray-900/10 z-[999]">
        <div className="w-full max-w-8xl margins flex items-center">
          <div className="flex-1 flex items-center gap-x-4 xl:gap-x-8">
            <Link href={routes.home} className="-ml-7">
              <Image
                src="/images/logo.svg"
                width={200}
                height={200}
                alt="Logo"
              />
            </Link>
          </div>
          <button
            className="text-[34px] text-service-900 cursor-pointer"
            onClick={() => setExpend(!expend)}
          >
            <IoIosMenu />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-white fixed inset-0 z-[1000] flex backdrop-blur-[10px] animation-3 hide ${
          expend ? "show expend" : ""
        }`}
        style={{
          right: `${expend ? "0px" : `calc(-100% + -200px)`}`,
        }}
      >
        <div className="w-full h-full bg-service-bg relative margins animation-2">
          <div className="w-full flex items-center h-[80px] absolute left-0 right-0 margins">
            <div className="flex-1 flex items-center">
              <Link href={routes.home} className="-ml-8">
                <Image
                  src="/images/logo.svg"
                  width={200}
                  height={200}
                  alt="Logo"
                />
              </Link>
            </div>
            <div
              className="h-[40px] w-[40px] text-service-900 flex items-center justify-center text-[54px] font-[300] cursor-pointer"
              onClick={() => setExpend(false)}
            >
              &times;
            </div>
          </div>
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="max-w-fit flex flex-col justify-center items-center gap-10">
              {headerLink.map((item, idx) => (
                <Link href={item.link} key={idx}>
                  <div className="animation text-service-900 text-2xl font-semibold cursor-pointer hover:text-primary-700">
                    {item.title}
                  </div>
                </Link>
              ))}
              {user.loggedIn && user.addr ? (
                <>
                  <UserMenu buttonClassName="!text-2xl !font-semibold" />
                  <button
                    onClick={fcl.unauthenticate}
                    className="w-full buttonPrimary !text-2xl !font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLoginButton}
                    className="animation text-service-900 text-2xl font-semibold cursor-pointer hover:text-primary-700"
                  >
                    Login
                  </button>

                  <button
                    onClick={handleSignUpButton}
                    className="w-full buttonPrimary !text-2xl !font-semibold"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
