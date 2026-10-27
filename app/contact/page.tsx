import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icons";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Invorious Software Agency — call 0426 576 625, email hello@invorious.com, or send us a message about your project.",
  openGraph: {
    title: "Contact — Invorious Software Agency",
    description:
      "Call 0426 576 625, email hello@invorious.com, or send us a message. Headquartered in Sydney, NSW, with a second location in Bogotá, Colombia; delivered by a fully remote team.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHead eyebrow="Contact" title={<span className="grad-text">Let&apos;s talk.</span>}>
        We reply to every message ourselves — no sales queue.
      </PageHead>

      <section className="wrap sec">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get in touch</h2>
            <p>
              We&apos;re always open to discussing new projects, ideas, or ways we can help — wherever you are in the
              world.
            </p>
            <div className="contact-detail">
              <span className="ico"><Icon name="mail" /></span>
              <span><small>Email</small><a href="mailto:hello@invorious.com">hello@invorious.com</a></span>
            </div>
            <div className="contact-detail">
              <span className="ico"><Icon name="phone" /></span>
              <span><small>Phone</small><a href="tel:0426576625">0426 576 625</a></span>
            </div>
            <div className="contact-detail">
              <span className="ico"><Icon name="pin" /></span>
              <span><small>Headquarters</small>Sydney, NSW, Australia</span>
            </div>
            <div className="contact-detail">
              <span className="ico"><Icon name="pin" /></span>
              <span><small>Second location</small>Bogotá, Colombia</span>
            </div>
            <div className="contact-detail">
              <span className="ico"><Icon name="globe" /></span>
              <span><small>Team</small>Fully remote, worldwide</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
