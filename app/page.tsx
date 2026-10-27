import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import Reveal from "@/components/Reveal";
import Web3Transform from "@/components/Web3Transform";

const stats = [
  { value: "2021", label: "Founded in Sydney" },
  { value: "Remote", label: "A senior team working from all over the world" },
  { value: "3", label: "Specialties: consulting, Web2, Web3" },
  { value: "1:1", label: "Direct access to your engineers" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero-wrap">
        <div className="wrap hero">
          <div className="hero-content">
            <div className="hero-badge">✦ Fully remote · Worldwide</div>
            <h1>
              <span className="grad-text">Tailored software,</span> built to fit how your business actually runs.
            </h1>
            <p>
              Invorious designs and builds custom web, mobile and blockchain systems, delivered by a fully remote
              team working from all over the world — from first architecture sketch to production. Trust us to help
              you succeed through technology.
            </p>
            <div className="hero-actions">
              <Button href="/start-a-project" icon="send">Start a project</Button>
              <Button href="/services" variant="outline">See our services</Button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-stage">
              <Web3Transform />
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec" id="what-we-do">
        <div className="section-header">
          <h2>What we do</h2>
          <p>Three ways we work with you — wherever in the world you are.</p>
        </div>
        <div className="grid-auto">
          <FeatureCard icon="target" title="Plan before you build" label="Technology Consulting">
            Architecture reviews, technology roadmaps and technical due diligence, so the build you commission is
            the one your business actually needs.
          </FeatureCard>
          <FeatureCard icon="monitor" title="Products people can rely on" label="Web2 — Apps & Web">
            Custom web applications, mobile apps and internal tools, engineered for performance, maintainability and
            growth.
          </FeatureCard>
          <FeatureCard icon="layers" title="Decentralised, done properly" label="Web3 — Blockchain">
            Smart contracts, token systems and blockchain-backed applications, built with the same engineering
            discipline as everything else we ship.
          </FeatureCard>
          <FeatureCard icon="globe" title="Fully remote, worldwide" label="How we work">
            Our engineers and consultants are spread across the world, so the right person works on your project —
            wherever they happen to be.
          </FeatureCard>
        </div>
      </section>

      <Reveal className="band">
        <div className="wrap band-grid">
          <div>
            <p className="label">Since 2021</p>
            <h2>Client-centred, by design.</h2>
            <p style={{ marginTop: 12 }}>
              We&apos;re a fully remote, senior team spread across the world — which means the people who scope your
              project are the people who build it.
            </p>
          </div>
          <div className="stat-grid">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <section className="wrap sec">
        <Reveal>
          <div className="cta-panel">
            <div>
              <h2>Have a project in mind?</h2>
              <p>Tell us what you&apos;re building. We&apos;ll reply with next steps, not a sales pitch.</p>
            </div>
            <Button href="/start-a-project" icon="send">Start a project</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
