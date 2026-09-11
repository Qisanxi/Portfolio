# Sandeep Kumar — Portfolio

Personal portfolio website with an AI-powered chatbot built to showcase projects, skills, and experience. The chatbot identifies visitors (recruiter, student, or connection) and personalizes the conversation accordingly.

**🌐 Live site:** [sandeep-kumar.vercel.app](https://sandeep-kumar.vercel.app)
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
| Deploy | Vercel (frontend), AWS Lambda + API Gateway (backend), Supabase (DB) |

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

    subgraph Lambda["⚡ AWS Lambda + API Gateway  —  FastAPI (Mangum)"]
        direction TB
        CORS["CORS Middleware\nFRONTEND_URL whitelist"]:::middleware
        RL["Slowapi Rate Limiter"]:::middleware
        subgraph Routes["API Routes"]
            direction LR
            CHAT_RT["/api/chat\nPOST · 10 / 5 min"]:::route
            CONTACT_RT["/api/contact\nPOST · 3 / hr"]:::route
        end
        AI_SVC["ai_service.py\nSystem prompt + history"]:::service
        CORS --> RL --> Routes
        CHAT_RT --> AI_SVC
    end

    subgraph Supabase["🐘 Supabase  —  PostgreSQL"]
        DB[("contact_messages\nid · name · email\nmessage · created_at")]:::db
    end

    subgraph GoogleAI["🤖 Google AI Studio"]
        GEMINI["Gemini 2.5 Flash\nasync chat · streaming"]:::external
    end

    Visitor -->|"Loads app"| Vercel
    CW -->|"POST /api/chat\nVITE_API_URL"| AppRunner
    CONTACT -->|"POST /api/contact\nVITE_API_URL"| AppRunner
    AI_SVC -->|"GEMINI_API_KEY"| GoogleAI
    GoogleAI -->|"AI response"| AI_SVC
    CONTACT_RT -->|"INSERT"| Supabase

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
    participant API as FastAPI Backend<br/>(AWS Lambda)
    participant AI as Gemini 2.5 Flash<br/>(Google AI)
    participant DB as PostgreSQL<br/>(Supabase)

    Note over V,FE: Portfolio load + onboarding
    V->>FE: Opens sandeep-kumar.vercel.app
    FE->>V: Auto-popup after 2 s — identity selector
    V->>FE: Selects Recruiter / Student / Friend
    FE->>V: Personalized welcome message

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
| Backend | AWS Lambda + API Gateway | `sam build && sam deploy` from repo root. 1M requests/month free forever. Cold starts ~1–2 s (vs Render free tier 30–50 s). No spindown, no pings needed. |
| Database | Supabase | Copy the connection string into `DATABASE_URL` |

### Deploy backend to AWS Lambda

AWS Lambda is the right choice here: **1 million requests per month free forever**, cold starts of ~1–2 seconds (not 30–50 seconds), and no pinging utilities needed. The only code addition is one package (`mangum`) and two lines in a new file.

#### Step 1 — Code changes (do these first)

**`backend/requirements.txt`** — add one line:
```
mangum==0.17.0
```

**`backend/lambda_handler.py`** — create this file:
```python
from mangum import Mangum
from app.main import app

# Mangum wraps FastAPI for Lambda's event format
handler = Mangum(app, lifespan="auto")
```

**`backend/app/db/session.py`** — add `NullPool` (Lambda can't hold persistent DB connections):
```python
from sqlalchemy.pool import NullPool

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    poolclass=NullPool,   # ← add this line
)
```

**`template.yaml`** — create at the repo root:
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Portfolio Backend — FastAPI on AWS Lambda

Globals:
  Function:
    Timeout: 30
    MemorySize: 512
    Runtime: python3.11

Parameters:
  DatabaseUrl:
    Type: String
  GeminiApiKey:
    Type: String
    NoEcho: true
  FrontendUrl:
    Type: String
    Default: "https://your-portfolio.vercel.app"

Resources:
  PortfolioBackend:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: backend/
      Handler: lambda_handler.handler
      Environment:
        Variables:
          DATABASE_URL: !Ref DatabaseUrl
          GEMINI_API_KEY: !Ref GeminiApiKey
          FRONTEND_URL: !Ref FrontendUrl
          DEBUG: "False"
      Events:
        ApiRoot:
          Type: HttpApi
          Properties:
            Path: /
            Method: ANY
        ApiProxy:
          Type: HttpApi
          Properties:
            Path: /{proxy+}
            Method: ANY

Outputs:
  ApiUrl:
    Value: !Sub "https://${ServerlessHttpApi}.execute-api.${AWS::Region}.amazonaws.com"
```

#### Step 2 — AWS one-time setup

1. Create an [AWS account](https://aws.amazon.com) (free tier)
2. Go to **IAM → Users → Create User** → attach these policies:
   - `AWSLambda_FullAccess`
   - `AmazonAPIGatewayAdministrator`
   - `AWSCloudFormationFullAccess`
   - `AmazonS3FullAccess`
   - `IAMFullAccess`
3. **Security credentials → Create access key** → save the ID and secret

#### Step 3 — Install CLI tools

```bash
# AWS CLI — macOS
brew install awscli
# Windows: download installer from aws.amazon.com/cli

# Configure with your credentials
aws configure
# Prompts for: Access Key ID, Secret Access Key, Region, Output format
# Use ap-south-1 (Mumbai) for lowest latency from India

# AWS SAM CLI — macOS
brew install aws-sam-cli
# Windows: download from aws.amazon.com/serverless/sam
```

#### Step 4 — Build and deploy

```bash
# From the repo root (where template.yaml lives)
sam build

sam deploy --guided   --stack-name portfolio-backend   --capabilities CAPABILITY_IAM   --parameter-overrides     DatabaseUrl="postgresql+asyncpg://postgres.[ref]:[pass]@[host]:6543/postgres"     GeminiApiKey="your_gemini_key"     FrontendUrl="https://your-portfolio.vercel.app"
```

SAM asks a few questions on first run and saves the answers to `samconfig.toml`. Every future deploy is just:

```bash
sam build && sam deploy
```

After deploy, SAM prints:
```
Outputs:
ApiUrl = https://xxxxxxxxxx.execute-api.ap-south-1.amazonaws.com
```

Set that as `VITE_API_URL` in your **Vercel dashboard → Settings → Environment Variables**, then trigger a redeploy of the frontend.

#### Free tier cold starts — fix with UptimeRobot



## Projects Featured

| Project | Live | GitHub |
|---|---|---|
| DueAlert | [duealert-bbb61.web.app](https://duealert-bbb61.web.app) | [Qisanxi/DueAlert](https://github.com/Qisanxi/DueAlert) |
| AutoPost | [autopost-9c37c.web.app](https://autopost-9c37c.web.app/#/) | [Qisanxi/AutoPost](https://github.com/Qisanxi/AutoPost) |
| WhatsApp Priority Agent | Local deploy | [Qisanxi/Whatsapp_priority_agent](https://github.com/Qisanxi/Whatsapp_priority_agent) |
| FinSathi | — | [Qisanxi/finsathi.ai](https://github.com/Qisanxi/finsathi.ai) |

---

## Roadmap

- [ ] **Recruiter email capture** — Collect email from recruiter visitors during onboarding and send an automated follow-up with project links. Needs Resend API integration.
- [ ] **Resume PDF** — Add `resume.pdf` to `frontend/public/` so the Download CV button works.
- [x] **Google Fonts** — Add Space Grotesk for headings and JetBrains Mono for code elements.
- [x] **AWS Lambda** — Backend deployed on Lambda + API Gateway via SAM. Zero spindown, 1M free requests/month, ~1–2 s cold starts.
- [ ] **CI/CD pipeline** — GitHub Actions: `sam build && sam deploy` on push to main so backend auto-deploys with the frontend.
- [ ] **Analytics** — Add Umami or Plausible for privacy-friendly visitor tracking.
- [ ] **Blog section** — Minimal writing section for learnings on AI engineering and FastAPI.
- [ ] **Alembic migrations** — Replace `create_all` startup with proper Alembic migration files.
- [ ] **CI/CD pipeline** — GitHub Actions to lint and auto-deploy on push to main.

---

## Author

**Sandeep Kumar** — Software Engineer · Python Backend & AI-Integrated Full-Stack

- 🌐 Portfolio: [sandeep-kumar.vercel.app](https://sandeep-kumar.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/sandeep-qisanxi](https://www.linkedin.com/in/sandeep-qisanxi)
- 🐙 GitHub: [github.com/Qisanxi](https://github.com/Qisanxi)
- 📧 Email: sandeepkumarultra615615@gmail.com


