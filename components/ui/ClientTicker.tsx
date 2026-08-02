import { clients } from "@/data/site";
export function ClientTicker() { return <section className="client-ticker" aria-label="Selected clients"><span>Trusted by</span><div><div>{[...clients, ...clients].map((client, i) => <strong key={`${client}-${i}`}>{client}</strong>)}</div></div></section>; }
