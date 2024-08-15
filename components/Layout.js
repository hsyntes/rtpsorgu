import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="RTP Sorgu | Casino oyunlarının en güncel RTP oranları"
        />
        <meta name="keywords" content="rtp sorgu, rtpsorgu, rtp" />
        <title>RTP Sorgu</title>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
