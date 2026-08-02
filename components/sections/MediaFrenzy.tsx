import Image from "next/image";

const campaigns = [
  { image: "/extra-images/content creators page.png", service: "Influencer Marketing", title: "Content Creators" },
  { image: "/extra-images/Digital Marketing ™️ @mediamingles.png", service: "Brand Strategy", title: "Digital Marketing" },
  { image: "/extra-images/unfold your brand.png", service: "Production", title: "Unfold Your Brand" },
  { image: "/extra-images/website.png", service: "Web & SEO", title: "Sites That Build Brands" },
] as const;

export function MediaFrenzy() {
  return (
    <section className="campaigns" aria-labelledby="campaigns-title">
      <header className="campaigns__head">
        <span>Selected campaigns</span>
        <h2 id="campaigns-title">Every service, shot as a story.</h2>
        <p>Each campaign below is one of our services in practice — strategy, production and distribution handled by the same room.</p>
      </header>
      <div className="campaigns__grid">
        {campaigns.map((campaign) => (
          <article className="campaign-card" key={campaign.image} data-cursor="VIEW">
            <Image src={campaign.image} alt={`${campaign.title} campaign poster`} fill sizes="(max-width: 767px) 78vw, (max-width: 1100px) 44vw, 24vw" />
            <div className="campaign-card__shade" />
            <div className="campaign-card__copy"><span>{campaign.service}</span><h3>{campaign.title}</h3></div>
          </article>
        ))}
      </div>
    </section>
  );
}
