"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icons";
import { useModal } from "./useModal";
import { CAREERS_INBOX } from "@/lib/forms";

export type Applicant = { name: string; role: string; track: string };

/** Second dialog, shown right after an application is sent: tells the candidate to email their resume separately. */
export default function ResumeDialog({ applicant, onClose }: { applicant: Applicant; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onKeyDown = useModal(dialogRef, onClose, "[data-autofocus]");
  const [copied, setCopied] = useState<"" | "address" | "subject" | "failed">("");

  const subject = `Resume — ${applicant.role} (${applicant.track}) — ${applicant.name}`;
  const mailto = `mailto:${CAREERS_INBOX}?subject=${encodeURIComponent(subject)}`;

  async function copy(text: string, which: "address" | "subject") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
    } catch {
      setCopied("failed");
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
        aria-labelledby="resume-title"
        onKeyDown={onKeyDown}
        style={{ maxWidth: 560 }}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="dialog-header">
          <p className="chip" style={{ alignSelf: "center" }}><Icon name="check" /> Application sent</p>
          <button type="button" className="dialog-close" onClick={onClose} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>

        <h3 id="resume-title" style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.2, margin: "10px 0 8px" }}>
          One more step, {applicant.name.split(" ")[0]}: send your resume
        </h3>
        <p style={{ color: "rgb(var(--dim))" }}>
          Your application for <strong style={{ color: "rgb(var(--fg))" }}>{applicant.role}</strong> ({applicant.track},
          fully remote) is with us. Please send your resume <strong style={{ color: "rgb(var(--fg))" }}>separately</strong> to
          our company email:
        </p>

        <div className="addr">
          <a href={mailto}>{CAREERS_INBOX}</a>
          <button type="button" className="btn-secondary" onClick={() => copy(CAREERS_INBOX, "address")}>
            {copied === "address" ? "Copied" : "Copy"}
          </button>
        </div>

        <ol className="steps-list" style={{ marginTop: 20 }}>
          <li>
            <span className="step-num sm">1</span>
            <div>Start a <strong>new email</strong> to {CAREERS_INBOX} and attach your resume (PDF preferred).</div>
          </li>
          <li>
            <span className="step-num sm">2</span>
            <div>
              Use this subject so we can match it to your application:
              <div className="subject-line">
                <code>{subject}</code>
                <button type="button" className="link-btn" onClick={() => copy(subject, "subject")}>
                  {copied === "subject" ? "Copied" : "Copy subject"}
                </button>
              </div>
            </div>
          </li>
          <li>
            <span className="step-num sm">3</span>
            <div>That&apos;s it — we read every application and will be in touch if there&apos;s a fit.</div>
          </li>
        </ol>
        {copied === "failed" && <p className="err" role="alert">Couldn&apos;t copy — please select the text and copy it manually.</p>}

        <div className="dialog-actions" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <a className="btn-secondary" href={mailto} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Icon name="mail" /> Open an email to {CAREERS_INBOX}
          </a>
          <button type="button" className="btn-primary" onClick={onClose} data-autofocus>Done</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
