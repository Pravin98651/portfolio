import { portfolioData } from '../portfolioData.js';

// Map of canonical slugs and all URL aliases to normalized project identifiers
const SLUG_ALIASES = {
  // Flagship Project 1: KidTube
  'kidtube': 'kidtube',
  'projects/kidtube': 'kidtube',

  // Flagship Project 2: Job Hunt AI
  'job-hunt-ai': 'job-hunt-ai',
  'jobhunt': 'job-hunt-ai',
  'job-hunter': 'job-hunt-ai',
  'projects/job-hunt-ai': 'job-hunt-ai',
  'projects/jobhunt': 'job-hunt-ai',

  // Flagship Project 3: Lexifyd Tamil (User highlighted /lexifyd specifically)
  'lexifyd': 'lexifyd-tamil',
  'lexifyd-tamil': 'lexifyd-tamil',
  'projects/lexifyd': 'lexifyd-tamil',
  'projects/lexifyd-tamil': 'lexifyd-tamil',

  // Flagship Project 4: Multi-Role RAG Chatbot
  'rag-chatbot': 'rag-chatbot',
  'rag': 'rag-chatbot',
  'multi-role-rag': 'rag-chatbot',
  'projects/rag-chatbot': 'rag-chatbot',
  'projects/rag': 'rag-chatbot',

  // Hackathon Project 1: Danfoss Innovator Robust RPM
  'danfoss-rpm': 'danfoss-2026',
  'danfoss': 'danfoss-2026',
  'robust-rpm': 'danfoss-2026',
  'projects/danfoss': 'danfoss-2026',
  'projects/danfoss-rpm': 'danfoss-2026',

  // Hackathon Project 2: KRXGEN AI & AR Smart Shopping
  'ar-shopping': 'krxgen-hackathon',
  'krxgen': 'krxgen-hackathon',
  'smart-shopping': 'krxgen-hackathon',
  'krxgen-hackathon': 'krxgen-hackathon',
  'projects/ar-shopping': 'krxgen-hackathon',
  'projects/krxgen': 'krxgen-hackathon',

  // Hackathon Project 3: Sona College AI Trip Planner
  'ai-trip-planner': 'sona-2025',
  'trip-planner': 'sona-2025',
  'sona-2025': 'sona-2025',
  'projects/trip-planner': 'sona-2025',

  // Hackathon Project 4: Sairam Lexifyd
  'sairam-2025': 'sairam-2025',
  'sairam': 'sairam-2025',
};

// Canonical URL mappings for clean shareable links
const CANONICAL_SLUGS = {
  'kidtube': '/kidtube',
  'job-hunt-ai': '/job-hunt-ai',
  'lexifyd-tamil': '/lexifyd',
  'rag-chatbot': '/rag-chatbot',
  'danfoss-2026': '/danfoss-rpm',
  'krxgen-hackathon': '/ar-shopping',
  'sona-2025': '/ai-trip-planner',
  'sairam-2025': '/sairam-2025',
};

