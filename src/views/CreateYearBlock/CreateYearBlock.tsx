import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import * as fcl from "@onflow/fcl";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { db, firebase, storage } from "config/firebase";
import OverlayLoading from "components/OverlayLoading";
import { generateNumberID } from "utils/common";
import { mintYearBlockNFT, prepareAccountYearBlock } from "utils/flow";
import { useSession } from "next-auth/react";

function CreateYearBlock() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("create-new");
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<any | null>(null);
  const [values, setValues] = useState({
    yearBlockName: "",
    whiteList: "",
    description: "",
    link: "",
    districtName: "",
    schoolName: "",
    schoolYear: "",
  });

  const checkIsUserValid = async () => {
    const currentUser = await fcl.currentUser.snapshot();
    if (!currentUser?.loggedIn) {
      prepareAccountYearBlock({ setLoading });
    }
  };

  useEffect(() => {
    setValues({
      ...values,
      whiteList: session?.user?.email || "",
    });
  }, [session]);

  useEffect(() => {
    checkIsUserValid();
  }, []);

  const handleInput = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const resetInputs = () => {
    setValues({
      ...values,
      yearBlockName: "",
      description: "",
      link: "",
      whiteList: "",
      districtName: "",
      schoolName: "",
      schoolYear: "",
    });
    setThumbnail(null);
  };

  const handleImagePick = (event: any) => {
    if (
      typeof window !== "undefined" &&
      event.target.files &&
      event.target.files.length > 0
    ) {
      let file = event.target.files[0];
      setThumbnail(file);
    }
  };

  const uploadFileIntoDatabase = (currentUser: any) => {
    if (thumbnail) {
      const storageRef = storage.ref("images/" + thumbnail.name);
      const uploadTask = storageRef.put(thumbnail);

      // Listen for upload progress and completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          console.log("Image uploaded successfully");

          // Get the stored image URL
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(async (imageUrl) => {
              let uniqueId = generateNumberID(6);
              console.log("uniqueId....", typeof uniqueId, uniqueId);
              await db
                .collection("YearBlocks")
                .add({
                  userEmail: session?.user?.email,
                  useName: session?.user?.name,
                  userAccountAddress: currentUser?.addr,
                  yearBlockID: uniqueId,
                  yearBlockName: values.yearBlockName,
                  yearBlockLink: values.link,
                  yearBlockDescription: values.description,
                  thumbnail: imageUrl,
                  allowList: [values.whiteList],
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then(async () => {
                  await mintYearBlockNFT({
                    setLoading,
                    id: uniqueId,
                    link: values.link,
                    thumbnail: imageUrl,
                    allowList: [session?.user?.email],
                    name: values.yearBlockName,
                    description: values.description,
                  });
                  resetInputs();
                })
                .catch((e) => {
                  console.log(e);
                  setLoading(false);
                  toast(e.message, {
                    type: "error",
                  });
                });
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error getting image URL:", error);
              toast("Error getting image URL", {
                type: "error",
              });
            });
        }
      );
    }
  };

  const handleSubmitForm = async () => {
    const currentUser = await fcl.currentUser.snapshot();
    if (!session?.user) {
      toast("Please login first", {
        type: "error",
      });
    } else if (!values.yearBlockName) {
      toast("YearBlock name is required", {
        type: "error",
      });
    } else if (!values.link) {
      toast("YearBlock link is required", {
        type: "error",
      });
    } else if (!values.whiteList) {
      toast("Whitelist value is required.", {
        type: "error",
      });
    } else if (!values.description) {
      toast("Description is required", {
        type: "error",
      });
    } else if (!thumbnail) {
      toast("Please Upload Front Cover", {
        type: "error",
      });
    } else if (!currentUser?.loggedIn) {
      toast("Please first prepare your account", {
        type: "error",
      });
      prepareAccountYearBlock({ setLoading });
    } else {
      setLoading(true);
      uploadFileIntoDatabase(currentUser);
    }
  };

  const _prepare = () => {
    prepareAccountYearBlock({ setLoading });
  };

  return (
    <>
      {loading && <OverlayLoading />}
      <Layout>
        <div className="w-full flex justify-center margins">
          <div className="w-full flex flex-col py-12 sm:py-16 lg:py-24">
            <div className="font-bold text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] text-service-900 text-center mb-4 lg:mb-5">
              Create New YearBlock
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
                <div className="w-full">
                  <label
                    htmlFor="yearbook"
                    className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                  >
                    YearBook Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="yearBlockName"
                      value={values.yearBlockName}
                      onChange={handleInput}
                      className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-base sm:leading-8"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="yearbook"
                    className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                  >
                    YearBlock Link
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="link"
                      value={values.link}
                      onChange={handleInput}
                      className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-base sm:leading-8"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="yearbook"
                    className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                  >
                    Whitelist
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="whiteList"
                      placeholder="example@gmail.com"
                      value={values.whiteList}
                      onChange={handleInput}
                      className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-base sm:leading-8"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="yearbook"
                    className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="description"
                      value={values.description}
                      onChange={handleInput}
                      className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-base sm:leading-8"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="districtName"
                    className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                  >
                    District Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="districtName"
                      value={values.districtName}
                      onChange={handleInput}
                      disabled={true}
                      placeholder="Coming Soon"
                      className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-base sm:leading-8"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="schoolName"
                    className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                  >
                    School Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="schoolName"
                      value={values.schoolName}
                      onChange={handleInput}
                      disabled={true}
                      placeholder="Coming Soon"
                      className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-base sm:leading-8"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="schoolYear"
                    className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                  >
                    School Year
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="schoolYear"
                      value={values.schoolYear}
                      onChange={handleInput}
                      disabled={true}
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
                    Front Cover
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
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              document.getElementById("fileUploadID")?.click();
                            }}
                          >
                            {thumbnail ? "Change file" : "Upload a file"}
                          </div>
                          <input
                            accept="image/jpeg, image/png, image/jpg, image/webp"
                            name="file-upload"
                            id="fileUploadID"
                            type="file"
                            className="sr-only"
                            onChange={handleImagePick}
                            style={{ display: "none" }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  {thumbnail && typeof window !== "undefined" && (
                    <img
                      src={window.URL.createObjectURL(thumbnail)}
                      alt="image"
                      className="mt-8 w-[280px] object-contain"
                    />
                  )}
                </div>
                <div className="w-full flex items-center gap-x-5">
                  <button
                    className="buttonPrimary"
                    onClick={handleSubmitForm}
                    disabled={loading}
                  >
                    Mint YearBlock NFT
                  </button>
                  <button onClick={_prepare} className="buttonPrimary">
                    Prepare
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CreateYearBlock;
