import Container from "@/components/Container";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const EnYuksekRTPOyunlarPage = ({ games }) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="RTP Sorgu | Casino oyunlarının en güncel RTP oranları"
        />
        <meta
          name="keywords"
          content="rtp sorgu, rtpsorgu, rtp, rtp en yüksek oyunlar, rtp öğrenme, rtp ogrenme, en yüksek rtp oyunlar, rtp yüksek siteler, rtp en iyi slot siteler, yüksek rtpli oyunlar, güncel rtp oranları, en yüksek rtp oyunlar, en çok kazandıran oyunlar, oyunlarda rtp, rtp si en yüksek oyunlar, casino rtp, rtp ne demek, rtp nedir, casino oyun rtp, canlı rtp, canlı rtp veritabanı, en iyi rtp oyunlar"
        />
        <title>
          RTP Sorgu | En Yüksek RTP'li Oyunlar | Casino oyunlarının en güncel
          RTP oranları | En Yüksek RTP Slot Siteler | En Yüksek RTP Oyunlar |
          Güncel RTP Oranları | RTP Yüksek Oyunlar
        </title>
      </Head>
      <Container>
        <section className="lg:w-3/4 mx-auto">
          <section className="text-center my-16">
            <h1 className="text-lg font-bold">
              En Yüksek RTP Değerlere Sahip Oyunlar
            </h1>
            <br />
            <p>
              <strong>
                <Link href={"/"} className="text-primary hover:underline">
                  RTPSORGU.com
                </Link>
              </strong>
              &nbsp; olarak, casino oyuncularının en yüksek RTP (Return to
              Player) değerlerine sahip oyunları kolayca bulup sıralayabilmesini
              sağlıyoruz. Platformumuz, kullanıcıların farklı casino oyunlarının
              RTP değerlerini karşılaştırmalarına ve en avantajlı oyunları
              belirlemelerine olanak tanır. Bu, oyuncuların kazanma şanslarını
              artırmak ve oyun deneyimlerini optimize etmek için kritik bir
              araçtır.
            </p>
            <br />
            <p>
              Sitemizde, en yüksek RTP değerlerine sahip oyunları doğru bir
              şekilde sıralamak için gelişmiş bir arama ve filtreleme sistemi
              sunuyoruz. Kullanıcılarımız, istedikleri oyun kategorisini
              seçerek, bu kategoriye ait oyunların RTP değerlerini kolayca
              görebilir ve en yüksekten en düşüğe doğru sıralayabilirler. Bu,
              kullanıcıların zamanlarını en verimli şekilde kullanarak, en karlı
              oyunları hızlı bir şekilde bulmalarını sağlar.
            </p>
            <br />
            <p>
              En yüksek RTP oyunlarını sıralamak, sadece oyuncuların kazanma
              ihtimallerini artırmakla kalmaz, aynı zamanda oyun deneyimini daha
              keyifli hale getirir. Oyuncular, hangi oyunların uzun vadede daha
              iyi geri dönüş sağladığını bilerek, bütçelerini ve stratejilerini
              buna göre planlayabilirler. <strong>RTPSORGU.COM</strong>,
              oyunculara bu önemli bilgiyi doğru ve güncel bir şekilde sunarak,
              bilinçli oyun tercihlerinde bulunmalarını destekler.
            </p>
          </section>
        </section>
        <section className="lg:w-3/4 mx-auto my-16">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 border-b border-gray-200 text-left">Oyun</th>
                <th className="p-4 border-b border-gray-200 text-left">
                  Üretici
                </th>
                <th className="p-4 border-b border-gray-200 text-left">
                  RTP Puanı
                </th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr
                  key={game.id}
                  className={`bg-white ${index % 2 == 0 && "bg-gray-100"}`}
                >
                  <td className="p-4 border-b border-r border-gray-200">
                    <Image
                      src={game.image}
                      width={100}
                      height={100}
                      className="lg:w-1/3 h-auto mb-2"
                      alt={game.name}
                    />
                    <p>{game.name}</p>
                  </td>
                  <td className="p-4 border-b border-r border-gray-200">
                    {game.provider}
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <span className={`${game.rtp >= 95 && "text-green-500"}`}>
                      %{game.rtp}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="lg:w-3/4 mx-auto my-16">
          <p>
            Ayrıca, platformumuzdaki bilgiler sürekli olarak güncellenir ve
            doğruluğu kontrol edilir. Bu sayede kullanıcılarımız, her zaman en
            güncel RTP değerlerine erişebilirler. Kullanıcılarımız, güvenilir
            veri kaynaklarımız sayesinde, en yüksek RTP'ye sahip oyunları
            sıralayarak, oynayacakları oyunu seçerken kendilerini daha güvende
            hissederler. rtpsorgu.com olarak, kullanıcı deneyimini en üst
            düzeyde tutmak ve her zaman doğru bilgiye ulaşılmasını sağlamak için
            çalışıyoruz.
          </p>
          <br />
          <p>
            Sonuç olarak <strong>RTP SORGU</strong>, casino oyunlarında en
            yüksek RTP değerlerine sahip oyunları bulmak ve sıralamak için en
            güvenilir platformlardan biridir. Kullanıcılarımız, platformumuzu
            kullanarak en iyi oyunları keşfedebilir ve oyun deneyimlerini en üst
            seviyeye çıkarabilirler. Siz de rtpsorgu.com'u kullanarak, kazanç
            potansiyelinizi en üst düzeye çıkaracak oyunları kolayca
            bulabilirsiniz.
          </p>
        </section>
        <br />
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/games`);
  const data = await response.json();

  const { games } = data.data;

  return {
    props: {
      games,
    },
  };
}

export default EnYuksekRTPOyunlarPage;
