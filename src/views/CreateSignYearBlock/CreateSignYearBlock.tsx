import Layout from "components/Layout";
import React, { useState } from "react";
import Image from "next/image";
import { BsCardImage } from "react-icons/bs";
import AttachSignatureToYearBlockComponent from "components/flow/attach-signature";

function CreateSignYearBlock() {
  const [activeTab, setActiveTab] = useState("create-new");

  return (
    <Layout>
      <div className="w-full flex justify-center margins">
        <div className="w-full flex flex-col py-12 sm:py-16 lg:py-24">
          <div className="font-bold text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] text-service-900 text-center mb-4 lg:mb-5">
            Sign YearBlock
          </div>
          <div className="text-sm sm:text-base lg:text-[22px] leading-6 sm:leading-[28px] lg:leading-[36px] text-service-700 text-center mb-8 xl:mb-12">
            Use your DigiSigs to sign a classmates yearblook
          </div>

          <div className="m-[auto] w-full max-w-[600px]">
            <div className="mb-8 xl:mb-12 flex justify-center">
              <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200">
                <div
                  className={`cursor-pointer rounded-full px-2.5 py-1.5 ${
                    activeTab === "create-new"
                      ? "bg-primary-700 text-white"
                      : "transparent text-gray-500"
                  }`}
                  onClick={() => setActiveTab("create-new")}
                >
                  Create New
                </div>
                <div
                  className={` cursor-pointer rounded-full px-2.5 py-1.5 ${
                    activeTab === "manage-existing"
                      ? "bg-primary-700 text-white"
                      : "transparent text-gray-500"
                  }`}
                  onClick={() => setActiveTab("manage-existing")}
                >
                  Manage Existing
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-6 sm:gap-y-8">
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/images/yearBlockSign.png"
                  width={250}
                  height={250}
                  alt="Logo"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="yearbook"
                  className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                >
                  YearBook
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="yearbook"
                    id="yearbook"
                    className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-base sm:leading-8"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="digisigs"
                  className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                >
                  DigiSigs
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="digisigs"
                    id="digisigs"
                    className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-base sm:leading-8"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="comment"
                  className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                >
                  Comment
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Coming Soon"
                    className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-base sm:leading-8"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="front-cover"
                  className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                >
                  Preview
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <BsCardImage
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-700 focus-within:ring-offset-2 hover:text-primary-700"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center gap-x-5">
                <AttachSignatureToYearBlockComponent className="buttonPrimary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateSignYearBlock;
