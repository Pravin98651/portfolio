export const portfolioData = {
  personal: {
    name: "Pravin",
    fullName: "Pravin",
    role: "Software Developer",
    positioning: "Software Developer | Full-Stack Development | Applied AI",
    coreMessage: "I build useful digital products by combining software engineering, AI, backend systems, and practical problem-solving.",
    heroTitle: {
      line1: "BUILDING",
      line2: "IDEAS INTO",
      highlight: "USEFUL",
      line3: "PRODUCTS",
      since: "SOFTWARE DEVELOPER · APPLIED AI",
    },
    heroIntro: "I design and develop software products that bring together full-stack engineering, AI, and automation. From user-facing applications to backend workflows and intelligent systems, I enjoy turning practical problems into working technology.",
    aboutLong: "I'm a software developer passionate about building technology that solves meaningful problems. My interests span full-stack development, artificial intelligence, backend engineering, and automation. My projects have involved building applications with multiple user interfaces, connecting frontend applications to backend APIs, integrating AI models into practical workflows, processing documents, designing retrieval pipelines, and working with databases and external services. I approach projects by first understanding the problem and the people who experience it, breaking the idea into modular components, and building incrementally with clean data modelling and robust error handling.",
    aboutShort: "I'm a software developer who enjoys building complete applications using full-stack technologies and applied AI. I like working across the development lifecycle—from understanding a problem and designing the architecture to implementing features, integrating services, and improving the final experience.",
    backCard: {
      title: "Full-Stack & Applied AI",
      since: "PRAVIN · DEV",
      skillsCategory: "CORE FOCUS & SPECIALTIES",
      skills: [
        "Full-Stack Product Architecture",
        "Applied AI & LangGraph Workflows",
        "Python · FastAPI · Node.js",
        "Next.js 14 · React Native · TypeScript",
        "Vector Retrieval & RAG Pipelines"
      ],
      buttonText: "DOWNLOAD CV",
      downloadUrl: "/assets/Pravin_Resume.pdf",
      footerNote: "flip to see photo & socials"
    },
    avatar: "/assets/user-avatar.png",
    socials: [
      { id: "github", label: "GitHub", href: "https://github.com/Pravin98651", icon: "/assets/icon-github.svg" },
      { id: "email", label: "Email", href: "mailto:pravin.dev@example.com", icon: "/assets/icon-email.svg" },
      { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com", icon: "/assets/icon-linkedin.svg" },
      { id: "resume", label: "Resume", href: "#resume", icon: "/assets/icon-resume.svg" },
    ],
    stickers: [
      {
        id: "sticker1",
        image: "/assets/sticker-ai-clean.svg",
        alt: "Zero Hallucinations // Verified Data",
        className: "absolute -top-6 -right-6 w-24 h-24 hover:scale-110 transition-transform duration-200 z-10 drop-shadow-md cursor-pointer",
        tooltip: "Zero Hallucinations // 100% Verified Pipeline"
      },
      {
        id: "sticker2",
        image: "/assets/sticker-langgraph.svg",
        alt: "LangGraph State Machine Inside",
        className: "absolute -bottom-8 -left-6 w-24 h-24 hover:scale-110 transition-transform duration-200 z-10 drop-shadow-md cursor-pointer",
        tooltip: "LangGraph Multi-Agent Architecture"
      },
      {
        id: "sticker3",
        image: "/assets/sticker-trust-data.svg",
        alt: "Trust The Data // 0% Synthetic Claims",
        className: "absolute -bottom-7 right-12 w-24 h-24 hover:scale-110 transition-transform duration-200 z-10 drop-shadow-md cursor-pointer",
        tooltip: "Verified Audit // Trust The Data"
      }
    ]
  },

  projects: [
    {
      id: "kidtube",
      title: "KidTube",
      subtitle: "Parent-Controlled Video Platform with AI Moderation",
      tagline: "A parent-controlled digital video platform designed to make children's viewing more intentional.",
      category: "Full-Stack Product Engineering · Mobile Application · AI Integration",
      country: "Parent Mode",
      flag: "🛡️",
      rating: "4.9",
      ratingSource: "Curated Viewing",
      stars: 5,
      tags: ["FULL-STACK", "APPLIED AI", "MOBILE", "NEXT.JS 14", "EXPO"],
      cover: "/assets/kidtube-preview.svg",
      images: [
        "/assets/kidtube-preview.svg",
        "/assets/kidtube-child.svg",
        "/assets/kidtube-arch.svg"
      ],
      imageCaptions: [
        "Parent Dashboard — Channel Allowlist & Content Moderation Console",
        "Child Mobile App — Distraction-Free Playback & Math Activity Tollbooth",
        "System Architecture — Next.js 14, Node/Express, TensorFlow.js & Firebase"
      ],
      client: "Flagship Full-Stack System",
      role: "Primary Developer & Architect",
      timeline: "Complete Architecture & MVP",
      liveUrl: "https://kidtube-dun.vercel.app/",
      githubUrl: "https://github.com/Pravin98651/Kidtube",
      summary: "A parent-controlled video platform replacing algorithmic recommendations with a strict channel allowlist, separate Next.js 14 parent dashboard, Expo/React Native child app, and AI-assisted thumbnail screening via TensorFlow.js & NSFWJS.",
      stats: [
        { label: "Architecture", value: "3 Subsystems" },
        { label: "AI Screening", value: "NSFWJS / TF.js" },
        { label: "Recommendation", value: "100% Curated" },
        { label: "Child Safety", value: "PIN Locked" }
      ],
      caseStudy: {
        problem: "Open video platforms contain massive content catalogs and aggressive recommendation algorithms that can easily lead children to distracting or inappropriate material. Parents need a practical, centralized way to manage channel permissions, enforce screen-time limits, set bedtimes, and review viewing history across multiple children on shared devices without constant manual supervision.",
        solution: "KidTube replaces open recommendations with a parent-managed allowlist model. Parents authenticate into a Next.js 14 dashboard to manage child profiles and approve specific channels. The backend uses the YouTube Data API to fetch channel metadata and runs an AI thumbnail-screening pipeline using TensorFlow.js and NSFWJS. Children view permitted videos through a simplified Expo/React Native app equipped with an educational math tollbooth after every three videos.",
        workflowSteps: [
          {
            step: 1,
            title: "Parent Account Creation & Authentication",
            desc: "Parent registers or signs in via Next.js dashboard. Backend verifies identity using Firebase Authentication and returns a JWT session token for protected route authorization."
          },
          {
            step: 2,
            title: "Child Profile Provisioning",
            desc: "Parents create isolated child profiles with distinct identifiers, avatars, star counts, daily screen-time limits, bedtime schedules, hidden video lists, and viewing histories in Firestore."
          },
          {
            step: 3,
            title: "Channel Allowlist Submission",
            desc: "Parent enters a YouTube channel URL or @handle. The backend resolves channel metadata and recent uploads using the YouTube Data API v3 and stores subscription mappings."
          },
          {
            step: 4,
            title: "AI-Assisted Thumbnail Screening",
            desc: "Backend retrieves the 20 most recent video thumbnails for the submitted channel and runs concurrent batch classification using TensorFlow.js and NSFWJS (Porn, Sexy, Hentai filters)."
          },
          {
            step: 5,
            title: "Child-Specific Feed Assembly",
            desc: "When a child selects their profile, the backend constructs a customized feed scoped strictly to that profile's parent-approved channels minus any hidden videos."
          },
          {
            step: 6,
            title: "Distraction-Free Mobile Playback",
            desc: "Child views videos in an Expo/React Native application with custom touch-blocking overlays over distracting YouTube UI elements (watermarks, share buttons, end screens)."
          },
          {
            step: 7,
            title: "Screen-Time & Bedtime Enforcement",
            desc: "Client-side rules monitor cumulative daily watch time and local clock bedtimes, presenting a sleep/lock screen with a parent-only PIN override challenge."
          },
          {
            step: 8,
            title: "Educational Tollbooth & Star Rewards",
            desc: "After every 3 completed videos, an interactive mathematics question is presented to earn stars, turning passive video watching into active educational engagement."
          },
          {
            step: 9,
            title: "Local Feed Caching & Nightly Sync",
            desc: "AsyncStorage caches feed metadata locally for instant playback under poor connectivity. A scheduled GitHub Actions workflow synchronizes channel data nightly at 02:00 UTC."
          }
        ],
        keyFeatures: [
          "Parent-controlled allowlist: Parents approve channels and can hide individual videos at will.",
          "Multi-child profile isolation: Separate viewing feeds, star rewards, and limits per sibling.",
          "Configurable screen-time controls: Enforce daily viewing caps and automated bedtime lockouts.",
          "AI-assisted thumbnail screening: TensorFlow.js and NSFWJS evaluate video thumbnails on channel onboarding.",
          "Educational Tollbooth: Interactive mathematics quiz presented every 3 videos to encourage active learning.",
          "Distraction-free child playback: Touch-blocking overlays prevent accidental external navigation.",
          "Offline feed caching: AsyncStorage ensures fast startup even under low-bandwidth network conditions."
        ],
        techStackTable: [
          { component: "Parent Dashboard", tech: "Next.js 14, React, Tailwind CSS" },
          { component: "Child Application", tech: "Expo, React Native" },
          { component: "Backend API", tech: "Node.js, Express" },
          { component: "Database & Auth", tech: "Firebase Firestore, Firebase Authentication, JWT" },
          { component: "AI Screening", tech: "TensorFlow.js, NSFWJS" },
          { component: "Video Feed API", tech: "YouTube Data API v3" },
          { component: "Client Storage", tech: "AsyncStorage" },
          { component: "Synchronization", tech: "GitHub Actions scheduled workflow (02:00 UTC)" }
        ],
        dataEntities: [
          { entity: "Parent Account", purpose: "Manages parent credentials and account settings." },
          { entity: "User Settings", purpose: "Stores global configurations (Shorts availability, educational toggle)." },
          { entity: "Child Profile", purpose: "Stores child name, stars, daily time limit, bedtime, and watch history." },
          { entity: "Child Subscriptions", purpose: "Associates approved channel allowlists with a specific child." },
          { entity: "Channel Registry", purpose: "Shared channel metadata and YouTube channel IDs." },
          { entity: "Video Records", purpose: "Stores video IDs, titles, thumbnails, publish dates, and durations." }
        ],
        engineeringDecisions: [
          "Separate parent and child interfaces: Administrative management belongs on desktop web; child consumption belongs on touch mobile.",
          "Shared central backend API: Centralizes business rules, prevents duplication between web and mobile, and isolates Firestore keys.",
          "Allowlist model over blocklist: An explicit allowlist eliminates unpredictable recommendation algorithms entirely.",
          "Concurrent thumbnail screening: Using Promise.all across the 20 most recent thumbnails optimizes onboarding latency while screening inappropriate imagery."
        ],
        myContribution: "I was the primary developer of KidTube. My work spanned full application architecture, the Next.js 14 parent dashboard, the Expo/React Native child application, backend API routes, Firestore schema, YouTube Data API integration, and the AI thumbnail-screening pipeline.",
        whatILearned: "Coordinating multi-interface ecosystems with a shared backend, managing profile-level state synchronization, and integrating edge AI models into asynchronous product workflows.",
        accuracyNote: "AI-assisted screening evaluates thumbnails when channels are added. It does not analyze full continuous video audio/frames or guarantee complete child safety. Described features reflect the current tested build.",
        interviewQA: [
          {
            q: "Why did you separate the parent dashboard and child mobile application?",
            a: "The two user groups have fundamentally different intents. Parents need administrative control (managing channels, configuring limits, reviewing history), while children need a distraction-free, touch-friendly consumption interface without administrative levers."
          },
          {
            q: "How does the thumbnail-screening pipeline work?",
            a: "When a parent adds a channel, the backend retrieves the 20 most recent video IDs and thumbnails via the YouTube Data API. These thumbnails are classified concurrently using TensorFlow.js and NSFWJS running in Node.js to screen for inappropriate categories before committing to Firestore."
          },
          {
            q: "Why is thumbnail screening not full-video moderation?",
            a: "A thumbnail is only a static frame. It does not inspect spoken audio, mid-video scene changes, or dialogue context. In production, thumbnail screening is an initial triage layer, not a replacement for parental oversight."
          }
        ]
      }
    },
    {
      id: "job-hunt-ai",
      title: "Job Hunt AI",
      subtitle: "AI-Assisted Job Discovery & Workflow Automation",
      tagline: "An AI-assisted job discovery and application-management platform.",
      category: "Applied AI · Full-Stack Development · Workflow Automation · Data Engineering",
      country: "Applied AI",
      flag: "⚡",
      rating: "4.8",
      ratingSource: "Gemini Match",
      stars: 5,
      tags: ["APPLIED AI", "GEMINI 1.5", "LANGGRAPH", "FASTAPI", "PLAYWRIGHT"],
      cover: "/assets/jobhunt-preview.svg",
      images: [
        "/assets/jobhunt-preview.svg",
        "/assets/jobhunt-resume.svg",
        "/assets/jobhunt-arch.svg"
      ],
      imageCaptions: [
        "Interactive Job Discovery Console & Kanban Application Pipeline",
        "PDF Resume Parser, Compatibility Scoring & Skill-Gap Analysis Matrix",
        "System Architecture — LangGraph 2-Node Workflow, 3-Layer Deduplication & Scoring"
      ],
      client: "Flagship AI Platform",
      role: "Primary Developer & System Architect",
      timeline: "Full Pipeline Architecture",
      liveUrl: "#",
      githubUrl: "https://github.com/Pravin98651/Job_Hunter",
      summary: "End-to-end intelligent career suite combining concurrent web scraping (LinkedIn, Indeed, Glassdoor), PDF resume parsing, Google Gemini 1.5/2.0 compatibility scoring, 3-layer deduplication, and LangGraph workflow orchestration.",
      stats: [
        { label: "LLM Model", value: "Gemini 1.5 / 2.0" },
        { label: "Orchestration", value: "LangGraph" },
        { label: "Vector Deduplication", value: "pgvector (0.92)" },
        { label: "Scraping", value: "Async Playwright" }
      ],
      caseStudy: {
        problem: "Job hunting requires searching across multiple fragmented job boards (LinkedIn, Indeed, Glassdoor), repeatedly reading repetitive job descriptions, comparing complex requirements, and manually tracking application stages on spreadsheets without feedback or skill-gap insights.",
        solution: "Job Hunt AI centralizes job discovery by aggregating listings concurrently from supported sources, parsing candidate PDF resumes into structured skill matrices, executing 3-layer duplicate detection (source ID, pgvector semantic similarity, DB constraints), calculating weighted AI compatibility scores via Google Gemini, identifying exact missing skills, and managing applications in a Kanban pipeline.",
        workflowSteps: [
          {
            step: 1,
            title: "Candidate Profile & Resume Ingestion",
            desc: "Candidate uploads a PDF resume. The backend extracts text using PyPDF2 and passes it to Google Gemini to structure core skills, years of experience, and preferences."
          },
          {
            step: 2,
            title: "Search Query & State Compilation",
            desc: "User inputs target role and location. An orchestration state is passed to a compiled two-node LangGraph workflow: scrape -> score."
          },
          {
            step: 3,
            title: "Concurrent Source Scraping",
            desc: "The scrape node initiates concurrent workers across LinkedIn, Indeed, Glassdoor, Wellfound, and Remotive using asyncio.gather(return_exceptions=True) for fault-tolerant collection."
          },
          {
            step: 4,
            title: "Listing Schema Normalization",
            desc: "Scraped jobs are converted into a unified schema (source, external ID, title, company, location, salary, description, application URL) decoupling downstream steps from source markup."
          },
          {
            step: 5,
            title: "Layer 1: Source ID Deduplication",
            desc: "Checks database for matching source + external ID pairs, skipping expensive vector embedding and scoring for previously ingested postings."
          },
          {
            step: 6,
            title: "Layer 2: Semantic pgvector Similarity",
            desc: "New listings are vectorized via Google text-embedding-004. pgvector calculates cosine distance against stored descriptions (0.92 similarity threshold detects cross-platform reposts)."
          },
          {
            step: 7,
            title: "Layer 3: DB Integrity Constraints",
            desc: "Database-level unique constraints guard against race conditions under concurrent async scraping requests."
          },
          {
            step: 8,
            title: "AI Weighted Scoring with Google Gemini",
            desc: "Evaluates candidate profile vs job description across a 5-dimension rubric: Skills (40%), Title/Seniority (25%), Location (15%), Salary (10%), Growth (10%). Keyword fallback if AI offline."
          },
          {
            step: 9,
            title: "Decoupled Data Persistence",
            desc: "Global job listings are stored once, while candidate-specific match scores, skill gaps, and explanations are stored in linked per-user records."
          },
          {
            step: 10,
            title: "Application Pipeline Management",
            desc: "Users review matches and drag opportunities across Kanban stages: Bookmarked, Applied, Interviewing, Rejected, and Offer."
          },
          {
            step: 11,
            title: "Application Preparation & Analytics",
            desc: "Generates job-tailored cover letter drafts, role-specific interview Q&A briefs, and visualizes application trends and recurring skill gaps."
          }
        ],
        keyFeatures: [
          "Automated multi-source job collection: Ingests listings with concurrent async scrapers.",
          "Structured PDF resume parsing: Extracts candidate experience, education, and skills using Gemini.",
          "3-Layer deduplication: Source ID check + pgvector semantic cosine distance (0.92) + DB constraints.",
          "Weighted AI compatibility scoring: 5-dimension evaluation returning numeric fit (0-100), skill gaps, and rationale.",
          "Tailored cover-letter & interview briefs: Synthesizes role-specific preparation documents.",
          "Kanban application tracker: Full lifecycle tracking from bookmarked to offer stage.",
          "Scheduled workflow automation: APScheduler triggers recurring searches with webhook alerts."
        ],
        techStackTable: [
          { component: "Frontend Dashboard", tech: "Next.js, React, TypeScript, Tailwind CSS" },
          { component: "Backend Framework", tech: "Python, FastAPI, Pydantic" },
          { component: "AI & LLM Integration", tech: "Google Gemini 1.5 / 2.0 (JSON mode)" },
          { component: "Embeddings & Vectors", tech: "Google text-embedding-004, PostgreSQL + pgvector" },
          { component: "Workflow Orchestrator", tech: "LangGraph (two-node compiled graph)" },
          { component: "Browser Automation", tech: "Playwright, asyncio, BeautifulSoup" },
          { component: "Database & ORM", tech: "PostgreSQL, Supabase, SQLAlchemy" },
          { component: "Scheduler & Webhooks", tech: "APScheduler, Slack / Telegram Webhooks" }
        ],
        engineeringDecisions: [
          "LangGraph stateful workflow: Using an explicit graph decouples scraping, deduplication, scoring, and storage into independently testable nodes.",
          "Decoupling listings from user scores: Reusable job records allow the same listing to be scored differently across multiple candidate profiles.",
          "Layered deduplication: Inexpensive ID checks happen first, preventing costly vector embedding API calls on identical listings.",
          "Structured Pydantic validation: Enforcing strict JSON schema responses prevents LLM hallucinations from crashing UI dashboards."
        ],
        myContribution: "Architected the full system including the Next.js UI, FastAPI microservices, Playwright scraping jobs, LangGraph agent evaluation chain, and database schemas.",
        whatILearned: "Hands-on experience orchestrating LLMs into multi-agent workflows, managing asynchronous data collection pipelines, and designing actionable analytical dashboards for end users.",
        accuracyNote: "Evaluations reflect Gemini's semantic comparison of resume data to job listings. Live scraping integrations depend on supported source layout stability; fallback data is used when anti-bot protections trigger.",
        interviewQA: [
          {
            q: "Why did you use LangGraph for the processing workflow?",
            a: "LangGraph provides explicit state management across asynchronous multi-step pipelines. It lets us separate the scrape node from the score/dedup node cleanly, enabling partial recoveries and inspection at each step."
          },
          {
            q: "How does the layered deduplication work?",
            a: "First, an exact match check on source + external ID catches repeated runs cheaply. Second, semantic vector search via text-embedding-004 and pgvector catches cross-posted jobs with a 0.92 cosine similarity threshold. Finally, DB unique constraints prevent race conditions."
          },
          {
            q: "What happens when an LLM call or scraper fails?",
            a: "Scrapers use asyncio.gather(return_exceptions=True) so one blocked site doesn't fail the batch. For scoring, a deterministic keyword-based fallback assesses title and skill overlap if the Gemini API is unreachable."
          }
        ]
      }
    },
    {
      id: "lexifyd-tamil",
      title: "Lexifyd Tamil",
      subtitle: "Context-Aware AI Language Learning Prototype",
      tagline: "Context-aware Tamil vocabulary learning through meanings, examples, and interactive exercises.",
      category: "Applied AI · Language Technology · Educational Software · Prototype",
      country: "Tamil NLP",
      flag: "அ",
      rating: "4.9",
      ratingSource: "Polysemy Engine",
      stars: 5,
      tags: ["NLP", "GEMINI", "FASTAPI", "VITE", "TYPESCRIPT"],
      cover: "/assets/lexifyd-preview.svg",
      images: [
        "/assets/lexifyd-preview.svg",
        "/assets/lexifyd-arch.svg"
      ],
      imageCaptions: [
        "Semantic Polysemy Explorer, Contextual Examples & Distractor Quiz Generator",
        "System Architecture — Gemini Prompt Chain, Polysemy Engine & Dual-Tier Storage"
      ],
      client: "Language Technology Prototype",
      role: "Primary Developer",
      timeline: "Prototype & Evaluation",
      liveUrl: "#",
      githubUrl: "https://github.com/Pravin98651/Lexifyd-Tamil",
      summary: "AI-assisted prototype addressing vocabulary polysemy in Tamil by dynamically generating contextual senses, natural example sentences, plausible distractors, and semantic graphs with Google Gemini.",
      stats: [
        { label: "Target Domain", value: "Tamil Polysemy" },
        { label: "Generation", value: "Google Gemini" },
        { label: "Backend", value: "FastAPI + Redis" },
        { label: "Client", value: "Vite + TypeScript" }
      ],
      caseStudy: {
        problem: "Rote vocabulary memorization fails when single words carry completely different meanings across contexts. In Tamil, polysemous words (e.g. 'பார்' meaning 'to look' vs 'the world') require contextual immersion rather than static isolated dictionary lookups.",
        solution: "Lexifyd uses Google Gemini to generate structured learning material: identifying multiple senses for ambiguous Tamil words, synthesizing natural example sentences, and creating plausible distractor answers for interactive drag-and-drop exercises.",
        workflowSteps: [
          {
            step: 1,
            title: "Word Selection",
            desc: "Learner selects or searches an ambiguous Tamil root word (e.g. 'பார்')."
          },
          {
            step: 2,
            title: "Multi-Sense Generation",
            desc: "Backend prompts Google Gemini with structured output constraints to identify distinct contextual senses."
          },
          {
            step: 3,
            title: "Contextual Sentence Synthesis",
            desc: "Generates authentic Tamil sentences paired with English translations demonstrating each distinct sense in natural syntax."
          },
          {
            step: 4,
            title: "Smart Distractor Creation",
            desc: "Synthesizes distractor options that are grammatically plausible in Tamil but contextually incorrect for the target sentence."
          },
          {
            step: 5,
            title: "Structured Data Delivery",
            desc: "FastAPI delivers structured JSON exercises to the Vite/TypeScript frontend."
          },
          {
            step: 6,
            title: "Interactive Drag-and-Drop Quiz",
            desc: "Learners drag candidate meanings into sentence slots, receiving instant feedback."
          },
          {
            step: 7,
            title: "Semantic Web Exploration",
            desc: "Visual knowledge graph links root words to senses and illustrative sentence nodes."
          },
          {
            step: 8,
            title: "Caching & Persistence Fallback",
            desc: "Redis caches frequent query responses; PostgreSQL persists records with a local SQLite fallback for offline development."
          }
        ],
        keyFeatures: [
          "Dynamic polysemy breakdown: Identifies multiple contextual senses for ambiguous Tamil words.",
          "Natural sentence synthesis: Generates authentic Tamil sentences paired with English translations.",
          "Plausible distractor generation: Creates challenging exercise options that require semantic reasoning.",
          "Interactive drag-and-drop exercises: Hands-on learning interface testing contextual comprehension.",
          "Visual semantic graph: Visualizes relational connections between roots, meanings, and sentence usages.",
          "Dual-layer caching: Redis cache with PostgreSQL and SQLite fallback."
        ],
        techStackTable: [
          { component: "Backend API", tech: "Python, FastAPI" },
          { component: "Frontend Interface", tech: "Vite, TypeScript, Tailwind CSS" },
          { component: "Generative AI", tech: "Google Gemini API" },
          { component: "Databases & Cache", tech: "PostgreSQL, Redis, SQLite fallback" },
          { component: "Containerization", tech: "Docker for local DB & Redis" }
        ],
        engineeringDecisions: [
          "Teach meaning through context: Replaces static flashcards with active sentence-meaning pairing.",
          "Plausible distractor design: Distractors must be semantically tempting rather than obvious random words to enforce real comprehension.",
          "Decoupled generation & presentation: Backend outputs structured JSON so prompts and UI can evolve independently."
        ],
        myContribution: "Designed the prompt chains, structured JSON generation schema, FastAPI API layer, and interactive quiz interface.",
        whatILearned: "Translating nuanced linguistics challenges into prompt-engineered LLM workflows with fallback caching strategies.",
        accuracyNote: "Prototype developed to explore semantic polysemy learning; intended for educational experimentation. AI-generated Tamil sentences require review by fluent educators.",
        interviewQA: [
          {
            q: "What is polysemy and why does it matter in language learning?",
            a: "Polysemy is when a single word has multiple related meanings depending on context. Memorizing one definition leaves learners confused when encountering the word in other sentences. Contextual exercises teach how context disambiguates meaning."
          },
          {
            q: "How do you design a 'smart distractor'?",
            a: "Instead of choosing random unrelated words, a smart distractor is a valid word or alternate meaning that fits grammatically but fails the semantic context of that specific sentence, forcing the learner to evaluate meaning."
          }
        ]
      }
    },
    {
      id: "rag-chatbot",
      title: "Multi-Role RAG Chatbot",
      subtitle: "Department-Aware Knowledge Retrieval Assistant",
      tagline: "A role-aware knowledge assistant for retrieving information from departmental documents.",
      category: "AI Engineering · Retrieval-Augmented Generation · Backend Development",
      country: "Enterprise RAG",
      flag: "🏢",
      rating: "4.7",
      ratingSource: "FAISS Indexed",
      stars: 5,
      tags: ["RAG", "FAISS", "GROQ API", "STREAMLIT", "FASTAPI"],
      cover: "/assets/ragchatbot-preview.svg",
      images: [
        "/assets/ragchatbot-preview.svg",
        "/assets/ragchatbot-arch.svg"
      ],
      imageCaptions: [
        "Role-Scoped Ingestion Console & High-Throughput Groq LLM Citation Chat",
        "System Architecture — Department Folder Partitioning, FAISS IndexFlatIP & Groq Inference"
      ],
      client: "Knowledge Engineering Prototype",
      role: "Backend & AI Engineer",
      timeline: "Architecture & Retrieval Pipeline",
      liveUrl: "#",
      githubUrl: "https://github.com/Pravin98651/Multi-Role-Based-RAG-Chatbot",
      summary: "Document-grounded RAG prototype with departmental document collections (Engineering, Finance, HR, Marketing), Sentence Transformers embeddings, sub-15ms FAISS vector retrieval, and citation-backed Groq LLM response generation.",
      stats: [
        { label: "Retrieval", value: "FAISS (<15ms)" },
        { label: "Embeddings", value: "all-MiniLM-L6" },
        { label: "Inference", value: "Groq (Qwen-qwq-32b)" },
        { label: "Role Scopes", value: "5 Departments" }
      ],
      caseStudy: {
        problem: "Organizations store vital operational knowledge across scattered departmental documents (policies, technical guides, HR forms, financial reports). Employees struggle to locate specific answers, while sensitive records require strict permission-scoped access controls.",
        solution: "Engineered a RAG prototype combining FastAPI authentication with role-oriented document partitioning. Ingested Markdown, text, and CSV files are chunked with overlap, vectorized using Sentence Transformers (all-MiniLM-L6-v2), indexed in FAISS for sub-15ms similarity lookups, and streamed to Groq's LLM API for accurate citation-backed answers.",
        workflowSteps: [
          {
            step: 1,
            title: "Departmental Folder Scoping",
            desc: "Documents are organized into role folders (engineering, finance, hr, marketing, general) which assign role metadata to all contained chunks."
          },
          {
            step: 2,
            title: "Document Ingestion & Parsing",
            desc: "Document processor reads Markdown (.md), plain text (.txt), and CSV files (via pandas), converting structured tables into searchable text representations."
          },
          {
            step: 3,
            title: "Paragraph-Aware Chunking with Overlap",
            desc: "Splits text into ~500-word chunks with a 50-word sliding overlap along paragraph boundaries to maintain narrative continuity across chunk seams."
          },
          {
            step: 4,
            title: "Metadata Tagging",
            desc: "Attaches source file path, department role, and chunk index to every chunk ID to support verifiable source citations in generated answers."
          },
          {
            step: 5,
            title: "Dense Vector Embedding",
            desc: "Encodes chunks into dense numerical vectors using the Sentence Transformers all-MiniLM-L6-v2 model in a unified semantic embedding space."
          },
          {
            step: 6,
            title: "Role-Specific FAISS Indexing",
            desc: "Constructs separate FAISS inner-product indexes (IndexFlatIP) persisted as index, chunk, and metadata pickle files under resources/vector_store/."
          },
          {
            step: 7,
            title: "Authentication & Role Resolution",
            desc: "FastAPI HTTP Basic authentication validates credentials and identifies the user's authorized role."
          },
          {
            step: 8,
            title: "Semantic Passage Retrieval",
            desc: "Encodes user query with the same embedding model and executes sub-15ms vector similarity lookup to retrieve top relevant chunks."
          },
          {
            step: 9,
            title: "Context Construction & Token Budgeting",
            desc: "Formats retrieved passages with source citations and uses a tokenizer to ensure prompts stay strictly within configured token limits."
          },
          {
            step: 10,
            title: "LLM Generation & Source Citations",
            desc: "Groq API (Qwen-qwq-32b) generates answers strictly grounded in retrieved passages, providing exact file names and chunk IDs, or stating when context is insufficient."
          },
          {
            step: 11,
            title: "Structured HR Table Queries",
            desc: "Specialized helper logic uses pandas for exact employee ID, manager, or department lookups, demonstrating a hybrid semantic/tabular approach."
          }
        ],
        keyFeatures: [
          "Departmental role partitions: Engineering, Finance, HR, Marketing, and General scopes.",
          "Document ingestion pipeline: Supports Markdown, plain text, and CSV tables.",
          "Paragraph-aware chunking: 500 words with 50-word overlap for contextual continuity.",
          "Sub-15ms vector retrieval: FAISS indexing paired with Sentence Transformers (all-MiniLM-L6-v2).",
          "High-throughput generation: Groq API synthesizes answers with source citations in under 300ms.",
          "Streamlit conversational interface: Clean web UI with source metadata inspection."
        ],
        techStackTable: [
          { component: "API & Backend", tech: "FastAPI, Python, HTTP Basic Auth" },
          { component: "Chat Interface", tech: "Streamlit" },
          { component: "Vector Search", tech: "FAISS (IndexFlatIP)" },
          { component: "Embedding Model", tech: "Sentence Transformers (all-MiniLM-L6-v2)" },
          { component: "LLM Inference", tech: "Groq Cloud API (Qwen-qwq-32b)" },
          { component: "Tabular Processing", tech: "pandas" }
        ],
        engineeringDecisions: [
          "Overlap chunking: 50-word overlap preserves critical context around arbitrary boundary splits.",
          "Local FAISS persistence: Eliminates external hosted vector DB dependencies for self-contained execution.",
          "Strict citation prompting: Explicitly instructs model to cite source files and chunk IDs, preventing ungrounded hallucinations."
        ],
        myContribution: "Implemented the document processing, FAISS vector indexer, role-filtering retrieval logic, and Streamlit chat frontend.",
        whatILearned: "Hands-on engineering of the RAG lifecycle: chunking strategies, embedding dimensionality, semantic similarity thresholds, and permission-aware retrieval boundaries.",
        accuracyNote: "Prototype developed for RAG exploration. In the published code, normal queries search across all roles; a production RBAC deployment requires strict retrieval-time role scoping, hashed credential management, and restricted CORS.",
        interviewQA: [
          {
            q: "Why split documents into chunks with overlap rather than embedding whole files?",
            a: "Embedding entire long files loses specific granular details and exceeds model context limits. Chunking keeps vectors focused on discrete ideas. A 50-word overlap ensures sentences split at boundaries retain surrounding context."
          },
          {
            q: "What is the difference between semantic search and keyword search?",
            a: "Keyword search matches exact words. Semantic vector search (via Sentence Transformers & FAISS) maps concepts into mathematical embedding space, finding conceptually relevant passages even when completely different synonyms are used."
          },
          {
            q: "What is needed to make this prototype enterprise RBAC-secure?",
            a: "1. Enforce role filtering at retrieval time so queries cannot search across unauthorized department indexes. 2. Replace demo credentials with managed OAuth/JWT identity. 3. Restrict FastAPI CORS origins. 4. Implement field-level masking for sensitive HR data."
          }
        ]
      }
    }
  ],

  resume: {
    downloadLink: "#",
    summary: "Software developer passionate about building useful digital products by combining full-stack engineering, applied AI, backend architecture, and automation. Experienced across the complete development lifecycle—from problem discovery and data modelling to API design, service integration, and user experience refinement.",
    experiences: [
      {
        role: "Primary Developer & Architect",
        company: "KidTube (Next.js 14, React Native / Expo, TensorFlow.js)",
        period: "2024 — Present",
        location: "Remote / Open-Source",
        description: "Architected a parent-controlled video platform built around an allowlist curation model. Built the Next.js 14 parent management console, the Expo/React Native child viewing app with custom touch-blocking overlays, and a Node/Express backend with TensorFlow.js + NSFWJS concurrent thumbnail screening."
      },
      {
        role: "Lead Developer & System Architect",
        company: "Job Hunt AI (FastAPI, Google Gemini, LangGraph, Playwright)",
        period: "2024",
        location: "Remote",
        description: "Engineered an intelligent career discovery suite. Built concurrent multi-source job scrapers using asyncio, PDF resume parsing with Gemini, 3-layer deduplication with pgvector (0.92 cosine threshold), LangGraph orchestration, and a Kanban application tracker."
      },
      {
        role: "AI & Backend Engineer",
        company: "Lexifyd Tamil (FastAPI, Google Gemini, TypeScript, Vite)",
        period: "2023 — 2024",
        location: "Remote",
        description: "Developed an educational language prototype tackling Tamil polysemy. Designed structured prompt chains with Google Gemini to synthesize distinct contextual sentences and plausible distractors for interactive drag-and-drop learning."
      },
      {
        role: "AI & Document Systems Developer",
        company: "Multi-Role RAG Chatbot (FastAPI, FAISS, Groq API, Streamlit)",
        period: "2023 — 2024",
        location: "Remote",
        description: "Implemented a document-grounded RAG prototype with departmental document partitioning. Built overlapping chunking, Sentence Transformers (all-MiniLM-L6-v2) embeddings, sub-15ms FAISS vector retrieval, and citation-backed Q&A responses via Groq."
      }
    ],
    skills: [
      {
        category: "Frontend Development",
        items: ["React", "Next.js 14", "TypeScript", "JavaScript", "Vite", "Tailwind CSS", "Streamlit", "HTML5/CSS3"]
      },
      {
        category: "Backend & Systems",
        items: ["Python", "FastAPI", "Node.js", "Express", "REST APIs", "JWT", "Pydantic", "SQLAlchemy", "Async Tasks"]
      },
      {
        category: "Applied AI & Retrieval",
        items: ["Google Gemini 1.5/2.0", "LangGraph", "Retrieval-Augmented Generation (RAG)", "FAISS", "Sentence Transformers", "TensorFlow.js", "NSFWJS", "Groq API"]
      },
      {
        category: "Databases & Storage",
        items: ["PostgreSQL", "pgvector", "Supabase", "Firebase Firestore", "Firebase Auth", "Redis", "SQLite"]
      },
      {
        category: "Mobile & Automation",
        items: ["Expo", "React Native", "AsyncStorage", "Playwright", "APScheduler", "asyncio", "GitHub Actions"]
      }
    ]
  },

  contact: {
    title: "GET IN TOUCH",
    subtitle: "Have an interesting problem? Let's connect and build something meaningful.",
    email: "pravin.dev@example.com",
    github: "https://github.com/Pravin98651",
    location: "India / Remote",
    availability: "Open to Software Engineering & AI Opportunities",
    socials: [
      { name: "GitHub", url: "https://github.com/Pravin98651", handle: "github.com/Pravin98651" },
      { name: "LinkedIn", url: "https://linkedin.com", handle: "Pravin" },
      { name: "KidTube Live", url: "https://kidtube-dun.vercel.app/", handle: "kidtube-dun.vercel.app" }
    ]
  }
};