// Convert a hackathon/competition item into a full project specification
function transformHackathonToProject(item) {
  if (!item) return null;

  if (item.id === 'danfoss-2026') {
    return {
      id: item.id,
      slug: 'danfoss-rpm',
      canonicalUrl: '/danfoss-rpm',
      title: 'Robust RPM — Vibration Speed Estimation',
      subtitle: 'Digital Twin Tachometer via FFT, Cepstrum & Autoencoder Gating',
      tagline: 'A software-based approach to estimating pump speed from vibration signals, eliminating physical tachometers.',
      category: 'Industrial IoT · Digital Signal Processing · Anomaly Detection',
      country: 'Danfoss 2nd Place',
      flag: '🥈',
      rating: '4.95',
      ratingSource: 'Danfoss Innovator 2026',
      stars: 5,
      tags: ['SIGNAL PROCESSING', 'FFT', 'CEPSTRUM', 'AUTOENCODER', 'TIME-SERIES'],
      cover: '/assets/hackathons/danfoss-single.jpg',
      images: [
        '/assets/hackathons/danfoss-single.jpg',
        '/assets/hackathons/danfoss-group.jpg'
      ],
      imageCaptions: [
        'Danfoss Innovator Award 2026 Trophy & Certificate of Merit',
        'Team Foresight receiving the 2nd Place ₹50,000 Cheque at Danfoss Industries Pvt. Ltd., Chennai'
      ],
      client: 'Danfoss Industries Pvt. Ltd. (National Finalist)',
      role: 'Team Foresight Algorithm Developer',
      timeline: 'Danfoss Innovator Challenge 2026',
      liveUrl: '#',
      githubUrl: 'https://github.com/Pravin98651',
      summary: item.summary,
      stats: [
        { label: 'Reported Error', value: '1.32%' },
        { label: 'Mean Abs Error', value: '17.48 RPM' },
        { label: 'High Conf. Acc', value: '100% within 2%' },
        { label: 'Prize Awarded', value: '₹50,000' }
      ],
      caseStudy: {
        problem: 'Industrial centrifugal pumps operate in harsh, inaccessible environments where mechanical tachometers degrade rapidly from debris, heat, and moisture. Traditional contact-based sensors create high maintenance overhead, risk unexpected production downtime, and fail when optical line-of-sight is obstructed.',
        solution: 'Team Foresight designed a software-defined tachometer that extracts rotational pump speed directly from vibration sensor telemetry. The pipeline preprocesses raw acceleration readings, isolates harmonic peaks with Real FFT, validates frequency candidates with inverse log cepstrum analysis, screens signal corruption using an unsupervised neural autoencoder, and stabilizes measurements with statistical time-series memory.',
        workflowSteps: item.pipeline.map((p, i) => ({
          step: i + 1,
          title: p.name,
          desc: p.desc
        })),
        keyFeatures: [
          'Zero-hardware speed sensing: Eliminates physical optical and magnetic tachometers.',
          'Dual-layer harmonic verification: Real FFT combined with Cepstrum cross-validation (strict 3% tolerance).',
          'Unsupervised autoencoder gate: Rejects anomalous transient vibration signals before computing RPM.',
          'Statistical time-series tracking: 50-sample exponential moving average (α = 0.05) with 3σ outlier rejection.',
          'Grid noise suppression: 50 Hz IIR notch filter removes electrical line harmonics cleanly.'
        ],
        techStackTable: [
          { component: 'Signal Processing', tech: 'Python, NumPy, SciPy (Signal)' },
          { component: 'Frequency Analysis', tech: 'Real FFT, Cepstral Analysis, IIR Notch Filters' },
          { component: 'Anomaly Detection', tech: 'PyTorch / Scikit-learn (Unsupervised Autoencoder)' },
          { component: 'Time-Series Smoothing', tech: 'Exponential Moving Average (EMA) & 3σ Gating' },
          { component: 'Telemetry Evaluation', tech: 'Industrial Centrifugal Pump Accelerometer Datasets' }
        ],
        dataEntities: [
          { entity: 'Raw Vibration Frame', purpose: 'Time-domain acceleration telemetry sampled at high frequency.' },
          { entity: 'Harmonic Spectrum', purpose: 'FFT frequency bins identifying 9x and 16x vane-pass harmonics.' },
          { entity: 'Cepstral Quefrency', purpose: 'Inverse log spectrum verifying fundamental harmonic spacing.' },
          { entity: 'Autoencoder Latent State', purpose: 'Reconstruction error metric gating healthy vs corrupt signals.' },
          { entity: 'Smoothed RPM Estimate', purpose: 'Final calibrated operational speed with confidence bounds.' }
        ],
        engineeringDecisions: [
          'Cepstrum cross-validation: Single-peak FFT can be misled by structural resonance; cepstrum ensures detected peaks represent true harmonic spacing.',
          'Autoencoder anomaly gating: Gating unreliable signals before computing speed avoids corrupted time-series baseline updates.',
          'EMA over raw rolling averages: Exponential weighting adapts to actual mechanical throttle changes while smoothing sensor flutter.'
        ],
        myContribution: item.contribution,
        whatILearned: 'Applying advanced mathematical signal transformations and unsupervised machine learning to solve safety-critical industrial IoT problems under tight hardware constraints.',
        accuracyNote: 'Reported error metrics (1.32% overall, 17.48 RPM MAE) were evaluated against benchmark industrial pump datasets during the Danfoss Innovator 2026 competition.',
        interviewQA: [
          {
            q: 'Why combine FFT harmonic analysis with Cepstrum cross-validation?',
            a: 'In industrial machinery, external noise and pipe resonance frequently create high-energy spectral spikes that masquerade as rotational frequencies. Cepstrum computes the inverse Fourier transform of the log spectrum, explicitly detecting the periodic spacing between harmonics. Requiring a 3% agreement between FFT and cepstrum eliminates spurious resonance false positives.'
          },
          {
            q: 'What role does the unsupervised autoencoder play in the pipeline?',
            a: 'The autoencoder is trained on healthy baseline vibration data. When cavitation, severe sensor clipping, or external physical shock occurs, the reconstruction error surges above a learned threshold. The pipeline flags the window as an anomaly and suppresses speed calculation, preventing corrupt measurements from destabilizing the tracking filter.'
          }
        ]
      }
    };
  }

  if (item.id === 'krxgen-hackathon') {
    return {
      id: item.id,
      slug: 'ar-shopping',
      canonicalUrl: '/ar-shopping',
      title: 'AI & AR Smart Shopping Experience Platform',
      subtitle: 'Interactive 3D Product AR & Retail Sales Intelligence Engine',
      tagline: 'National 1st Place Winner at KRXGEN: 3D AR product preview, indoor navigation, and AI customer analytics.',
      category: 'Augmented Reality · Computer Vision · Retail AI Analytics · WebXR',
      country: 'KRXGEN 1st Place',
      flag: '🏆',
      rating: '5.0',
      ratingSource: 'National Hackathon Winner',
      stars: 5,
      tags: ['AUGMENTED REALITY', 'WEBXR', 'THREE.JS', 'AI ANALYTICS', 'FASTAPI'],
      cover: '/assets/hackathons/trichy-stage.jpg',
      images: [
        '/assets/hackathons/trichy-stage.jpg',
        '/assets/hackathons/trichy-team.jpg'
      ],
      imageCaptions: [
        'Receiving 1st Place Honors on stage at KRXGEN National-Level Hackathon',
        'Pravin G and team with the official 1st Place Certificates of Appreciation'
      ],
      client: 'K. Ramakrishnan College of Engineering (KRXGEN 2025)',
      role: 'Admin Intelligence & AR Navigation Architect',
      timeline: 'National Hackathon 2025',
      liveUrl: '#',
      githubUrl: 'https://github.com/Pravin98651',
      summary: item.summary,
      stats: [
        { label: 'Award', value: '1st Place 🏆' },
        { label: 'AR Engine', value: 'WebXR / 3D' },
        { label: 'Analytics', value: 'AI Segmentation' },
        { label: 'Navigation', value: 'In-Store AR' }
      ],
      caseStudy: {
        problem: 'Physical retail shopping lacks the dynamic product exploration and personalization of digital e-commerce, while physical stores suffer from inefficient aisle navigation and poor visibility into in-store customer browsing habits before checkout.',
        solution: 'Built an integrated AI & AR retail experience platform. Shoppers use their smartphones to place photorealistic 3D interactive product models in physical space and navigate store aisles via an in-store AR pathfinding system. Store managers use an administrative dashboard tracking foot-traffic heatmaps, customer browsing segment analytics, and automated AI shelf-reorganization recommendations.',
        workflowSteps: [
          {
            step: 1,
            title: "Shopper Check-in & Session Initialization",
            desc: "Customer scans QR entry code or connects to in-store portal; anonymous session token tracks in-store journey and preferences."
          },
          {
            step: 2,
            title: "Interactive 3D AR Product Rendering",
            desc: "Shoppers inspect inventory as photorealistic 3D models with true-to-scale dimensions rendered via WebXR and Three.js."
          },
          {
            step: 3,
            title: "In-Store AR Aisle Pathfinding",
            desc: "Computer vision and spatial marker positioning guide shoppers step-by-step through physical aisles directly to product shelf locations."
          },
          {
            step: 4,
            title: "Telemetry Ingestion & Dwell Tracking",
            desc: "Admin engine monitors product viewing durations, shelf dwell times, and aisle navigation velocity to build interaction funnels."
          },
          {
            step: 5,
            title: "Customer Purchase Behavior Clustering",
            desc: "Unsupervised clustering (K-Means / PCA) segments shoppers into dynamic behavioral cohorts based on past purchase history and live browsing habits."
          },
          {
            step: 6,
            title: "AI-Powered Shelf Optimization Recommendations",
            desc: "Predictive model recommends optimal shelf positions and complementary item pairings to maximize retail floor conversions."
          }
        ],
        keyFeatures: [
          'True-scale 3D AR product visualization: Inspect products in real-world space before purchase.',
          'Indoor AR store navigation: Real-time spatial routing directly to target shelf locations.',
          'Live sales & traffic intelligence: Admin dashboard monitoring conversion funnels and live shopping carts.',
          'AI-driven shelf recommendation engine: Predicts optimal inventory shelf layouts based on customer history.',
          'Customer segmentation analytics: Behavioral clustering identifying VIP shoppers, bargain hunters, and impulse buyers.'
        ],
        techStackTable: [
          { component: '3D AR Experience', tech: 'WebXR, Three.js, GLTF/USDZ 3D Models' },
          { component: 'Indoor Navigation', tech: 'Spatial Marker Vision & A* Pathfinding' },
          { component: 'Admin Dashboard', tech: 'React, Tailwind CSS, Recharts' },
          { component: 'Analytics & AI Engine', tech: 'Python, FastAPI, Scikit-learn (K-Means/PCA)' },
          { component: 'Data Storage', tech: 'PostgreSQL, Redis live event queues' }
        ],
        dataEntities: [
          { entity: 'Product 3D Asset', purpose: 'GLTF geometry, textures, physical dimensions, and shelf coordinates.' },
          { entity: 'Store Aisle Graph', purpose: 'Nodes and edges representing walkable store aisle geometry.' },
          { entity: 'Shopper Telemetry', purpose: 'AR viewing events, product dwell times, and cart additions.' },
          { entity: 'Customer Segment', purpose: 'Behavioral cluster metrics and purchase propensity scores.' }
        ],
        engineeringDecisions: [
          'WebXR over native mobile app: Running directly in the browser eliminates mandatory app store installation hurdles for retail visitors.',
          'Aisle graph pathfinding: Pre-computed node graphs ensure instant, reliable turn-by-turn guidance even with intermittent indoor Wi-Fi.',
          'Asynchronous telemetry batching: Decouples live AR interaction rendering from analytics logging via Redis queues.'
        ],
        myContribution: item.contribution,
        whatILearned: 'Architecting high-throughput retail telemetry backends, integrating WebXR 3D spatial models with 2D analytics dashboards, and delivering award-winning prototypes under intense hackathon deadlines.',
        accuracyNote: 'Developed and proven as the 1st Place Winner at the KRXGEN 2025 National-Level Hackathon.',
        interviewQA: [
          {
            q: 'How does the in-store AR navigation orient the shopper inside the shop?',
            a: 'The system uses visual landmark markers at aisle entryways combined with device accelerometer and gyroscope data. Once localized against the pre-mapped store graph, an A* pathfinding algorithm renders visual 3D directional arrows leading directly to the target product shelf coordinate.'
          },
          {
            q: 'What data powers the AI shelf recommendation engine?',
            a: 'The recommendation engine correlates customer purchase histories with in-store dwell time telemetry. When high-interest items show long viewing times but low conversion due to awkward shelf positioning, the model highlights the discrepancy and recommends eye-level end-cap placements.'
          }
        ]
      }
    };
  }

  if (item.id === 'sona-2025') {
    return {
      id: item.id,
      slug: 'ai-trip-planner',
      canonicalUrl: '/ai-trip-planner',
      title: 'AI Trip Planner — Itinerary Optimization Platform',
      subtitle: 'Constraint-Satisfaction Travel Scheduling & Preference Balancing',
      tagline: '1st Place Winner at National Hackathon (Sona College / Maadhyamik): dynamic day-by-day itinerary synthesis.',
      category: 'Applied AI · Travel Optimization · Constraint Satisfaction',
      country: 'Sona 1st Place',
      flag: '🏆',
      rating: '4.9',
      ratingSource: 'Maadhyamik Hackathon Winner',
      stars: 5,
      tags: ['APPLIED AI', 'OPTIMIZATION', 'FASTAPI', 'REACT', 'HEURISTICS'],
      cover: '/assets/hackathons/sona-group.jpg',
      images: [
        '/assets/hackathons/sona-group.jpg',
        '/assets/hackathons/sona-lab.jpg'
      ],
      imageCaptions: [
        'National Hackathon 1st Place Felicitation on stage at Sona College',
        'Pravin G and team in deep engineering session during the competition'
      ],
      client: 'Maadhyamik Technologies (Sona College of Tech)',
      role: 'Core Algorithm Architect & Full-Stack Developer',
      timeline: 'National Hackathon 2025',
      liveUrl: '#',
      githubUrl: 'https://github.com/Pravin98651',
      summary: item.summary,
      stats: [
        { label: 'Award', value: '1st Place 🏆' },
        { label: 'Optimization', value: 'Multi-Factor' },
        { label: 'Schedule', value: 'Day-by-Day' },
        { label: 'Pacing', value: 'Adaptive' }
      ],
      caseStudy: {
        problem: 'Travel planning requires balancing conflicting constraints: travel budgets, opening hours, transit durations, group member fatigue, and personal dining preferences. Manual trip planning takes hours of cross-referencing maps, reviews, and booking sites.',
        solution: 'Built an algorithmic itinerary synthesizer that reconciles user budgets, travel dates, pacing styles, and activity priorities into structured, day-by-day plans with realistic transit windows and rest breaks.',
        workflowSteps: [
          { step: 1, title: 'Preference & Constraint Intake', desc: 'User inputs budget tier, travel dates, companion types (family, solo, friends), and pacing.' },
          { step: 2, title: 'POI Clustering & Geocoding', desc: 'Attractions are grouped geographically to minimize inter-city transit time.' },
          { step: 3, title: 'Temporal Constraint Solver', desc: 'Schedules venues respecting operating hours, optimal daylight intervals, and meal times.' },
          { step: 4, title: 'Budget Allocation & Pacing', desc: 'Distributes overall spending evenly across admissions, dining, and transit allowances.' },
          { step: 5, title: 'Interactive Export & Customization', desc: 'Outputs interactive timeline with Google Maps links and PDF itinerary downloads.' }
        ],
        keyFeatures: [
          'Dynamic multi-constraint synthesis: Balances time, money, location, and pacing.',
          'Geographic attraction clustering: Prevents criss-crossing transit across town.',
          'Adaptive fatigue modeling: Inserts meals and rest intervals between intense excursions.',
          'Exportable travel briefings: 1-click shareable itinerary and calendar synchronization.'
        ],
        techStackTable: [
          { component: 'Backend API', tech: 'Python, FastAPI' },
          { component: 'Optimization Solver', tech: 'Heuristic Genetic Algorithms & Constraint Satisfaction' },
          { component: 'Frontend UI', tech: 'React, Tailwind CSS, Lucide Icons' },
          { component: 'Mapping & Places', tech: 'OpenStreetMap / Geocoding APIs' }
        ],
        dataEntities: [
          { entity: 'Trip Itinerary', purpose: 'Parent schedule containing days, total budget, and location meta.' },
          { entity: 'Itinerary Day', purpose: 'Specific date with sequential time-slot activities.' },
          { entity: 'POI Activity', purpose: 'Venue name, coordinates, cost, duration, and opening windows.' }
        ],
        engineeringDecisions: [
          'Geographic clustering before scheduling: Scheduling attractions that are close together dramatically reduces travel fatigue.',
          'Strict constraint bounds: Enforcing hard limits on daily walking distance ensures realistic plans.'
        ],
        myContribution: item.contribution,
        whatILearned: 'Formulating constraint-satisfaction heuristics and building intuitive travel timeline interfaces.',
        accuracyNote: 'Proven as 1st Place National Winner at Sona College / Maadhyamik Technologies Hackathon.',
        interviewQA: [
          {
            q: 'How does the trip planner avoid impossible travel times between attractions?',
            a: 'The engine uses K-Means geographic clustering on latitude/longitude coordinates to group nearby activities into distinct daily zones, then calculates realistic transit buffers using road distance matrices before locking in time slots.'
          }
        ]
      }
    };
  }

  // Fallback generic format for other hackathon items
  return {
    id: item.id,
    slug: item.id,
    canonicalUrl: `/${item.id}`,
    title: item.title,
    subtitle: item.event,
    tagline: item.summary,
    category: item.category || 'Competitive Engineering',
    country: item.badge || 'National Honor',
    flag: '🎖️',
    rating: '5.0',
    ratingSource: item.organizer,
    stars: 5,
    tags: ['COMPETITIVE ENGINEERING', 'NATIONAL PODIUM', 'SYSTEMS DESIGN'],
    cover: item.images?.[0]?.url || '/assets/hackathons/vit-achiever-certificate.png',
    images: (item.images || []).map(img => img.url),
    imageCaptions: (item.images || []).map(img => img.caption || img.title),
    client: item.organizer,
    role: 'Primary Developer',
    timeline: item.event,
    liveUrl: '#',
    githubUrl: 'https://github.com/Pravin98651',
    summary: item.summary,
    stats: [
      { label: 'Honors', value: item.badge || 'Merit' },
      { label: 'Event', value: item.organizer || 'National' },
      { label: 'Status', value: 'Verified' },
      { label: 'Year', value: '2025–26' }
    ],
    caseStudy: {
      problem: item.summary,
      solution: item.detail || item.summary,
      workflowSteps: (item.highlights || []).map((h, i) => ({
        step: i + 1,
        title: `Key Engineering Milestone ${i + 1}`,
        desc: h
      })),
      keyFeatures: item.highlights || [item.summary],
      techStackTable: [
        { component: 'System Scope', tech: item.category }
      ],
      dataEntities: [],
      engineeringDecisions: [
        'Rapid execution under competitive constraints to produce working, verified technical artifacts.'
      ],
      myContribution: item.contribution || 'Contributed to systems architecture and presentation.',
      whatILearned: 'High-pressure technical execution and engineering defense to industry panels.',
      accuracyNote: 'Documented with official certificate and institutional verification.',
      interviewQA: []
    }
  };
}

