
# Sandeep Kumar — Portfolio

Personal portfolio website with an AI-powered chatbot built to showcase projects, skills, and experience. The chatbot identifies visitors (recruiter, student, or connection) and personalizes the conversation accordingly.

**Live site:** [sandeep-kumar.vercel.app](https://sandeep-kumar.vercel.app) *(coming soon)*
**GitHub:** [github.com/Qisanxi](https://github.com/Qisanxi)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | FastAPI, Python |
| Database | PostgreSQL, SQLAlchemy |
| AI | Gemini 2.5 Flash API |
| Rate Limiting | Slowapi |
| DevOps | Docker, docker-compose |
| Deploy (planned) | Vercel (frontend), Railway (backend), Supabase (DB) |

---

## Features

- **AI Chatbot** — Powered by Gemini 2.5 Flash. Identifies visitor type on arrival (recruiter, student, or connection) and personalizes the conversation. Knows Sandeep's projects, skills, and experience.
- **Visitor Onboarding** — Full-screen welcome flow with identity selection before entering the portfolio. Backdrop blur keeps focus on the onboarding step.
- **Contact Form** — Messages saved directly to PostgreSQL via the FastAPI backend.
- **Rate Limiting** — Chat endpoint limited to 10 requests per 5 minutes per IP. Contact form limited to 3 submissions per hour per IP.
- **Sections** — Hero with typing animation, Projects, Skills, About with experience timeline, Contact, Footer.
- **Responsive** — Mobile-first layout, hamburger menu on small screens.
- **Sticky Navbar** — Blurs on scroll, highlights active section, Download CV button always visible.

---

## Project Structure

```
portfolio/
├── frontend/                        # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Tag.jsx
│   │   │   │   └── ChatWidget.jsx   # AI chat widget with onboarding flow
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── sections/
│   │   │       ├── Hero.jsx
│   │   │       ├── Projects.jsx
│   │   │       ├── Skills.jsx
│   │   │       ├── About.jsx
│   │   │       └── Contact.jsx
│   │   ├── hooks/
│   │   │   ├── useChat.js           # Chat state and Gemini API calls
│   │   │   └── useScrollSpy.js      # Active section tracking
│   │   └── lib/
│   │       └── api.js               # Fetch utility with env base URL
│   └── Dockerfile
│
├── backend/                         # FastAPI + Python
│   ├── app/
│   │   ├── api/routes/
│   │   │   ├── chat.py              # AI chat endpoint with rate limiting
│   │   │   └── contact.py           # Contact form endpoint with rate limiting
│   │   ├── core/
│   │   │   ├── config.py            # Pydantic settings from env vars
│   │   │   └── rate_limit.py        # Slowapi limiter
│   │   ├── db/
│   │   │   ├── models.py            # SQLAlchemy ContactMessage model
│   │   │   └── session.py           # Async DB session and Base
│   │   ├── services/
│   │   │   └── ai_service.py        # Gemini API client and system prompt
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

- Node.js 18+
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

# Create .env file
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
| `DEBUG` | Set to False in production |

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
| Backend | Railway | Set all backend env vars in Railway dashboard |
| Database | Supabase | Copy the connection string into `DATABASE_URL` |

---

## Features to Add

- [ ] **Recruiter email capture** — During the onboarding flow, collect email from visitors who identify as recruiters. Send them an automated email with all deployed project links and a note encouraging them to explore the portfolio. Needs Resend API integration on the backend and a polished email template.

- [ ] **Real project links** — Replace placeholder `example.com` URLs in `Projects.jsx` with actual deployed project URLs and GitHub repos.

- [ ] **Resume PDF** — Add actual `resume.pdf` to `frontend/public/` so the Download CV button works.

- [ ] **Google Fonts** — Add Space Grotesk for display headings and JetBrains Mono for code elements as planned in the design system.

- [ ] **SEO and meta tags** — Add Open Graph tags, Twitter card meta, and a proper page title/description so the portfolio looks good when shared on LinkedIn.

- [ ] **Analytics** — Add Umami or Plausible (both privacy-friendly and free) to track which projects and sections get the most attention from visitors.

- [ ] **Blog section** — A minimal writing section for sharing learnings on AI engineering, FastAPI patterns, or Flutter development. Positions Sandeep as a thought leader in the AI space.

- [ ] **Dark/light mode toggle** — Optional, but adds polish and accessibility.

- [ ] **Alembic migrations** — Replace the `create_all` startup approach with proper Alembic migration files for production-safe schema changes.

- [ ] **CI/CD pipeline** — GitHub Actions workflow to run linting and auto-deploy to Vercel and Railway on push to main.

---

## Author

**Sandeep Kumar**
- GitHub: [@Qisanxi]
- LinkedIn:[https://linkedin.com/in/sandeep-qisanxi]
- Email: [lordschilledlife@gmail.com]