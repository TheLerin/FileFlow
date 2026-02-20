import { ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer style={{
            width: '100%',
            background: 'transparent',
            marginTop: 'auto',
            position: 'relative',
            zIndex: 10
        }}>
            {/* Subtle top glow line */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-soft), transparent)' }} />

            <div style={{
                maxWidth: '1280px', margin: '0 auto',
                padding: '48px 24px',
                display: 'flex', flexDirection: 'column', gap: '32px',
            }}>
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                    {/* Brand */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        }}>
                            <Zap size={16} color="#fff" fill="#fff" />
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>FileFlow</span>
                    </Link>

                    {/* Privacy badge */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 20px', borderRadius: '999px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-soft)',
                        backdropFilter: 'blur(12px)'
                    }}>
                        <ShieldCheck size={16} color="var(--neon-cyan)" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--neon-cyan)' }}>100% Client-Side</span>
                        <div style={{ width: '1px', height: '14px', background: 'var(--border-mid)', margin: '0 4px' }} />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Zero server uploads</span>
                    </div>
                </div>

                {/* Bottom row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        © {new Date().getFullYear()} FileFlow. Designed for extreme privacy and performance.
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {['var(--neon-cyan)', 'var(--neon-blue)', 'var(--neon-violet)', 'var(--neon-pink)'].map((c, i) => (
                            <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c, boxShadow: `0 0 8px ${c}` }} />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
