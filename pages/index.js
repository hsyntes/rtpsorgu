import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getGame, searchGames } from "@/utils/helpers";
import Image from "next/image";
import GamesLoading from "@/components/ui/loadings/GamesLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [queryDropdown, setQueryDropdown] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [game, setGame] = useState(null);
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
      <Head>
        <meta
          name="description"
          content="RTP Sorgu | Casino oyunlarının en güncel RTP oranları"
        />
        <meta
          name="keywords"
          content="rtp sorgu, rtpsorgu, rtp sorgulama, rtp öğrenme, rtp ogrenme, en yüksek rtp oyunlar, rtp yüksek siteler, rtp ne demek, güncel rtp oranları, rtp nedir, rtp, yüksek rtp oranları, en iyi rtp slot oyunları, rtp en yüksek oyunlar, rtp yüksek bet siteleri, rtp yüksek slotlar, casino rtp, casino oyun rtp, canlı rtp, canlı rtp veritabanı, oyunlarda rtp, yüksek rtpli oyunlar, rtp yüksek oyunlar, rtp si en yüksek oyunlar, en çok kazandıran oyunlar, en iyi rtp oyunlar"
        />
        <title>
          RTP Sorgu | Casino oyunlarının en güncel RTP oranları | En Yüksek RTP
          Slot Siteler | En Yüksek RTP Oyunlar | Güncel RTP Oranları | RTP
          Yüksek Oyunlar
        </title>
      </Head>
      <header className="flex flex-col items-center justify-center bg-primary h-[50vh]">
        <Image
          src={"/logo.light.png"}
          width={1957}
          height={398}
          className="w-56 lg:w-72"
          alt="Logo"
        />
        <p className="text-white font-semibold text-center w-5/6 lg:w-1/3 mb-6 lg:mb-8">
          Casino oyunlarının en güncel RTP değerlerini öğrenmek için oyun ismini
          aşağıya yazınız.
        </p>
        <div className="relative text-center mx-auto w-full mb-8">
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
      <br />
      {isSelectedGameLoading && (
        <Container className={"lg:w-1/4 mx-auto"}>
          <GamesLoading size={"lg"} />
        </Container>
      )}
      {!isSelectedGameLoading && game && (
        <Container className={"flex flex-col items-center my-12"}>
          <section className="flex gap-4 mb-16">
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
      <Container>
        <section className="my-8 lg:w-3/4 mx-auto text-justify">
          <section className="mb-4">
            <h1 className="font-bold mb-1">RTP Nedir?</h1>
            <p>
              RTP (Return to Player), çevrimiçi ve fiziksel casino oyunlarında
              önemli bir metriği temsil eder ve bir oyunun uzun vadede&nbsp;
              <strong>oyuncuya geri ödeme oranını</strong> ifade eder.
              Genellikle yüzde olarak ifade edilen RTP, bir oyuncunun bahis
              yaptığı her 100 birim için ortalama ne kadar geri alabileceğini
              gösterir. Örneğin, bir oyunun RTP'si %96 ise, oyuncunun teorik
              olarak her 100 birim bahis için 96 birim geri alması beklenir. Bu,
              kazançların tamamen rastgele olduğunu ve RTP'nin uzun vadeli bir
              ortalamayı yansıttığını belirtmekle birlikte, kısa vadede
              sonuçların farklı olabileceği anlamına gelir.
            </p>
          </section>
          <br />
          <section className="mb-4">
            <h2 className="font-bold mb-1">RTP Oranı Neden Önemlidir?</h2>
            <p>
              RTP oranı, bir oyunun adil olup olmadığını değerlendirmenin önemli
              bir yoludur. Daha yüksek bir RTP, oyuncuların kayıplarını azaltma
              olasılığını artırırken, aynı zamanda daha fazla kazanma şansı
              sunar. Casino oyunları arasında RTP oranları değişiklik
              gösterebilir; slot makineleri, masa oyunları ve diğer oyun
              türlerinin her birinin kendine özgü RTP değerleri olabilir.
              Oyuncular, genellikle daha yüksek RTP oranına sahip oyunları
              tercih eder, çünkü bu oyunlar uzun vadede daha iyi bir yatırım
              getirisi sunar.
            </p>
            <br />
            <p>
              Bununla birlikte, RTP yalnızca oyun seçimi yaparken dikkate
              alınması gereken faktörlerden biridir. Oyunun eğlenceli olması,
              strateji gerektirip gerektirmemesi ve bireysel tercihler de önemli
              rol oynar. Yine de, RTP oranlarının anlaşılması, bilinçli oyun
              seçimi yapmak isteyen oyuncular için vazgeçilmez bir bilgi
              kaynağıdır. Oyuncular, RTP oranlarını dikkate alarak bütçelerini
              daha etkili yönetebilir ve oyun deneyimlerinden daha fazla keyif
              alabilir.
            </p>
            <br />
          </section>
          <section className="mb-4">
            <h2 className="font-bold mb-1">
              RTP oranı kazanma şansınızı nasıl arttırır?
            </h2>
            <p>
              RTP (Return to Player), casino oyunlarının oyunculara geri ödediği
              miktarı belirleyen önemli bir ölçümdür. RTP, bir oyunun teorik
              olarak belirli bir süre zarfında oyunculara ne kadar geri ödeme
              yapacağını yüzdesel olarak ifade eder. Örneğin, %95 RTP'ye sahip
              bir oyun, her 100 birim bahis için ortalama 95 birim geri ödeme
              yapar. Bu oran, uzun vadede oyuncuların ne kadar kazanç veya kayıp
              yaşayabileceğine dair bir öngörü sunar.&nbsp;
              <strong>
                RTP'nin yüksek olması, oyuncular için daha iyi bir geri dönüş
                potansiyeli anlamına gelir
              </strong>
              , ancak bireysel oyun sonuçları şansa bağlı olarak değişebilir.
            </p>
            <br />
            <p>
              Casino oyunlarında RTP, oyuncuların bilinçli seçimler yapmalarına
              yardımcı olan bir performans göstergesidir. Oyunların RTP
              değerleri, genellikle oyun sağlayıcıları tarafından şeffaf bir
              şekilde paylaşılır ve bu, oyunculara oyunların adil olup
              olmadığını değerlendirme konusunda bilgi verir. Daha yüksek RTP
              oranları, genellikle oyuncuların kazançlarının daha fazla olmasını
              sağlar ve oyun seçimi sırasında tercih edilen kriterlerden biri
              olabilir. Bununla birlikte, RTP, oyunun tamamen şans üzerine
              kurulu olduğunu ve kısa vadede büyük kazançlar veya kayıplar
              yaşanabileceğini unutmamak önemlidir.
            </p>
          </section>
          <br />
          <section className="mb-4">
            <h2 className="font-bold mb-1">Volatilite Nedir?</h2>
            <p>
              RTP'nin yanı sıra, bir oyunun volatilitesi de önemli bir
              faktördür. Volatilite, oyunun ne sıklıkla ve ne kadar büyük
              ödemeler yapabileceğini belirlerken, RTP ise oyuncunun toplam
              yatırımlarına oranla ne kadar geri ödeme alabileceğini gösterir.
              Yüksek RTP'li bir oyun düşük volatiliteye sahip olabilir ve küçük
              ama sık ödemeler yapabilir, ya da yüksek volatiliteye sahip
              olabilir ve nadir ancak büyük ödüller sunabilir. Bu nedenle, RTP
              ve volatiliteyi birlikte değerlendirerek oyun tercihi yapmak,
              oyuncuların oyun deneyimlerini optimize etmelerine yardımcı
              olabilir.
            </p>
            <br />
          </section>
          <section className="mb-4">
            <h2 className="font-bold mb-1">RTP Neye Göre Belirlenir?</h2>
            <p>
              Oyunların RTP oranları genellikle oyun sağlayıcıları tarafından
              hesaplanır ve lisanslı casino platformlarında açıklanır. Bu
              oranlar, oyunların uzun vadede ne kadar adil olduğunu ve
              oyuncuların hangi oranlarla geri dönüş alabileceğini belirlemek
              için kritik bir rol oynar. Oyuncular, RTP bilgilerini dikkate
              alarak oyun seçimlerini yaparken daha bilinçli kararlar verebilir
              ve oyun stratejilerini bu verilere göre şekillendirebilirler. RTP
              oranları, oyun endüstrisinin şeffaflığını artırarak oyuncuların
              haklarını korur ve oyun deneyimlerini iyileştirir. RTP oranları,
              oyuncuların hangi oyunların daha iyi geri dönüş sağladığını
              görmelerine olanak tanır ve bu sayede bilinçli seçimler yaparak
              daha stratejik oyun oynama fırsatı sunar. Ayrıca, RTP oranlarının
              şeffaf bir şekilde paylaşılması, oyun sağlayıcılarının ve casino
              platformlarının güvenilirliğini artırır. Bu, oyuncuların
              platformların adil ve güvenilir olduğuna dair daha fazla güven
              duymasını sağlar.
            </p>
            <br />
          </section>
          <section className="mb-4">
            <h2 className="font-bold mb-1">RTP Değerleri Güvenilir Midir?</h2>
            <p>
              Oyun sağlayıcıları tarafından belirlenen ve açıklanan RTP
              oranları, genellikle bağımsız test kuruluşları tarafından
              doğrulanır, bu da oranların doğruluğunu garanti eder. Bu şekilde,
              oyunların ve casino platformlarının adil ve şeffaf bir şekilde
              işlediğinden emin olunabilir. RTP oranlarının oyunculara
              sunulması, oyun endüstrisinin şeffaflık ilkesine hizmet eder ve
              oyuncuların haklarını korur, bu da daha adil bir oyun ortamı
              sağlar.
            </p>
            <br />
          </section>
        </section>
        <br />
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(process.env.NEXT_PUBLIC_API);
  const data = await response.json();

  return {
    props: {
      status: data.status,
      message: data.message,
    },
  };
}
