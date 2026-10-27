import type { Metadata } from "next";
import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

const description =
  "Invorious is a fully remote custom software agency, founded in Sydney in 2021, built around a client-centred approach to technology consulting, Web2 and Web3 development.";

export const metadata: Metadata = {
  title: "About",
  description,
  openGraph: {
    title: "About — Invorious Software Agency",
    description:
      "Founded in Sydney in 2021, Invorious is a fully remote, senior team working from around the world across technology consulting, Web2 and Web3 development.",
  },
};

const stats = [
  { value: "2021", label: "Founded in Sydney" },
  { value: "Remote", label: "A senior team working from all over the world" },
  { value: "3", label: "Specialties: consulting, Web2, Web3" },
  { value: "1:1", label: "Direct access to your engineers" },
];

export default function AboutPage() {
  return (
    <>
      <PageHead eyebrow="About" title={<span className="grad-text">Client-centred, by design.</span>}>
        Invorious was founded in Sydney in 2021 to work differently to the agencies and consultancies we&apos;d come
        up through: fewer layers between the client and the people doing the work, a refusal to hand over a build
        without making sure it actually fits the business it was built for, and a fully remote team so we can work
        with the best people wherever they happen to be.
      </PageHead>

      <section className="wrap sec">
        <div className="split">
          <div>
            <p className="label">Our story</p>
            <h2 className="h2-grad">Why Invorious exists</h2>
          </div>
          <div>
            <p>
              That founding idea has stayed true as we&apos;ve grown into a fully remote team spanning technology
              consulting, Web2 application development and Web3 engineering. We hire the right person for the work,
              wherever in the world they&apos;re based, rather than limiting ourselves to one city.
            </p>
            <p>
              Our team is spread across the world, working remotely — headquartered in Sydney, with a second location in
              Bogotá, Colombia. We&apos;d rather introduce you to the people who&apos;d actually work on your project during
              a first call than fill this page with headshots and titles.
            </p>
          </div>
        </div>
      </section>

      <Reveal className="band">
        <div className="wrap band-grid">
          <div>
            <p className="label">Since 2021</p>
            <h2>Remote by design, not by accident.</h2>
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
        <div className="section-header">
          <h2>How we work remotely</h2>
          <p>Being everywhere is a feature — as long as the way we work is deliberate.</p>
        </div>
        <div className="grid-auto">
          <FeatureCard icon="globe" title="Worldwide talent">
            We hire for the work, not the postcode — so your project gets the right specialist, not just the nearest one.
          </FeatureCard>
          <FeatureCard icon="clock" title="Async by default">
            Clear written handoffs and documentation, with live overlap scheduled when it genuinely helps.
          </FeatureCard>
          <FeatureCard icon="shield" title="Accountable delivery">
            One accountable lead per project and a codebase handed over in a state your team can maintain.
          </FeatureCard>
        </div>
      </section>

      <section className="wrap sec">
        <div className="section-header">
          <h2>Client-centred, in practice</h2>
          <p>What that actually means day to day.</p>
        </div>
        <div className="grid-auto">
          <FeatureCard icon="target" title="We scope before we estimate">
            A number without a shared understanding of the problem isn&apos;t useful to either of us. We take the time to
            understand what you&apos;re solving for first.
          </FeatureCard>
          <FeatureCard icon="users" title="You talk to the people building it">
            There&apos;s no account layer between you and the engineers. Questions get answered by someone who can
            actually answer them.
          </FeatureCard>
          <FeatureCard icon="file" title="We hand over systems, not black boxes">
            Documentation, clean commits and a codebase your future team — or ours — can pick up without a
            translation layer.
          </FeatureCard>
        </div>
      </section>

      <section className="wrap sec">
        <Reveal>
          <div className="cta-panel">
            <div>
              <h2>Want to work with us?</h2>
              <p>The best way to get to know us is to tell us what you&apos;re building.</p>
            </div>
            <Button href="/start-a-project" icon="send">Start a project</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
