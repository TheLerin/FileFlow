import { TOOLS } from "@/lib/constants";
import ToolCard from "@/components/ui/ToolCard";
import { FileLock2, ShieldCheck, Zap } from "lucide-react";

const SECTION_COLORS: Record<string, string> = {
  "PDF Utilities": "#4285F4",
  "Image Utilities": "#EA4335",
  "Office & Data Utilities": "#FBBC05",
  "Developer & Data Science": "#34A853",
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
        padding: "80px 24px 64px",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      }}>

        {/* Top badge */}
        <div className="hero-badge">
          <Zap size={11} />
          <span>Client-Side · Zero Uploads · Instant Processing</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          maxWidth: "820px",
          color: "#f0f6ff",
          marginBottom: "20px",
        }}>
          The{" "}
          <span className="gradient-text-google">professional toolkit</span>
          {" "}for all your files.
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "1.05rem",
          color: "rgba(255,255,255,0.45)",
          maxWidth: "560px",
          lineHeight: 1.7,
          fontWeight: 400,
          marginBottom: "40px",
        }}>
          Convert, compress, merge, extract — entirely on your device.
          <br />Zero data leaves your browser. Ever.
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: <ShieldCheck size={14} />, label: "30+ tools", accent: "#4285F4" },
            { icon: <FileLock2 size={14} />, label: "No server uploads", accent: "#34A853" },
            { icon: <Zap size={14} />, label: "Instant results", accent: "#FBBC05" },
          ].map(({ icon, label, accent }, i) => (
            <div key={i} className="stat-pill" style={{ borderColor: `${accent}30`, background: `${accent}0D`, color: accent }}>
              {icon}
              <strong style={{ color: accent }}>{label}</strong>
            </div>
          ))}
        </div>

        {/* Hero gradient line */}
        <div style={{
          marginTop: "56px",
          width: "100%", maxWidth: "600px", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(66,133,244,0.4), rgba(234,67,53,0.3), rgba(251,188,5,0.3), rgba(52,168,83,0.3), transparent)",
        }} />
      </section>

      {/* ── TOOL SECTIONS ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 80px" }}>
        {SECTIONS.map(({ label, filter }) => {
          const tools = TOOLS.filter(t => filter(t.id));
          const accent = SECTION_COLORS[label] || "#4285F4";
          return (
            <section key={label} style={{ marginBottom: "56px" }}>
              {/* Section header */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: accent,
                  boxShadow: `0 0 12px 3px ${accent}60`,
                  flexShrink: 0,
                }} />
                <h2 style={{
                  fontSize: "0.8rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  whiteSpace: "nowrap",
                }}>
                  {label}
                </h2>
                <div style={{
                  flex: 1, height: "1px",
                  background: `linear-gradient(90deg, ${accent}30, transparent)`,
                }} />
                <span style={{
                  fontSize: "0.72rem", color: "rgba(255,255,255,0.2)",
                  fontWeight: 500,
                }}>
                  {tools.length} tools
                </span>
              </div>

              {/* Tool grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "16px",
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
