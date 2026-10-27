"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Field from "./Field";
import FormError from "./FormError";
import Icon from "./Icons";
import { useModal } from "./useModal";
import type { Applicant } from "./ResumeDialog";
import { CAREERS_INBOX, EMAIL_RE, sendToInbox } from "@/lib/forms";
import { GENERAL_ROLE, TRACKS, roleTitles, type Role } from "@/lib/roles";

type Form = { role: string; track: string; name: string; email: string; portfolio: string; message: string };
type Status = "idle" | "sending" | "error";

export default function ApplyDialog({ role, onClose, onSent }: { role: Role; onClose: () => void; onSent: (applicant: Applicant) => void }) {
  const isGeneral = role.slug === GENERAL_ROLE.slug;
  const dialogRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<Form>({
    role: isGeneral ? GENERAL_ROLE.title : role.title,
    track: TRACKS[0],
    name: "",
    email: "",
    portfolio: "",
    message: "",
  });
  const [hp, setHp] = useState(""); // honeypot — real applicants never see or fill it
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  const onKeyDown = useModal(dialogRef, onClose, "input[name='name']");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const c: Form = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      portfolio: form.portfolio.trim(),
      message: form.message.trim(),
    };

    const next: Record<string, string> = {};
    if (c.name.length < 2) next.name = "Enter your full name.";
    if (!EMAIL_RE.test(c.email)) next.email = "Enter a valid email address.";
    if (c.portfolio.length < 3) next.portfolio = "Add a link to your portfolio, GitHub, LinkedIn or ENS.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (hp) {
      onSent({ name: c.name, role: c.role, track: c.track }); // a bot filled the hidden field — pretend it worked, send nothing
      return;
    }

    setStatus("sending");
    const result = await sendToInbox(CAREERS_INBOX, `Application — ${c.role} (${c.track}) — ${c.name}`, {
      name: c.name,
      email: c.email,
      role: c.role,
      track: `${c.track} (fully remote)`,
      portfolio: c.portfolio,
      message: c.message || "—",
      resume: `To be sent separately to ${CAREERS_INBOX}`,
    });

    if (result.ok) {
      onSent({ name: c.name, role: c.role, track: c.track });
    } else {
      setFailure(result.error);
      setStatus("error");
    }
  }

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        onKeyDown={onKeyDown}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="dialog-header">
          <h3 id="apply-title">{role.title}</h3>
          <button type="button" className="dialog-close" onClick={onClose} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>

        <>
            <div className="job-desc">
              <h4><Icon name="file" /> About the role</h4>
              <p>{role.about}</p>

              {role.responsibilities.length > 0 && (
                <>
                  <h4><Icon name="target" /> What you&apos;ll do</h4>
                  <ul>{role.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
                </>
              )}
              {role.ideal && (
                <>
                  <h4><Icon name="users" /> Ideal candidate</h4>
                  <p>{role.ideal}</p>
                </>
              )}
              {!isGeneral && (
                <>
                  <h4><Icon name="briefcase" /> Compensation · fully remote</h4>
                  <div className="track-grid">
                    <div className="track"><b>Full-time</b><span>{role.compensation}</span></div>
                    <div className="track"><b>Contract</b><span>{role.contract}</span></div>
                    <div className="track"><b>Internship</b><span>{role.internship}</span></div>
                  </div>
                  <div className="tag-list">
                    {role.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </>
              )}
              {isGeneral && (
                <div className="tag-list">
                  <span className="chip"><Icon name="globe" /> Fully remote</span>
                  <span className="chip">Full-time</span>
                  <span className="chip">Contract</span>
                  <span className="chip">Internship</span>
                </div>
              )}
            </div>

            <div className="apply-title"><Icon name="pen" /> Application form</div>

            <form onSubmit={onSubmit} noValidate>
              <div className="hp" aria-hidden="true">
                <label htmlFor="a-website">Leave this field empty</label>
                <input id="a-website" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
              </div>

              {isGeneral && (
                <Field id="a-role" label="Role you're most interested in">
                  <select id="a-role" className="input" value={form.role} onChange={(e) => set("role", e.target.value)}>
                    {roleTitles.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
              )}

              <Field id="a-track" label="How would you like to work with us?">
                <select id="a-track" className="input" value={form.track} onChange={(e) => set("track", e.target.value)}>
                  {TRACKS.map((t) => <option key={t} value={t}>{t} · fully remote</option>)}
                </select>
              </Field>
              <Field id="a-name" label="Full name *" error={errors.name}>
                <input id="a-name" name="name" type="text" className="input" autoComplete="name" maxLength={100} placeholder="Your full name"
                  value={form.name} onChange={(e) => set("name", e.target.value)}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? "a-name-err" : undefined} />
              </Field>
              <Field id="a-email" label="Email *" error={errors.email}>
                <input id="a-email" type="email" className="input" autoComplete="email" maxLength={254} placeholder="you@example.com"
                  value={form.email} onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "a-email-err" : undefined} />
              </Field>
              <Field id="a-portfolio" label="Portfolio / GitHub / LinkedIn / ENS *" error={errors.portfolio}>
                <input id="a-portfolio" type="text" className="input" maxLength={300} placeholder="https://github.com/you"
                  value={form.portfolio} onChange={(e) => set("portfolio", e.target.value)}
                  aria-invalid={!!errors.portfolio} aria-describedby={errors.portfolio ? "a-portfolio-err" : undefined} />
              </Field>
              <Field id="a-message" label="Why Invorious? (optional)">
                <textarea id="a-message" className="input" rows={4} maxLength={3000}
                  placeholder="Tell us a bit about yourself and what you'd like to work on…"
                  value={form.message} onChange={(e) => set("message", e.target.value)} />
              </Field>

              <div className="notice">
                <Icon name="mail" style={{ marginTop: 3 }} />
                <span>
                  Please send your resume separately to <a href={`mailto:${CAREERS_INBOX}`}>{CAREERS_INBOX}</a> — we&apos;ll
                  remind you again after you submit.
                </span>
              </div>

              {status === "error" && <FormError what="application" inbox={CAREERS_INBOX} detail={failure} />}

              <div className="dialog-actions">
                <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={status === "sending"}>
                  <Icon name="send" /> {status === "sending" ? "Sending…" : "Send application"}
                </button>
              </div>
            </form>
        </>
      </motion.div>
    </motion.div>
  );
}
