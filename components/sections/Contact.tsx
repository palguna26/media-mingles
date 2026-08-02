import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  return <section id="contact" className="contact"><span className="contact__label">Have a brief? Let&apos;s make noise.</span><h2>YOUR NEXT CAMPAIGN<br />SHOULD NOT LOOK <i>SAFE.</i></h2><p>Tell us what you are building. We will tell you how to make people care.</p><MagneticButton href="mailto:hello@mediamingles.com" circle>Start a<br />project</MagneticButton><div className="contact__links"><a href="mailto:hello@mediamingles.com">Email ↗</a><a href="#">WhatsApp ↗</a><a href="#">Instagram ↗</a></div></section>;
}
