import Layout from "components/Layout";
import Hero from "./Hero";
import Features from "./Features";
import FAQ from "./FAQ";
import Socials from "./Socials";

function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <FAQ />
      <Socials />
    </Layout>
  );
}

export default Home;
