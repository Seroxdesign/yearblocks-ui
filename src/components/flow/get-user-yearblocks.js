import * as fcl from "@onflow/fcl";
import { useState, useEffect } from "react";
import OverlayLoading from "components/OverlayLoading";
import { getUserYearBlock } from "utils/flow";

function ViewYearblock(className = "buttonPrimary") {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ loggedIn: false, addr: undefined });

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, [user.addr]);

  const getData = async () => {
    const response = await getUserYearBlock({
      setLoading,
      addr: user.addr,
    });
    console.log("user yearblocks list...", response);
  };

  return (
    <>
      {loading && <OverlayLoading />}
      <>
        <button onClick={() => getData()} className={className}>
          View Yearblock
        </button>
      </>
    </>
  );
}

export default ViewYearblock;
