import type { Metadata } from "next";
import Button from "@/components/Button";
import CareerBoard from "@/components/CareerBoard";
import FeatureCard from "@/components/FeatureCard";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Invorious, a fully remote team working from all over the world. Open roles: Smart Contract Engineer, Protocol Engineer, Web3 Frontend Engineer, Go/Rust Infrastructure Engineer, Web3 Backend Engineer, Marketing Manager — full-time, contract or internship.",
  openGraph: {
    title: "Careers — Invorious Software Agency",
    description:
      "Open roles across smart contracts, protocol engineering, Web3 frontend/backend, infrastructure and marketing — full-time, contract and internship tracks, all fully remote.",
  },
};

export default function CareersPage() {
  return (
    <>
      <PageHead
        eyebrow="Careers"
        title={<><span className="grad-text">Join a fully remote team,</span> working from all over the world.</>}
      >
        Invorious is a fully remote team — our engineers and consultants are spread across the world, not sitting in
        a single office. If that sounds like how you&apos;d rather work, we&apos;d like to hear from you.
      </PageHead>

      <section className="wrap sec">
        <div className="section-header">
          <h2>What it&apos;s like to work here</h2>
          <p>Remote-first, client-facing and varied.</p>
        </div>
        <div className="grid-auto">
          <FeatureCard icon="globe" title="Fully remote">
            We&apos;re a team spread across the world, not a Sydney office — work from wherever you do your best work.
          </FeatureCard>
          <FeatureCard icon="users" title="Direct client contact">
            You&apos;ll talk to the businesses you&apos;re building for, not just a manager.
          </FeatureCard>
          <FeatureCard icon="layers" title="Breadth">
            Move between consulting, Web2 and Web3 work instead of staying in one lane.
          </FeatureCard>
          <FeatureCard icon="briefcase" title="Flexible engagement">
            Every role is open full-time, contract or internship — pick what fits how you want to work.
          </FeatureCard>
        </div>
      </section>

      <section className="wrap sec" id="open-roles">
        <div className="section-header">
          <h2>Open roles</h2>
          <p>
            Every role is open as a full-time hire, a contract engagement or a paid internship — all fully remote,
            wherever in the world you&apos;re based. Hit Apply for the full description, compensation (USD) and the
            application form. Applications are sent straight to us — and please send your resume separately to
            career@invorious.com.
          </p>
        </div>
        <CareerBoard />
      </section>

      <Reveal className="band">
        <div className="wrap">
          <p className="label">How applying works</p>
          <h2>Three steps, no cover letter required.</h2>
          <div className="steps">
            <div>
              <span className="step-num">1</span>
              <p>Pick a role and whether you&apos;d like to join full-time, on contract or as an intern.</p>
            </div>
            <div>
              <span className="step-num">2</span>
              <p>Fill in the short form and send it — it goes straight to us, no email app needed.</p>
            </div>
            <div>
              <span className="step-num">3</span>
              <p>
                Please send your resume separately to{" "}
                <a href="mailto:career@invorious.com" style={{ textDecoration: "underline" }}>career@invorious.com</a>.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="wrap sec">
        <Reveal>
          <div className="cta-panel">
            <div>
              <h2>Hiring for a client project?</h2>
              <p>If you&apos;re a business rather than a candidate, this isn&apos;t the form you want.</p>
            </div>
            <Button href="/start-a-project" icon="send">Start a project</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
