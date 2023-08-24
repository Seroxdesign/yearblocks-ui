import { useState, useEffect } from "react";
import Layout from "components/Layout";
import YearsList from "./YearsList";
import { getUserYearBlock, getUserUnattachedSignatures } from "utils/flow";
import * as fcl from "@onflow/fcl";

function MyYearBlock() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ loggedIn: false, addr: undefined });
  const [yearBlocksList, setYearBlocksList] = useState<any | []>([]);

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, [user.addr]);

  const getData = async () => {
    const response = await getUserYearBlock({
      setLoading,
      addr: user.addr,
    });
    let newArray = [];
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        newArray.push(response[key]);
      }
    }
    setYearBlocksList(newArray);
  };

  const getUnattachedSign = async () => {
    const res = await getUserUnattachedSignatures({
      setLoading,
      addr: user.addr,
    });
    console.log("getUserUnattachedSignatures res.....", res);
  };

  useEffect(() => {
    if (user.addr) {
      getData();
      getUnattachedSign();
    }
  }, [user]);

  return (
    <Layout>
      <YearsList loading={loading} yearBlocksList={yearBlocksList} />
    </Layout>
  );
}

export default MyYearBlock;
