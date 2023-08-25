import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosMenu, IoIosArrowDown } from "react-icons/io";
import routes from "routes";
import * as fcl from "@onflow/fcl";
import { Menu, Transition } from "@headlessui/react";
import "flow/config";
import { useSession, signOut } from "next-auth/react";

export interface HeaderType {
  title: string;
  link: string;
}

const userLinks = [
  {
    label: "Create New YearBlocks",
    link: routes.createYearBlock,
  },
  {
    label: "Create Signature",
    link: routes.createDigiSigns,
  },
  {
    label: "Sign YearBlocks",
    link: routes.createSignYearBlock,
  },
];

function Header() {
  const [user, setUser] = useState({ loggedIn: null, addr: null });
  const headerLink: HeaderType[] = [
    {
      title: "My YearBlocks",
      link: `${routes.myYearBlock}/${user.addr}`,
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

  const [expend, setExpend] = useState(false);

  const { data: session, status } = useSession();

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

  const handleSignUpButton = () => {
    setExpend(false);
    fcl.signUp();
  };

  const handleLogoutButton = () => {
    signOut();
    fcl.unauthenticate();
  };

  const UserMenu = ({ buttonClassName }: { buttonClassName?: string }) => (
    <div className="relative">
      <Menu as="div">
        <Menu.Button className="flex items-center cursor-pointer">
          <div
            className="bgImage !h-[46px] !w-[46px] rounded-full  bg-gray-100"
            style={{ backgroundImage: `url(${session?.user?.image})` }}
          ></div>
          <div className="px-2 text-base font-semibold text-service-900">
            {session?.user?.name}
          </div>
          <IoIosArrowDown className="-ml-1 h-5 w-5 text-service-900" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="min-w-[240px] w-full min-w-56 absolute right-0 mt-2  origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-2 py-2">
              <Menu.Item>
                {({ active }) => (
                  <>
                    {user?.loggedIn && user?.addr ? (
                      <button className="w-full py-2 px-2 border-solid border-[1px] border-primary-700 text-primary-700 text-base rounded-full">
                        {user?.addr}
                      </button>
                    ) : (
                      <button
                        className="w-full py-2 px-2 border-solid border-[1px] border-primary-700 text-primary-700 text-base rounded-full"
                        onClick={handleSignUpButton}
                      >
                        Connect Wallet
                      </button>
                    )}
                  </>
                )}
              </Menu.Item>
            </div>
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
                      } group flex w-full items-center rounded-md px-3.5 py-2 text-base animation`}
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
                  <>
                    {user?.loggedIn && user?.addr && (
                      <button
                        className={`group flex w-full items-center rounded-md px-3.5 py-2 text-base text-gray-900 hover:text-white hover:bg-primary-700`}
                        onClick={() => fcl.unauthenticate()}
                      >
                        Disconnect Wallet
                      </button>
                    )}
                    <button
                      className={`group flex w-full items-center rounded-md px-3.5 py-2 text-base text-gray-900 hover:text-white hover:bg-primary-700`}
                      onClick={handleLogoutButton}
                    >
                      Logout
                    </button>
                  </>
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
          {session?.user ? (
            <div className="flex items-center gap-x-4">
              <UserMenu />
            </div>
          ) : (
            <div className="flex items-center gap-x-6 xl:gap-x-8">
              <Link href={"/login"} className="buttonPrimary">
                Login / Sign Up
              </Link>
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
              {session?.user ? (
                <>
                  <UserMenu buttonClassName="!text-2xl !font-semibold" />
                  <button
                    onClick={handleLogoutButton}
                    className="w-full buttonPrimary !text-2xl !font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href={"/login"}
                  className="animation text-service-900 text-2xl font-semibold cursor-pointer hover:text-primary-700"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
