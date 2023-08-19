import React from "react";
import Layout from "components/Layout";
import AttachSignatureToYearBlockComponent from "components/flow/attach-signature";

function Minting() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-y-8 py-20">
        <AttachSignatureToYearBlockComponent className={"buttonPrimary"} />
      </div>
    </Layout>
  );
}

export default Minting;
