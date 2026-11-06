# 🎒 Pravin — Interactive Developer Portfolio

> **Software Developer | Full-Stack Engineering | Applied AI**  
> *"I build ideas into products that solve real problems."*

An award-winning, tactile skeuomorphic + neo-brutalist interactive portfolio designed and developed for **Pravin**. Features a real interactive backpack with draggable center zipper, suspended 3D flippable ID badge, interactive engineering bento grid, developer CLI terminal, and deep-dive technical case studies.

---

## 🌟 Key Features

* **🤐 Interactive Center Zipper:** Authentic interlocking SVG teeth with pointer drag physics, scroll wheel synchronization, and real-time mechanical sound synthesis via Web Audio API.
* **🪪 3D Suspended ID Badge:** Retro halftone pop-art avatar of Pravin on an interactive lanyard with real-time mouse parallax tilt, a 3D flip card mechanism, and a one-click **Download CV / Résumé** action.
* **🎒 Red Canvas Backpack & Pocket:** 3 interactive folder tabs (`PROJECTS`, `RÉSUMÉ`, `CONTACT`) with multi-screen preview galleries and direct dispatch form.
* **🍱 Engineering Bento Grid:** Modular overview featuring live Indian Standard Time (IST) clock, work availability beacon, verified architecture benchmarks, and core engineering principles.
* **💻 Interactive Developer CLI Terminal:** Built-in retro-modern command line shell (press `Ctrl + K` or `~` to launch) supporting `projects`, `skills`, `about`, `resume`, `contact`, and `theme` commands with clickable command chips.
* **📐 Dual View Project Cards:** Toggle between live interface mockups and system architecture blueprint diagrams directly on project cards.
* **🔬 4 Deep-Dive Technical Case Studies:**
  1. **KidTube** — Parent-controlled digital video platform with Next.js 14, Expo/React Native, TensorFlow.js thumbnail screening, and educational math tollbooths.
  2. **Job Hunt AI** — LangGraph multi-agent job discovery suite with 3-layer deduplication (pgvector 0.92 cosine similarity) and Google Gemini weighted matching.
  3. **Lexifyd Tamil** — Applied AI language learning prototype addressing Tamil vocabulary polysemy using Gemini prompt chains, smart distractors, and Redis caching.
  4. **Multi-Role RAG Chatbot** — Department-partitioned knowledge assistant with paragraph-aware chunking, sub-15ms FAISS vector retrieval, and Groq Qwen-32B citations.
* **🌓 Tactile Day ↔ Night Theme:** Toggle between warm corduroy orange fabric and stealth tactical charcoal mode with persistent preference storage.

---

## 🛠️ Tech Stack

* **Core:** React 18, Vite 5, Tailwind CSS
* **Icons & Visuals:** Lucide React, Custom SVG Assets, Canvas textures
* **Audio:** Native Web Audio API Sound Synthesizer (zero external audio dependencies)
* **Packaging & Fonts:** PostCSS, Jost / Space Grotesk / JetBrains Mono

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18.0 or higher recommended)
* npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Pravin98651/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be live at `http://localhost:3000/`.

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
Portfolio/
├── public/
│   └── assets/              # High-res SVGs, textures, stickers & resume PDF
├── src/
│   ├── components/
│   │   ├── Signboard.jsx         # Whiteboard plaque with bouncy stickers
│   │   ├── Zipper.jsx            # Central draggable & scroll-synced zipper
│   │   ├── BackpackPocket.jsx    # Red canvas pocket with 3 folder tabs
│   │   ├── IdBadge.jsx           # 3D flippable ID card with avatar & CV download
│   │   ├── BentoGrid.jsx         # Engineering bento grid & live IST clock
│   │   ├── ProjectsSection.jsx   # Project showcase with blueprint switcher
│   │   ├── CaseStudyModal.jsx    # 6-tab comprehensive technical case study modal
│   │   ├── DeveloperTerminal.jsx # Interactive developer CLI shell
│   │   ├── AboutSection.jsx      # Positioning & engineering principles
│   │   ├── SkillsSection.jsx     # Categorized technical capabilities
│   │   └── ContactSection.jsx    # Direct email dispatch station
│   ├── utils/
│   │   └── soundEffects.js       # Native Web Audio synthesizer
│   ├── portfolioData.js          # Master data store for Pravin's profile & projects
│   ├── App.jsx                   # Main application orchestration & theme state
│   ├── main.jsx                  # React DOM root entry
│   └── index.css                 # Ribbed corduroy patterns & custom animations
├── package.json
└── vite.config.js
```

---

## 📬 Contact & Connect

* **Developer:** Pravin
* **GitHub:** [@Pravin98651](https://github.com/Pravin98651)
* **Email:** [pravin.dev@example.com](mailto:pravin.dev@example.com)

---

*© 2026 Pravin · Software Developer · All Rights Reserved.*
