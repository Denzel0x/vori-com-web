import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icons";
import Spotlight from "./Spotlight";

type Props = { icon: IconName; title: string; label?: string; children: ReactNode };

export default function FeatureCard({ icon, title, label, children }: Props) {
  return (
    <Spotlight className="feature-card">
      <span className="feature-icon">
        <Icon name={icon} />
      </span>
      {label && <p className="label">{label}</p>}
      <h3>{title}</h3>
      <p>{children}</p>
    </Spotlight>
  );
}
