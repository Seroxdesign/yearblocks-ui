import Link from "next/link";
import Image from "next/image";

function Login() {
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
              <button className="flex w-full items-center justify-center gap-3 rounded-md animation bg-blue-600 hover:bg-blue-700 px-3 py-1.5 h-[44px] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]">
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
