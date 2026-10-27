import { diagnose } from "@/lib/forms";

type Props = { what: string; inbox: string; detail?: string };

/** Visitor-friendly failure message, plus a developer note that only appears while running locally. */
export default function FormError({ what, inbox, detail }: Props) {
  return (
    <div role="alert" style={{ marginTop: 14 }}>
      <p className="err">
        We couldn&apos;t send your {what} just now. Please try again, or email{" "}
        <a className="link" href={`mailto:${inbox}`}>{inbox}</a> directly.
      </p>
      {process.env.NODE_ENV !== "production" && detail && (
        <p className="hint" style={{ marginTop: 8 }}>
          Developer note (only shown while running locally): {diagnose(detail)}
        </p>
      )}
    </div>
  );
}
