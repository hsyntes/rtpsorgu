import Head from "next/head";
import Navbar from "./ui/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

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
