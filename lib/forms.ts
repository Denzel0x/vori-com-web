/** Inboxes that receive everything the site's forms send. */
export const CLIENT_INBOX = "hello@invorious.com";
export const CAREERS_INBOX = "career@invorious.com";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type SendResult = { ok: true } | { ok: false; error: string };

/**
 * Sends a form submission straight to an inbox — no email app opens, and there is no server of ours
 * involved. It posts to FormSubmit (https://formsubmit.co), a free relay that needs no account, API key
 * or .env file: the first submission to each address triggers a one-time activation email to that
 * address, which must be confirmed once. The visitor's address is passed as `email`, which FormSubmit
 * uses as Reply-To.
 *
 * To use a different relay later (Formspree, Web3Forms, your own endpoint), only this function changes.
 */
export async function sendToInbox(
  to: string,
  subject: string,
  fields: Record<string, string> & { email: string }
): Promise<SendResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...fields, _subject: subject, _template: "table", _captcha: "false", _honey: "" }),
      signal: controller.signal,
    });

    const data: { success?: unknown; message?: unknown } = await res.json().catch(() => ({}));
    const message = typeof data.message === "string" ? data.message : "";
    // A reply that talks about activation means the inbox hasn't been activated yet, so the
    // message was NOT delivered — never show the visitor a false "sent".
    const rejected = !res.ok || data.success === false || data.success === "false" || /activat/i.test(message);
    if (rejected) {
      console.error("[forms] FormSubmit did not accept the submission:", res.status, data);
      return { ok: false, error: message || `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("[forms] Could not reach formsubmit.co:", err);
    return { ok: false, error: "network" };
  } finally {
    clearTimeout(timer);
  }
}

/** Plain-English explanation of a failed send, shown to the site owner while running locally. */
export function diagnose(error: string): string {
  if (error === "network") {
    return "No readable reply from formsubmit.co. Most often the target inbox hasn't been activated yet — open it (and its spam folder), click the \"Activate Form\" email from FormSubmit, then try again. Otherwise an ad blocker, firewall or lost connection is blocking formsubmit.co.";
  }
  if (/activat/i.test(error)) {
    return `FormSubmit says this inbox needs activation — open it (and its spam folder), click "Activate Form", then try again. (FormSubmit said: "${error}")`;
  }
  return `FormSubmit replied: ${error}`;
}
