import * as fcl from "@onflow/fcl";
import { useState } from "react";
import OverlayLoading from "components/OverlayLoading";
import { mintYearBlockNFT } from "utils/flow";

fcl.authenticate();
function MintYearBlockComponent({
  className = "buttonPrimary",
  uniqueId,
  yearBlockName,
  mediaLocation,
}) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <OverlayLoading />}
      <button
        className={className}
        disabled={loading}
        onClick={() => {
          mintYearBlockNFT({
            setLoading,
            id: uniqueId,
            link: mediaLocation,
            allowList: ["steady@steadystudios.org"],
            name: yearBlockName,
          });
        }}
      >
        Mint YearBlock NFT
      </button>
    </>
  );
}

export default MintYearBlockComponent;
