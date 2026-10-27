export type Role = {
  slug: string;
  title: string;
  summary: string;
  /** Full-time salary range (USD / year) */
  compensation: string;
  /** Contract rate range (USD / hour) */
  contract: string;
  /** Paid internship stipend (USD / month) */
  internship: string;
  about: string;
  responsibilities: string[];
  ideal: string;
  tags: string[];
};

export const TRACKS = ["Full-time", "Contract", "Internship"] as const;
export type Track = (typeof TRACKS)[number];

export const roles: Role[] = [
  {
    slug: "smart-contract-engineer",
    title: "Smart Contract Engineer",
    summary: "Design, write and prepare audit-ready smart contracts for client Web3 products.",
    compensation: "$120k – $160k USD / year",
    contract: "$70 – $95 USD / hour",
    internship: "$2,500 – $3,500 USD / month · 3–6 months",
    about:
      "You'll design and implement the on-chain logic behind client products — from token mechanics to protocol-level contracts — and own it from architecture through to mainnet deployment.",
    responsibilities: [
      "Develop and test Solidity contracts (ERC-20, ERC-721, ERC-1155, staking, vesting, marketplace logic)",
      "Optimise for gas and security, and prepare contracts for external audit",
      "Write thorough unit, fork and fuzz tests with Foundry or Hardhat",
      "Work with frontend and backend engineers on ABI design and integration",
      "Review teammates' contracts and keep up with EVM and L2 developments",
    ],
    ideal:
      "Solid Solidity experience, a working understanding of gas optimisation and common attack vectors, and at least one contract shipped to testnet or mainnet.",
    tags: ["Solidity", "Foundry", "Hardhat", "ERC standards", "Security", "L2s"],
  },
  {
    slug: "protocol-engineer",
    title: "Protocol Engineer",
    summary: "Design and build the core protocol layer — consensus, networking and execution — that everything else runs on.",
    compensation: "$140k – $190k USD / year",
    contract: "$80 – $110 USD / hour",
    internship: "$3,000 – $4,000 USD / month · 3–6 months",
    about:
      "You'll work at the lowest layer of the stack: designing, implementing and hardening blockchain protocols and node software — from consensus and peer-to-peer networking to execution and state — and turning protocol designs into specifications and production code that clients can rely on.",
    responsibilities: [
      "Design and implement protocol features in Rust or Go: consensus, networking, execution and state management",
      "Build and maintain node, client and rollup / L2 components, including upgrades and migrations",
      "Write protocol specifications and technical design documents, and review them with the team",
      "Profile and optimise for throughput, latency and resource use, and harden against adversarial behaviour",
      "Test rigorously with simulation, property-based and fuzz testing, and support security audits",
    ],
    ideal:
      "Strong systems programming in Rust, Go or C++, a solid grounding in distributed systems and consensus, and working knowledge of cryptographic primitives. Experience contributing to a node or protocol codebase (for example geth, reth, Cosmos SDK, Substrate or Solana) is a big plus.",
    tags: ["Rust", "Go", "Consensus", "P2P networking", "Cryptography", "L1 / L2", "Rollups"],
  },
  {
    slug: "web3-frontend-engineer",
    title: "Web3 Frontend Engineer",
    summary: "Build the interfaces people use to interact with on-chain products.",
    compensation: "$100k – $140k USD / year",
    contract: "$60 – $85 USD / hour",
    internship: "$2,000 – $3,000 USD / month · 3–6 months",
    about:
      "You'll build wallet-connected dApps — transaction flows, on-chain data and the React apps around them — and make blockchain feel ordinary rather than intimidating.",
    responsibilities: [
      "Build React / Next.js dApps with wagmi, viem or ethers.js",
      "Implement wallet connectivity (MetaMask, WalletConnect, Coinbase Wallet) and clear transaction states",
      "Turn designs into fast, accessible, mobile-responsive interfaces",
      "Integrate on-chain data, indexers and APIs",
      "Collaborate with contract and backend engineers on integration",
    ],
    ideal:
      "Strong React and TypeScript, comfortable with wagmi/viem or ethers.js, and an eye for interfaces that handle loading and error states as carefully as the happy path.",
    tags: ["React", "TypeScript", "Next.js", "wagmi", "viem", "Tailwind"],
  },
  {
    slug: "go-rust-infrastructure-engineer",
    title: "Go/Rust Infrastructure Engineer",
    summary: "Build and run the infrastructure behind our on-chain and off-chain systems.",
    compensation: "$110k – $150k USD / year",
    contract: "$65 – $90 USD / hour",
    internship: "$2,500 – $3,500 USD / month · 3–6 months",
    about:
      "You'll build the indexers, relayers, monitoring and node tooling that keep client systems fast, observable and reliable — and set the standards the rest of the team builds against.",
    responsibilities: [
      "Build indexing, relayer and monitoring services in Go or Rust",
      "Run and monitor blockchain nodes and RPC infrastructure",
      "Automate deployments with infrastructure-as-code and CI/CD",
      "Set up observability: metrics, logging, alerting and incident response",
      "Define reliability and security standards for the wider team",
    ],
    ideal:
      "Production experience in Go or Rust, comfort with distributed systems, observability and infrastructure-as-code, and the independence to run with a problem once it's scoped.",
    tags: ["Go", "Rust", "Kubernetes", "Terraform", "Observability", "Node ops"],
  },
  {
    slug: "web3-backend-engineer",
    title: "Web3 Backend Engineer",
    summary: "Design the APIs and services that connect blockchains to the rest of a business.",
    compensation: "$100k – $140k USD / year",
    contract: "$60 – $85 USD / hour",
    internship: "$2,000 – $3,000 USD / month · 3–6 months",
    about:
      "You'll design the APIs and off-chain services that sit between client applications and on-chain systems, and make sure they hold up under real usage — not just a demo.",
    responsibilities: [
      "Design and build APIs and services in Node, Go or Rust",
      "Index and cache on-chain data and handle events reliably",
      "Integrate payments, custody, wallets and third-party providers",
      "Model data and build secure authentication and authorisation",
      "Write tests and documentation other engineers can rely on",
    ],
    ideal:
      "Solid backend fundamentals in Node, Go or similar, some exposure to blockchain data or RPC nodes, and code other engineers can pick up without a walkthrough.",
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Go", "Event-driven", "RPC"],
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    summary: "Own brand, content and lead generation across our consulting, Web2 and Web3 work.",
    compensation: "$85k – $115k USD / year",
    contract: "$50 – $70 USD / hour",
    internship: "$1,500 – $2,500 USD / month · 3–6 months",
    about:
      "You'll run marketing for two audiences that don't always respond to the same message — consulting and Web2 clients on one side, Web3-native teams on the other.",
    responsibilities: [
      "Plan and run content, SEO and outbound lead-generation programmes",
      "Position our consulting, Web2 and Web3 services for distinct audiences",
      "Own our presence across LinkedIn, X, community channels and events",
      "Work with engineers on case studies and technical content",
      "Report on pipeline, attribution and campaign performance",
    ],
    ideal:
      "B2B tech or agency marketing experience, strong writing, and comfort marketing to a technical audience — Web3 or crypto marketing experience is a plus.",
    tags: ["B2B marketing", "Content", "SEO", "Community", "Analytics", "Web3"],
  },
];

export const GENERAL_ROLE: Role = {
  slug: "general",
  title: "General application",
  summary: "Don't see your exact role? Tell us what you do best.",
  compensation: "",
  contract: "",
  internship: "",
  about:
    "Tell us what you do best and where you'd like to contribute. We keep strong profiles on file and reach out when a fit opens up — full-time, contract or internship, always fully remote.",
  responsibilities: [],
  ideal: "",
  tags: [],
};

export const roleTitles: string[] = [GENERAL_ROLE.title, ...roles.map((r) => r.title)];
