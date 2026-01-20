// AI Product Marketing Job Board - Production Version
// Fetches real jobs from multiple APIs

const CONFIG = {
    CACHE_DURATION: 3600000, // 1 hour in milliseconds
    AI_KEYWORDS: [
        'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
        'llm', 'gpt', 'generative', 'neural', 'nlp', 'computer vision', 'data science',
        'openai', 'anthropic', 'google', 'microsoft', 'meta', 'nvidia', 'hugging face',
        'databricks', 'scale ai', 'cohere', 'stability', 'midjourney', 'runway'
    ],
    MARKETING_KEYWORDS: [
        'product marketing', 'marketing', 'pmm', 'go-to-market', 'gtm',
        'positioning', 'messaging', 'growth', 'demand gen', 'brand'
    ]
};

let allJobs = [];
let filteredJobs = [];

// Initialize the app
async function init() {
    showLoading(true);
    await loadJobs();
    setupEventListeners();
    showLoading(false);
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', filterJobs);
    document.getElementById('locationFilter').addEventListener('change', filterJobs);
    document.getElementById('levelFilter').addEventListener('change', filterJobs);
    document.getElementById('refreshBtn').addEventListener('click', refreshJobs);
}

// Fetch jobs from multiple sources
async function loadJobs() {
    try {
        // Check cache first
        const cached = getCachedJobs();
        if (cached) {
            allJobs = cached;
            filteredJobs = allJobs;
            renderJobs(filteredJobs);
            updateLastUpdated();
            return;
        }

        showError('');
        const jobs = [];

        // Fetch from multiple sources
        await Promise.allSettled([
            fetchRemoteOKJobs(),
            fetchRemotiveJobs(),
            fetchAdzunaJobs()
        ]).then(results => {
            results.forEach((result, index) => {
                if (result.status === 'fulfilled' && result.value) {
                    jobs.push(...result.value);
                }
            });
        });

        if (jobs.length === 0) {
            showError('No jobs found. Please try refreshing or check your internet connection.');
            return;
        }

        // Filter for AI + Marketing jobs
        allJobs = filterAIMarketingJobs(jobs);

        // Sort by date (most recent first)
        allJobs.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Cache the results
        cacheJobs(allJobs);

        filteredJobs = allJobs;
        renderJobs(filteredJobs);
        updateLastUpdated();

    } catch (error) {
        console.error('Error loading jobs:', error);
        showError('Failed to load jobs. Please try again later.');
    }
}

// Fetch from RemoteOK API
async function fetchRemoteOKJobs() {
    try {
        const response = await fetch('https://remoteok.com/api');
        const data = await response.json();

        return data.slice(1).map(job => ({
            id: `remoteok-${job.id}`,
            title: job.position,
            company: job.company || 'Company not listed',
            location: job.location || 'Remote',
            remote: true,
            level: extractLevel(job.position),
            description: job.description ? stripHtml(job.description).substring(0, 300) + '...' : 'No description available',
            tags: job.tags || [],
            salary: job.salary_min && job.salary_max ? `$${job.salary_min}k - $${job.salary_max}k` : 'Salary not listed',
            type: 'Full-time',
            url: job.url || `https://remoteok.com/remote-jobs/${job.id}`,
            date: job.date || new Date().toISOString(),
            source: 'RemoteOK'
        })).filter(job =>
            job.title && job.company
        );
    } catch (error) {
        console.error('RemoteOK fetch error:', error);
        return [];
    }
}

// Fetch from Remotive API
async function fetchRemotiveJobs() {
    try {
        const response = await fetch('https://remotive.com/api/remote-jobs?category=marketing');
        const data = await response.json();

        return data.jobs.map(job => ({
            id: `remotive-${job.id}`,
            title: job.title,
            company: job.company_name,
            location: 'Remote',
            remote: true,
            level: extractLevel(job.title),
            description: stripHtml(job.description).substring(0, 300) + '...',
            tags: job.tags || [],
            salary: job.salary || 'Salary not listed',
            type: job.job_type || 'Full-time',
            url: job.url,
            date: job.publication_date,
            source: 'Remotive'
        }));
    } catch (error) {
        console.error('Remotive fetch error:', error);
        return [];
    }
}

// Fetch from Adzuna API (requires API keys - gracefully fails if not configured)
async function fetchAdzunaJobs() {
    try {
        // Users can add their own Adzuna API keys in localStorage
        const appId = localStorage.getItem('adzuna_app_id');
        const appKey = localStorage.getItem('adzuna_app_key');

        if (!appId || !appKey) {
            console.log('Adzuna API keys not configured. Skipping Adzuna.');
            return [];
        }

        const query = 'product marketing AI';
        const country = 'us';
        const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=50&what=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        const data = await response.json();

        return data.results.map(job => ({
            id: `adzuna-${job.id}`,
            title: job.title,
            company: job.company.display_name,
            location: job.location.display_name,
            remote: job.location.display_name.toLowerCase().includes('remote'),
            level: extractLevel(job.title),
            description: stripHtml(job.description).substring(0, 300) + '...',
            tags: job.category ? [job.category.label] : [],
            salary: job.salary_min ? `$${Math.round(job.salary_min/1000)}k - $${Math.round(job.salary_max/1000)}k` : 'Salary not listed',
            type: 'Full-time',
            url: job.redirect_url,
            date: job.created,
            source: 'Adzuna'
        }));
    } catch (error) {
        console.error('Adzuna fetch error:', error);
        return [];
    }
}