// Retrieve any project or enriched hackathon project by URL slug or ID
export function getProjectBySlug(rawSlug) {
  if (!rawSlug) return null;

  // Clean raw slug
  let slug = String(rawSlug).toLowerCase().trim();
  if (slug.startsWith('#/')) slug = slug.substring(2);
  else if (slug.startsWith('#')) slug = slug.substring(1);
  if (slug.startsWith('/')) slug = slug.substring(1);
  if (slug.endsWith('/')) slug = slug.substring(0, slug.length - 1);

  // Look up mapped ID
  const resolvedId = SLUG_ALIASES[slug] || slug;

  // 1. Check primary flagship projects first
  const project = portfolioData.projects.find(p => p.id === resolvedId);
  if (project) {
    const canonical = CANONICAL_SLUGS[project.id] || `/${project.id}`;
    return {
      ...project,
      slug: canonical.replace('/', ''),
      canonicalUrl: canonical,
    };
  }

  // 2. Check hackathons & competitions
  const hackathonItem = portfolioData.hackathons.items.find(h => h.id === resolvedId);
  if (hackathonItem) {
    return transformHackathonToProject(hackathonItem);
  }

  return null;
}

// Get the canonical URL for any project
export function getProjectUrl(projectIdOrSlug) {
  const proj = getProjectBySlug(projectIdOrSlug);
  return proj ? proj.canonicalUrl : '/';
}

