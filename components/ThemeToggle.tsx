"use client";

import { useEffect, useState } from "react";
import Icon from "./Icons";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("invorious-theme", next ? "light" : "dark");
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-btn"
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      title={light ? "Dark theme" : "Light theme"}
    >
      <Icon name={light ? "moon" : "sun"} />
    </button>
  );
}
