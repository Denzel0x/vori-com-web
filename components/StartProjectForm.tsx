"use client";

import { useState } from "react";
import Field from "./Field";
import FormError, { type Failure } from "./FormError";
import Icon from "./Icons";
import { CLIENT_INBOX, EMAIL_RE, sendToInbox } from "@/lib/forms";

const projectTypes = [
  "Technology Consulting",
  "Web2 — Apps & Web",
  "Web3 — Blockchain",
  "Other / not sure yet",
];
const budgets = ["Under $20k", "$20k – $50k", "$50k – $150k", "$150k+", "Not sure yet"];
const timelines = ["ASAP", "Within 1–3 months", "3–6 months", "No fixed timeline"];
const steps = ["About you", "Project type", "Project details"];

type Values = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
};

const initial: Values = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: budgets[0],
  timeline: timelines[0],
  description: "",
};

type Status = "idle" | "sending" | "sent" | "error";

export default function StartProjectForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Values>(initial);
  const [hp, setHp] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<Failure | null>(null);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function validate(current: number): boolean {
    const e: Record<string, string> = {};
    if (current === 0) {
      if (data.name.trim().length < 2) e.name = "Enter your name.";
      if (!EMAIL_RE.test(data.email.trim())) e.email = "Enter a valid email address.";
    }
    if (current === 1 && !data.projectType) e.projectType = "Choose a project type.";
    if (current === 2 && data.description.trim().length < 20) e.description = "Add a few sentences (20 characters minimum).";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validate(2)) return;
    if (hp) {
      setStatus("sent"); // bot — pretend it worked, send nothing
      return;
    }
    const d = { ...data, name: data.name.trim(), email: data.email.trim(), company: data.company.trim(), description: data.description.trim() };

    setStatus("sending");
    const result = await sendToInbox(
      CLIENT_INBOX,
      `Project brief — ${d.projectType} — ${d.name}${d.company ? ` (${d.company})` : ""}`,
      {
        name: d.name,
        email: d.email,
        company: d.company || "—",
        project_type: d.projectType,
        budget_usd: d.budget,
        timeline: d.timeline,
        description: d.description,
      }
    );
    if (result.ok) {
      setStatus("sent");
    } else {
      setFailure({ error: result.error, status: result.status, fallbackHref: result.fallbackHref });
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="success" role="status" aria-live="polite">
        <span className="badge"><Icon name="check" /></span>
        <h3>Thanks, {data.name.trim().split(" ")[0] || "there"}.</h3>
        <p>
          We&apos;ve got your project details and will reply within one business day — with next steps, not a
          sales pitch.
        </p>
      </div>
    );
  }

  const last = step === steps.length - 1;

  return (
    <div>
      <ol className="progress" aria-label="Progress">
        {steps.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined}>
            <span className={`dot ${i <= step ? "on" : ""}`}>{i + 1}</span>
            <span className={i === step ? "cur" : ""}>{label}</span>
            {i < steps.length - 1 && <span className="bar" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (last) submit();
          else if (validate(step)) setStep((s) => s + 1);
        }}
      >
        <div className="hp" aria-hidden="true">
          <label htmlFor="sp-website">Leave this field empty</label>
          <input id="sp-website" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>

        {step === 0 && (
          <>
            <Field id="sp-name" label="Name" error={errors.name}>
              <input id="sp-name" type="text" className="input" autoComplete="name" maxLength={100} value={data.name}
                onChange={(e) => update("name", e.target.value)} aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "sp-name-err" : undefined} />
            </Field>
            <Field id="sp-email" label="Email" error={errors.email}>
              <input id="sp-email" type="email" className="input" autoComplete="email" maxLength={254} value={data.email}
                onChange={(e) => update("email", e.target.value)} aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "sp-email-err" : undefined} />
            </Field>
            <Field id="sp-company" label="Company (optional)">
              <input id="sp-company" type="text" className="input" autoComplete="organization" maxLength={150} value={data.company}
                onChange={(e) => update("company", e.target.value)} />
            </Field>
          </>
        )}

        {step === 1 && (
          <fieldset style={{ border: 0, padding: 0 }}>
            <legend className="label" style={{ marginBottom: 14 }}>What kind of project is this?</legend>
            <div className="choice-grid">
              {projectTypes.map((t) => (
                <label key={t} className={`choice ${data.projectType === t ? "on" : ""}`}>
                  <input type="radio" name="projectType" value={t} checked={data.projectType === t}
                    onChange={(e) => update("projectType", e.target.value)} />
                  {t}
                </label>
              ))}
            </div>
            {errors.projectType && <p className="err" role="alert">{errors.projectType}</p>}
          </fieldset>
        )}

        {step === 2 && (
          <>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
              <Field id="sp-budget" label="Budget (USD)">
                <select id="sp-budget" className="input" value={data.budget} onChange={(e) => update("budget", e.target.value)}>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
              <Field id="sp-timeline" label="Timeline">
                <select id="sp-timeline" className="input" value={data.timeline} onChange={(e) => update("timeline", e.target.value)}>
                  {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <Field id="sp-description" label="What are you building?" error={errors.description}>
              <textarea id="sp-description" className="input" rows={5} maxLength={4000} value={data.description}
                onChange={(e) => update("description", e.target.value)} aria-invalid={!!errors.description}
                aria-describedby={errors.description ? "sp-description-err" : undefined} />
            </Field>
          </>
        )}

        <div className="form-actions">
          <button type="button" className="link-btn" onClick={() => { setErrors({}); setStep((s) => Math.max(s - 1, 0)); }}
            style={{ visibility: step === 0 ? "hidden" : "visible" }}>
            Back
          </button>
          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {last ? (<><Icon name="send" /> {status === "sending" ? "Sending…" : "Send project details"}</>) : (<>Continue <Icon name="arrow" /></>)}
          </button>
        </div>
        {status === "error" && <FormError what="project details" inbox={CLIENT_INBOX} failure={failure} />}
      </form>
    </div>
  );
}
