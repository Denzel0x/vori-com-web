import type { ReactNode } from "react";

type Props = { id: string; label: string; error?: string; hint?: string; children: ReactNode };

export default function Field({ id, label, error, hint, children }: Props) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <p className="hint">{hint}</p>}
      {error && (
        <p className="err" id={`${id}-err`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
