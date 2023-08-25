import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "components/Layout";
import { getUserYearBlock, getYearBlocksSignatures } from "utils/flow";
import YearsList from "./YearsList";

function MyYearBlock() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [yearBlocksList, setYearBlocksList] = useState<any | []>([]);

  const getData = async () => {
    const response = await getUserYearBlock({
      setLoading,
      addr: router.query.addr,
    });

    // TODO: What is getYearBlocksSignatures and from which form it is
    // get YearBlocks and signatures
    const response2 = getYearBlocksSignatures({
      setLoading,
      addr: router.query.addr,
    });

    const newArray = Object.entries(response).map(([key, value]) => ({
      id: parseInt(key),
      ...(value || null),
    }));

    if (newArray.length > 0) {
      setYearBlocksList(newArray);
    } else {
      setYearBlocksList([]);
    }
  };

  useEffect(() => {
    if (router.query.addr) {
      getData();
    }
  }, [router]);

  return (
    <Layout>
      <YearsList loading={loading} yearBlocksList={yearBlocksList} />
    </Layout>
  );
}

export default MyYearBlock;
