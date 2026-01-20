# AI Product Marketing Jobs

A production-ready job board that aggregates **real, live job listings** for product marketing positions at AI companies. Jobs are fetched from multiple APIs and filtered for AI/ML relevance.

## Features

### Live Data Integration
- **Real-time job listings** from multiple job boards (RemoteOK, Remotive, Adzuna)
- **Auto-filtering** for AI/ML + Marketing roles
- **1-hour caching** to optimize performance
- **Manual refresh** button to get latest jobs
- **Last updated timestamp** to track data freshness

### Filtering & Search
- Full-text search across job titles, companies, and descriptions
- Filter by location (Remote, San Francisco, New York, Seattle, London)
- Filter by experience level (Senior, Mid-Level, Lead, Director)
- Automatic level detection from job titles

### User Experience
- **Direct application links** to actual job postings
- **Post date tracking** (shows "Today", "2 days ago", etc.)
- **Source attribution** (shows which job board each listing is from)
- **Responsive design** for all devices
- **Loading states** and error handling
- **XSS protection** with HTML escaping

## How It Works

The app aggregates jobs from:

1. **RemoteOK** - Large database of remote jobs (no API key required)
2. **Remotive** - Marketing-focused remote positions (no API key required)
3. **Adzuna** - Broad job search (optional - requires free API keys)

Jobs are automatically filtered for:
- **AI Keywords**: AI, machine learning, ML, GPT, LLM, deep learning, NLP, computer vision, data science, etc.
- **Marketing Keywords**: product marketing, PMM, go-to-market, positioning, messaging, growth, demand gen, brand
- **AI Companies**: OpenAI, Anthropic, Google, Microsoft, Meta, NVIDIA, Hugging Face, Databricks, Scale AI, Cohere, and more

## Setup (Optional - For More Jobs)

To get additional jobs from Adzuna (optional):

1. Sign up for free API keys at [Adzuna Developer Portal](https://developer.adzuna.com/)
2. Open browser console on the job board
3. Run:
   ```javascript
   localStorage.setItem('adzuna_app_id', 'YOUR_APP_ID');
   localStorage.setItem('adzuna_app_key', 'YOUR_APP_KEY');
   ```
4. Refresh the page

## Usage

Just visit the site - jobs load automatically! Features:

- **Search**: Type keywords to filter jobs
- **Filter**: Use dropdowns for location and experience level
- **Refresh**: Click 🔄 Refresh button to get latest jobs
- **Apply**: Click "Apply Now →" to visit the actual job posting

## Technical Details

- **Client-side only** - runs entirely in the browser (GitHub Pages compatible)
- **No backend required** - all API calls are client-side
- **LocalStorage caching** - reduces API calls and improves performance
- **CORS-friendly APIs** - works from any domain
- **Graceful degradation** - continues working even if one API fails

## Data Sources

- [RemoteOK API](https://remoteok.com/api)
- [Remotive API](https://remotive.com/api/remote-jobs)
- [Adzuna API](https://developer.adzuna.com/) (optional)

## View Live

Visit: [https://tlunceford.github.io/ai-marketing-jobs/](https://tlunceford.github.io/ai-marketing-jobs/)

## Local Development

Simply open `index.html` in your browser. No build process or dependencies required!

---

Built with vanilla JavaScript - no frameworks, just fast and simple.
