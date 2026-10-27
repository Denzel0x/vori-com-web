import type { ReactNode } from "react";

type Props = { eyebrow: string; title: ReactNode; children?: ReactNode };

export default function PageHead({ eyebrow, title, children }: Props) {
  return (
    <section className="hero-wrap">
      <div className="wrap page-head">
        <p className="hero-badge">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <p className="lead">{children}</p>}
      </div>
    </section>
  );
}
