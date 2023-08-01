import React from "react";
import Layout from "components/Layout";
import MintYearBlockComponent from "components/flow/mint-yearblock";
import MintSignatureComponent from "components/flow/mint-signature";
import AttachSignatureToYearBlockComponent from "components/flow/attach-signature";

function Minting() {
  return (
    <Layout>
      <MintYearBlockComponent />
      <br />
      <br />
      <MintSignatureComponent />
      <br />
      <br />
      <AttachSignatureToYearBlockComponent />
    </Layout>
  );
}

export default Minting;
