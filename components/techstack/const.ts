export const BestPracticeTechStack: Record<string, any> = {
  // BACKEND
  backend: {
    "Programming language": {
      name: "TypeScript (Node.js)",
      estimatedCostPerMonth: "$0 ",
      reason:
        "Strong typing, large ecosystem, and easy integration with modern frameworks.",
      docs: "https://www.typescriptlang.org/",
      scalingNotes: "Horizontally scalable using containerized services.",
      alternatives: ["Python (FastAPI)", "Go"],
    },
    "Runtime / Framework / Core Lib": {
      name: "Node.js (Express)",
      estimatedCostPerMonth: "$0",
      reason:
        "Simple and performant for REST APIs, widely supported in cloud environments.",
      docs: "https://expressjs.com/",
      scalingNotes:
        "Can scale with load balancers and stateless microservices.",
      alternatives: ["NestJS", "Fastify"],
    },
    "Backend Framework (opinionated stacks)": {
      name: "NestJS",
      estimatedCostPerMonth: "$0",
      reason:
        "Modular architecture and built-in decorators make development fast and clean.",
      docs: "https://nestjs.com/",
      scalingNotes:
        "Supports microservices, event-driven patterns, and WebSockets.",
      alternatives: ["AdonisJS", "Django"],
    },
    "Database (SQL)": {
      name: "PostgreSQL (Supabase Managed)",
      estimatedCostPerMonth: "$50",
      reason:
        "Reliable, ACID-compliant SQL database with managed scaling and auth.",
      docs: "https://supabase.com/",
      scalingNotes: "Vertical and horizontal scaling supported.",
      alternatives: ["Neon.tech", "PlanetScale (MySQL)"],
    },
    "Database (NoSQL)": {
      name: "MongoDB Atlas",
      estimatedCostPerMonth: "$30",
      reason: "Great for flexible user data and journaling entries.",
      docs: "https://www.mongodb.com/atlas",
      scalingNotes: "Auto-sharding and easy replication.",
      alternatives: ["Firestore", "Couchbase"],
    },
    "Cache (in-memory)": {
      name: "Redis (Upstash)",
      estimatedCostPerMonth: "$10",
      reason: "Serverless caching and rate-limiting for API requests.",
      docs: "https://upstash.com/",
      scalingNotes: "Scales automatically in serverless mode.",
      alternatives: ["Memcached", "Cloudflare KV"],
    },
    "Message Bus / Queue": {
      name: "BullMQ + Redis",
      estimatedCostPerMonth: "$15",
      reason: "Reliable background task processing and scheduling.",
      docs: "https://docs.bullmq.io/",
      scalingNotes: "Uses Redis-based queues; easy to scale horizontally.",
      alternatives: ["AWS SQS", "RabbitMQ"],
    },
    "API Layer / Protocols": {
      name: "GraphQL (Apollo Server)",
      estimatedCostPerMonth: "$0",
      reason: "Flexible data fetching for mobile and web clients.",
      docs: "https://www.apollographql.com/docs/",
      scalingNotes: "Works with schema federation for scale.",
      alternatives: ["REST", "tRPC"],
    },
    "Observability & Logging (backend)": {
      name: "Logtail + OpenTelemetry",
      estimatedCostPerMonth: "$20",
      reason: "Structured logging and tracing for debugging user flows.",
      docs: "https://betterstack.com/logtail/",
      scalingNotes: "Integrates easily with Vercel or AWS Lambda.",
      alternatives: ["Datadog", "Grafana Cloud"],
    },
    "rate-limiting & throttling": {
      name: "Express-Rate-Limit",
      estimatedCostPerMonth: "$0",
      reason: "Prevents abuse and controls traffic.",
      docs: "https://www.npmjs.com/package/express-rate-limit",
      alternatives: ["Cloudflare Rules", "Upstash Rate Limiting"],
    },
    "file storage": {
      name: "AWS S3",
      estimatedCostPerMonth: "$25",
      reason: "Secure and scalable storage for user uploads or session files.",
      docs: "https://aws.amazon.com/s3/",
      alternatives: ["Cloudflare R2", "Google Cloud Storage"],
    },
    "backups & DR": {
      name: "AWS Backup + Supabase Automated Backups",
      estimatedCostPerMonth: "$10",
      reason: "Ensures database and files are recoverable after incidents.",
      docs: "https://aws.amazon.com/backup/",
      scalingNotes: "Automated snapshots every 24h.",
      alternatives: ["RDS Backups", "BorgBackup"],
    },
  },

  // FRONTEND
  frontend: {
    "Programming language": {
      name: "TypeScript",
      estimatedCostPerMonth: "$0",
      reason: "Improves maintainability and prevents runtime errors.",
      docs: "https://www.typescriptlang.org/",
      scalingNotes: "Integrates seamlessly with modern frameworks.",
      alternatives: ["JavaScript (ESNext)"],
    },
    "Framework / Library": {
      name: "Next.js (React)",
      estimatedCostPerMonth: "$0",
      reason: "Server-side rendering for better SEO and performance.",
      docs: "https://nextjs.org/",
      scalingNotes: "Built-in ISR and API routes scale globally.",
      alternatives: ["Remix", "SvelteKit"],
    },
    "Styling / Design System": {
      name: "Tailwind CSS + custom design tokens",
      estimatedCostPerMonth: "$0",
      reason: "Fits minimalist design with fast development workflow.",
      docs: "https://tailwindcss.com/",
      scalingNotes: "No runtime overhead.",
      alternatives: ["Chakra UI", "Styled Components"],
    },
    "Animation / Motion": {
      name: "Framer Motion",
      estimatedCostPerMonth: "$0",
      reason: "Smooth, mindful microinteractions and page transitions.",
      docs: "https://www.framer.com/motion/",
      scalingNotes: "Lightweight and performant.",
      alternatives: ["GSAP", "React Spring"],
    },
    "Performance & SEO": {
      name: "Vercel Analytics + Lighthouse CI",
      estimatedCostPerMonth: "$10",
      reason: "Tracks core web vitals and user experience metrics.",
      docs: "https://vercel.com/analytics",
      scalingNotes: "Globally distributed edge analytics.",
    },
    "Frontend Observability": {
      name: "Sentry",
      estimatedCostPerMonth: "$29",
      reason: "Catches frontend errors in production.",
      docs: "https://sentry.io/",
      alternatives: ["LogRocket", "New Relic"],
    },
  },

  // MOBILE
  mobile: {
    "Programming language": {
      name: "TypeScript",
      estimatedCostPerMonth: "$0",
      reason: "Cross-platform shared code between web and mobile.",
      docs: "https://www.typescriptlang.org/",
      scalingNotes: "",
      alternatives: ["Kotlin", "Swift"],
    },
    Framework: {
      name: "React Native (Expo)",
      estimatedCostPerMonth: "$25",
      reason: "Fast iteration, unified design across iOS and Android.",
      docs: "https://expo.dev/",
      scalingNotes: "Supports OTA updates and offline mode.",
      alternatives: ["Flutter", "NativeScript"],
    },
    "Crash & Performance": {
      name: "Firebase Crashlytics",
      estimatedCostPerMonth: "$0–10",
      reason: "Reliable mobile crash reporting and analytics.",
      docs: "https://firebase.google.com/products/crashlytics",
      alternatives: ["Sentry Mobile"],
    },
  },

  // CLOUD
  cloud: {
    frontend: {
      "Hosting Service": {
        name: "Vercel",
        estimatedCostPerMonth: "$20",
        reason: "Best for Next.js deployments and global edge caching.",
        docs: "https://vercel.com/",
        alternatives: ["Netlify", "Cloudflare Pages"],
      },
      "CDN / Edge": {
        name: "Vercel Edge Network",
        estimatedCostPerMonth: "Included",
        reason: "Delivers global performance with zero config.",
        docs: "https://vercel.com/docs/edge-network",
        alternatives: ["Cloudflare", "Akamai"],
      },
      "DNS / SSL": {
        name: "Cloudflare DNS",
        estimatedCostPerMonth: "$0",
        reason: "Fast DNS with built-in SSL and DDoS protection.",
        docs: "https://www.cloudflare.com/dns/",
        alternatives: ["Google Domains", "AWS Route53"],
      },
    },
    backend: {
      "Compute (containers & serverless)": {
        name: "AWS Lambda",
        estimatedCostPerMonth: "$30",
        reason: "Auto-scaling compute for API routes and workers.",
        docs: "https://aws.amazon.com/lambda/",
        scalingNotes: "Pay-per-use with near-infinite scale.",
        alternatives: ["Fly.io", "Render"],
      },
      "Object Storage": {
        name: "AWS S3",
        estimatedCostPerMonth: "$20",
        reason: "Secure and reliable media storage.",
        docs: "https://aws.amazon.com/s3/",
        scalingNotes: "Highly durable (99.999999999%).",
        alternatives: ["Cloudflare R2", "Google Cloud Storage"],
      },
      "Managed DB Services": {
        name: "Supabase Postgres",
        estimatedCostPerMonth: "$50",
        reason: "Fully managed Postgres with authentication built-in.",
        docs: "https://supabase.com/",
        scalingNotes: "Scales automatically with usage.",
        alternatives: ["Neon.tech", "RDS Postgres"],
      },
      "Container Registry": {
        name: "GitHub Packages",
        estimatedCostPerMonth: "$0",
        reason: "Simple private Docker image hosting.",
        docs: "https://docs.github.com/en/packages",
        alternatives: ["AWS ECR", "Docker Hub"],
      },
      "Secrets Management": {
        name: "Doppler",
        estimatedCostPerMonth: "$10",
        reason: "Centralized management for environment secrets.",
        docs: "https://www.doppler.com/",
        alternatives: ["1Password Secrets", "Vault"],
      },
      "Monitoring & Logging": {
        name: "BetterStack (Logs & Uptime)",
        estimatedCostPerMonth: "$15",
        reason: "Unified monitoring for uptime and logs.",
        docs: "https://betterstack.com/",
        alternatives: ["Grafana", "Datadog"],
      },
    },
  },

  // DEVOPS
  devOps: {
    "Version Control": {
      name: "GitHub",
      estimatedCostPerMonth: "$0",
      reason: "Central repository with collaboration and CI integration.",
      docs: "https://github.com/",
      alternatives: ["GitLab", "Bitbucket"],
    },
    "CI/CD": {
      name: "GitHub Actions",
      estimatedCostPerMonth: "$0–10",
      reason: "Automated tests and deployments with Vercel/AWS integration.",
      docs: "https://docs.github.com/actions",
      alternatives: ["CircleCI", "Jenkins"],
    },
    "IaC (Infrastructure as Code)": {
      name: "Terraform",
      estimatedCostPerMonth: "$0",
      reason: "Declarative infrastructure setup for cloud environments.",
      docs: "https://www.terraform.io/",
      scalingNotes: "Reusable and version-controlled.",
      alternatives: ["Pulumi", "AWS CDK"],
    },
    "Release Management": {
      name: "GitHub Releases",
      estimatedCostPerMonth: "$0",
      reason: "Simple semantic versioning and change tracking.",
      docs: "https://docs.github.com/en/repositories/releasing-projects-on-github",
    },
    "Monitoring / Alerting Policies": {
      name: "BetterUptime",
      estimatedCostPerMonth: "$20",
      reason: "Alerts for downtime and status page for transparency.",
      docs: "https://betterstack.com/",
      alternatives: ["PagerDuty", "Opsgenie"],
    },
    "Backup & Restore": {
      name: "AWS Backup",
      estimatedCostPerMonth: "$10",
      reason: "Automated resource and database backups.",
      docs: "https://aws.amazon.com/backup/",
    },
  },

  // TESTING
  testing: {
    "Unit Testing": {
      name: "Jest",
      estimatedCostPerMonth: "$0",
      reason: "Fast testing for React and Node components.",
      docs: "https://jestjs.io/",
    },
    "Integration & E2E": {
      name: "Playwright",
      estimatedCostPerMonth: "$0",
      reason: "Cross-browser testing for user workflows.",
      docs: "https://playwright.dev/",
    },
    "Contract Testing": {
      name: "Pact",
      estimatedCostPerMonth: "$0",
      reason: "Ensures API compatibility between frontend and backend.",
      docs: "https://docs.pact.io/",
    },
    "Load & Performance": {
      name: "k6",
      estimatedCostPerMonth: "$0",
      reason: "Open-source load testing for APIs.",
      docs: "https://k6.io/",
    },
    "Code Quality": {
      name: "ESLint + Prettier",
      estimatedCostPerMonth: "$0",
      reason: "Ensures consistent and clean code style.",
      docs: "https://eslint.org/",
    },
  },

  // ANALYTICS
  analyticsTools: {
    "Behavior Analytics": {
      name: "PostHog",
      estimatedCostPerMonth: "$20",
      reason: "Privacy-friendly analytics for user flows.",
      docs: "https://posthog.com/",
    },
    "Traffic & Attribution": {
      name: "Plausible Analytics",
      estimatedCostPerMonth: "$9",
      reason: "Simple, privacy-first website analytics.",
      docs: "https://plausible.io/",
    },
    "Productivity Integrations": {
      name: "Notion API + Zapier",
      estimatedCostPerMonth: "$15",
      reason: "Integrations for journaling and task automation.",
      docs: "https://developers.notion.com/",
    },
  },

  // COMMUNICATION
  communicationTools: {
    "Team Messaging": {
      name: "Slack",
      estimatedCostPerMonth: "$30",
      reason: "Smooth team collaboration and integrations.",
      docs: "https://slack.com/",
    },
    "Email / Transactional": {
      name: "Resend (API-based)",
      estimatedCostPerMonth: "$15",
      reason: "Clean transactional email delivery with TypeScript SDK.",
      docs: "https://resend.com/",
    },
    "Customer Support Chat": {
      name: "Crisp Chat",
      estimatedCostPerMonth: "$25",
      reason: "Real-time chat with calm, modern UI.",
      docs: "https://crisp.chat/",
    },
  },

  // SECURITY
  security: {
    "Auth / Identity": {
      name: "Clerk",
      estimatedCostPerMonth: "$30",
      reason: "Privacy-first auth with magic links and SSO.",
      docs: "https://clerk.com/",
    },
    "Vulnerability Scanning": {
      name: "Snyk",
      estimatedCostPerMonth: "$0–20",
      reason: "Detects security issues in dependencies.",
      docs: "https://snyk.io/",
    },
    "Encryption & Data Protection": {
      name: "AWS KMS",
      estimatedCostPerMonth: "$5",
      reason: "Manages encryption keys for sensitive data.",
      docs: "https://aws.amazon.com/kms/",
    },
    Compliance: {
      name: "Vanta",
      estimatedCostPerMonth: "$100+",
      reason: "Automates SOC2 and GDPR compliance checks.",
      docs: "https://vanta.com/",
    },
    "Incident Response": {
      name: "PagerDuty",
      estimatedCostPerMonth: "$20",
      reason: "Real-time alerts and incident coordination.",
      docs: "https://www.pagerduty.com/",
    },
  },

  // AI AUTOMATION
  aiAutomation: {
    "LLM / Chatbot Framework": {
      name: "OpenAI API (GPT-4)",
      estimatedCostPerMonth: "$50",
      reason: "Personalized mindfulness chatbot for user reflection.",
      docs: "https://platform.openai.com/",
    },
    "Vector Database": {
      name: "Pinecone",
      estimatedCostPerMonth: "$30",
      reason: "Semantic search for journal entries and recommendations.",
      docs: "https://www.pinecone.io/",
    },
    "AI API Integration": {
      name: "LangChain",
      estimatedCostPerMonth: "$0",
      reason: "Framework for chaining AI calls and memory.",
      docs: "https://www.langchain.com/",
    },
    "Automation / Workflow Orchestration": {
      name: "n8n (Self-hosted)",
      estimatedCostPerMonth: "$10",
      reason: "Automates reminders and user engagement workflows.",
      docs: "https://n8n.io/",
    },
  },
};
