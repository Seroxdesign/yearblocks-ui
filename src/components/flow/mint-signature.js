import { useState } from "react";
import OverlayLoading from "components/OverlayLoading";
import { mintSignatureNFT } from "utils/flow";

function MintSignatureComponent({ className, uniqueId, name, comment, link }) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <OverlayLoading />}
      <>
        <button
          className={className}
          onClick={() =>
            mintSignatureNFT({
              setLoading,
              id: uniqueId,
              comment,
              link,
              name,
            })
          }
        >
          Mint Signature
        </button>
      </>
    </>
  );
}

export default MintSignatureComponent;