// Filter jobs for AI and Marketing relevance
function filterAIMarketingJobs(jobs) {
    return jobs.filter(job => {
        const searchText = `${job.title} ${job.description} ${job.company} ${job.tags.join(' ')}`.toLowerCase();

        const hasMarketing = CONFIG.MARKETING_KEYWORDS.some(keyword =>
            searchText.includes(keyword.toLowerCase())
        );

        const hasAI = CONFIG.AI_KEYWORDS.some(keyword =>
            searchText.includes(keyword.toLowerCase())
        );

        return hasMarketing && hasAI;
    });
}

// Extract experience level from job title
function extractLevel(title) {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('director')) return 'Director';
    if (lowerTitle.includes('vp') || lowerTitle.includes('vice president')) return 'Director';
    if (lowerTitle.includes('head of')) return 'Director';
    if (lowerTitle.includes('lead')) return 'Lead';
    if (lowerTitle.includes('senior') || lowerTitle.includes('sr.')) return 'Senior';
    if (lowerTitle.includes('junior') || lowerTitle.includes('jr.')) return 'Mid-Level';
    if (lowerTitle.includes('manager') && !lowerTitle.includes('senior')) return 'Mid-Level';
    return 'Mid-Level';
}

// Strip HTML tags
function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// Filter jobs based on search and filters
function filterJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const locationFilter = document.getElementById('locationFilter').value;
    const levelFilter = document.getElementById('levelFilter').value;

    filteredJobs = allJobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchTerm));

        const matchesLocation = !locationFilter ||
            (locationFilter === 'Remote' ? job.remote : job.location.includes(locationFilter));

        const matchesLevel = !levelFilter || job.level === levelFilter;

        return matchesSearch && matchesLocation && matchesLevel;
    });

    renderJobs(filteredJobs);
}

// Render jobs to the page
function renderJobs(jobsToRender) {
    const jobListingsContainer = document.getElementById('jobListings');
    const jobCountElement = document.getElementById('count');

    jobCountElement.textContent = jobsToRender.length;

    if (jobsToRender.length === 0) {
        jobListingsContainer.innerHTML = `
            <div class="no-results">
                <h2>No jobs found</h2>
                <p>Try adjusting your search criteria or filters</p>
            </div>
        `;
        return;
    }

    jobListingsContainer.innerHTML = jobsToRender.map(job => `
        <div class="job-card" data-id="${job.id}">
            <div class="job-header">
                <div>
                    <h2 class="job-title">${escapeHtml(job.title)}</h2>
                    <div class="company">${escapeHtml(job.company)}</div>
                </div>
            </div>
            <div class="job-meta">
                <span class="meta-item">📍 ${escapeHtml(job.location)}</span>
                <span class="meta-item">💼 ${job.level}</span>
                <span class="meta-item">⏰ ${job.type}</span>
                ${job.remote ? '<span class="meta-item">🌐 Remote</span>' : ''}
                <span class="meta-item">📅 ${formatDate(job.date)}</span>
            </div>
            <div class="job-description">${escapeHtml(job.description)}</div>
            <div class="job-tags">
                ${job.tags.slice(0, 5).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                <span class="tag" style="background: #e8e8e8; color: #666;">via ${job.source}</span>
            </div>
            <div class="salary">💰 ${escapeHtml(job.salary)}</div>
            <a href="${escapeHtml(job.url)}" target="_blank" rel="noopener noreferrer" class="apply-btn">Apply Now →</a>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
}

// Cache management
function cacheJobs(jobs) {
    try {
        const cache = {
            jobs: jobs,
            timestamp: Date.now()
        };
        localStorage.setItem('jobsCache', JSON.stringify(cache));
    } catch (error) {
        console.error('Cache error:', error);
    }
}

function getCachedJobs() {
    try {
        const cached = localStorage.getItem('jobsCache');
        if (!cached) return null;

        const cache = JSON.parse(cached);
        const age = Date.now() - cache.timestamp;

        if (age > CONFIG.CACHE_DURATION) {
            localStorage.removeItem('jobsCache');
            return null;
        }

        return cache.jobs;
    } catch (error) {
        console.error('Cache retrieval error:', error);
        return null;
    }
}

// UI helpers
function showLoading(show) {
    document.getElementById('loadingMessage').style.display = show ? 'block' : 'none';
    document.getElementById('refreshBtn').disabled = show;
}

function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    if (message) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    } else {
        errorEl.style.display = 'none';
    }
}

function updateLastUpdated() {
    const cached = localStorage.getItem('jobsCache');
    if (cached) {
        const cache = JSON.parse(cached);
        const date = new Date(cache.timestamp);
        document.getElementById('lastUpdated').textContent =
            `Last updated: ${date.toLocaleString()}`;
    }
}

async function refreshJobs() {
    localStorage.removeItem('jobsCache');
    showLoading(true);
    await loadJobs();
    showLoading(false);
}

// Initialize the app when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
