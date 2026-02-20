import { ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer style={{
            width: '100%',
            background: 'rgba(8,12,20,0.95)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            marginTop: 'auto',
        }}>
            <div style={{
                maxWidth: '1280px', margin: '0 auto',
                padding: '32px 24px',
                display: 'flex', flexDirection: 'column', gap: '24px',
            }}>
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    {/* Brand */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                        <div style={{
                            width: '28px', height: '28px', borderRadius: '8px',
                            background: 'linear-gradient(135deg, #2563eb, #4285F4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Zap size={14} color="#fff" fill="#fff" />
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '-0.01em' }}>FileFlow</span>
                    </Link>

                    {/* Privacy badge */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '7px 16px', borderRadius: '999px',
                        background: 'rgba(52,168,83,0.08)',
                        border: '1px solid rgba(52,168,83,0.25)',
                    }}>
                        <ShieldCheck size={15} color="#4ade80" />
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4ade80' }}>100% Client-Side</span>
                        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>· Zero server uploads · Total privacy</span>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />

                {/* Bottom row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
                        © {new Date().getFullYear()} FileFlow. All file processing runs locally in your browser.
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map((c, i) => (
                            <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c, opacity: 0.7 }} />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
