import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FaqsList = [
  {
    title: "Can anyone see my personal YearBlock?",
    text: "The current phase of YearBlocks development is focused on proof of concept, prioritizing student privacy by not using real student images. The initial phase involves an on-premise solution hosted by the school, ensuring data remains within the campus. Token gating will be implemented to restrict access to the yearbook media, ensuring only those who own a copy can view it, further safeguarding student privacy and enhancing the security of the platform.",
  },
  {
    title: "Can I sign anyone’s YearBlock?",
    text: `YearBlocks ensures that only authorized signers can add a signature and comment to your YearBlock through a multi-step process. In future phases, the platform will implement a series of "handshakes" that involve requesting, accepting, signing, and accepting signatures. These steps ensure that only authorized individuals can participate in the signing process, adding an extra layer of security and verification to the yearbook content. By incorporating these measures, YearBlocks aims to enhance the integrity and authenticity of the signatures and comments, providing a trusted and controlled environment for preserving and interacting with yearbook memories.`,
  },
  {
    title: "How can I manage my DigiSigs?",
    text: `Managing digital signatures in YearBlocks provides a secure and convenient way to authenticate and control the signing process. Users have the ability to create, view, and manage their digital signatures within the platform. The system ensures that only authorized signers can add their signatures to YearBlocks, maintaining the integrity and authenticity of the signed content. Users can easily track and monitor the status of their signatures, including requests, acceptance, and finalization. This centralized management of digital signatures simplifies the process, enhances security, and provides a seamless experience for users to interact with and manage their signed YearBlocks.`,
  },
  {
    title: "How can I manage my school’s YearBlock?",
    text: "Schools can easily authorize designated personnel to manage their YearBlocks mints year after year through the platform's administrative capabilities. Authorized personnel, such as yearbook coordinators or administrators, can access the system with proper authentication and permissions. They have the ability to upload new yearbooks for minting, manage whitelists for free student and staff minting, and oversee the overall yearbook management process. By granting specific permissions and roles, schools can ensure continuity and seamless management of YearBlocks across different academic years, allowing for efficient administration and preserving the integrity of the yearbook minting process.",
  },
];

function FAQ() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full margins max-w-[850px] py-12 sm:py-16 lg:py-24">
        <div className="text-3xl sm:text-4xl lg:text-6xl leading-[40px] sm:leading-[50px] lg:leading-[80px] font-bold text-service-900 uppercase text-center mb-8 sm:mb-12 lg:mb-20">
          FREQUENTLY ASKED QUESTIONS
        </div>
        <div className="w-full">
          {FaqsList.map((item, index) => (
            <FAQItem data={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;

const FAQItem = ({ data }: { data: any }) => {
  const [expend, setExpend] = useState(false);
  return (
    <div className="w-full flex flex-col border-solid border-t-[1px] border-gray-900/10 py-5 sm:py-8">
      <label
        className="w-full flex items-center cursor-pointer gap-x-6"
        onClick={() => setExpend(!expend)}
      >
        <div className="flex-1 font-semibold text-base sm:text-lg text-service-900">
          {data.title}
        </div>
        <div className="text-xl sm:text-2xl text-service-900">
          {expend ? <FiMinus /> : <FiPlus />}
        </div>
      </label>
      {expend && (
        <div className="mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-[28px] font-normal text-service-700">
          {data.text}
        </div>
      )}
    </div>
  );
};
