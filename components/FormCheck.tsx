"use client";

import { useState } from "react";
import Icon from "./Icons";
import { CAREERS_INBOX, CLIENT_INBOX, diagnose, errorCode, sendToInbox, type SendResult } from "@/lib/forms";

type Row = { inbox: string; label: string; running: boolean; result?: SendResult; at?: string };

const initial: Row[] = [
  { inbox: CLIENT_INBOX, label: "Contact & Start a Project forms", running: false },
  { inbox: CAREERS_INBOX, label: "Careers application form", running: false },
];

/** Owner-only diagnostic: sends a real test through the same code path as the site's forms and shows the relay's exact reply. */
export default function FormCheck() {
  const [rows, setRows] = useState<Row[]>(initial);

  async function run(inbox: string) {
    setRows((r) => r.map((x) => (x.inbox === inbox ? { ...x, running: true, result: undefined } : x)));
    const result = await sendToInbox(inbox, "Form check — test message (you can ignore this)", {
      name: "Form check",
      email: "form-check@invorious.com",
      message: `Test sent from ${window.location.origin}/form-check at ${new Date().toISOString()}`,
    });
    setRows((r) =>
      r.map((x) => (x.inbox === inbox ? { ...x, running: false, result, at: new Date().toLocaleTimeString() } : x))
    );
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      {rows.map((row) => (
        <section key={row.inbox} className="panel" style={{ display: "block", padding: 28 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
            <div>
              <p className="label" style={{ marginBottom: 4 }}>{row.label}</p>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700 }}>{row.inbox}</h2>
            </div>
            <button type="button" className="btn-primary" onClick={() => run(row.inbox)} disabled={row.running}>
              <Icon name="send" /> {row.running ? "Sending test…" : "Send a test"}
            </button>
          </div>

          {row.result && (
            <div role="status" aria-live="polite" style={{ marginTop: 20 }}>
              {row.result.ok ? (
                <>
                  <p style={{ fontWeight: 600 }}>
                    <Icon name="check" style={{ color: "rgb(var(--accent))" }} /> FormSubmit accepted the test (HTTP{" "}
                    {row.result.status}) at {row.at}
                  </p>
                  <p style={{ color: "rgb(var(--dim))", marginTop: 6 }}>
                    Now look in <strong>{row.inbox}</strong> (and its spam folder) — the test should arrive within a few
                    minutes. If this is the first time for this address, FormSubmit sends an <strong>Activate Form</strong>{" "}
                    email first: click it, and the test arrives right after.
                  </p>
                </>
              ) : (
                <>
                  <p className="err" style={{ fontWeight: 600, fontSize: "1rem" }}>
                    Not sent — error code {errorCode(row.result.error, row.result.status)} at {row.at}
                  </p>
                  <p style={{ color: "rgb(var(--dim))", marginTop: 6 }}>{diagnose(row.result.error)}</p>
                </>
              )}
              <details style={{ marginTop: 12 }}>
                <summary style={{ cursor: "pointer", color: "rgb(var(--dim))" }}>Exact reply from FormSubmit</summary>
                <pre className="pre-box">{JSON.stringify(row.result.raw ?? null, null, 2)}</pre>
              </details>
            </div>
          )}
        </section>
      ))}

      <div className="notice">
        <Icon name="mail" style={{ marginTop: 3 }} />
        <span>
          This page is not linked anywhere and is hidden from search engines. It sends real test emails through the
          exact same code as your forms, so what you see here is what visitors get.
        </span>
      </div>
    </div>
  );
}
