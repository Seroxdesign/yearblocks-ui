import Layout from "components/Layout";
import Hero from "./Hero";
import Features from "./Features";
import FAQ from "./FAQ";
import Socials from "./Socials";
import PrepareAccountYearBlock from "components/flow/prepare-account-yearblock";
import PrepareAccountSignature from "components/flow/prepare-account-signature";

function Home() {
  return (
    <Layout>
      <PrepareAccountSignature />
      <PrepareAccountYearBlock />
      <Hero />
      <Features />
      <FAQ />
      <Socials />
    </Layout>
  );
}

export default Home;
