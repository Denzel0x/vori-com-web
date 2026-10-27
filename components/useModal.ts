"use client";

import { useEffect, type KeyboardEvent, type RefObject } from "react";

/** Shared dialog behaviour: scroll lock, initial focus, Escape to close, Tab kept inside. */
export function useModal(ref: RefObject<HTMLDivElement>, onClose: () => void, focusSelector?: string) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const target = (focusSelector ? el.querySelector<HTMLElement>(focusSelector) : null) || el;
      target.focus();
    }, 150);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = ref.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select, textarea'
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
}
