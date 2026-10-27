"use client";

import { useState, type FormEvent } from "react";
import Field from "./Field";
import FormError from "./FormError";
import Icon from "./Icons";
import { CLIENT_INBOX, EMAIL_RE, sendToInbox } from "@/lib/forms";

const projectTypes = ["Technology Consulting", "Web2 — Apps & Web", "Web3 — Blockchain", "Not sure yet"];

type Values = { name: string; email: string; company: string; projectType: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

const empty: Values = { name: "", email: "", company: "", projectType: projectTypes[0], message: "" };

export default function ContactForm() {
  const [v, setV] = useState<Values>(empty);
  const [hp, setHp] = useState(""); // honeypot — real visitors never see or fill it
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");

  const set = <K extends keyof Values>(key: K, value: Values[K]) => setV((x) => ({ ...x, [key]: value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const c: Values = { ...v, name: v.name.trim(), email: v.email.trim(), company: v.company.trim(), message: v.message.trim() };

    const next: Record<string, string> = {};
    if (c.name.length < 2) next.name = "Enter your name.";
    if (!EMAIL_RE.test(c.email)) next.email = "Enter a valid email address.";
    if (c.message.length < 10) next.message = "Add a few details about your project.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (hp) {
      setStatus("sent"); // a bot filled the hidden field — pretend it worked and send nothing
      return;
    }

    setStatus("sending");
    const result = await sendToInbox(CLIENT_INBOX, `Contact — ${c.projectType} — ${c.name}`, {
      name: c.name,
      email: c.email,
      company: c.company || "—",
      project_type: c.projectType,
      message: c.message,
    });

    if (result.ok) {
      setV(empty);
      setStatus("sent");
    } else {
      setFailure(result.error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="success" role="status" aria-live="polite">
        <span className="badge"><Icon name="check" /></span>
        <h3>Message sent</h3>
        <p>Thanks — we&apos;ve got your message and will reply soon.</p>
        <div className="form-actions" style={{ justifyContent: "center" }}>
          <button type="button" className="link-btn" onClick={() => setStatus("idle")}>Send another message</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-website">Leave this field empty</label>
        <input id="c-website" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>

      <Field id="c-name" label="Name" error={errors.name}>
        <input id="c-name" type="text" className="input" placeholder="Your name" autoComplete="name" maxLength={100}
          value={v.name} onChange={(e) => set("name", e.target.value)}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined} />
      </Field>
      <Field id="c-email" label="Email" error={errors.email}>
        <input id="c-email" type="email" className="input" placeholder="you@company.com" autoComplete="email" maxLength={254}
          value={v.email} onChange={(e) => set("email", e.target.value)}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined} />
      </Field>
      <Field id="c-company" label="Company (optional)">
        <input id="c-company" type="text" className="input" autoComplete="organization" maxLength={150}
          value={v.company} onChange={(e) => set("company", e.target.value)} />
      </Field>
      <Field id="c-type" label="Project type">
        <select id="c-type" className="input" value={v.projectType} onChange={(e) => set("projectType", e.target.value)}>
          {projectTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field id="c-message" label="What are you building?" error={errors.message}>
        <textarea id="c-message" className="input" placeholder="Tell us about your project…" maxLength={4000}
          value={v.message} onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined} />
      </Field>

      <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={status === "sending"}>
        <Icon name="send" /> {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && <FormError what="message" inbox={CLIENT_INBOX} detail={failure} />}
    </form>
  );
}
