import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import StartProjectForm from "@/components/StartProjectForm";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell Invorious what you're building. A short project brief — no sales pitch, a reply within one business day.",
  openGraph: {
    title: "Start a Project — Invorious Software Agency",
    description: "Tell us what you're building and we'll reply with next steps, not a sales pitch.",
  },
};

const reassurances = [
  { title: "Direct access to engineers", body: "Whoever replies to this form is someone who could actually work on your project." },
  { title: "No sales pitch", body: "We'll tell you honestly if something isn't a fit, or if you don't need us at all." },
  { title: "Reply within 1 business day", body: "You'll hear back with next steps, not a generic acknowledgement." },
];

export default function StartProjectPage() {
  return (
    <>
      <PageHead eyebrow="Start a project" title={<span className="grad-text">Tell us what you&apos;re building.</span>}>
        We&apos;ll reply with next steps, not a sales pitch.
      </PageHead>

      <section className="wrap sec">
        <div className="panel" style={{ display: "block", maxWidth: 760, margin: "0 auto" }}>
          <StartProjectForm />
        </div>
      </section>

      <Reveal className="band">
        <div className="wrap">
          <div className="steps" style={{ marginTop: 0 }}>
            {reassurances.map((r) => (
              <div key={r.title}>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 8 }}>{r.title}</h2>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
