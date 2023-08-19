import Layout from "components/Layout";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { BsCardImage } from "react-icons/bs";
import { useSession } from "next-auth/react";
import * as fcl from "@onflow/fcl";
import { mintSignatureNFT, prepareAccountSignature } from "utils/flow";
import { db, firebase, storage } from "config/firebase";
import { generateNumberID } from "utils/common";
import OverlayLoading from "components/OverlayLoading";

function CreateYearBlock() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("create-new");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any | null>(null);
  const [values, setValues] = useState({
    signature: "",
    comment: "",
  });

  const handleInput = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const resetInputs = () => {
    setValues({
      ...values,
      signature: "",
      comment: "",
    });
    setFile(null);
  };

  const handleImagePick = (event: any) => {
    if (
      typeof window !== "undefined" &&
      event.target.files &&
      event.target.files.length > 0
    ) {
      let file = event.target.files[0];
      setFile(file);
    }
  };

  const uploadFileIntoDatabase = (currentUser: any) => {
    if (file) {
      const storageRef = storage.ref("images/" + file.name);
      const uploadTask = storageRef.put(file);

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
              await db
                .collection("Signatures")
                .add({
                  userEmail: session?.user?.email,
                  useName: session?.user?.name,
                  userAccountAddress: currentUser?.addr,
                  signatureID: uniqueId,
                  signatureName: values.signature,
                  comment: values.comment,
                  mediaLocation: imageUrl,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then(async () => {
                  await mintSignatureNFT({
                    setLoading,
                    id: uniqueId,
                    link: imageUrl,
                    comment: values.comment,
                    name: values.signature,
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
    } else if (!values.signature) {
      toast("Please enter signature value", {
        type: "error",
      });
    } else if (!values.comment) {
      toast("Please enter comment", {
        type: "error",
      });
    } else if (!file) {
      toast("Please upload picture", {
        type: "error",
      });
    } else if (!currentUser?.loggedIn) {
      toast("Please first prepare your account", {
        type: "error",
      });
      prepareAccountSignature({
        setLoading,
      });
    } else {
      uploadFileIntoDatabase(currentUser);
    }
  };

  return (
    <>
      {loading && <OverlayLoading />}
      <Layout>
        <div className="w-full flex justify-center margins">
          <div className="w-full flex flex-col py-12 sm:py-16 lg:py-24">
            <div className="font-bold text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] text-service-900 text-center mb-4 lg:mb-5">
              Create New DigiSigs
            </div>
            <div className="text-sm sm:text-base lg:text-[22px] leading-6 sm:leading-[28px] lg:leading-[36px] text-service-700 text-center mb-8 xl:mb-12">
              Upload and mint a new DigiSig here
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
                    src="/images/digiSign.png"
                    width={220}
                    height={220}
                    alt="Logo"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="signature"
                    className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                  >
                    Signature
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="signature"
                      value={values.signature}
                      onChange={handleInput}
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
                      value={values.comment}
                      onChange={handleInput}
                      className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-base sm:leading-8"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="front-cover"
                    className="text-sm sm:text-base font-semibold leading-6 text-gray-900"
                  >
                    Picture
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
                            {file ? "Change file" : "Upload a file"}
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
                  {file && typeof window !== "undefined" && (
                    <img
                      src={window.URL.createObjectURL(file)}
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
                    Mint Signature
                  </button>
                  {/* <PrepareAccountSignature className="buttonPrimary" />
                <MintSignatureComponent className={"buttonPrimary"} /> */}
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
