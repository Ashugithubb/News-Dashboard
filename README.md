# Agentic Newsletter - Backend

The Agentic Newsletter Backend is a high-performance Python orchestration engine designed to automate the lifecycle of technical newsletters. It integrates advanced web scraping, intelligent content filtering, and GPT-powered summarization into a unified FastAPI-driven service.


## 🛠️ Tech Stack

- **Core Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Asynchronous, Type-safe)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [SQLAlchemy](https://www.sqlalchemy.org/) & [Psycopg2](https://www.psycopg.org/)
- **AI Engine**: [OpenAI GPT-4o](https://openai.com/) for summarization and tone styling
- **Data Acquisition**:
  - **Social**: `PRAW` (Reddit), `Tweepy` (Twitter)
  - **Web**: `newspaper3k`, `trafilatura`, `Playwright`, `BeautifulSoup4`
- **Infrastructure**: Docker, Boto3 (Cloudflare R2)

## 📂 Directory Structure

```text
backend/
├── api/              # FastAPI Application Layer
│   ├── routers/      # Categorized API endpoints (Sources, Search Terms)
│   ├── auth.py       # Supabase/JWT Authentication logic
│   └── main.py       # Main entry point & global endpoints
├── core/             # Business Logic
│   └── engine.py     # Newsletter generation & AI orchestration
├── db/               # Persistence Layer
│   └── connection.py # Connection pooling & raw SQL execution
├── pipeline/         # Data Processing
│   └── pipeline.py   # Transformation of raw scrapes to structured data
├── scrapers/         # Intelligence Gathering
│   ├── scraper_articles.py # RSS/Web news extraction
│   ├── scraper_linkedin.py # LinkedIn automation
│   ├── scraper_reddit.py   # Subreddit monitoring
│   └── scraper_reports.py  # PDF/Research extraction
└── migrations/       # Schema evolution scripts
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- PostgreSQL
- OpenAI API Key

### Local Installation
1. **Initialize Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

2. **Database Setup**:
   ```bash
   # Initialize schema
   python update_db_schema.py
   ```

3. **Running the Server**:
   ```bash
   uvicorn backend.api.main:app --reload --port 8000
   ```

## 🔌 API Reference

### 👤 Identity & Health
- `GET /health` - Service status & version
- `GET /me` - Current session user details

### 🧠 Generation Engine
- `POST /generate` - Trigger full pipeline (Scrape -> Process -> AI Build)
- `POST /generate-article-summaries` - AI-build for specific article sets
- `POST /generate-report-summaries` - Dedicated summarization for PDF/Research data

### 📰 Newsletter Management
- `GET /newsletters` - Paginated history (Filter by `status=published/draft`)
- `GET /newsletters/{id}` - Fetch specific newsletter JSON/HTML
- `POST /api/newsletters/save` - Save manual edits or new drafts
- `PUT /newsletters/{id}` - Update body, title, or status
- `DELETE /newsletters/{id}` - Remove newsletter entry

### 🌐 Source & Term Control
- `GET /sources/` | `POST /sources/` - Manage RSS/Social input feeds
- `GET /search-terms/` | `POST /search-terms/` - Define keywords for scrapers

### 📊 Intelligence feeds
- `GET /linkedin-posts` - View processed LinkedIn insights
- `GET /tweets-from-person` - User-specific Twitter feed
- `GET /tweets-from-hashtag` - Hashtag-driven Twitter feed

### 🖼️ Storage
- `POST /api/newsletter/upload-url` - Presigned R2 URL for newsletter assets

## 🔒 Authentication
All endpoints (except `/health`) require a valid JWT token from Supabase passed in the `Authorization: Bearer <token>` header.
