import type { Metadata } from "next";
import Button from "@/components/Button";
import Icon, { type IconName } from "@/components/Icons";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

const description =
  "Technology consulting, Web2 application development and Web3 blockchain engineering, delivered by Invorious's fully remote team.";

export const metadata: Metadata = {
  title: "Services",
  description,
  openGraph: { title: "Services — Invorious Software Agency", description },
};

type Service = {
  id: string;
  icon: IconName;
  label: string;
  title: string;
  body: string;
  items: string[];
  cta: string;
  href: string;
  band?: boolean;
};

const services: Service[] = [
  {
    id: "consulting",
    icon: "target",
    label: "Technology Consulting",
    title: "Plan before you build",
    body: "We assess what you have, what you actually need, and where the two diverge — before any code gets written. The right starting point if you're not yet sure what to build, or need a second opinion on a plan already on the table.",
    items: [
      "Architecture review of an existing system",
      "Technology roadmap and vendor evaluation",
      "Technical due diligence before you invest or acquire",
      "Scoping and estimation for a build you're planning",
    ],
    cta: "Book a consultation",
    href: "/contact",
  },
  {
    id: "web2",
    icon: "monitor",
    label: "Web2 — Apps & Web",
    title: "Products people can rely on",
    body: "Web applications, mobile apps and internal tools, built with production discipline from the first commit — tested, documented, and handed over in a state your own team can maintain.",
    items: [
      "Custom web applications and customer portals",
      "iOS and Android apps",
      "Internal tools and process automation",
      "API design, integrations and legacy modernisation",
    ],
    cta: "Discuss a build",
    href: "/start-a-project",
    band: true,
  },
  {
    id: "web3",
    icon: "layers",
    label: "Web3 — Blockchain",
    title: "Decentralised, done properly",
    body: "Blockchain work carries a different risk profile to a typical web build. We bring the same engineering rigour to smart contracts and on-chain systems as we do everywhere else — nothing shipped that hasn't been reasoned through.",
    items: [
      "Smart contract design, development and audit-readiness",
      "Token systems and on-chain mechanics",
      "Wallet integrations and dApp front ends",
      "Infrastructure for indexing and monitoring on-chain activity",
    ],
    cta: "Talk about your idea",
    href: "/start-a-project",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHead
        eyebrow="Services"
        title={<><span className="grad-text">Three ways</span> to work with Invorious.</>}
      >
        Some projects start with a question, others with a finished spec. Wherever you&apos;re starting from — and
        wherever you are in the world — these are the engagements we run.
      </PageHead>

      <section className="wrap sec" style={{ display: "grid", gap: 28 }}>
        {services.map((s) => (
          <Reveal key={s.id}>
            <article className={`panel ${s.band ? "is-band" : ""}`} id={s.id}>
              <div>
                <p className="label" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name={s.icon} /> {s.label}
                </p>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
                <Button href={s.href} icon="arrow">{s.cta}</Button>
              </div>
              <ul className="deliver-list">
                {s.items.map((item) => (
                  <li key={item} className="deliver">
                    <Icon name="check" className="tick" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="wrap sec">
        <Reveal>
          <div className="cta-panel">
            <div>
              <h2>Have a project in mind?</h2>
              <p>Tell us where you&apos;re at — most projects touch more than one of these.</p>
            </div>
            <Button href="/start-a-project" icon="send">Get in touch</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
