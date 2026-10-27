"use client";

import { motion } from "framer-motion";

const r1 = (n: number) => Math.round(n * 10) / 10;

const C = { x: 280, y: 190 };
const nodes = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
  return { x: r1(C.x + Math.cos(a) * 185), y: r1(C.y + Math.sin(a) * 112) };
});

const ring: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]];
const cross: [number, number][] = [[0, 3], [1, 4], [2, 5]];
const mesh = [...ring, ...cross];

const coins = [
  { t: "BTC", c: "#f7931a", x: 62, y: 70, d: 5.5, delay: 0 },
  { t: "ETH", c: "#627eea", x: 498, y: 64, d: 6.5, delay: 0.8 },
  { t: "SOL", c: "#9945ff", x: 58, y: 322, d: 6, delay: 1.2 },
  { t: "USDT", c: "#26a17b", x: 504, y: 318, d: 7, delay: 0.3 },
  { t: "BNB", c: "#f3ba2f", x: 280, y: 28, d: 7.5, delay: 0.5 },
  { t: "XRP", c: "#3b4a63", x: 168, y: 384, d: 6.8, delay: 1.6 },
  { t: "$", c: "#2fa36b", x: 392, y: 386, d: 5.8, delay: 1 },
];

const CYCLE = 12;
const accent = "rgb(var(--accent))";

// Web2 is visible first, cross-fades into the Web3 mesh, then back again — forever.
const web2Anim = { opacity: [1, 1, 0, 0, 1] };
const web3Anim = { opacity: [0, 0, 1, 1, 0] };
const cycle = { duration: CYCLE, times: [0, 0.4, 0.48, 0.92, 1], repeat: Infinity, ease: "easeInOut" as const };

export default function Web3Transform() {
  return (
    <svg
      viewBox="0 0 560 420"
      className="h-auto w-full"
      role="img"
      aria-label="Animated diagram: a centralised Web2 hub-and-spoke system transforms into a decentralised Web3 mesh network, with floating Bitcoin, Ethereum, Solana, Tether, BNB, XRP and dollar coins"
    >
      <defs>
        <radialGradient id="w3hub" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#d9d2ff" />
          <stop offset="100%" stopColor="#6f5cff" />
        </radialGradient>
      </defs>

      {/* ---------- Web2: centralised hub & spoke ---------- */}
      <motion.g animate={web2Anim} transition={cycle}>
        {nodes.map((n, i) => (
          <g key={`w2-${i}`}>
            <line x1={C.x} y1={C.y} x2={n.x} y2={n.y} style={{ stroke: "rgb(var(--accent) / 0.45)" }} strokeWidth={1.5} />
            <circle cx={n.x} cy={n.y} r={11} style={{ fill: "rgb(var(--card))", stroke: accent }} strokeWidth={1.5} />
            <motion.circle
              r={3.5}
              style={{ fill: accent }}
              animate={{ cx: [n.x, C.x], cy: [n.y, C.y], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: i * 0.35 }}
            />
          </g>
        ))}
        <circle cx={C.x} cy={C.y} r={32} fill="url(#w3hub)" />
        <text x={C.x} y={C.y + 3.5} textAnchor="middle" fontSize="9.5" fontWeight={800} style={{ fill: "rgb(var(--on-accent))" }}>
          SERVER
        </text>
      </motion.g>

      {/* ---------- Web3: decentralised mesh ---------- */}
      <motion.g animate={web3Anim} transition={cycle}>
        {mesh.map(([a, b], i) => (
          <g key={`w3-e-${i}`}>
            <line
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              style={{ stroke: "rgb(var(--accent) / 0.5)" }}
              strokeWidth={1.4}
            />
            <motion.circle
              r={3.2}
              style={{ fill: accent }}
              animate={{ cx: [nodes[a].x, nodes[b].x], cy: [nodes[a].y, nodes[b].y], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: i * 0.28 }}
            />
          </g>
        ))}
        {nodes.map((n, i) => (
          <g key={`w3-n-${i}`}>
            <circle cx={n.x} cy={n.y} r={15} style={{ fill: "rgb(var(--accent) / 0.16)", stroke: accent }} strokeWidth={1.6} />
            <circle cx={n.x} cy={n.y} r={4.5} style={{ fill: accent }} />
          </g>
        ))}
      </motion.g>

      {/* ---------- Phase labels ---------- */}
      <motion.text
        x={C.x}
        y={252}
        textAnchor="middle"
        fontSize="11"
        fontWeight={600}
        letterSpacing="2"
        style={{ fill: "rgb(var(--dim))" }}
        animate={web2Anim}
        transition={cycle}
      >
        WEB2 · CENTRALISED
      </motion.text>
      <motion.text
        x={C.x}
        y={252}
        textAnchor="middle"
        fontSize="11"
        fontWeight={600}
        letterSpacing="2"
        style={{ fill: accent }}
        animate={web3Anim}
        transition={cycle}
      >
        WEB3 · DECENTRALISED
      </motion.text>

      {/* ---------- Floating, spinning coins ---------- */}
      {coins.map((coin) => (
        <g key={coin.t} transform={`translate(${coin.x} ${coin.y})`}>
          <motion.g
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: coin.d, repeat: Infinity, ease: "easeInOut", delay: coin.delay }}
          >
            <motion.g
              animate={{ scaleX: [1, 1, 0.12, 1, 1] }}
              transition={{ duration: coin.d * 1.3, times: [0, 0.42, 0.5, 0.58, 1], repeat: Infinity, ease: "easeInOut", delay: coin.delay }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle r={20} fill={coin.c} />
              <circle r={20} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.5} />
              <circle r={15} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={1} strokeDasharray="2 3" />
              <text y={3.5} textAnchor="middle" fontSize={coin.t.length > 3 ? 8 : coin.t === "$" ? 15 : 9} fontWeight={800} fill="#fff">
                {coin.t}
              </text>
            </motion.g>
          </motion.g>
        </g>
      ))}
    </svg>
  );
}
