import Link from "next/link";
import Image from "next/image";
import React, { useEffect, Dispatch, SetStateAction } from "react";
import routes from "routes";
import * as fcl from "@onflow/fcl";

import "flow/config";

interface HeaderType {
  title: string;
  link: string;
}

function Sidebar({
  expend,
  setExpend,
  headerLink,
  user,
}: {
  expend: boolean;
  setExpend: Dispatch<SetStateAction<boolean>>;
  headerLink: HeaderType[];
  user: any;
}) {
  useEffect(() => {
    if (expend) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [expend]);

  return (
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
                {
                  <div className="buttonHole !text-2xl">
                    {user.addr || "N/A"}
                  </div>
                }
                <button
                  onClick={fcl.unauthenticate}
                  className="w-full buttonPrimary !text-2xl !font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href={routes.login}>
                  <div className="animation text-service-900 text-2xl font-semibold cursor-pointer hover:text-primary-700">
                    Login
                  </div>
                </Link>
                <Link
                  href={routes.createYearBlock}
                  className="w-full buttonPrimary !text-2xl !font-semibold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
