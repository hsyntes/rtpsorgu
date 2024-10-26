import Head from "next/head";
import Navbar from "./ui/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useRef, useState } from "react";
import GamesLoading from "./ui/loadings/GamesLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { getGame, searchGames } from "@/utils/helpers";
import Container from "./Container";

config.autoAddCss = false;

const Layout = ({ children }) => {
  const [query, setQuery] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [queryDropdown, setQueryDropdown] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [game, setGame] = useState(null);
  const [contents, setContents] = useState();
  const dropdownRef = useRef();

  const handleQueryOnChange = (e) => setQuery(e.target.value);

  function handleSelectGame(id) {
    setQuery("");
    setQueryDropdown(false);
    setSelectedGameId(id);
  }

  const { isLoading: isSearchGamesLoading } = useQuery(["searchGames", query], {
    queryFn: async function () {
      if (query.length >= 2) {
        const response = await searchGames(query);
        const { data } = response;

        return data.games;
      }
    },
    onSuccess: function (data) {
      setSearchedGames(data);
    },
  });

  const { isLoading: isContentsLoading } = useQuery({
    queryKey: "getContents",
    queryFn: async function () {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/contents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log("Data: ", data);

      return data;
    },
    onSuccess: function (data) {
      if (data.status === "success") setContents(data.data.contents);
    },
    refetchOnWindowFocus: false,
  });

  const { isLoading: isSelectedGameLoading } = useQuery(
    ["getGame", selectedGameId],
    {
      queryFn: async function () {
        const response = await getGame(selectedGameId);
        const { data } = response;

        return data.game;
      },
      enabled: !!selectedGameId && !isSearchGamesLoading,
      onSuccess: function (data) {
        setGame(data);
      },
      staleTime: 0,
      cacheTime: 0,
    }
  );

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target) &&
          !e.target.classList.contains("dropdown")
        ) {
          setQueryDropdown(false);
        }
      }

      document.addEventListener("click", handleClickOutside, true);

      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    },
    [dropdownRef, setQueryDropdown]
  );

  useEffect(
    function () {
      if (query.length >= 2) setQueryDropdown(true);
      else setQueryDropdown(false);
    },
    [query]
  );

  return (
    <>
      <Navbar />
      <header className="flex flex-col items-center justify-center bg-primary h-[50vh]">
        <Image
          src={"/logo.light.png"}
          width={1957}
          height={398}
          className="w-56 lg:w-72 mb-1"
          alt="Logo"
        />
        <p className="text-white font-semibold text-center w-5/6 lg:w-1/3 mb-4">
          Casino ve slot oyunlarının en güncel RTP değerlerini öğrenmek için
          oyun ismini aşağıya yazınız.
        </p>
        <div className="relative text-center mx-auto w-full mb-4">
          <input
            type="text"
            name="game"
            id="game-input"
            // placeholder="Bir oyun ismi giriniz"
            className="w-3/4 lg:w-1/3 rounded focus:outline-none  transition-all text-center placeholder:text-center p-2 py-3"
            onChange={handleQueryOnChange}
            onClick={() => setQueryDropdown(true)}
            value={query}
            ref={dropdownRef}
            autoComplete="off"
          />
          {(query.length === 0 || query === "") && (
            <label
              htmlFor="game-input"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2 cursor-text text-gray-500"
            >
              <p>Bir oyun ismi giriniz</p>
              <FontAwesomeIcon icon={faSearch} />
            </label>
          )}
          {queryDropdown && query.length >= 2 && (
            <div className="dropdown absolute w-3/4 lg:w-1/3 rounded-b-lg rounded-t-none top-full left-1/2 -translate-x-1/2 max-h-[35vh] overflow-y-scroll bg-white shadow-lg -mt-0.5">
              <ul>
                {isSearchGamesLoading && (
                  <div className="dropdown grid grid-cols-12 justify-center">
                    <div className="dropdown col-span-1 hidden lg:block"></div>
                    <div className="dropdown col-span-9 lg:col-span-8">
                      <GamesLoading count={20} />
                    </div>
                    <div className="dropdown col-span-1 hidden lg:block"></div>
                  </div>
                )}
                {searchedGames &&
                  searchedGames.length >= 1 &&
                  searchedGames.map((searchedGame) => (
                    <li
                      className="dropdown grid grid-cols-12 items-start justify-center cursor-pointer hover:bg-gray-200 transition-all py-4"
                      onClick={() => handleSelectGame(searchedGame._id)}
                      key={searchedGame._id}
                    >
                      <div className="dropdown col-span-1 hidden lg:block"></div>
                      <div className="dropdown col-span-3 lg:col-span-2 text-center">
                        <Image
                          src={searchedGame.image}
                          width={315}
                          height={315}
                          className="dropdown rounded w-16 mx-auto"
                          alt="Game Image"
                        />
                      </div>
                      <div className="dropdown col-span-9 lg:col-span-8 text-start">
                        <h1 className="dropdown font-bold">
                          {searchedGame.name}
                        </h1>
                        <p className="dropdown text-sm">
                          {searchedGame.provider}
                        </p>
                      </div>
                      <div className="dropdown col-span-1 hidden lg:block"></div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <Link href={"/en-yuksek-rtp-oyunlar"}>
          <button
            type="button"
            className="flex items-center gap-2 bg-none bg-orange-500 hover:bg-orange-600 rounded-lg shadow text-white transition-all py-3 px-6"
          >
            <span className="font-bold text-sm">En Yüksek RTP Oyunlar</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </Link>
      </header>
      <main>
        {isSelectedGameLoading && (
          <Container className={"lg:w-1/4 mx-auto"}>
            <GamesLoading size={"lg"} />
          </Container>
        )}
        {!isSelectedGameLoading && game && (
          <Container className={"flex flex-col items-center my-8"}>
            <h1 className="font-bold text-lg mb-4">
              {game.name} RTP Sonuçları
            </h1>
            <section className="flex gap-4">
              <Image
                src={game.image}
                className="w-36 rounded"
                width={315}
                height={315}
                alt="Game Image"
              />
              <section>
                <h2 className="text-2xl font-bold">{game.name}</h2>
                <p className="text-gray-700">Provider: {game.provider}</p>
                <p className="text-gray-700">
                  RTP Oranı:&nbsp;
                  <span className={`${game.rtp >= 95 && "text-green-500"}`}>
                    %{game.rtp}
                  </span>
                </p>
              </section>
            </section>
          </Container>
        )}
        <Container className={"lg:grid lg:grid-cols-12 gap-12 my-8"}>
          <section className="lg:col-span-8 text-justify">{children}</section>
          <section className="lg:col-span-4">
            <div className="bg-black border-b-4 border-b-primary rounded-tl-lg p-2 mb-4">
              <h2 className="font-semibold text-white">RTP Hakkında Her Şey</h2>
            </div>
            <section>
              <ul className="space-y-6">
                {isContentsLoading && <GamesLoading count={10} />}
                {contents &&
                  contents?.length !== 0 &&
                  contents?.map((content, index) => (
                    <li key={content._id}>
                      <Link
                        href={`/${content._id}`}
                        className="group flex items-start gap-4"
                      >
                        <section>
                          <div
                            className={`w-[42px] h-[42px] overflow-hidden ${
                              index % 2 == 0 ? "bg-black" : "bg-gray-600"
                            } rounded px-1`}
                          >
                            <Image
                              src={"/rtp.png"}
                              width={310}
                              height={310}
                              className="w-full h-full object-contain"
                              alt="Misbahis Logo"
                            />
                          </div>
                        </section>
                        <section>
                          <h3 className="font-semibold text-lg">
                            {content.content_title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 group-hover:!text-black transition-all">
                            {content.content_description}
                          </p>
                        </section>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          </section>
        </Container>
      </main>
      <footer className="text-white text-center bg-primary p-2">
        © rtpsorgu.com Tüm hakları saklıdır.
      </footer>
    </>
  );
};

export default Layout;
