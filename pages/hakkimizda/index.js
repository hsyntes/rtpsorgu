import Container from "@/components/Container";
import GamesLoading from "@/components/ui/loadings/GamesLoading";
import { getGame, searchGames } from "@/utils/helpers";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

const AboutPage = () => {
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
          content="rtp sorgu, rtpsorgu, rtp sorgulama, rtp, rtp öğrenme, rtp ogrenme, rtp sorgulama, en yüksek rtp oyunlar, güncel rtp oranları, rtp yüksek siteler, rtp slot siteleri, en yüksek rtp oranı oyunlar, rtp en yüksek oyunlar, yüksek rtpli oyunlar, rtp yüksek oyunlar, rtp si en yüksek oyunlar, oyunlarda rtp, rtp ne demek, rtp nedir, en iyi rtp oyunlar, casino rtp, casino oyun rtp, canlı rtp, canlı rtp veritabanı"
        />
        <title>
          RTP Sorgu | Casino oyunlarının en güncel RTP oranları | En Yüksek RTP
          Slot Siteler | En Yüksek RTP Oyunlar | Güncel RTP Oranları | RTP
          Yüksek Oyunlar
        </title>
      </Head>
      <Container>
        <section className="my-8 lg:w-3/4 mx-auto text-justify">
          <section className="mb-4">
            <h1 className="font-bold mb-1">RTP Sorgu Nedir?</h1>
            <p>
              <strong className="text-primary hover:underline">
                <Link href={"/"}>rtpsorgu.com</Link>
              </strong>
              &nbsp; sizlere en güvenilir ve güncel bilgi hizmetini sunmak için
              kurulmuş bir platformdur. Hedefimiz, kullanıcılarımıza hızlı ve
              doğru veri erişimi sağlayarak, her türlü sorgulama ve araştırma
              ihtiyaçlarını en iyi şekilde karşılamaktır. Yenilikçi teknolojiler
              ve kullanıcı dostu arayüzümüzle, karmaşık işlemleri basit ve
              anlaşılır bir şekilde sunarak, zamanınızı en verimli şekilde
              kullanmanızı sağlıyoruz. Ekibimiz, sektördeki en iyi uygulamaları
              takip ederek sürekli gelişim ve mükemmeliyet anlayışıyla hareket
              eder. rtpsorgu.com olarak, müşteri memnuniyetini en ön planda
              tutarak, her zaman güvenilir ve kaliteli hizmet sunmayı taahhüt
              ediyoruz.
            </p>
            <br />
            <p>
              <strong>rtpsorgu</strong> bilgiye erişimi kolaylaştırmak ve
              kullanıcılarımıza en doğru veriyi en hızlı şekilde sunmak amacıyla
              kurulmuştur. Amacımız, teknoloji ve yenilikleri yakından takip
              ederek, her bireyin ve işletmenin ihtiyaç duyduğu sorgulama
              hizmetlerini güvenilir bir şekilde sunmaktır. Ekibimiz, alanında
              uzman profesyonellerden oluşmakta olup, müşteri odaklı hizmet
              anlayışı ile çalışmaktadır. Hizmet verdiğimiz her alanda en yüksek
              kalite standartlarını koruyarak, kullanıcılarımızın güvenini
              kazanmayı ve beklentilerini aşmayı hedefliyoruz.
            </p>
            <br />
            <p>
              Bilgiye dayalı kararlar almanıza yardımcı olacak araçlar ve
              hizmetler geliştiriyoruz. Sunduğumuz çözümlerle, karmaşık veri
              analizlerini kolayca gerçekleştirmenizi, çeşitli rapor ve
              sorgulama ihtiyaçlarınızı zahmetsizce karşılamanızı sağlıyoruz. İş
              dünyasından bireysel kullanıcılara kadar geniş bir kitleye hitap
              eden platformumuz, sürekli gelişen teknolojik altyapısıyla her
              geçen gün daha da büyümekte ve kullanıcılarına daha iyi hizmet
              sunmak için kendini yenilemektedir.
            </p>
          </section>
        </section>
      </Container>
      <section className="flex flex-col items-center justify-center bg-primary h-[45vh] my-12 lg:my-24">
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
        <div className="relative text-center mx-auto w-full">
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
      </section>
      {isSelectedGameLoading && (
        <Container className={"lg:w-1/4 mx-auto"}>
          <GamesLoading size={"lg"} />
        </Container>
      )}
      {!isSelectedGameLoading && game && (
        <Container className={"flex flex-col items-center"}>
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
          <section>
            <h2 className="font-bold mb-1">Vizyonumuz</h2>
            <p>
              Vizyonumuz, bilginin gücüne inanarak, herkes için ulaşılabilir ve
              anlaşılır hale getirmektir. Müşterilerimizin ihtiyaçlarına uygun
              çözümler üretmek ve sektörde öncü konumumuzu sürdürmek için
              çalışıyoruz. rtpsorgu.com güven, kalite ve şeffaflık ilkeleri
              doğrultusunda hareket ederek, kullanıcı deneyimini en üst düzeyde
              tutmayı ve her zaman bir adım önde olmayı misyon edinmiştir.
            </p>
            <br />
            <p>
              <strong>rtp sorgu</strong>, kurulduğu günden bu yana, bilgiye
              erişim ve veri analiz süreçlerini daha şeffaf, erişilebilir ve
              kullanıcı dostu bir hale getirmeyi amaçlamaktadır. Sunduğumuz
              hizmetler, sadece bilgiye hızlı erişim sağlamakla kalmaz, aynı
              zamanda kullanıcılarımızın karar alma süreçlerinde de kritik bir
              rol oynar. Platformumuz, en yeni teknolojileri ve veri işleme
              tekniklerini kullanarak, müşterilerimizin en doğru bilgilere en
              hızlı şekilde ulaşmalarını sağlar.
            </p>
            <br />
            <p>
              Her gün büyüyen ve gelişen veri dünyasında, kullanıcılarımızın
              ihtiyacına uygun, kapsamlı ve doğru bilgiyi sunmak için
              çalışıyoruz. Verinin sadece bir sayıdan ibaret olmadığını, doğru
              kullanıldığında büyük farklar yaratabileceğini biliyoruz. Bu
              bilinçle,&nbsp;
              <strong>rtpsorgu.com</strong>&nbsp;olarak veriyi anlamlandırma ve
              işleme konusunda uzmanlaşmış ekibimizle, kullanıcılarımıza en iyi
              deneyimi sunmak için sürekli olarak yeni çözümler
              geliştirmekteyiz.
            </p>
          </section>
          <br />
          <br />
          <section>
            <h2 className="font-bold mb-1">Misyonumuz</h2>
            <p>
              <strong>rtp sorgu</strong> olarak şeffaflığa olan tutkumuz,
              kullanıcı odaklı yaklaşımımız ve sürekli gelişim anlayışımızla,
              gelecekte de bilgiye dayalı çözümler sunmaya devam edeceğiz.
              Müşterilerimizle kurduğumuz güçlü bağ, başarılarımızın temelini
              oluşturmakta ve bize ilham vermektedir. Siz de bilgiye ulaşmanın
              en güvenilir ve etkili yolu olan RTP Sorgu keşfedin ve farkımızı
              yaşayın.
            </p>
            <br />
            <p>
              RTP Sorgu, bilgiye erişimin önemini bilen ve bu bilgiyi en doğru
              şekilde sunmayı kendine misyon edinmiş bir platformdur. Dijital
              çağın hızla gelişen dünyasında, doğru bilgiye zamanında ulaşmak
              her zamankinden daha önemli hale gelmiştir. Biz de bu doğrultuda,
              bireylerin ve işletmelerin bilgiye erişimlerini kolaylaştırmak ve
              güvenilir veri sağlayıcısı olma hedefiyle çalışmalarımızı
              sürdürüyoruz.
            </p>
            <br />
            <p>
              Kuruluşumuzdan bu yana, kullanıcılarımızın değişen ihtiyaçlarını
              karşılamak ve onlara en iyi hizmeti sunabilmek için sürekli olarak
              kendimizi yeniliyoruz. <strong>RTP Sorgu</strong>, gelişen
              teknolojiyi yakından takip eden ve yeniliklere hızla adapte olan
              bir ekibe sahiptir. Bu sayede, veri işleme, analiz ve raporlama
              süreçlerinde daima en güncel ve etkili yöntemleri kullanarak,
              kullanıcılarımızın beklentilerini karşılamayı ve aşmayı
              başarıyoruz.
            </p>
          </section>
        </section>
      </Container>
      <br />
      <Container>
        <section className="w-3/4 mx-auto my-8 text-justify">
          <h2 className="font-bold mb-1">
            Casino, Bet ve Bahis Sitelerindeki Oyunların RTP Değerlerini Doğru
            Şekilde Sorgulama
          </h2>
          <p>
            RTPSorgu.com olarak, kullanıcılarımızın casino ve bet sitelerindeki
            oyunlar için en doğru RTP (Return to Player) değerlerine ulaşmasını
            sağlıyoruz. RTP, bir oyunun uzun vadede oyunculara geri ödeme
            yüzdesini ifade eder ve bu nedenle oyunların adil olup olmadığını
            anlamak için kritik bir metriktir. Doğru ve güncel RTP değerleri,
            oyuncuların bilinçli kararlar almasına ve oyun tercihlerinde daha
            akıllı seçimler yapmasına yardımcı olur.
          </p>
          <br />
          <p>
            Platformumuz, casino ve bet sitelerindeki oyunların RTP değerlerini
            sorgulamak isteyen kullanıcılar için geniş bir veri tabanı sunar. Bu
            veri tabanı, çeşitli kaynaklardan elde edilen bilgileri bir araya
            getirerek, en güncel ve doğru RTP değerlerini sunmayı amaçlar.
            Kullanıcılarımız, belirli bir oyun veya casino hakkında detaylı
            bilgiye erişebilir ve böylece oyun seçimlerini en güvenilir
            bilgilere dayanarak yapabilirler.
          </p>
          <br />
          <p>
            RTP değerlerinin doğru bir şekilde sorgulanması, oyuncular için
            büyük bir avantaj sağlar. Yüksek RTP değerlerine sahip oyunlar, uzun
            vadede oyuncuların daha fazla kazanma şansını artırır. Ancak, her
            oyun ve her casino farklı olduğu için, kullanıcıların her bir oyun
            için doğru RTP bilgilerine ulaşması önemlidir. RTPSorgu.com, bu
            ihtiyacı karşılamak için tasarlanmış güvenilir ve kapsamlı bir bilgi
            platformudur.
          </p>
          <br />
          <p>
            Ayrıca, casino ve bet sitelerinin sunduğu oyunların RTP değerlerinin
            düzenli olarak güncellenmesi, kullanıcılarımızın her zaman en güncel
            bilgilere ulaşmasını sağlar. Ekibimiz, sürekli olarak veri
            kaynaklarını gözden geçirir ve doğruluğunu kontrol eder, böylece
            kullanıcılarımızın en doğru bilgileri almasını garanti ederiz.
            Amacımız, kullanıcılarımızın güvenilir bilgiye kolayca ulaşmasını ve
            oyun deneyimlerini en iyi şekilde yaşamalarını sağlamaktır.
          </p>
        </section>
      </Container>
      <br />
      <Container>
        <section className="lg:w-3/4 mx-auto my-8 text-justify">
          <h2 className="font-bold mb-1">RTP Sorgu Müşteri Memnuniyeti</h2>
          <p>
            Müşterilerimizin memnuniyetini en ön planda tutarak, sunduğumuz
            hizmetleri sürekli olarak iyileştiriyoruz. Kullanıcılarımızın bize
            duyduğu güveni her geçen gün pekiştirmek için gizlilik, güvenlik ve
            etik değerlerimize bağlı kalarak, tüm süreçlerimizde şeffaflığı ve
            doğruluğu garanti ediyoruz. RTP Sorgu, her bir kullanıcının
            ihtiyacına yönelik özelleştirilmiş çözümler sunarken, inovasyon ve
            gelişimden ödün vermeyen yapısıyla sektörde fark yaratmayı
            sürdürüyor.
          </p>
          <br />
          <p>
            Bizi tercih eden kullanıcılarımıza, bilgiye ulaşmanın yanı sıra, bu
            bilgiyi etkili bir şekilde kullanma becerisi de kazandırmayı
            hedefliyoruz. Misyonumuz, dijital çağda bilginin demokratikleşmesine
            katkıda bulunmak ve her bireyin ve işletmenin bilgiye dayalı
            kararlar almasını kolaylaştırmaktır. Vizyonumuz ise, Türkiye'nin en
            güvenilir ve en çok tercih edilen veri sorgulama platformu olarak,
            ulusal ve uluslararası arenada lider bir konuma ulaşmaktır.
          </p>
        </section>
      </Container>
      <br />
      <br />
    </>
  );
};

export default AboutPage;
