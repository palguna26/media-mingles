import { clients } from "@/data/site";

function ClientGroup({ hidden = false }: { hidden?: boolean }) {
  return <div className="client-strip__group" aria-hidden={hidden || undefined}>{clients.map(client => <strong key={client}>{client}</strong>)}</div>;
}

export function ClientTicker() {
  return <section className="client-strip" aria-label="Selected clients">
    <span>Selected clients</span>
    <div className="client-strip__viewport" tabIndex={0} aria-label="Client list">
      <div className="client-strip__track"><ClientGroup /><ClientGroup hidden /></div>
    </div>
  </section>;
}
