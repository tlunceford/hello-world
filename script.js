const jobs = [
    {
        id: 1,
        title: "Senior Product Marketing Manager, AI Platform",
        company: "OpenAI",
        location: "San Francisco, CA",
        remote: false,
        level: "Senior",
        description: "Lead product marketing for our AI platform, working directly with GPT-4 and DALL-E product teams. Drive go-to-market strategy, messaging, and launch execution for our cutting-edge AI products.",
        tags: ["GPT-4", "AI Platform", "B2B SaaS", "Product Launches"],
        salary: "$180k - $250k",
        type: "Full-time"
    },
    {
        id: 2,
        title: "Product Marketing Lead - AI Solutions",
        company: "Anthropic",
        location: "San Francisco, CA",
        remote: true,
        level: "Lead",
        description: "Shape the narrative around Claude and our AI safety initiatives. You'll define positioning, craft compelling messaging, and lead launches for our enterprise AI solutions.",
        tags: ["Claude", "AI Safety", "Enterprise", "Thought Leadership"],
        salary: "$170k - $230k",
        type: "Full-time"
    },
    {
        id: 3,
        title: "Director of Product Marketing, AI & ML",
        company: "Google DeepMind",
        location: "London, UK",
        remote: false,
        level: "Director",
        description: "Lead product marketing strategy for DeepMind's AI research products. Build and manage a team of product marketers focused on bringing AI breakthroughs to market.",
        tags: ["Machine Learning", "Research", "Team Leadership", "B2B"],
        salary: "£140k - £200k",
        type: "Full-time"
    },
    {
        id: 4,
        title: "Product Marketing Manager - AI Developer Tools",
        company: "Hugging Face",
        location: "Remote",
        remote: true,
        level: "Mid-Level",
        description: "Drive adoption of our open-source AI tools and platforms. Create technical content, manage developer community engagement, and position Hugging Face as the go-to platform for AI builders.",
        tags: ["Developer Marketing", "Open Source", "NLP", "Community"],
        salary: "$140k - $180k",
        type: "Full-time"
    },
    {
        id: 5,
        title: "Senior PMM, Generative AI Products",
        company: "Microsoft Azure AI",
        location: "Seattle, WA",
        remote: true,
        level: "Senior",
        description: "Lead product marketing for Azure's generative AI services including Azure OpenAI Service. Partner with product, sales, and engineering to drive enterprise adoption.",
        tags: ["Azure", "Generative AI", "Enterprise", "Cloud"],
        salary: "$160k - $220k",
        type: "Full-time"
    },
    {
        id: 6,
        title: "Product Marketing Manager, AI Copilots",
        company: "GitHub",
        location: "Remote",
        remote: true,
        level: "Mid-Level",
        description: "Shape the story of GitHub Copilot and AI-powered developer tools. Work with a world-class team to position GitHub as the leader in AI-assisted software development.",
        tags: ["GitHub Copilot", "Developer Tools", "AI Coding", "DevEx"],
        salary: "$145k - $190k",
        type: "Full-time"
    },
    {
        id: 7,
        title: "Lead Product Marketing Manager - AI Infrastructure",
        company: "Databricks",
        location: "San Francisco, CA",
        remote: true,
        level: "Lead",
        description: "Drive go-to-market strategy for MLflow and AI infrastructure products. Position Databricks as the platform of choice for building and deploying AI applications at scale.",
        tags: ["MLOps", "Data Platform", "Infrastructure", "Enterprise"],
        salary: "$175k - $240k",
        type: "Full-time"
    },
    {
        id: 8,
        title: "Product Marketing Manager - AI for Healthcare",
        company: "Viz.ai",
        location: "San Francisco, CA",
        remote: false,
        level: "Mid-Level",
        description: "Market AI-powered solutions that save lives. Work with clinical teams to position our stroke and care coordination platform to healthcare systems nationwide.",
        tags: ["Healthcare AI", "Medical Devices", "Clinical", "Impact"],
        salary: "$130k - $170k",
        type: "Full-time"
    },
    {
        id: 9,
        title: "Senior Product Marketing Manager - AI Chips",
        company: "NVIDIA",
        location: "Santa Clara, CA",
        remote: false,
        level: "Senior",
        description: "Lead product marketing for NVIDIA's AI computing platforms. Position our GPUs and AI infrastructure as essential for training and deploying large language models.",
        tags: ["Hardware", "AI Infrastructure", "GPUs", "Enterprise"],
        salary: "$165k - $225k",
        type: "Full-time"
    },
    {
        id: 10,
        title: "Product Marketing Lead - AI Security",
        company: "Scale AI",
        location: "San Francisco, CA",
        remote: true,
        level: "Lead",
        description: "Shape the narrative around AI data platforms and model evaluation. Work with defense and enterprise customers to position Scale as the trusted partner for AI deployment.",
        tags: ["AI Safety", "Data Platform", "Enterprise", "Government"],
        salary: "$170k - $230k",
        type: "Full-time"
    },
    {
        id: 11,
        title: "Product Marketing Manager - Conversational AI",
        company: "Intercom",
        location: "San Francisco, CA",
        remote: true,
        level: "Mid-Level",
        description: "Drive marketing for our AI-powered customer service platform. Position Intercom's Fin AI as the future of customer support and engagement.",
        tags: ["Conversational AI", "SaaS", "Customer Support", "Chatbots"],
        salary: "$135k - $175k",
        type: "Full-time"
    },
    {
        id: 12,
        title: "Senior PMM, AI Productivity Tools",
        company: "Notion",
        location: "San Francisco, CA",
        remote: true,
        level: "Senior",
        description: "Lead product marketing for Notion AI and productivity features. Create compelling narratives around how AI enhances knowledge work and team collaboration.",
        tags: ["Productivity", "Notion AI", "SaaS", "Collaboration"],
        salary: "$155k - $200k",
        type: "Full-time"
    },
    {
        id: 13,
        title: "Director of Product Marketing, AI Research",
        company: "Cohere",
        location: "Toronto, ON",
        remote: true,
        level: "Director",
        description: "Build and lead the product marketing function at a fast-growing AI startup. Position our enterprise LLM platform and drive strategic partnerships.",
        tags: ["LLMs", "Enterprise AI", "Startup", "Leadership"],
        salary: "$170k - $240k CAD",
        type: "Full-time"
    },
    {
        id: 14,
        title: "Product Marketing Manager - AI Video Generation",
        company: "Runway",
        location: "New York, NY",
        remote: false,
        level: "Mid-Level",
        description: "Market groundbreaking AI video generation tools to creators and enterprises. Shape the story of how AI transforms creative workflows.",
        tags: ["Generative AI", "Video", "Creative Tools", "Media"],
        salary: "$140k - $185k",
        type: "Full-time"
    },
    {
        id: 15,
        title: "Senior Product Marketing Manager - AI Automation",
        company: "UiPath",
        location: "New York, NY",
        remote: true,
        level: "Senior",
        description: "Lead product marketing for AI-powered automation solutions. Drive enterprise adoption of intelligent process automation and AI-driven workflows.",
        tags: ["RPA", "Automation", "Enterprise", "AI Agents"],
        salary: "$150k - $195k",
        type: "Full-time"
    },
    {
        id: 16,
        title: "Product Marketing Lead - AI Code Assistant",
        company: "Replit",
        location: "Remote",
        remote: true,
        level: "Lead",
        description: "Position Replit's AI coding assistant as the future of software development. Create compelling content for developers and drive product-led growth.",
        tags: ["Developer Tools", "AI Coding", "PLG", "Education"],
        salary: "$160k - $210k",
        type: "Full-time"
    },
    {
        id: 17,
        title: "Senior PMM, AI Sales Tools",
        company: "Gong",
        location: "San Francisco, CA",
        remote: true,
        level: "Senior",
        description: "Market AI-powered revenue intelligence platform. Position Gong as the essential tool for modern sales teams using AI to close more deals.",
        tags: ["Sales Tech", "Revenue Intelligence", "AI Analytics", "B2B"],
        salary: "$155k - $205k",
        type: "Full-time"
    },
    {
        id: 18,
        title: "Product Marketing Manager - AI Design Tools",
        company: "Figma",
        location: "San Francisco, CA",
        remote: true,
        level: "Mid-Level",
        description: "Lead marketing for Figma's AI features that help designers work faster. Create narratives around AI-assisted design and creative collaboration.",
        tags: ["Design Tools", "AI Features", "Collaboration", "Creative"],
        salary: "$145k - $185k",
        type: "Full-time"
    },
    {
        id: 19,
        title: "Director of Product Marketing - AI Platform",
        company: "Snowflake",
        location: "San Mateo, CA",
        remote: true,
        level: "Director",
        description: "Lead product marketing for Snowflake's AI and ML capabilities. Build a team and drive enterprise adoption of AI-powered data solutions.",
        tags: ["Data Platform", "ML", "Enterprise", "Leadership"],
        salary: "$190k - $260k",
        type: "Full-time"
    },
    {
        id: 20,
        title: "Product Marketing Manager - AI Writing Assistant",
        company: "Jasper",
        location: "Austin, TX",
        remote: true,
        level: "Mid-Level",
        description: "Drive growth marketing for AI content creation platform. Position Jasper as the essential tool for marketing teams and content creators.",
        tags: ["Content AI", "Marketing Tech", "Copywriting", "SMB"],
        salary: "$125k - $165k",
        type: "Full-time"
    }
];

let filteredJobs = [...jobs];

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
                    <h2 class="job-title">${job.title}</h2>
                    <div class="company">${job.company}</div>
                </div>
            </div>
            <div class="job-meta">
                <span class="meta-item">📍 ${job.location}</span>
                <span class="meta-item">💼 ${job.level}</span>
                <span class="meta-item">⏰ ${job.type}</span>
                ${job.remote ? '<span class="meta-item">🌐 Remote</span>' : ''}
            </div>
            <div class="job-description">${job.description}</div>
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="salary">💰 ${job.salary}</div>
            <button class="apply-btn" onclick="applyToJob(${job.id})">Apply Now</button>
        </div>
    `).join('');
}

function filterJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const locationFilter = document.getElementById('locationFilter').value;
    const levelFilter = document.getElementById('levelFilter').value;

    filteredJobs = jobs.filter(job => {
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

function applyToJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    alert(`Great choice! You're applying to ${job.title} at ${job.company}.\n\nIn a real application, this would redirect you to the company's application page or open an application form.`);
}

document.getElementById('searchInput').addEventListener('input', filterJobs);
document.getElementById('locationFilter').addEventListener('change', filterJobs);
document.getElementById('levelFilter').addEventListener('change', filterJobs);

renderJobs(jobs);
