"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import Icon from "./Icons";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="navbar">
      <div className="wrap nav-inner">
        <Link href="/" className="logo" aria-label="Invorious — home">
          <Image src="/brand/logo.jpg" alt="" width={34} height={34} priority />
          <span className="logo-text">invorious</span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
                {active && (
                  <motion.span layoutId="nav-underline" className="nav-underline" transition={{ duration: 0.3 }} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Button href="/start-a-project" size="sm" className="hide-mobile">
            Start a project
          </Button>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="wrap mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`mlink ${pathname === l.href ? "active" : ""}`}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
            <div style={{ paddingTop: 16 }}>
              <Button href="/start-a-project" size="sm" icon="send">
                Start a project
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
