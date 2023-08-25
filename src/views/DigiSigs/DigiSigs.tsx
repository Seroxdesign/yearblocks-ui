import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "components/Layout";
import { getUserUnattachedSignatures } from "utils/flow";
import DigiSigsList from "./DigiSigsList";

function DigiSigs() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [digiSigsList, setDigiSigsList] = useState<any | []>([]);

  const getData = async () => {
    const response = await getUserUnattachedSignatures({
      setLoading,
      addr: router.query.addr,
    });

    const newArray = Object.entries(response).map(([key, value]) => ({
      id: parseInt(key),
      ...(value || null),
    }));

    if (newArray.length > 0) {
      setDigiSigsList(newArray);
    } else {
      setDigiSigsList([]);
    }
  };

  useEffect(() => {
    if (router.query.addr) {
      getData();
    }
  }, [router]);

  return (
    <Layout>
      <DigiSigsList loading={loading} digiSigsList={digiSigsList} />
    </Layout>
  );
}

export default DigiSigs;
