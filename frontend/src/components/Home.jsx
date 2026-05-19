import { useMemo, useState } from "react";
import { NavLink, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";

const TOOL_INFO = {
  "GitHub Copilot": {
    description: "AI coding assistant that helps write, refactor, and explain code directly in your editor.",
    uniqueness: "Deep IDE integration with context-aware completions and agent workflows.",
    link: "https://github.com/features/copilot",
  },
  Cursor: {
    description: "AI-first code editor built for fast code generation, editing, and repository understanding.",
    uniqueness: "Chat + codebase-aware edits in one focused editor experience.",
    link: "https://www.cursor.com/",
  },
  Codex: {
    description: "AI model family focused on understanding and generating code across languages.",
    uniqueness: "Strong code reasoning and generation for complex developer tasks.",
    link: "https://openai.com/index/introducing-codex/",
  },
  "TRAE (Coding Agent)": {
    description: "Coding agent environment for planning, editing, and shipping code workflows.",
    uniqueness: "Agent-style task execution across larger coding changes.",
    link: "https://www.trae.ai/",
  },
  "Agents.md": {
    description: "A lightweight convention for documenting AI agent behavior and project instructions.",
    uniqueness: "Simple markdown format to standardize agent expectations in repos.",
    link: "https://agents.md/",
  },
  "OpenClaw (Local AI Personal Agent)": {
    description: "Local personal AI agent setup aimed at privacy-preserving automation.",
    uniqueness: "Runs on your machine for tighter control over data and workflows.",
    link: "https://github.com/All-Hands-AI/OpenClaw",
  },
  "Ollama (Run LLMs Locally)": {
    description:
      "Ollama is a local LLM runtime that allows developers to run large language models directly on their machine without relying on external APIs.",
    uniqueness:
      "Enables secure, offline AI model execution and supports models like Llama, Mistral, and others for building intelligent applications.",
    link: "https://ollama.com/",
  },
  "Whisper (Audio to Text AI Model)": {
    description:
      "Whisper is an open-source speech recognition model developed by OpenAI, used for converting speech to text with high accuracy.",
    uniqueness:
      "Supports multiple languages, making it ideal for voice-enabled and multilingual applications.",
    link: "https://openai.com/research/whisper",
  },
  "Roadmap.sh": {
    description: "Community-driven learning roadmaps for software roles and technologies.",
    uniqueness: "Visual, role-based progress paths from beginner to advanced.",
    link: "https://roadmap.sh/",
  },
  "The Odin Project": {
    description: "Free full-stack curriculum with project-based web development learning.",
    uniqueness: "Hands-on open curriculum with real project outcomes.",
    link: "https://www.theodinproject.com/",
  },
  "ByteByteGo (System Design)": {
    description: "System design learning platform with visual explainers and interview prep content.",
    uniqueness: "Clear architecture visuals for distributed systems understanding.",
    link: "https://bytebytego.com/",
  },
  "Interviewing.io": {
    description: "Anonymous mock interviews with engineers from top companies.",
    uniqueness: "Practice interviews in realistic, pressure-tested format.",
    link: "https://interviewing.io/",
  },
  "Daily.dev": {
    description: "Developer news and learning feed aggregated from trusted sources.",
    uniqueness: "Personalized technical feed for consistent daily learning.",
    link: "https://daily.dev/",
  },
  AlternativeTo: {
    description:
      "Platform to discover alternatives to software tools, compare options, and pick the best fit for your workflow.",
    uniqueness: "Community-driven tool comparison with categorized alternatives across many use cases.",
    link: "https://alternativeto.net/",
  },
  Notion: {
    description: "All-in-one workspace for notes, docs, project planning, and collaboration.",
    uniqueness: "Flexible block-based structure for personal and team productivity.",
    link: "https://www.notion.so/",
  },
  Obsidian: {
    description: "Local-first markdown knowledge base with graph linking and plugins.",
    uniqueness: "Powerful personal knowledge management with backlink graph thinking.",
    link: "https://obsidian.md/",
  },
  tldraw: {
    description:
      "Tool to design workflows, notes, and diagrams for students with infinite whiteboard space.",
    uniqueness: "Fast visual thinking canvas for brainstorming, planning, and diagramming.",
    link: "https://www.tldraw.com/",
  },
  Excalidraw: {
    description:
      "An open-source whiteboard tool that allows users to create hand-drawn-like diagrams easily, focusing on simplicity and real-time collaboration.",
    uniqueness: "Sketch-style diagramming with a lightweight, minimal interface and collaborative editing.",
    link: "https://excalidraw.com/",
  },
  Miro: {
    description:
      "A versatile virtual collaboration tool that supports multiple modalities, including diagrams and post-its, and offers integrations with other productivity tools.",
    uniqueness: "Flexible team collaboration boards with templates and rich integrations for planning workflows.",
    link: "https://miro.com/",
  },
  "GitHub Profile README Generator": {
    description:
      "Web tool to quickly build and customize GitHub profile README sections with badges, stats, and widgets.",
    uniqueness: "Fast form-based generation of profile README content without manual markdown setup.",
    link: "https://rahuldkjain.github.io/gh-profile-readme-generator/",
  },
  Codolio: {
    description: "Developer portfolio and professional profile platform for coders.",
    uniqueness: "Showcases projects and coding identity in a focused format.",
    link: "https://www.codolio.com/",
  },
  "Gamma AI": {
    description: "AI presentation/document builder for fast storytelling and design.",
    uniqueness: "Turns prompts into polished decks and visual docs quickly.",
    link: "https://gamma.app/",
  },
  MongoDB: {
    description: "NoSQL document database optimized for JSON-like flexible schemas.",
    uniqueness: "Developer-friendly document model with rich ecosystem.",
    link: "https://www.mongodb.com/",
  },
  "DocDB (AWS DocumentDB)": {
    description: "AWS-managed document database service compatible with MongoDB APIs.",
    uniqueness: "Managed scaling and reliability in AWS-native infrastructure.",
    link: "https://aws.amazon.com/documentdb/",
  },
  PostgreSQL: {
    description: "Advanced open-source relational database with strong SQL compliance.",
    uniqueness: "Powerful ACID reliability plus extensibility for complex workloads.",
    link: "https://www.postgresql.org/",
  },
  "RAG (Retrieval Augmented Generation)": {
    description: "LLM architecture pattern combining search/retrieval with generation.",
    uniqueness: "Grounds responses on your data to improve accuracy and freshness.",
    link: "https://www.pinecone.io/learn/retrieval-augmented-generation/",
  },
  "Hugging Face": {
    description: "Open AI platform for models, datasets, inference, and ML collaboration.",
    uniqueness: "Largest open model hub with practical tooling for AI teams.",
    link: "https://huggingface.co/",
  },
  Figma: {
    description: "Collaborative interface design and prototyping platform.",
    uniqueness: "Real-time multiplayer design with strong developer handoff.",
    link: "https://www.figma.com/",
  },
  Uiverse: {
    description: "Community platform for ready-to-use UI components and CSS snippets.",
    uniqueness: "Fast copy-paste creative UI building blocks.",
    link: "https://uiverse.io/",
  },
  Vercel: {
    description: "Frontend-focused deployment platform with edge and serverless features.",
    uniqueness: "Excellent DX for modern frameworks and instant preview deployments.",
    link: "https://vercel.com/",
  },
  Render: {
    description: "Cloud platform for web services, APIs, static sites, and databases.",
    uniqueness: "Simple full-stack deployment with managed infrastructure.",
    link: "https://render.com/",
  },
  AWS: {
    description: "Comprehensive cloud ecosystem for compute, storage, databases, and AI.",
    uniqueness: "Breadth of managed services with enterprise-scale reliability.",
    link: "https://aws.amazon.com/",
  },
  Railway: {
    description: "Developer-friendly deployment platform for apps, services, and databases.",
    uniqueness: "Minimal setup with smooth environment and infra workflows.",
    link: "https://railway.app/",
  },
  Streamlit: {
    description: "Python framework for building and sharing interactive data apps quickly.",
    uniqueness: "Turns scripts into live web apps with minimal frontend setup.",
    link: "https://streamlit.io/",
  },
  Netlify: {
    description: "Web deployment and hosting platform with CI/CD and edge features.",
    uniqueness: "Great workflow for JAMstack and static-to-dynamic apps.",
    link: "https://www.netlify.com/",
  },
  "DocDB (AWS MongoDB Alternative)": {
    description: "AWS managed MongoDB-compatible document database alternative.",
    uniqueness: "Combines familiar document APIs with AWS operational tooling.",
    link: "https://aws.amazon.com/documentdb/",
  },
  "GitHub Copilot Agent": {
    description: "Agent-style Copilot workflows for larger autonomous coding tasks.",
    uniqueness: "Moves beyond autocomplete into multi-step development execution.",
    link: "https://github.com/features/copilot",
  },
  "Gensoark AI (AI for PPT/PDF generation)": {
    description: "AI content generation workflow for polished presentations and documents.",
    uniqueness: "Rapidly turns ideas into shareable deck and PDF outputs.",
    link: "https://www.genspark.ai/",
  },
};

const TOOL_ICON_URLS = {
  "GitHub Copilot": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  Cursor: "https://icons.duckduckgo.com/ip3/cursor.com.ico",
  Codex: "https://icons.duckduckgo.com/ip3/openai.com.ico",
  "TRAE (Coding Agent)": "https://icons.duckduckgo.com/ip3/trae.ai.ico",
  "Agents.md": "https://icons.duckduckgo.com/ip3/agents.md.ico",
  "OpenClaw (Local AI Personal Agent)": "https://icons.duckduckgo.com/ip3/github.com.ico",
  "Ollama (Run LLMs Locally)": "https://icons.duckduckgo.com/ip3/ollama.com.ico",
  "Whisper (Audio to Text AI Model)": "https://icons.duckduckgo.com/ip3/openai.com.ico",
  "Roadmap.sh": "https://icons.duckduckgo.com/ip3/roadmap.sh.ico",
  "The Odin Project": "https://icons.duckduckgo.com/ip3/theodinproject.com.ico",
  "ByteByteGo (System Design)": "https://icons.duckduckgo.com/ip3/bytebytego.com.ico",
  "Interviewing.io": "https://icons.duckduckgo.com/ip3/interviewing.io.ico",
  "Daily.dev": "https://icons.duckduckgo.com/ip3/daily.dev.ico",
  AlternativeTo: "https://icons.duckduckgo.com/ip3/alternativeto.net.ico",
  Notion: "https://icons.duckduckgo.com/ip3/notion.so.ico",
  Obsidian: "https://icons.duckduckgo.com/ip3/obsidian.md.ico",
  tldraw: "https://icons.duckduckgo.com/ip3/tldraw.com.ico",
  Excalidraw: "https://icons.duckduckgo.com/ip3/excalidraw.com.ico",
  Miro: "https://icons.duckduckgo.com/ip3/miro.com.ico",
  "GitHub Profile README Generator": "https://icons.duckduckgo.com/ip3/github.io.ico",
  Codolio: "https://icons.duckduckgo.com/ip3/codolio.com.ico",
  "Gamma AI": "https://icons.duckduckgo.com/ip3/gamma.app.ico",
  MongoDB: "https://icons.duckduckgo.com/ip3/mongodb.com.ico",
  "DocDB (AWS DocumentDB)": "https://icons.duckduckgo.com/ip3/aws.amazon.com.ico",
  PostgreSQL: "https://icons.duckduckgo.com/ip3/postgresql.org.ico",
  "RAG (Retrieval Augmented Generation)": "https://icons.duckduckgo.com/ip3/pinecone.io.ico",
  "Hugging Face": "https://icons.duckduckgo.com/ip3/huggingface.co.ico",
  Figma: "https://icons.duckduckgo.com/ip3/figma.com.ico",
  Uiverse: "https://icons.duckduckgo.com/ip3/uiverse.io.ico",
  Vercel: "https://icons.duckduckgo.com/ip3/vercel.com.ico",
  Render: "https://icons.duckduckgo.com/ip3/render.com.ico",
  AWS: "https://icons.duckduckgo.com/ip3/aws.amazon.com.ico",
  Railway: "https://icons.duckduckgo.com/ip3/railway.app.ico",
  Streamlit: "https://icons.duckduckgo.com/ip3/streamlit.io.ico",
  Netlify: "https://icons.duckduckgo.com/ip3/netlify.com.ico",
  "DocDB (AWS MongoDB Alternative)": "https://icons.duckduckgo.com/ip3/aws.amazon.com.ico",
  "GitHub Copilot Agent": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  "Gensoark AI (AI for PPT/PDF generation)": "https://icons.duckduckgo.com/ip3/genspark.ai.ico",
};

const getSpecialToolIcon = (toolName) => TOOL_ICON_URLS[toolName] ?? "";
const getToolRoutePath = (toolName) => `/tools/${encodeURIComponent(toolName)}`;

export default function Home() {
  const navigate = useNavigate();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const sections = useMemo(
    () => [
      {
        title: "Coding Assistants & Coding Agents",
        icon: "🧠",
        tools: [
          "GitHub Copilot",
          "Cursor",
          "Codex",
          "TRAE (Coding Agent)",
          "Agents.md",
          "OpenClaw (Local AI Personal Agent)",
        ],
      },
      {
        title: "Learning Platforms",
        icon: "🎓",
        tools: [
          "Roadmap.sh",
          "ByteByteGo (System Design)",
          "The Odin Project",
          "Interviewing.io",
          "Daily.dev",
          "AlternativeTo",
        ],
      },
      {
        title: "Notes Tools",
        icon: "📝",
        tools: ["Notion", "Obsidian", "tldraw", "Excalidraw", "Miro"],
      },
      {
        title: "Productivity Tools",
        icon: "⚡",
        tools: ["Codolio", "Gamma AI", "GitHub Profile README Generator"],
      },
      {
        title: "Databases & Backend Tools",
        icon: "🗄️",
        tools: ["MongoDB", "DocDB (AWS DocumentDB)", "PostgreSQL"],
      },
      {
        title: "AI & LLM Ecosystem",
        icon: "🤖",
        tools: [
          "RAG (Retrieval Augmented Generation)",
          "Hugging Face",
          "Ollama (Run LLMs Locally)",
          "Whisper (Audio to Text AI Model)",
        ],
      },
      {
        title: "Design & UI Tools",
        icon: "🎨",
        tools: ["Figma", "Uiverse"],
      },
      {
        title: "Deployment Platforms",
        icon: "🚀",
        tools: ["Vercel", "Render", "AWS", "Railway", "Streamlit", "Netlify"],
      },
      {
        title: "Optional Extended AI / Development Ecosystem",
        icon: "🧩",
        tools: [
          "DocDB (AWS MongoDB Alternative)",
          "GitHub Copilot Agent",
          "Gensoark AI (AI for PPT/PDF generation)",
        ],
      },
    ],
    []
  );

  const allTools = useMemo(
    () => Array.from(new Set(sections.flatMap((section) => section.tools))),
    [sections]
  );

  const displayedTools = useMemo(() => {
    const sourceTools = activeCategoryIndex === null ? allTools : sections[activeCategoryIndex].tools;
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return sourceTools;
    }

    return allTools.filter((tool) => {
      const info = TOOL_INFO[tool];
      return (
        tool.toLowerCase().includes(query) ||
        info?.description?.toLowerCase().includes(query) ||
        info?.uniqueness?.toLowerCase().includes(query)
      );
    });
  }, [activeCategoryIndex, allTools, searchQuery, sections]);

  const hasActiveGlobalSearch = searchQuery.trim().length > 0;

  const primaryToolCategory = useMemo(() => {
    const categoryMap = {};

    sections.forEach((section) => {
      section.tools.forEach((tool) => {
        if (!categoryMap[tool]) {
          categoryMap[tool] = section.title;
        }
      });
    });

    return categoryMap;
  }, [sections]);

  const popularTags = ["AI", "Deployment", "Databases", "Frontend", "Backend"];

  const openToolsWithQuery = (query) => {
    setSearchQuery(query);
    setActiveCategoryIndex(null);
    navigate("/tools");
  };

  const ToolExploreRoute = () => {
    const { toolSlug } = useParams();

    const activeToolName = useMemo(() => {
      if (!toolSlug) {
        return null;
      }

      return (
        allTools.find((tool) => encodeURIComponent(tool) === toolSlug || tool === toolSlug) ?? null
      );
    }, [allTools, toolSlug]);

    if (!activeToolName) {
      return <Navigate to="/tools" replace />;
    }

    return (
      <section className="tool-explore-view" aria-label="Tool detail view">
        <button className="tool-explore-back" onClick={() => navigate("/tools")}>
          ← Back
        </button>

        <div className="tool-explore-header">
          {getSpecialToolIcon(activeToolName) ? (
            <img
              className="tool-explore-icon"
              src={getSpecialToolIcon(activeToolName)}
              alt={`${activeToolName} icon`}
              loading="lazy"
            />
          ) : (
            <div className="tool-explore-icon tool-explore-icon-fallback">🧰</div>
          )}

          <div className="tool-explore-meta">
            <div className="tool-explore-tags">
              <span>{primaryToolCategory[activeToolName] ?? "Tool"}</span>
              <span>Explore</span>
            </div>
            <h1>{activeToolName}</h1>
            <p>{TOOL_INFO[activeToolName]?.description}</p>

            <div className="tool-explore-actions">
              <a
                className="tool-explore-primary"
                href={TOOL_INFO[activeToolName]?.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website ↗
              </a>
              <button className="tool-explore-secondary" onClick={() => navigate("/tools")}>
                Back To Tools
              </button>
            </div>
          </div>
        </div>

        <div className="tool-explore-tabs" role="tablist" aria-label="Tool details tabs">
          <span className="active">Overview</span>
        </div>

        <div className="tool-explore-overview">
          <h3>Uniqueness</h3>
          <p>{TOOL_INFO[activeToolName]?.uniqueness}</p>
        </div>
      </section>
    );
  };

  return (
    <div className="home-container">
      <section className="home-top-shell" aria-label="Website header">
        <div className="home-brand-mark">TechEarth</div>
        <header className="home-top-nav">
          <nav className="home-nav-links" aria-label="Main routes">
            <NavLink to="/home" className={({ isActive }) => `home-nav-link ${isActive ? "active" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/tools" className={({ isActive }) => `home-nav-link ${isActive ? "active" : ""}`}>
              Tools
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) => `home-nav-link ${isActive ? "active" : ""}`}
            >
              Categories
            </NavLink>
          </nav>
        </header>
      </section>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route
          path="/home"
          element={
            <>
              <section className="home-hero">
                <h1 className="home-hero-title">
                  Explore <span>Tech Universe</span>
                </h1>
                <p className="home-subtitle">
                  Discover the next generation of tools, agents, and platforms designed to
                  supercharge your engineering workflow.
                </p>

                <div className="home-search-wrap">
                  <input
                    className="home-search-input"
                    type="text"
                    placeholder="Search for tools, categories, or keywords..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                  <button className="home-search-btn" onClick={() => openToolsWithQuery(searchQuery)}>
                    →
                  </button>
                </div>

                <div className="home-popular-row">
                  <span>POPULAR:</span>
                  {popularTags.map((tag) => (
                    <button key={tag} className="popular-chip" onClick={() => openToolsWithQuery(tag)}>
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="student-pack-prompt" role="note" aria-label="Student pack recommendation">
                  Every student is highly recommended to enable your GitHub Student Developer Pack
                  using your college mail ID.
                  <strong> Go down and follow the steps below.</strong>
                </div>
              </section>

              <section className="student-pack-note" role="note" aria-label="GitHub Student Pack guide">
                <h3>Important Note – GitHub Student Developer Pack Application Guide</h3>
                <p>
                  Students are encouraged to apply for the GitHub Student Developer Pack to access
                  premium developer tools and cloud credits.
                </p>

                <details className="student-guide-collapse">
                  <summary>View Full Application Steps</summary>

                  <p className="student-guide-title">Follow the official process carefully:</p>

                  <div className="student-guide-step">
                    <h4>🔹 Step 1: Create a GitHub Account</h4>
                    <ul>
                      <li>
                        Visit:
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                          github.com ↗
                        </a>
                      </li>
                      <li>Create a new account.</li>
                      <li>Preferably register using your college/university email address.</li>
                      <li>
                        If your account was created using a personal email, add your college email
                        in settings.
                      </li>
                    </ul>
                  </div>

                  <div className="student-guide-step">
                    <h4>🔹 Step 2: Add College Email</h4>
                    <ul>
                      <li>Go to Settings</li>
                      <li>Navigate to Emails</li>
                      <li>Add your official college email address</li>
                      <li>Verify the email from your inbox</li>
                    </ul>
                  </div>

                  <div className="student-guide-step">
                    <h4>🔹 Step 3: Complete Billing Profile</h4>
                    <ul>
                      <li>Go to Settings → Billing &amp; Licensing</li>
                      <li>Fill in required profile details</li>
                      <li>Ensure your information matches your academic records</li>
                    </ul>
                  </div>

                  <div className="student-guide-step">
                    <h4>🔹 Step 4: Apply for GitHub Education Benefits</h4>
                    <ul>
                      <li>
                        Visit:
                        <a
                          href="https://education.github.com/benefits"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          educational benefits ↗
                        </a>
                      </li>
                      <li>Click Get Student Benefits</li>
                      <li>Select your school/university</li>
                      <li>
                        Upload required documents (for example, student ID card or official proof
                        of enrollment)
                      </li>
                      <li>Fill all details accurately using real academic and location details.</li>
                    </ul>
                  </div>

                  <div className="student-guide-step">
                    <h4>🔹 Important Guidelines</h4>
                    <ul>
                      <li>Ensure all information provided is accurate and genuine.</li>
                      <li>Use official academic documents for verification.</li>
                      <li>Do not attempt to bypass verification systems.</li>
                      <li>Applications typically take up to 72 hours for review.</li>
                      <li>
                        If rejected, review the reason provided and reapply with clear
                        documentation.
                      </li>
                    </ul>
                  </div>

                  <div className="student-guide-step">
                    <h4>🔹 After Approval</h4>
                    <ul>
                      <li>Activate your GitHub Student benefits.</li>
                      <li>
                        Access tools like cloud credits, IDEs, hosting platforms, and developer
                        resources.
                      </li>
                      <li>Connect tools such as VS Code or other supported environments as needed.</li>
                    </ul>
                  </div>
                </details>

                <div className="student-disclaimer-highlight" aria-label="Important disclaimer">
                  <h4>⚠️ Disclaimer</h4>
                  <p>
                    This guide is for educational purposes only. Students must follow GitHub’s
                    official policies and verification process. Any misuse or submission of
                    incorrect information may lead to account suspension.
                  </p>
                  <a href="https://education.github.com/pack" target="_blank" rel="noopener noreferrer">
                    Open GitHub Student Developer Pack ↗
                  </a>
                </div>
              </section>

              <section className="credits-cartoon" aria-label="Credits">
                <p className="credits-label">Credits</p>
                <p className="credits-text">
                  V Harishwar, E SriCharan — Students of AI Department, Anurag University.
                </p>
              </section>
            </>
          }
        />

        <Route
          path="/tools"
          element={
            <div className="tools-layout">
              <aside className="category-sidebar" aria-label="Category sidebar">
                <h3>Filters</h3>
                <button
                  className={`category-filter ${activeCategoryIndex === null ? "active" : ""}`}
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategoryIndex(null);
                  }}
                >
                  All Categories
                </button>

                {sections.map((section, index) => (
                  <button
                    key={section.title}
                    className={`category-filter ${activeCategoryIndex === index ? "active" : ""}`}
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategoryIndex(index);
                    }}
                  >
                    {section.title}
                  </button>
                ))}
              </aside>

              <section className="tools-content">
                <div className="tools-top-bar">
                  <div className="tools-panel-header">
                    <span className="tools-panel-icon">
                      {hasActiveGlobalSearch
                        ? "🌐"
                        : activeCategoryIndex === null
                          ? "🧰"
                          : sections[activeCategoryIndex].icon}
                    </span>
                    <h2>
                      {hasActiveGlobalSearch
                        ? "Global Search Results"
                        : activeCategoryIndex === null
                          ? "All Tools"
                          : sections[activeCategoryIndex].title}
                    </h2>
                  </div>

                  <input
                    className="tools-search-input"
                    type="text"
                    placeholder="Quick search..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </div>

                <p className="home-subtitle">
                  {hasActiveGlobalSearch
                    ? `Showing ${displayedTools.length} tools matching "${searchQuery.trim()}" across all categories.`
                    : `Showing ${displayedTools.length} tools in this view.`}
                </p>

                <div className="tools-grid">
                  {displayedTools.map((tool) => {
                    const info = TOOL_INFO[tool];
                    const iconSrc = getSpecialToolIcon(tool);

                    return (
                      <article key={tool} className="tool-select-card">
                        <div className="tool-head">
                          {iconSrc ? (
                            <img
                              className="tool-icon"
                              src={iconSrc}
                              alt={`${tool} icon`}
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          ) : null}
                          <h3>
                            <a
                              className="tool-title-link"
                              href={info?.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(event) => event.stopPropagation()}
                            >
                              {tool}
                            </a>
                          </h3>
                        </div>
                        <p>{info?.description}</p>
                        <button
                          className="tool-explore-btn"
                          onClick={() => navigate(getToolRoutePath(tool))}
                        >
                          Explore
                        </button>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>
          }
        />

        <Route path="/tools/:toolSlug" element={<ToolExploreRoute />} />

        <Route
          path="/categories"
          element={
            <div className="section-grid">
              {sections.map((section, index) => (
                <button
                  key={section.title}
                  className="section-card"
                  onClick={() => {
                    setActiveCategoryIndex(index);
                    navigate("/tools");
                  }}
                >
                  <div className="section-icon">{section.icon}</div>
                  <h3>{section.title}</h3>
                  <p>{section.tools.length} tools</p>
                </button>
              ))}
            </div>
          }
        />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}
