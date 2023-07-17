import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

function Layout({
  header = "YearBlocks",
  children,
}: {
  header?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{header}</title>
      </Head>
      <div className="flex flex-col">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
