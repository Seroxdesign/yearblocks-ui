import Layout from "components/Layout";
import Hero from "./Hero";
import Features from "./Features";
import FAQ from "./FAQ";
import Socials from "./Socials";
import PrepareAccountYearBlock from "components/flow/prepare-account-yearblock";

function Home() {
  return (
    <Layout>
      <PrepareAccountYearBlock />
      <Hero />
      <Features />
      <FAQ />
      <Socials />
    </Layout>
  );
}

export default Home;
