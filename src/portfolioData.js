export const portfolioData = {
  personal: {
    name: "Pravin G",
    fullName: "Pravin G",
    role: "Software Developer & AI Engineer",
    positioning: "Software Engineering Student · Applied AI · Full-Stack Systems",
    location: "Vellore, India",
    email: "pravin98651@gmail.com",
    github: "https://github.com/Pravin98651",
    linkedin: "https://linkedin.com/in/pravin-g-",
    coreMessage: "Innovative software engineering student building intelligent systems with LLMs, agentic AI, RAG, and Computer Vision. 20+ patents published.",
    heroTitle: {
      line1: "BUILDING",
      line2: "IDEAS INTO",
      highlight: "USEFUL",
      line3: "PRODUCTS",
      since: "SOFTWARE DEVELOPER · APPLIED AI",
    },
    heroIntro: "Innovative software engineering student with a strong foundation in building intelligent systems using LLMs, agentic AI, RAG, and Computer Vision. Demonstrated success delivering autonomous agents, production-grade full-stack platforms, and secure multi-role chatbots using modern Python and JavaScript frameworks. 20+ patents published.",
    aboutLong: "I am an innovative software engineering student at Vellore Institute of Technology (VIT, Integrated M.Tech in Software Engineering, CGPA 8.92/10.0) with a strong foundation in building intelligent systems using LLMs, agentic AI, RAG, and Computer Vision. I have demonstrated success delivering autonomous agents, production-grade full-stack platforms, and secure multi-role chatbots using modern Python and JavaScript frameworks. 20+ patents published.",
    aboutShort: "Software engineering student at VIT (CGPA 8.92/10) specializing in LLMs, agentic AI, RAG, and full-stack systems. 20+ patents published.",
    backCard: {
      title: "Full-Stack & Applied AI",
      since: "PRAVIN G · DEV",
      skillsCategory: "CORE FOCUS & SPECIALTIES",
      skills: [
        "LLMs, LangGraph & Agentic AI",
        "Enterprise RBAC & RAG Pipelines",
        "Python · FastAPI · Streamlit",
        "Next.js 14 · Expo / React Native",
        "Supabase (pgvector) · FAISS · Redis"
      ],
      buttonText: "DOWNLOAD RESUME",
      downloadUrl: "/assets/Pravin_Resume.pdf",
      footerNote: "flip to see photo & socials"
    },
    avatar: "/assets/user-avatar.png",
    socials: [
      { id: "github", label: "GitHub", href: "https://github.com/Pravin98651", icon: "/assets/icon-github.svg" },
      { id: "email", label: "Email", href: "mailto:pravin98651@gmail.com", icon: "/assets/icon-email.svg" },
      { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/pravin-g-", icon: "/assets/icon-linkedin.svg" },
      { id: "resume", label: "Resume", href: "/assets/Pravin_Resume.pdf", icon: "/assets/icon-resume.svg" },
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
      cover: "/assets/hackathons/sona-group.jpg",
      images: [
        "/assets/hackathons/sona-group.jpg",
        "/assets/hackathons/sona-lab.jpg",
        "/assets/lexifyd-preview.svg",
        "/assets/lexifyd-arch.svg"
      ],
      imageCaptions: [
        "Lexifyd Tamil Hackathon Award Felicitation on stage",
        "Pravin G and team in active engineering session developing Lexifyd Tamil",
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
    },
    {
      id: "ai-trip-planner",
      title: "AI Trip Planner",
      subtitle: "Constraint-Satisfaction Travel Scheduling & Itinerary Optimization",
      tagline: "An AI-powered travel planning and itinerary synthesis platform developed for a national-level hackathon.",
      category: "Applied AI · Travel Optimization · Itinerary Synthesis · Constraint Satisfaction",
      country: "National 1st Place",
      flag: "✈️",
      rating: "4.95",
      ratingSource: "National Hackathon 1st Place 🏆",
      stars: 5,
      tags: ["APPLIED AI", "OPTIMIZATION", "FASTAPI", "REACT", "HEURISTICS", "PYTHON"],
      cover: "/assets/hackathons/sairam-group.jpg",
      images: [
        "/assets/hackathons/sairam-group.jpg"
      ],
      imageCaptions: [
        "AI Trip Planner National Hackathon Award Felicitation on stage"
      ],
      client: "Maadhyamik Technologies (National Hackathon 1st Place)",
      role: "Core Algorithm Architect & Full-Stack Developer",
      timeline: "National Hackathon Winner",
      liveUrl: "#",
      githubUrl: "https://github.com/Pravin98651",
      summary: "An AI-powered travel planning system that synthesizes customized, day-by-day itineraries by reconciling destination choices, user budget constraints, time availability, transit buffers, and optimal activity sequences.",
      stats: [
        { label: "Award", value: "1st Place 🏆" },
        { label: "Optimization", value: "Multi-Factor" },
        { label: "Schedule", value: "Day-by-Day" },
        { label: "Pacing", value: "Adaptive" }
      ],
      caseStudy: {
        problem: "Travel planning requires balancing conflicting constraints: rigid budgets, operating hours, transit durations, group member fatigue, and personal dining preferences. Manual trip planning takes hours of cross-referencing maps, reviews, and booking sites, often leading to overscheduled, exhausting itineraries.",
        solution: "Built an algorithmic itinerary synthesizer that reconciles user budgets, travel dates, pacing styles, and activity priorities into structured, day-by-day plans with realistic transit windows and rest breaks using geographic clustering and heuristic constraint satisfaction.",
        workflowSteps: [
          {
            step: 1,
            title: "Preference & Constraint Intake",
            desc: "User inputs budget tier, travel dates, companion types (family, solo, friends), preferred travel pacing, and priority interests."
          },
          {
            step: 2,
            title: "POI Clustering & Geocoding",
            desc: "Attractions and venues are grouped geographically via K-Means spatial clustering to minimize inter-city transit time and eliminate back-and-forth travel."
          },
          {
            step: 3,
            title: "Temporal Constraint Solver",
            desc: "Schedules venues respecting operating hours, optimal daylight intervals, meal windows, and realistic road transit buffers."
          },
          {
            step: 4,
            title: "Budget Allocation & Pacing",
            desc: "Distributes overall spending evenly across admissions, dining, and transit allowances, preventing budget exhaustion on early trip days."
          },
          {
            step: 5,
            title: "Adaptive Fatigue Modeling",
            desc: "Evaluates walking intensity and inserts resting intervals or low-intensity stops between physically demanding excursions."
          },
          {
            step: 6,
            title: "Interactive Timeline & Export",
            desc: "Delivers an interactive day-by-day timeline view with Google Maps transit routes, alternate activity suggestions, and exportable summary dossiers."
          }
        ],
        keyFeatures: [
          "Dynamic multi-constraint synthesis: Reconciles time, money, location, and pacing simultaneously.",
          "Geographic attraction clustering: Prevents criss-crossing transit across town using spatial K-Means.",
          "Adaptive fatigue modeling: Inserts meals and rest intervals between intense excursions.",
          "Budget-paced spending distribution: Allocates admission, food, and transit funds evenly across days.",
          "Interactive day-by-day timeline: Responsive card-based schedule with map links and offline export."
        ],
        techStackTable: [
          { component: "Backend API", tech: "Python, FastAPI, Pydantic" },
          { component: "Optimization Engine", tech: "Heuristic Genetic Algorithms & Constraint Satisfaction" },
          { component: "Frontend Interface", tech: "React, Tailwind CSS, Lucide Icons" },
          { component: "Spatial & Mapping", tech: "OpenStreetMap / Geocoding APIs, K-Means Clustering" },
          { component: "Data Storage", tech: "SQLite / PostgreSQL for venue catalogs and user itineraries" }
        ],
        dataEntities: [
          { entity: "Trip Itinerary", purpose: "Parent schedule containing days, total budget, destination, and user preferences." },
          { entity: "Itinerary Day", purpose: "Specific date with sequential time-slot activities and transit buffers." },
          { entity: "POI Activity", purpose: "Venue name, geographic coordinates, cost, duration, and operating hours." },
          { entity: "User Preference", purpose: "Pacing profile, budget cap, dietary choices, and activity interests." }
        ],
        engineeringDecisions: [
          "Geographic clustering before scheduling: Scheduling attractions that are close together dramatically reduces travel fatigue and transit overhead.",
          "Strict constraint bounds: Enforcing hard limits on daily walking distance ensures realistic, enjoyable travel plans.",
          "Decoupled solver from UI: Clean JSON schema output lets the frontend render rich interactive timelines while the optimization engine runs asynchronously."
        ],
        myContribution: "Architected the algorithmic itinerary generator, preference input modeling, spatial attraction clustering logic, and frontend journey display.",
        whatILearned: "Formulating multi-factor constraint-satisfaction heuristics, balancing competing objective functions, and delivering award-winning prototypes under high-pressure competitive hackathons.",
        accuracyNote: "Proven and honored with 1st Place National Award at Sona College of Technology / Maadhyamik Technologies Hackathon.",
        interviewQA: [
          {
            q: "How does the trip planner avoid impossible travel times between attractions?",
            a: "The engine uses K-Means geographic clustering on latitude/longitude coordinates to group nearby activities into distinct daily zones, then calculates realistic transit buffers using road distance matrices before locking in time slots."
          },
          {
            q: "How does the solver handle conflicting preferences (e.g. low budget vs luxury dining)?",
            a: "The algorithm uses weighted multi-objective scoring. Constraints like total budget are hard boundaries, while preference tags (e.g. fine dining vs casual) are soft weights that penalize candidate schedules when violated, yielding the best Pareto-optimal compromise."
          }
        ]
      }
    }
  ],

  resume: {
    downloadLink: "/assets/Pravin_Resume.pdf",
    summary: "Innovative software engineering student with a strong foundation in building intelligent systems using LLMs, agentic AI, RAG, and Computer Vision. Demonstrated success delivering autonomous agents, production-grade full-stack platforms, and secure multi-role chatbots using modern Python and JavaScript frameworks. 20+ patents published.",
    education: {
      institution: "Vellore Institute of Technology",
      degree: "Integrated M.Tech in Software Engineering",
      period: "Aug 2023 – May 2028",
      cgpa: "8.92 / 10.0",
      location: "Vellore, India"
    },
    patents: "20+ patents published.",
    languagesKnown: [
      { name: "Tamil", level: "Native" },
      { name: "English", level: "Fluent" },
      { name: "Hindi", level: "Basic Proficiency" }
    ],
    experiences: [
      {
        role: "Primary Developer & Full-Stack Architect",
        company: "KidTube — AI-Moderated, Parent-Controlled Video Platform",
        period: "2024 — Present",
        tech: "Next.js, Expo/React Native, Node.js/Express, Firebase Firestore, TensorFlow.js, JWT",
        location: "Remote / Open-Source",
        description: "Architected a three-tier, whitelist-only video platform (parent dashboard, child mobile app, backend API) replacing recommendation-driven feeds with full parental curation. Built an AI thumbnail moderation pipeline using TensorFlow.js and nsfwjs with concurrent batch processing to screen channels before approval. Designed backend with Chain-of-Responsibility auth middleware, factory-based input validation, and a Repository-pattern API client for maintainable, secure routes."
      },
      {
        role: "Lead Developer & Agentic AI Architect",
        company: "Job Hunt AI Agent — Autonomous Job Search & Matching Platform",
        period: "2024",
        tech: "FastAPI, LangGraph, Gemini 3 Pro, Playwright, Supabase (pgvector), Next.js, Tailwind/shadcn-ui",
        location: "Remote",
        description: "Built an autonomous agent that scrapes LinkedIn job postings via Playwright and bypasses basic bot detection to extract raw listings. Orchestrated a LangGraph pipeline feeding job descriptions to Gemini 3 Pro, generating a 0–100 match score, skill-gap analysis, and reasoning against the user’s resume. Implemented semantic deduplication using sentence-transformers embeddings and Supabase pgvector to automatically skip near-duplicate postings."
      },
      {
        role: "AI & Systems Engineer",
        company: "Role-Based Internal Chatbot with RBAC and RAG",
        period: "2023 — 2024",
        tech: "Python, FastAPI, Streamlit, FAISS, Sentence Transformers, Groq LLM",
        location: "Remote",
        description: "Developed an internal chatbot tailored for enterprise-grade RBAC, enhancing secure access to departmental data. Enabled role-specific responses from internal documents using RAG, FAISS vector search, and Groq LLM. Built using FastAPI for secure login, integrated with Streamlit UI for live interaction."
      },
      {
        role: "AI & Full-Stack Engineer",
        company: "Lexifyd Tamil — Context-Aware Tamil Vocabulary Learning",
        period: "2023 — 2024",
        tech: "Python, FastAPI, Google Gemini, Vite, TypeScript, PostgreSQL, Redis",
        location: "Remote",
        description: "Developed a context-aware Tamil vocabulary-learning prototype designed to resolve polysemy using AI-assisted sense generation, dynamic sentence synthesis, and plausible distractor design. Won 2nd Place at National-Level Hackathon, Sairam Engineering College."
      }
    ],
    skills: [
      {
        category: "Programming Languages",
        items: ["Python", "C++", "Java", "C", "JavaScript"]
      },
      {
        category: "AI / ML & Agents",
        items: ["RAG", "LangGraph", "LangChain", "Gemini 3 Pro", "Groq LLM", "LLaMA3", "PyTorch", "TensorFlow", "Sentence Transformers"]
      },
      {
        category: "Web & API Engineering",
        items: ["FastAPI", "Streamlit", "Next.js", "React.js", "Node.js", "Express", "Expo / React Native", "Tailwind CSS / shadcn-ui"]
      },
      {
        category: "Data & Infrastructure",
        items: ["Firebase", "Supabase (pgvector)", "PostgreSQL", "Redis", "FAISS", "Docker"]
      },
      {
        category: "Computer Vision & Tools",
        items: ["OpenCV", "NumPy", "Playwright", "YOLO (via PyTorch)", "TensorFlow.js", "NSFWJS"]
      }
    ]
  },

  hackathons: {
    title: "AWARDS & HACKATHONS",
    tagline: "// 02. COMPETITIVE ENGINEERING & MERIT",
    intro: "I value opportunities that challenge me to turn technical ideas into practical solutions. Through national-level hackathons, innovation competitions, and academic recognition, I have explored problems across artificial intelligence, software engineering, and industrial technology. These experiences have strengthened my ability to work through real constraints, build working prototypes under pressure, and present technical solutions to industry evaluators.",
    stats: [
      { label: "National 1st Place", value: "2x Winner 🏆", subtext: "KRXGEN & Maadhyamik" },
      { label: "Danfoss Innovator", value: "2nd Place 🥈", subtext: "₹50,000 Cash Prize" },
      { label: "VIT Merit", value: "Achiever", subtext: "Academic Year 2025–26" },
      { label: "National Podiums", value: "5+ Honors", subtext: "Verified Competitions" }
    ],
    items: [
      {
        id: "danfoss-2026",
        shortTitle: "Robust RPM",
        badge: "2nd Place — National",
        badgeColor: "bg-amber-400 text-black",
        title: "Robust RPM — Vibration-Based Speed Estimation",
        event: "Danfoss Innovator Award 2026",
        organizer: "Danfoss Industries Pvt. Ltd., Chennai",
        date: "27 February 2026",
        team: "Team Foresight",
        prize: "₹50,000 Cash Prize",
        category: "Industrial IoT · Signal Processing · Anomaly Detection",
        summary: "A software-based approach to estimating industrial pump operating speed from vibration signals, eliminating reliance on fragile physical tachometers. The pipeline analyzes vibration frequency patterns, validates candidate RPMs with cepstrum analysis, checks signal abnormalities with an unsupervised autoencoder, and stabilizes measurements with time-series memory.",
        pipeline: [
          { step: "01", name: "Signal Ingestion & Preprocessing", desc: "Detrends raw vibration recordings to eliminate DC offsets, with a 50 Hz IIR notch filter to suppress grid interference." },
          { step: "02", name: "FFT Harmonic Peak Detection", desc: "Real Fast Fourier Transform converts time-domain signals to spectra, assessing 9x and 16x harmonic bands with noise profile filtering." },
          { step: "03", name: "Cepstrum Cross-Validation", desc: "Inverse transform of log spectrum detects periodic harmonic spacing, cross-verifying FFT estimates within a strict 3% agreement tolerance." },
          { step: "04", name: "Autoencoder Anomaly Detection", desc: "Unsupervised neural reconstruction error identifies abnormal signals deviating from healthy operational patterns, gating unreliable RPMs." },
          { step: "05", name: "Time-Series Tracking (EMA)", desc: "Establishes a 50-sample statistical baseline, rejecting 3σ outliers and tracking speed shifts with an exponential moving average (α = 0.05)." }
        ],
        metrics: [
          { label: "Reported Error", value: "1.32%" },
          { label: "Mean Absolute Error", value: "17.48 RPM" },
          { label: "High-Confidence Acc.", value: "100% within 2%" },
          { label: "Team Prize Awarded", value: "₹50,000" }
        ],
        contribution: "As a member of Team Foresight, contributed to the development and evaluation of the vibration-based pump-speed estimation system combining FFT analysis, cepstrum validation, anomaly detection, and time-series tracking.",
        images: [
          {
            url: "/assets/hackathons/danfoss-group.jpg",
            title: "Team Foresight Award Ceremony",
            caption: "Receiving the 2nd Place ₹50,000 prize cheque & trophy at Danfoss Industries Pvt. Ltd., Chennai"
          },
          {
            url: "/assets/hackathons/danfoss-single.jpg",
            title: "Danfoss Innovator Trophy",
            caption: "Pravin G holding the Danfoss Innovator Award 2026 trophy and award certificate"
          }
        ]
      },
      {
        id: "sona-2025",
        shortTitle: "AI Trip Planner",
        badge: "1st Place Winner 🏆",
        badgeColor: "bg-emerald-400 text-black",
        title: "AI Trip Planner",
        event: "National-Level Hackathon",
        organizer: "Maadhyamik Technologies",
        venue: "Sona College of Technology",
        category: "Applied AI · Travel Optimization · Itinerary Synthesis",
        summary: "An AI-powered travel planning system developed for a national-level hackathon organized by Maadhyamik Technologies at Sona College. Synthesizes customized, day-by-day itineraries by reconciling destination choices, user budget constraints, time availability, and optimal activity sequences.",
        highlights: [
          "Dynamic constraint-satisfaction itinerary synthesis based on travel group & budget",
          "Multi-factor preference balancing (pacing, dining, exploration, and rest intervals)",
          "Structured day-by-day activity generation with transit estimates",
          "Clean web-based interface for rapid customization and plan export"
        ],
        contribution: "Architected the algorithmic itinerary generator, preference input modeling, and frontend journey display.",
        images: [
          {
            url: "/assets/hackathons/sairam-group.jpg",
            title: "National Hackathon Award Felicitation",
            caption: "Receiving the National Hackathon certificates on stage for AI Trip Planner"
          }
        ]
      },
      {
        id: "sairam-2025",
        shortTitle: "Lexifyd Tamil",
        badge: "2nd Place 🥈",
        badgeColor: "bg-amber-400 text-black",
        title: "Lexifyd Tamil — Context-Aware Lexical Engine",
        event: "National-Level Hackathon",
        organizer: "Sairam Engineering College",
        team: "Pravin G & Mohammed Kaif K",
        category: "Natural Language Processing · Tamil Polysemy · Gamified EdTech",
        summary: "A context-aware Tamil vocabulary-learning prototype designed to teach polysemy: how a single root word carries distinct meanings based on syntactic context. Combines AI sense generation, natural Tamil sentence synthesis, linguistically plausible distractors, and interactive drag-and-drop challenges.",
        highlights: [
          "Dynamic sense identification for ambiguous polysemous Tamil root words",
          "Contextual sentence generation paired with authentic English semantic mappings",
          "Plausible distractor generation that is grammatically valid but contextually incorrect",
          "Morphological handling of Tamil suffixes, case markers, and part-of-speech shifts",
          "Learner attempt analytics tracking confusion matrices across target senses"
        ],
        contribution: "Co-developed Lexifyd Tamil, focusing on the AI-assisted lexical content pipeline, sentence-based challenge logic, and the interactive quiz interface.",
        images: [
          {
            url: "/assets/hackathons/sona-group.jpg",
            title: "National Hackathon Award Felicitation",
            caption: "Receiving national hackathon honors and certificates on stage for Lexifyd Tamil"
          },
          {
            url: "/assets/hackathons/sona-lab.jpg",
            title: "Active Hackathon Engineering Session",
            caption: "Building and testing the Lexifyd Tamil lexical engine prototype during the hackathon"
          }
        ]
      },
      {
        id: "vit-achiever",
        shortTitle: "VIT Achiever Honor",
        badge: "Achiever Recognition 🎖️",
        badgeColor: "bg-brand-yellow text-black",
        title: "VIT Achiever Honor — Merit & National Accomplishment",
        event: "Institutional Merit Award (2025–26)",
        organizer: "Vellore Institute of Technology (VIT)",
        detail: "Recognized and awarded as an 'Achiever' by VIT for outstanding merit and exceptional National-Level Achievement during the academic year 2025–26.",
        category: "Academic Merit · National Recognition · Technical Leadership",
        summary: "This prestigious institutional honor recognizes exemplary performance, innovation, and distinction while representing the Institute on national technical stages across India.",
        images: [
          {
            url: "/assets/hackathons/vit-achiever-certificate.png",
            title: "Official VIT Certificate of Appreciation",
            caption: "Awarded to Mr. PRAVIN G for National-Level Achievement by VIT Chancellor & Vice Chancellor"
          }
        ]
      },
      {
        id: "krxgen-hackathon",
        shortTitle: "AI & AR Shopping (KRXGEN)",
        badge: "1st Place Winner 🏆",
        badgeColor: "bg-emerald-400 text-black",
        title: "AI & AR Smart Shopping Experience Platform",
        event: "KRXGEN '25 National-Level Hackathon",
        organizer: "K. Ramakrishnan College of Engineering (Autonomous)",
        venue: "Trichy, Tamil Nadu",
        category: "Augmented Reality · Computer Vision · Retail AI Analytics · WebXR",
        summary: "Won 1st Place at the KRXGEN National-Level Hackathon for developing an AI & AR-powered smart shopping system. Shoppers explore products as interactive 3D AR models and navigate aisles with in-store AR positioning, while the enterprise admin engine tracks customer viewing patterns, segment analytics, and automated shelf recommendations.",
        highlights: [
          "Interactive 3D AR product visualization allowing shoppers to view items in physical space before purchasing",
          "In-store AR-based indoor navigation system guiding shoppers directly to product shelf locations",
          "Admin sales intelligence suite monitoring live retail traffic, product dwell times, and conversion funnels",
          "AI-driven shelf recommendation engine predicting high-demand inventory placements based on customer purchase history",
          "Customer segmentation & purchase behavior analytics clustering shopper profiles by browsing and buying patterns"
        ],
        contribution: "I worked on the administrative intelligence suite for monitoring sales, customer segmentation, customer purchase behavior analysis, and AI-based shelf recommendations, as well as the in-store AR-based indoor navigation system for locating products on physical shelves.",
        images: [
          {
            url: "/assets/hackathons/trichy-stage.jpg",
            title: "KRXGEN National Hackathon 1st Place Felicitation",
            caption: "Receiving 1st Place honors on stage at the KRXGEN National-Level Hackathon, K. Ramakrishnan College of Engineering, Trichy"
          },
          {
            url: "/assets/hackathons/trichy-team.jpg",
            title: "KRXGEN Hackathon Winner Certificates",
            caption: "Pravin G and team displaying official 1st Place Certificates of Appreciation for the AI & AR Shopping Platform"
          }
        ]
      }
    ]
  },

  contact: {
    title: "GET IN TOUCH",
    subtitle: "Have an interesting engineering problem or opportunity? Let's connect and build something meaningful.",
    email: "pravin98651@gmail.com",
    github: "https://github.com/Pravin98651",
    linkedin: "https://linkedin.com/in/pravin-g-",
    location: "Vellore, India",
    availability: "Open to Software Engineering & AI Opportunities",
    socials: [
      { name: "GitHub", url: "https://github.com/Pravin98651", handle: "github.com/Pravin98651" },
      { name: "LinkedIn", url: "https://linkedin.com/in/pravin-g-", handle: "linkedin.com/in/pravin-g-" },
      { name: "KidTube Live", url: "https://kidtube-dun.vercel.app/", handle: "kidtube-dun.vercel.app" }
    ]
  }
};
