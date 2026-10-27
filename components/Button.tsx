"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icons";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "md" | "sm";
  icon?: IconName;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
}: ButtonProps) {
  return (
    <motion.span
      className={`inline-flex ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      <Link
        href={href}
        className={`${variant === "primary" ? "btn-primary" : "btn-outline"} ${size === "sm" ? "btn-sm" : ""}`}
      >
        {icon && <Icon name={icon} />}
        {children}
      </Link>
    </motion.span>
  );
}
