# Invorious Software Agency — Website

Next.js 14 (App Router) · Tailwind CSS · Framer Motion.

**No backend of our own, no Resend, no `.env.local`.** The site is entirely front-end.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## How the forms deliver email

All three forms send the message straight to your inbox — **no email app opens** for the visitor.

| Form | Email goes to |
| --- | --- |
| Contact (`/contact`) | `hello@invorious.com` |
| Start a Project (`/start-a-project`) | `hello@invorious.com` |
| Careers → Apply (`/careers`) | `career@invorious.com` |

A browser can't send email by itself, so the forms post to **[FormSubmit](https://formsubmit.co)** — a free
relay that needs no account, API key or environment file — which forwards each submission to the inbox
above. The code is in `lib/forms.ts`.

### One-time activation (do this once per inbox)

The first time a form posts to an address, FormSubmit emails that address an **activation link**.
Until you click it, nothing is forwarded.

1. Run the site, open `/contact`, and send a test message.
2. Open the `hello@invorious.com` inbox (check spam), find the email from FormSubmit and click
   **Activate Form**.
3. Do the same for `career@invorious.com`: open `/careers`, click Apply on any role, send a test
   application, and activate that address too.

After that, every submission arrives as a normal email, with the visitor's address as Reply-To, so you
can just hit Reply.

### Checking that the forms deliver (do this after every deploy)

Open **`/form-check`** on your live site (it is not linked anywhere and is hidden from search engines).
Press **Send a test** for each inbox. The page shows exactly what FormSubmit replied, with a plain-English
explanation, so you never have to guess.

### If a form says "We couldn't send your ... just now"

Nothing was delivered. The message under the form ends with an **Error code**, and the visitor gets a link to
email you directly with their message already written. Codes:

| Error code | Meaning / fix |
| --- | --- |
| `NOT-ACTIVATED` | FormSubmit hasn't been activated for that inbox. Open `hello@invorious.com` / `career@invorious.com` **and the spam folder**, click FormSubmit's **Activate Form** email, then try again. FormSubmit keeps submissions made before activation for 30 days and delivers them once you activate. |
| `NETWORK` | The browser got no readable reply from `formsubmit.co`. Usually the same activation issue; otherwise an ad blocker, VPN or firewall is blocking `formsubmit.co`, or the visitor is offline. `/form-check` shows the exact browser error. |
| `HTTP-4xx` / `HTTP-5xx` | FormSubmit refused or failed. `/form-check` shows its exact message. |
| `REJECTED` | FormSubmit replied "no" with a message — see `/form-check`. |

While running `npm run dev`, a grey **Developer note** under the message also explains the cause.

### Good to know

- Messages pass through FormSubmit's servers. If you ever want a different relay (Formspree, Web3Forms,
  your own endpoint), only `sendToInbox()` in `lib/forms.ts` needs to change.
- If a submission can't be sent, the visitor sees an error with a plain `mailto:` link to your address
  as a fallback (they click it themselves; nothing opens automatically).
- Each form has a hidden honeypot field that quietly drops basic spam bots.
- Candidates are asked, before and after they apply: "Please send your resume separately to
  career@invorious.com." Right after a successful application a **second dialog** opens ("One more step:
  send your resume") showing the address with a Copy button, the subject line to use, and an
  "Open an email to career@invorious.com" link they click themselves.

## Careers

Roles, compensation (USD), descriptions and tags are in `lib/roles.ts` — edit them there.
Compensation figures are placeholders; set the real ranges before publishing.

## Look & feel

**Dark theme is the default** for every visitor (the OS light/dark setting is ignored). The sun/moon
button in the nav switches to a light version and remembers the choice (stored under `invorious-theme`).
The pages use a plain, flat background (no gradients/grain). Design tokens live in
`app/globals.css`.

## Locations

Headquarters: Sydney, NSW, Australia. Second location: Bogotá, Colombia (Footer, Contact, About).
The team itself is fully remote worldwide.
