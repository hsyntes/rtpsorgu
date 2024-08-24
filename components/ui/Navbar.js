import Link from "next/link";
import Container from "../Container";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  const { pathname } = router;

  useEffect(() => {
    const body = document.querySelector("body");

    if (menu) body.style.overflow = "hidden";
    else body.style.overflow = "auto";

    return () => (document.body.style.overflow = "auto");
  }, [menu]);

  return (
    <>
      <nav className="sticky top-0 bg-white py-6">
        <Container>
          <section className="lg:w-3/4 flex items-center justify-between mx-auto">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                width={1957}
                height={398}
                className="w-32"
                alt="Logo"
              />
            </Link>
            <ul className="hidden lg:flex items-center gap-3">
              <li>
                <Link
                  href={"/hakkimizda"}
                  className="text-gray-600 hover:text-primary transition-all"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href={"/en-yuksek-rtp-oyunlar"}
                  className="text-gray-600 hover:text-primary transition-all"
                >
                  En Yüksek RTP Oyunlar
                </Link>
              </li>
            </ul>
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              className="block lg:hidden text-primary"
              onClick={() => setMenu(true)}
            />
          </section>
        </Container>
      </nav>
      {menu && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white z-50 p-6">
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                width={1957}
                height={398}
                className="w-32"
                alt="Logo"
              />
            </Link>
            <FontAwesomeIcon
              icon={faTimes}
              size="xl"
              className="text-primary"
              onClick={() => setMenu(false)}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <h1 className="font-bold text-2xl text-center">RTP Sorgu Menü</h1>
            <br />
            <ul className="text-center text-lg space-y-2">
              <li>
                <Link
                  href={"/"}
                  className={`text-gray-600 ${
                    pathname === "/" && "text-primary"
                  } transition-all`}
                  onClick={() => setMenu(false)}
                >
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link
                  href={"/hakkimizda"}
                  className={`text-gray-600 ${
                    pathname === "/hakkimizda" && "text-primary"
                  } transition-all`}
                  onClick={() => setMenu(false)}
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href={"/en-yuksek-rtp-oyunlar"}
                  className={`text-gray-600 ${
                    pathname === "/en-yuksek-rtp-oyunlar" && "text-primary"
                  } transition-all`}
                  onClick={() => setMenu(false)}
                >
                  En Yüksek RTP Oyunlar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
