import Link from "next/link";

const steps = [
  ["01", "Audit", "We look at your current content, reach and conversion gaps."],
  ["02", "Plan", "We agree on priorities, deliverables and the measures that matter."],
  ["03", "Produce", "Our studio creates the content, campaigns and creator briefs."],
  ["04", "Optimise", "We review performance and use the learning to improve the next cycle."],
] as const;

export function HowWeWork() {
  return <section className="how-we-work"><header><span className="kicker">How we work</span><h2>ONE TEAM.<br /><i>ONE CLEAR PLAN.</i></h2><p>From the first audit to the next round of work, Media Mingles keeps strategy, production and growth in the same room.</p></header><ol>{steps.map(([number, title, copy]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><Link className="text-link" href="/contact#audit">Start with a free audit ↗</Link></section>;
}
