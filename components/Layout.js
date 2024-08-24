import Head from "next/head";
import Navbar from "./ui/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="text-white text-center bg-primary p-2">
        © rtpsorgu.com Tüm hakları saklıdır.
      </footer>
    </>
  );
};

export default Layout;