// Return adjacent projects for previous/next navigation
export function getAdjacentProjects(currentId) {
  // Collect all projects in showcase order
  const allProjects = [
    ...portfolioData.projects.map(p => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      canonicalUrl: CANONICAL_SLUGS[p.id] || `/${p.id}`,
      flag: p.flag,
      category: p.category
    })),
    {
      id: 'danfoss-2026',
      title: 'Robust RPM Speed Estimation',
      subtitle: 'Vibration Signal DSP & Autoencoder Gating',
      canonicalUrl: '/danfoss-rpm',
      flag: '🥈',
      category: 'Industrial IoT'
    },
    {
      id: 'krxgen-hackathon',
      title: 'AI & AR Smart Shopping',
      subtitle: 'Interactive 3D AR & Retail Analytics',
      canonicalUrl: '/ar-shopping',
      flag: '🏆',
      category: 'WebXR & Vision'
    },
    {
      id: 'sona-2025',
      title: 'AI Trip Planner',
      subtitle: 'Constraint-Satisfaction Travel Optimizer',
      canonicalUrl: '/ai-trip-planner',
      flag: '🏆',
      category: 'Applied AI'
    }
  ];

  const currentIndex = allProjects.findIndex(p => p.id === currentId);
  if (currentIndex === -1) {
    return { prev: allProjects[allProjects.length - 1], next: allProjects[0] };
  }

  const prevIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
  const nextIndex = (currentIndex + 1) % allProjects.length;

  return {
    prev: allProjects[prevIndex],
    next: allProjects[nextIndex],
    currentIndex,
    total: allProjects.length
  };
}

// List of all primary project routes
export const ALL_PROJECT_ROUTES = [
  { slug: 'lexifyd', id: 'lexifyd-tamil', title: 'Lexifyd Tamil', category: 'Language AI' },
  { slug: 'kidtube', id: 'kidtube', title: 'KidTube', category: 'Full-Stack & Mobile' },
  { slug: 'job-hunt-ai', id: 'job-hunt-ai', title: 'Job Hunt AI', category: 'Agents & LangGraph' },
  { slug: 'rag-chatbot', id: 'rag-chatbot', title: 'Multi-Role RAG', category: 'RAG & FAISS' },
  { slug: 'danfoss-rpm', id: 'danfoss-2026', title: 'Robust RPM', category: 'Industrial IoT' },
  { slug: 'ar-shopping', id: 'krxgen-hackathon', title: 'AI & AR Shopping', category: 'WebXR & Vision' },
  { slug: 'ai-trip-planner', id: 'sona-2025', title: 'AI Trip Planner', category: 'Applied AI' },
];
