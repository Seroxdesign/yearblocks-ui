import React from "react";
import Layout from "components/Layout";
import MintYearBlockComponent from "components/flow/mint-yearblock";
import MintSignatureComponent from "components/flow/mint-signature";
import AttachSignatureToYearBlockComponent from "components/flow/attach-signature";

function Minting() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-y-8 py-20">
        <MintYearBlockComponent className={"buttonPrimary"} />
        <MintSignatureComponent className={"buttonPrimary"} />
        <AttachSignatureToYearBlockComponent className={"buttonPrimary"} />
      </div>
    </Layout>
  );
}

export default Minting;
