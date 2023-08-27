import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useEffect, useCallback, useState } from "react";
import * as fcl from "@onflow/fcl";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { useSession, getProviders, signIn } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { generateKeys } from "utils/crypto";
import "flow/config";
import { createAccount, prepareAccountHybridCustody } from "utils/flow";

function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  if (session?.user) {
    router.push("/");
  }

  const executeScript = useCallback(
    async (cadence: string, args: any = () => []) => {
      try {
        return await fcl.query({
          cadence: cadence,
          args,
        });
      } catch (error) {
        console.log("executeScript error....", error);
      }
    },
    []
  );

  const getAddress = async (adminAddress: any) => {
    const tx = await createAccount('ee6b1013ceba221deebaaaba9bcbd6810196f0db85ef7c3c538eb0b1930be5785c413c39663b543f6ae2d69620a71539d32b6af2587534e4286aa61d2710c352', 2.5)
    await console.log(tx, 'tx')
  };

  return (
    <div className="flex min-h-screen flex-1">
      <div className="flex flex-1 flex-col px-5 py-10 sm:px-6 lg:flex-none lg:px-24 xl:px-20">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <div className="-ml-7">
                <Link href={"/"}>
                  <Image
                    src="/images/logo.svg"
                    width={242}
                    height={242}
                    alt="Logo"
                  />
                </Link>
              </div>

              <h2 className="mt-8 text-2xl sm:text-3xl font-bold leading-8 sm:leading-10 tracking-tight text-gray-900">
                Welcome to YearBlocks
              </h2>
              <p className="mt-3 text-base leading-7 text-gray-500">
                Login or sign up to join in the fun.
              </p>
            </div>

            <div className="mt-10">
              <button
                className="flex w-full items-center justify-center gap-3 rounded-md animation bg-blue-600 hover:bg-blue-700 px-3 py-1.5 h-[44px] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                onClick={() => signIn("google")}
              >
                <div className="flex items-center justify-center h-full w-8 bg-white rounded-[7px]">
                  <Image
                    src="/images/google.svg"
                    width={24}
                    height={24}
                    alt="icon"
                  />
                </div>

                <span className="text-sm font-semibold leading-6">
                  Sign in with Google
                </span>
              </button>

              <button
                className="buttonPrimary mt-8 w-full"
                onClick={getAddress}
              >
                Get Wallet Address
              </button>
            </div>
          </div>
        </div>
        <div className="text-sm lg:text-base text-center text-service-900 leading-5 lg:leading-[24px]">
          {`© ${new Date().getFullYear()} YearBlocks, Inc. All rights reserved.`}
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/login.webp"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
