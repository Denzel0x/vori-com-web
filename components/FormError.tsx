import { diagnose, errorCode } from "@/lib/forms";

export type Failure = { error: string; status?: number; fallbackHref?: string };

type Props = { what: string; inbox: string; failure: Failure | null };

/** Visitor-friendly failure message with an error code, plus a developer note while running locally. */
export default function FormError({ what, inbox, failure }: Props) {
  return (
    <div role="alert" style={{ marginTop: 14 }}>
      <p className="err">
        We couldn&apos;t send your {what} just now. Please try again, or{" "}
        <a className="link" href={failure?.fallbackHref ?? `mailto:${inbox}`}>email it to us directly</a> ({inbox}).
      </p>
      {failure && (
        <p className="hint" style={{ marginTop: 6 }}>Error code: {errorCode(failure.error, failure.status)}</p>
      )}
      {process.env.NODE_ENV !== "production" && failure && (
        <p className="hint" style={{ marginTop: 8 }}>
          Developer note (only shown while running locally): {diagnose(failure.error)}
        </p>
      )}
    </div>
  );
}
