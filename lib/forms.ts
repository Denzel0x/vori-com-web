/** Inboxes that receive everything the site's forms send. */
export const CLIENT_INBOX = "hello@invorious.com";
export const CAREERS_INBOX = "career@invorious.com";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type SendResult =
  | { ok: true; status: number; raw: unknown }
  | { ok: false; error: string; status?: number; raw?: unknown; fallbackHref: string };

/** A mailto: link with the submission pre-written — only used if sending fails, and only when the visitor clicks it. */
export function fallbackMailto(to: string, subject: string, fields: Record<string, string>): string {
  const body = Object.entries(fields)
    .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`)
    .join("\n")
    .slice(0, 1500);
  const enc = (s: string) => encodeURIComponent(s.replace(/\r?\n/g, "\r\n"));
  return `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`;
}

/**
 * Sends a form submission straight to an inbox — no email app opens, and there is no server of ours
 * involved. It posts to FormSubmit (https://formsubmit.co), a free relay that needs no account, API key
 * or .env file. FormSubmit holds submissions until the destination inbox has been activated once (it
 * emails that inbox an "Activate Form" link), then forwards them. The visitor's address is passed as
 * `email`, which FormSubmit uses as Reply-To.
 *
 * To use a different relay later (Formspree, Web3Forms, your own endpoint), only this function changes.
 */
export async function sendToInbox(
  to: string,
  subject: string,
  fields: Record<string, string> & { email: string }
): Promise<SendResult> {
  const fallbackHref = fallbackMailto(to, subject, fields);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        _subject: subject,
        _template: "table",
        _honey: "",
        // FormSubmit recommends sending the page URL explicitly (some browsers strip the referrer).
        ...(typeof window !== "undefined" ? { _url: window.location.href } : {}),
      }),
      signal: controller.signal,
    });

    const raw: unknown = await res.json().catch(() => null);
    const data = (raw && typeof raw === "object" ? raw : {}) as { success?: unknown; message?: unknown };
    const message = typeof data.message === "string" ? data.message : "";

    // A reply that talks about activation means the inbox hasn't been activated yet, so the
    // message was NOT delivered — never show the visitor a false "sent".
    const rejected = !res.ok || data.success === false || data.success === "false" || /activat/i.test(message);
    if (rejected) {
      console.error("[forms] FormSubmit did not accept the submission:", res.status, raw);
      return { ok: false, error: message || `HTTP ${res.status}`, status: res.status, raw, fallbackHref };
    }
    return { ok: true, status: res.status, raw };
  } catch (err) {
    console.error("[forms] Could not reach formsubmit.co:", err);
    return {
      ok: false,
      error: "network",
      raw: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      fallbackHref,
    };
  } finally {
    clearTimeout(timer);
  }
}

/** Short code shown next to a failure so the site owner can tell what happened. */
export function errorCode(error: string, status?: number): string {
  if (error === "network") return "NETWORK";
  if (/activat/i.test(error)) return "NOT-ACTIVATED";
  if (status && status >= 400) return `HTTP-${status}`;
  const http = /^HTTP (\d+)$/.exec(error);
  if (http) return `HTTP-${http[1]}`;
  return "REJECTED";
}

/** Plain-English explanation of a failed send, for the site owner. */
export function diagnose(error: string): string {
  if (error === "network") {
    return "No readable reply from formsubmit.co. Most often the target inbox hasn't been activated yet — open it (and its spam folder), click the \"Activate Form\" email from FormSubmit, then try again. Otherwise an ad blocker, firewall or lost connection is blocking formsubmit.co.";
  }
  if (/activat/i.test(error)) {
    return `FormSubmit says this inbox needs activation — open it (and its spam folder), click "Activate Form", then try again. Submissions made before activation are kept by FormSubmit for 30 days and delivered once you activate. (FormSubmit said: "${error}")`;
  }
  return `FormSubmit replied: ${error}`;
}
