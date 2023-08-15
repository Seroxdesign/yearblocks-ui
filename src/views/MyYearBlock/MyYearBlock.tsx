import Layout from "components/Layout";
import Hero from "./Hero";
import YearsList from "./YearsList";
import ViewYearblock from "../../components/flow/get-user-yearblocks"

function MyYearBlock() {
  return (
    <Layout>
      <Hero />
      <YearsList />
      <ViewYearblock />
    </Layout>
  );
}

export default MyYearBlock;
