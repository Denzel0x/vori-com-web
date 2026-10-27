"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ApplyDialog from "./ApplyDialog";
import ResumeDialog, { type Applicant } from "./ResumeDialog";
import Icon from "./Icons";
import { GENERAL_ROLE, roles, type Role } from "@/lib/roles";

export default function CareerBoard() {
  const [active, setActive] = useState<Role | null>(null);
  const [resume, setResume] = useState<Applicant | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  function open(role: Role, el: HTMLElement) {
    opener.current = el;
    setActive(role);
  }

  function close() {
    setActive(null);
    window.setTimeout(() => opener.current?.focus(), 0);
  }

  function handleSent(applicant: Applicant) {
    setActive(null);
    setResume(applicant);
  }

  function closeResume() {
    setResume(null);
    window.setTimeout(() => opener.current?.focus(), 0);
  }

  return (
    <>
      <div className="career-list">
        {roles.map((role) => (
          <div className="career-item" key={role.slug}>
            <div className="career-info">
              <h3>{role.title}</h3>
              <p className="career-sum">{role.summary}</p>
              <div className="career-meta">
                <span><Icon name="globe" /> Fully remote</span>
                <span><Icon name="clock" /> Full-time · Contract · Internship</span>
                <span><Icon name="briefcase" /> {role.compensation}</span>
              </div>
            </div>
            <button type="button" className="btn-apply" onClick={(e) => open(role, e.currentTarget)}>
              Apply <Icon name="arrow" />
            </button>
          </div>
        ))}
      </div>

      <div className="career-general">
        <span>Don&apos;t see your exact role? We keep strong profiles on file — fully remote, anywhere in the world.</span>
        <button type="button" className="btn-apply" onClick={(e) => open(GENERAL_ROLE, e.currentTarget)}>
          General application <Icon name="arrow" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {active && <ApplyDialog key={`apply-${active.slug}`} role={active} onClose={close} onSent={handleSent} />}
        {resume && <ResumeDialog key="resume" applicant={resume} onClose={closeResume} />}
      </AnimatePresence>
    </>
  );
}
