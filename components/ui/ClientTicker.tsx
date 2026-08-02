"use client";

import Image from "next/image";
import { useState } from "react";

const clientLogos = [
  { src: "/client-logo/469109324_1054813596390525_7011595173389971614_n.jpg", name: "ALMA" },
  { src: "/client-logo/504411284_17843496099523793_8722200315794794383_n.jpg", name: "Boyle Lifesciences" },
  { src: "/client-logo/554531341_17897688351295008_2335334425982266873_n.jpg", name: "Mysore Dasara" },
  { src: "/client-logo/babio-01.jpg", name: "Babio" },
  { src: "/client-logo/central javaji logo.png", name: "Central Javaji" },
  { src: "/client-logo/Chennamma Ajji Logo-03 muti no bg.png", name: "Chennamma Ajji" },
  { src: "/client-logo/jal mahal logo.png", name: "Jal Mahal" },
  { src: "/client-logo/javaji mixx logo.png", name: "Javaji Mixx" },
  { src: "/client-logo/Madur Tiffanys Logo_page-0001.jpg", name: "Maddur Tiffanys" },
  { src: "/client-logo/mothi ceramics.png", name: "Mothi Ceramics" },
  { src: "/client-logo/Open_Graph.webp", name: "Novel" },
  { src: "/client-logo/photo_1_2025-11-02_00-58-06.jpg", name: "Hotel Grand Serene" },
  { src: "/client-logo/photo_2025-11-02_00-57-54.jpg", name: "The Grand Elite" },
  { src: "/client-logo/photo_2_2025-11-02_00-58-06.jpg", name: "The Scenic" },
  { src: "/client-logo/photo_3_2025-11-02_00-58-06.jpg", name: "Ignite Lounge Bar & Kitchen" },
  { src: "/client-logo/REGENTA CENTRAL HERALD LOGO.png", name: "Regenta Central Herald" },
  { src: "/client-logo/Sharada_page-0001.jpg", name: "Sharada" },
  { src: "/client-logo/WhatsApp Image 2026-07-25 at 2.54.44 AM.jpeg", name: "Hotel Grand Central" },
] as const;

type Client = (typeof clientLogos)[number];
type Preview = { client: Client; left: number; top: number };

function ClientGroup({ hidden = false, onPreview }: { hidden?: boolean; onPreview: (preview: Preview | null) => void }) {
  return (
    <div className="client-strip__group" aria-hidden={hidden || undefined}>
      {clientLogos.map((client) => (
        <div
          className="client-strip__logo"
          key={client.src}
          onMouseEnter={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            onPreview({ client, left: rect.left + rect.width / 2, top: rect.top + rect.height / 2 });
          }}
          onMouseLeave={() => onPreview(null)}
        >
          <Image src={client.src} alt={hidden ? "" : client.name} fill sizes="160px" />
        </div>
      ))}
    </div>
  );
}

export function ClientTicker() {
  const [preview, setPreview] = useState<Preview | null>(null);

  return (
    <section className="client-strip" aria-label="Selected clients">
      <span>Selected clients</span>
      <div className="client-strip__viewport" tabIndex={0} aria-label="Client logos">
        <div className="client-strip__track"><ClientGroup onPreview={setPreview} /><ClientGroup hidden onPreview={setPreview} /></div>
      </div>
      <aside
        className={`client-preview${preview ? " is-visible" : ""}`}
        aria-hidden={!preview}
        style={preview ? { left: preview.left, top: preview.top } : undefined}
      >
        {preview && <Image src={preview.client.src} alt="" fill sizes="360px" />}
      </aside>
    </section>
  );
}
