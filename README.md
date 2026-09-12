# Sandeep Kumar — Portfolio

Personal portfolio website with an AI-powered chatbot built to showcase projects, skills, and experience. The chatbot identifies visitors (recruiter, student, or connection) and personalizes the conversation accordingly.

**🌐 Live site:** [sandeepqisanxidev.vercel.app](https://sandeepqisanxidev.vercel.app)
**Backend API:** [sandeep-qisan.onrender.com](https://sandeep-qisan.onrender.com)
**GitHub:** [github.com/Qisanxi](https://github.com/Qisanxi)
**LinkedIn:** [linkedin.com/in/sandeep-qisanxi](https://www.linkedin.com/in/sandeep-qisanxi)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, Tailwind CSS v4 |
| Backend | FastAPI, Python 3.11 |
| Database | PostgreSQL, SQLAlchemy (async) |
| AI | Gemini 2.5 Flash API |
| Rate Limiting | Slowapi |
| DevOps | Docker, docker-compose |
| Deploy | Vercel (frontend), Render (backend), Supabase (DB) |

---

## Architecture

```mermaid
graph TB
    subgraph Visitor["👤 Visitor — Browser"]
        direction LR
        V1["Opens portfolio"]:::action
        V2["Selects identity\nRecruiter · Student · Friend"]:::action
        V3["Chats with AI"]:::action
        V4["Submits contact form"]:::action
    end

    subgraph Vercel["▲ Vercel  —  Frontend  (React 19 + Vite 8)"]
        direction TB
        NAV["Navbar\n+ ScrollSpy"]:::ui
        HERO["Hero\nTyping animation"]:::ui
        PROJ["Projects\nLive demo links"]:::ui
        SKILLS["Skills"]:::ui
        ABOUT["About\nTimeline"]:::ui
        CONTACT["Contact Form"]:::ui
        CW["ChatWidget\nOnboarding → Chat"]:::ui
    end

    subgraph Render["🟣 Render  —  FastAPI Backend"]
        direction TB
        CORS["CORS Middleware\nFRONTEND_URL whitelist"]:::middleware
        RL["Slowapi Rate Limiter"]:::middleware
        subgraph Routes["API Routes"]
            direction LR
            HEALTH_RT["/api/health\nGET · pre-warm ping"]:::route
            CHAT_RT["/api/chat\nPOST · 10 / 5 min"]:::route
            CONTACT_RT["/api/contact\nPOST · 3 / hr"]:::route
            VISITORS_RT["/api/visitors\nPOST · 5 / hr"]:::route
        end
        AI_SVC["ai_service.py\nSystem prompt + history"]:::service
        CORS --> RL --> Routes
        CHAT_RT --> AI_SVC
    end

    subgraph Supabase["🐘 Supabase  —  PostgreSQL"]
        DB[("contact_messages\nid · name · email\nmessage · created_at")]:::db
        DB2[("subscribed_visitors\nidentity · name · email\nsubscribed · created_at")]:::db
    end

    subgraph GoogleAI["🤖 Google AI Studio"]
        GEMINI["Gemini 2.5 Flash\nasync chat · streaming"]:::external
    end

    Visitor -->|"Loads app"| Vercel
    CW -->|"GET /api/health (silent pre-warm)"| Render
    CW -->|"POST /api/chat\nVITE_API_URL"| Render
    CONTACT -->|"POST /api/contact\nVITE_API_URL"| Render
    CW -->|"POST /api/visitors (optional email)"| Render
    AI_SVC -->|"GEMINI_API_KEY"| GoogleAI
    GoogleAI -->|"AI response"| AI_SVC
    CONTACT_RT -->|"INSERT"| Supabase
    VISITORS_RT -->|"INSERT"| Supabase

    classDef ui fill:#2A2114,stroke:#D4A574,color:#E8C9A0
    classDef middleware fill:#172554,stroke:#3b82f6,color:#bfdbfe
    classDef route fill:#0f172a,stroke:#D4A574,color:#E8C9A0,stroke-dasharray:4
    classDef service fill:#1a1a2e,stroke:#E8C9A0,color:#E8C9A0
    classDef db fill:#064e3b,stroke:#10b981,color:#a7f3d0
    classDef external fill:#431407,stroke:#f97316,color:#fed7aa
    classDef action fill:#1e293b,stroke:#475569,color:#94a3b8
```

---

## Request Flow

```mermaid
sequenceDiagram
    actor V as Visitor
    participant FE as React Frontend<br/>(Vercel)
    participant API as FastAPI Backend<br/>(Render)
    participant AI as Gemini 2.5 Flash<br/>(Google AI)
    participant DB as PostgreSQL<br/>(Supabase)

    Note over V,FE: Portfolio load + pre-warm
    V->>FE: Opens sandeepqisanxidev.vercel.app
    FE->>API: GET /api/health (silent — wakes Render backend)
    FE->>V: WarmBanner appears: "Assistant is ready — use the chat →"
    FE->>V: Chat auto-opens after 1.4 s
    V->>FE: Selects Recruiter / Student / Friend
    V->>FE: (Optional) Enters name + email
    FE->>API: POST /api/visitors {identity, name?, email?}
    FE->>V: "Welcome, {name}!" personalised thank-you

    Note over V,AI: Chat conversation loop
    loop Each message
        V->>FE: Types question
        FE->>API: POST /api/chat {message, history[-6]}
        API->>API: Rate-limit check (10 req / 5 min / IP)
        API->>AI: System prompt + history + message
        AI-->>API: Streamed AI response
        API-->>FE: {response: "..."}
        FE->>V: Bot reply rendered
    end

    Note over V,DB: Contact form
    V->>FE: Fills name / email / message
    FE->>API: POST /api/contact {name, email, message}
    API->>API: Rate-limit check (3 req / hr / IP)
    API->>DB: INSERT INTO contact_messages
    DB-->>API: 201 Created
    API-->>FE: {success: true}
    FE->>V: "Message sent!" confirmation
```

---

## Data Model

```mermaid
erDiagram
    CONTACT_MESSAGES {
        int     id          PK "auto-increment"
        string  name        "max 100 chars"
        string  email       "max 255 chars, validated"
        text    message     "free text"
        datetime created_at "server default NOW()"
    }
```

---

## Features

- **AI Chatbot** — Powered by Gemini 2.5 Flash. Identifies visitor type on arrival (recruiter, student, or connection) and personalizes the conversation with context about Sandeep's real projects, skills, and experience.
- **Visitor Onboarding** — Full-screen welcome flow with identity selection before entering the portfolio. Backdrop blur keeps focus on the onboarding step.
- **Contact Form** — Messages saved directly to PostgreSQL via the FastAPI backend.
- **Rate Limiting** — Chat endpoint limited to 10 requests per 5 minutes per IP. Contact form limited to 3 submissions per hour per IP.
- **Sections** — Hero with typing animation, Projects with live demo links, Skills, About with experience timeline, Contact, Footer.
- **Responsive** — Mobile-first layout, hamburger menu on small screens.
- **Sticky Navbar** — Blurs on scroll, highlights active section, Download CV button always visible.
- **SEO** — Open Graph tags, Twitter card meta, descriptive page title.

---

## Project Structure

```
portfolio/
├── frontend/                        # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── ChatWidget.jsx   # AI chat widget with onboarding flow
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── sections/
│   │   │       ├── Hero.jsx         # Typing animation, bio, CTAs
│   │   │       ├── Projects.jsx     # Cards with live demo + GitHub links
│   │   │       ├── Skills.jsx       # 6 skill categories
│   │   │       ├── About.jsx        # Bio + experience timeline
│   │   │       └── Contact.jsx      # Form + social links
│   │   ├── hooks/
│   │   │   ├── useChat.js           # Chat state and Gemini API calls
│   │   │   └── useScrollSpy.js      # Active section tracking
│   │   └── lib/
│   │       └── api.js               # Fetch utility with env base URL
│   ├── index.html                   # SEO meta + OG tags
│   └── Dockerfile
│
├── backend/                         # FastAPI + Python
│   ├── app/
│   │   ├── api/routes/
│   │   │   ├── chat.py              # AI chat endpoint with rate limiting
│   │   │   └── contact.py           # Contact form endpoint with rate limiting
│   │   ├── core/
│   │   │   ├── config.py            # Pydantic settings from env vars
│   │   │   └── ratelimit.py         # Slowapi limiter
│   │   ├── db/
│   │   │   ├── models.py            # SQLAlchemy ContactMessage model
│   │   │   └── session.py           # Async DB session and Base
│   │   ├── services/
│   │   │   └── ai_service.py        # Gemini client + full system prompt
│   │   └── main.py                  # FastAPI app, CORS, lifespan, routers
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
│
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL (or Docker)
- Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### 1. Clone the repo

```bash
git clone https://github.com/Qisanxi/portfolio.git
cd portfolio
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows

pip install -r requirements.txt

cp .env.example .env
# Fill in your values in .env
```

**.env values:**
```
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/portfolio
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:5173
DEBUG=True
```

```bash
uvicorn app.main:app --reload
# API running at http://localhost:8000
# Swagger docs at http://localhost:8000/docs
```

### 3. Frontend setup

```bash
cd frontend
npm install

echo "VITE_API_URL=http://localhost:8000" > .env

npm run dev
# App running at http://localhost:5173
```

### 4. Run with Docker

```bash
# From portfolio/ root
# Add GEMINI_API_KEY to backend/.env first
docker-compose up --build
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (asyncpg) |
| `GEMINI_API_KEY` | Gemini API key from Google AI Studio |
| `FRONTEND_URL` | Frontend URL for CORS |
| `DEBUG` | Set to `False` in production |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## API Endpoints

| Method | Endpoint | Description | Rate Limit |
|---|---|---|---|
| GET | `/` | Health check | None |
| POST | `/api/chat` | AI chatbot message | 10 per 5 min |
| POST | `/api/contact` | Contact form submission | 3 per hour |

---

## Deployment

| Service | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Set `VITE_API_URL` in Vercel dashboard |
| Backend | Render | Free Web Service. Sleeps after 15 min idle (cold start 30–50 s). Frontend pre-warms silently on page load via `/api/health`. |
| Database | Supabase | Copy the connection string into `DATABASE_URL` |
| CI | GitHub Actions | Tests + build on every PR. See `.github/workflows/ci.yml`. |

### Deploy backend to Render

Render's free Web Service sleeps after 15 minutes of inactivity. First request after sleep takes ~30–50 seconds to wake the container. We solve this with a **silent pre-warm** — the frontend pings `GET /api/health` on page load, so by the time the visitor clicks the chat button, the backend is already warm.

#### Step 1 — Push your backend to GitHub

Make sure your `backend/` folder is on `main` (it already is).

#### Step 2 — Create a Render Web Service

1. Sign up at [render.com](https://render.com) (free tier, no credit card required)
2. **New +** → **Web Service** → connect your GitHub repo `Qisanxi/Portfolio`
3. Configure:
   - **Name**: `portfolio-backend`
   - **Region**: Singapore (closest to India with low latency)
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
4. **Environment Variables** (Render dashboard → Environment tab):

   | Key | Value | Where to get it |
   |---|---|---|
   | `DATABASE_URL` | `postgresql+asyncpg://postgres.[ref]:[pass]@aws-0-[region].pooler.supabase.com:6543/postgres` | Supabase → Project Settings → Database → Connection string → **Transaction mode** (port 6543, not 5432) |
   | `GEMINI_API_KEY` | `AIza...` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
   | `FRONTEND_URL` | `https://sandeepqisanxidev.vercel.app` | Your Vercel URL |
   | `DEBUG` | `False` | Always False in production |

5. **Create Web Service** — Render builds and deploys. First deploy takes ~2 min.

Render gives you a URL like `https://sandeep-qisan.onrender.com` (the actual production URL for this project).

#### Step 3 — Wire up the frontend

In your **Vercel dashboard → Settings → Environment Variables**, add:

```
VITE_API_URL = https://sandeep-qisan.onrender.com
```

Trigger a redeploy of the frontend. The portfolio now talks to your Render backend.

#### Step 4 — Verify

Visit your Vercel URL. Open browser DevTools → Network tab. Within ~1 second of page load, you should see a `GET /api/health` request that returns 200. The `WarmBanner` toast appears at the top of the page: *"Assistant is ready — use the chat →"*.

If you wait 15+ minutes and reload, you'll see the `GET /api/health` request take ~30 seconds to respond (cold start), then the banner appears. The visitor never sees a broken chat — the backend is always warm by the time they click.

#### Cold-start mitigation summary

| Layer | What it does |
|---|---|
| **`GET /api/health`** | Lightweight endpoint, no DB access. Returns `{status: "ok"}` in ~50ms once warm. |
| **`useBackendWarm` hook** | Fires the health ping on `App` mount, 8-second timeout. Returns `'warming' \| 'warm' \| 'cold'`. |
| **`WarmBanner` component** | Non-blocking toast appears above the navbar once `warmStatus === 'warm'`. Dismissible. |
| **ChatWidget auto-open** | Once warm, chat opens automatically after 1.4s. Visitor lands directly in onboarding, no manual click needed. |

No `cron-job.org` or UptimeRobot pinger needed — the frontend itself is the pinger, and it only fires when there's an actual visitor (so you don't burn the Render free tier's 750-hour/month limit on empty pings).

---

## Projects Featured

| Project | Live | GitHub |
|---|---|---|
| DueAlert | [duealert-bbb61.web.app](https://duealert-bbb61.web.app) | [Qisanxi/DueAlert](https://github.com/Qisanxi/DueAlert) |
| AutoPost | [autopost-9c37c.web.app](https://autopost-9c37c.web.app/#/) | [Qisanxi/AutoPost](https://github.com/Qisanxi/AutoPost) |
| WhatsApp Priority Agent | Local deploy | [Qisanxi/Whatsapp_priority_agent](https://github.com/Qisanxi/Whatsapp_priority_agent) |
| FinSathi | — | [Qisanxi/finsathi.ai](https://github.com/Qisanxi/finsathi.ai) |

---

## Roadmap

**Done:**
- [x] **Google Fonts** — Fraunces (serif display) + Outfit (body) + DM Mono loaded via `@import` in `index.css`.
- [x] **Visitor email capture** — Optional name + email field in chat onboarding. Stored in `subscribed_visitors` table (Supabase). POST `/api/visitors` is fire-and-forget — visitor experience is never blocked by analytics.
- [x] **Cold-start UX** — Silent `GET /api/health` pre-warm on page load, `WarmBanner` toast once warm, ChatWidget auto-opens after 1.4s. No cron pingers needed.
- [x] **Backend tests** — 19 pytest tests covering `/api/health`, `/api/visitors`, `/api/chat` validation, `/api/contact`. SQLite in-memory, no Postgres needed.
- [x] **Frontend tests** — 13 vitest tests covering `useBackendWarm` hook + `WarmBanner` visibility logic. jsdom env, no browser needed.
- [x] **CI pipeline** — `.github/workflows/ci.yml` runs pytest + vitest + vite build on every PR. Blocks merge if any job fails.

**Planned:**
- [ ] **Achievement notifications** — Admin endpoint (auth-protected) that sends a templated email to all `subscribed_visitors` via Resend when a new project/cert/milestone is added. Triggered manually via a CLI script or admin UI.
- [ ] **Analytics** — Privacy-friendly visitor tracking (Plausible or Vercel Analytics). Deferred — the `subscribed_visitors` table gives the actual signal that matters (recruiters who self-identified), so a hit counter is unnecessary.
- [ ] **Alembic migrations** — Replace `create_all` startup with proper Alembic migration files.

---

## Author

**Sandeep Kumar** — Software Engineer · Python Backend & AI-Integrated Full-Stack

- 🌐 Portfolio: [sandeepqisanxidev.vercel.app](https://sandeepqisanxidev.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/sandeep-qisanxi](https://www.linkedin.com/in/sandeep-qisanxi)
- 🐙 GitHub: [github.com/Qisanxi](https://github.com/Qisanxi)
- 📧 Email: sandeepkumarultra615615@gmail.com


