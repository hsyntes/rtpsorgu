import Head from "next/head";

const ContentPage = ({ content }) => (
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
      <meta name="description" content="Misbahis guncel giriş adresi" />
      <meta
        name="keywords"
        content="misbahis, misbahis giriş, misbahis güncel giriş, mis bahis giriş, misbahis güncel giriş adresi, misbahis twitter"
      />
      <meta property="twitter:image" content="Twitter link preview image URL" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content="Twitter link preview title" />
      <meta
        property="twitter:description"
        content="Twitter link preview description"
      />
      <meta property="og:image" content="Link preview image URL" />
      <meta property="og:title" content="Link preview title" />
      <meta property="og:description" content="Link preview description" />
      <title>
        RTP Sorgu | Casino oyunlarının en güncel RTP oranları | En Yüksek RTP
        Slot Siteler | En Yüksek RTP Oyunlar | Güncel RTP Oranları | RTP Yüksek
        Oyunlar
      </title>
    </Head>
    <section>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-1">{content.content_title}</h2>
        <p className="mb-3">{content.content_description}</p>
        {content?.content_headings?.map((content_heading) => (
          <p className="mb-3 last:mb-9" key={content_heading._id}>
            {content_heading.paragraph}
          </p>
        ))}
      </section>
    </section>
  </>
);

export async function getServerSideProps({ query }) {
  const { contentId } = query;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/contents/${contentId}`
  );

  const data = await response.json();

  return {
    props: {
      content: data.data.content,
    },
  };
}

export default ContentPage;
