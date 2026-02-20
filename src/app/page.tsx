import { TOOLS } from "@/lib/constants";
import ToolCard from "@/components/ui/ToolCard";
import { FileLock2, ShieldCheck, Zap } from "lucide-react";

const SECTION_COLORS: Record<string, string> = {
  "PDF Utilities": "var(--neon-violet)",
  "Image Utilities": "var(--neon-pink)",
  "Office & Data Utilities": "var(--neon-cyan)",
  "Developer & Data Science": "var(--neon-blue)",
};

const SECTIONS = [
  {
    label: "PDF Utilities",
    filter: (id: string) => id.includes("pdf") || id === "add-watermark",
  },
  {
    label: "Image Utilities",
    filter: (id: string) =>
      !id.includes("pdf") &&
      id !== "add-watermark" &&
      !["excel-to-csv", "excel-to-json", "csv-to-excel", "docx-to-txt", "docx-to-html",
        "code-to-pdf", "code-to-image", "ipynb-to-pdf", "ipynb-to-html", "ipynb-to-md", "ipynb-to-py", "merge-ipynb"
      ].includes(id),
  },
  {
    label: "Office & Data Utilities",
    filter: (id: string) =>
      ["excel-to-csv", "excel-to-json", "csv-to-excel", "docx-to-txt", "docx-to-html"].includes(id),
  },
  {
    label: "Developer & Data Science",
    filter: (id: string) =>
      ["code-to-pdf", "code-to-image", "ipynb-to-pdf", "ipynb-to-html", "ipynb-to-md", "ipynb-to-py", "merge-ipynb"].includes(id),
  },
];

export default function Home() {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>

      {/* ── HERO ── */}
      <section style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: "120px 24px 80px",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      }}>

        {/* Top badge */}
        <div className="hero-badge fade-in-up" style={{ animationDelay: '0ms' }}>
          <Zap size={14} color="var(--neon-cyan)" />
          <span className="gradient-text-blue">The Ultimate Local-First Toolset</span>
        </div>

        {/* Headline */}
        <h1 className="fade-in-up" style={{
          fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          maxWidth: "1000px",
          color: "var(--text-primary)",
          marginBottom: "24px",
          animationDelay: '100ms'
        }}>
          Everything you need.<br />
          <span className="gradient-text-elite">Nothing leaves your device.</span>
        </h1>

        {/* Subtext */}
        <p className="fade-in-up" style={{
          fontSize: "1.2rem",
          color: "var(--text-secondary)",
          maxWidth: "600px",
          lineHeight: 1.6,
          fontWeight: 400,
          marginBottom: "48px",
          animationDelay: '200ms'
        }}>
          An ultra-fast suite of over 30 utilities to convert, compress, merge, and extract data — instantly running inside your browser.
        </p>

        {/* Stats row */}
        <div className="fade-in-up" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", animationDelay: '300ms' }}>
          {[
            { icon: <ShieldCheck size={16} />, label: "100% Client-Side", color: "var(--neon-cyan)" },
            { icon: <FileLock2 size={16} />, label: "Zero Server Uploads", color: "var(--neon-violet)" },
            { icon: <Zap size={16} />, label: "Instant Execution", color: "var(--neon-pink)" },
          ].map(({ icon, label, color }, i) => (
            <div key={i} className="stat-pill">
              <span style={{ color }}>{icon}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>

        {/* Hero gradient line */}
        <div className="fade-in-up" style={{
          marginTop: "80px",
          width: "100%", maxWidth: "800px", height: "1px",
          background: "linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-violet), var(--neon-pink), transparent)",
          opacity: 0.5,
          animationDelay: '400ms'
        }} />
      </section>

      {/* ── TOOL SECTIONS (BENTO STYLE) ── */}
      <div className="fade-in-up" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px 100px", animationDelay: '500ms' }}>
        {SECTIONS.map(({ label, filter }) => {
          const tools = TOOLS.filter(t => filter(t.id));
          const accentColor = SECTION_COLORS[label] || "var(--neon-violet)";
          return (
            <section key={label} style={{ marginBottom: "80px" }}>
              {/* Section header modified for dark space */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px", paddingLeft: "8px" }}>
                <div style={{
                  width: "10px", height: "10px", borderRadius: "50%",
                  background: accentColor,
                  boxShadow: `0 0 16px 4px ${accentColor}80`,
                  flexShrink: 0,
                }} />
                <h2 style={{
                  fontSize: "1.1rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                }}>
                  {label}
                </h2>
                <div style={{
                  flex: 1, height: "1px",
                  background: `linear-gradient(90deg, rgba(255,255,255,0.1), transparent)`,
                }} />
                <span style={{
                  fontSize: "0.8rem", color: "var(--text-muted)",
                  fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em"
                }}>
                  {tools.length} Tools
                </span>
              </div>

              {/* Bento Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}>
                {tools.map(tool => (
                  <ToolCard key={tool.id} {...tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
