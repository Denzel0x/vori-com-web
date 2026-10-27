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

### If a form says "We couldn't send your ... just now"

That message means FormSubmit did not accept the submission, so nothing was delivered. While you run
`npm run dev`, a grey **Developer note** under the message tells you why (visitors never see it), and
the terminal / browser console print the details. The usual causes:

| Developer note says | Fix |
| --- | --- |
| the inbox needs activation / no readable reply | Open the target inbox (`career@invorious.com` or `hello@invorious.com`) **and its spam folder**, find FormSubmit's email and click **Activate Form**, then send again. |
| blocked / network | An ad blocker, VPN or firewall is blocking `formsubmit.co`, or you are offline. Try another browser or disable the blocker for localhost. |
| anything else | Copy the note and check it against https://formsubmit.co. |

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
