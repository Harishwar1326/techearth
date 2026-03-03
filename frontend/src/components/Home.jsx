import { useMemo, useState } from "react";

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
      "Whisper is an open-source speech recognition model developed by OpenAI, used for converting speech to text with high accuracy. Also runs locally for privacy-focused applications.",
    uniqueness:
      "Supports multiple languages, making it ideal for voice-enabled and multilingual applications. Also available on GitHub: https://github.com/openai/whisper",
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
    description: "Open AI platform for models, datasets, inference, and ML collaboration. Runs locally and in the cloud.",
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
  Notion: "https://icons.duckduckgo.com/ip3/notion.so.ico",
  Obsidian: "https://icons.duckduckgo.com/ip3/obsidian.md.ico",
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

export default function Home() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [activeToolName, setActiveToolName] = useState(null);

  const sections = useMemo(
    () => [
      {
        title: "Coding Assistants & AI Coding Agents",
        icon: "🧠",
        tools: [
          "GitHub Copilot",
          "Cursor",
          "Codex",
          "TRAE (Coding Agent)",
          "Agents.md",
          "OpenClaw (Local AI Personal Agent)",
          "Ollama (Run LLMs Locally)",
          "Whisper (Audio to Text AI Model)",
        ],
      },
      {
        title: "Learning Platforms & Roadmaps",
        icon: "📚",
        tools: [
          "Roadmap.sh",
          "The Odin Project",
          "ByteByteGo (System Design)",
          "Interviewing.io",
          "Daily.dev",
        ],
      },
      {
        title: "Notes & Productivity Tools",
        icon: "📝",
        tools: ["Notion", "Obsidian", "Codolio", "Gamma AI"],
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

  const activeCategory =
    activeCategoryIndex !== null ? sections[activeCategoryIndex] : null;

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Tech Earth ⚙️🚀</h1>
      <p className="home-subtitle">Select a section to explore its tool stack</p>

      {activeCategory ? (
        <div className="tools-panel">
          <button
            className="back-btn"
            onClick={() => {
              setActiveCategoryIndex(null);
              setActiveToolName(null);
            }}
          >
            ← Back to Sections
          </button>

          <div className="tools-panel-header">
            <span className="tools-panel-icon">{activeCategory.icon}</span>
            <h2>{activeCategory.title}</h2>
          </div>

          <div className="tools-grid">
            {activeCategory.tools.map((tool) => {
              const isActive = activeToolName === tool;
              const info = TOOL_INFO[tool];
              const iconSrc = getSpecialToolIcon(tool);

              return (
                <article
                  key={tool}
                  className={`tool-select-card ${isActive ? "active" : ""}`}
                  onClick={() => setActiveToolName(isActive ? null : tool)}
                >
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
                  <span>{isActive ? "Tap to collapse ↑" : "Tap to read details ↓"}</span>

                  <div className={`tool-inline-details ${isActive ? "show" : ""}`}>
                    <p className="tool-uniqueness">
                      <strong>Uniqueness:</strong> {info?.uniqueness}
                    </p>
                    <a
                      className="tool-link"
                      href={info?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Open Official Page ↗
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="section-grid">
          {sections.map((section, index) => (
            <button
              key={section.title}
              className="section-card"
              onClick={() => {
                setActiveCategoryIndex(index);
                setActiveToolName(null);
              }}
            >
              <div className="section-icon">{section.icon}</div>
              <h3>{section.title}</h3>
              <p>{section.tools.length} tools</p>
            </button>
          ))}
        </div>
      )}

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
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  github.com ↗
                </a>
              </li>
              <li>Create a new account.</li>
              <li>Preferably register using your college/university email address.</li>
              <li>
                If your account was created using a personal email, add your college email in
                settings.
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
                  onClick={(event) => event.stopPropagation()}
                >
                  educational benefits ↗
                </a>
              </li>
              <li>Click Get Student Benefits</li>
              <li>Select your school/university</li>
              <li>
                Upload required documents (for example, student ID card or official proof of
                enrollment)
              </li>
              <li>Fill all details accurately using real academic and location details.</li>
            </ul>
          </div>

          <div className="student-guide-step">
            <h4>🔹 Important Guidelines</h4>
            <ul>
              <li>Ensure all information provided is accurate and genuine.</li>
              <li>Use official academic documents for verification.</li>
              <li>Do not attempt to bypass verification systems or alter location data.</li>
              <li>Applications typically take up to 72 hours for review.</li>
              <li>
                If rejected, review the reason provided and reapply with clear documentation.
              </li>
            </ul>
          </div>

          <div className="student-guide-step">
            <h4>🔹 After Approval</h4>
            <ul>
              <li>Activate your GitHub Student benefits.</li>
              <li>
                Access tools like cloud credits, IDEs, hosting platforms, and developer resources.
              </li>
              <li>Connect tools such as VS Code or other supported environments as needed.</li>
            </ul>
          </div>
        </details>

        <div className="student-disclaimer-highlight" aria-label="Important disclaimer">
          <h4>⚠️ Disclaimer</h4>
          <p>
            This guide is for educational purposes only. Students must follow GitHub’s official
            policies and verification process. Any misuse or submission of incorrect information
            may lead to account suspension.
          </p>
          <a
            href="https://education.github.com/pack"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
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
    </div>
  );
}