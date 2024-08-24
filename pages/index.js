import Container from "@/components/Container";
import games from "../data/games.json";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getGame, getGames, searchGames } from "@/utils/helpers";
import Image from "next/image";
import GamesLoading from "@/components/ui/loadings/GamesLoading";

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
      if (query.length >= 3) {
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
      if (query.length >= 3) setQueryDropdown(true);
      else setQueryDropdown(false);
    },
    [query]
  );

  return (
    <>
      <header className="flex flex-col items-center justify-center bg-orange-500 h-[40vh]">
        <h1 className="text-white text-4xl font-bold mb-2">RTP SORGU</h1>
        <p className="text-white font-semibold text-center w-5/6 lg:w-1/3 mb-4">
          Casino oyunlarının en güncel RTP değerlerini öğrenmek için oyun ismini
          aşağıya yazınız.
        </p>
        <div className=" relative text-center mx-auto w-full">
          <input
            type="text"
            name="game"
            placeholder="Bir oyun ismi giriniz"
            className="w-3/4 lg:w-1/3 rounded focus:outline-none  transition-all text-center placeholder:text-center p-2"
            onChange={handleQueryOnChange}
            onClick={() => setQueryDropdown(true)}
            value={query}
            ref={dropdownRef}
            autoComplete="off"
          />
          {queryDropdown && query.length >= 3 && (
            <div className="dropdown absolute w-3/4 lg:w-1/3 rounded-b-lg top-full left-1/2 -translate-x-1/2 max-h-[35vh] overflow-y-scroll bg-white shadow-lg -mt-0.5">
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
      </header>
      <br />
      {isSelectedGameLoading && (
        <Container className={"lg:w-1/4"}>
          <GamesLoading size={"lg"} />
        </Container>
      )}
      {!isSelectedGameLoading && game && (
        <Container className={"flex flex-col items-center my-8"}>
          <section className="flex gap-4 mb-16">
            <Image
              src={game.image}
              className="w-36 rounded"
              width={315}
              height={315}
              alt="Game Image"
            />
            <div>
              <h2 className="text-2xl font-bold">{game.name}</h2>
              <p className="text-gray-700">Provider: {game.provider}</p>
              <p className="text-gray-700">
                RTP Oranı:&nbsp;
                <span className={`${game.rtp >= 95 && "text-green-500"}`}>
                  %{game.rtp}
                </span>
              </p>
            </div>
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
            <h1 className="font-bold mb-1">RTP Oranı Neden Önemlidir?</h1>
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
            <h1 className="font-bold mb-1">
              RTP oranı kazanma şansınızı nasıl arttırır?
            </h1>
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
          <section className="mb-4">
            <h1 className="font-bold mb-1">Volatilite Nedir?</h1>
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
            <h1 className="font-bold mb-1">RTP Neye Göre Belirlenir?</h1>
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
            <h1 className="font-bold mb-1">RTP Değerleri Güvenilir Midir?</h1>
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
      </Container>
      <footer className="text-white text-center bg-orange-500 p-2">
        © rtpsorgu.com Tüm hakları saklıdır.
      </footer>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(process.env.NEXT_PUBLIC_API);
  const data = await response.json();

  console.log(data.status);

  return {
    props: {
      status: data.status,
      message: data.message,
    },
  };
}
