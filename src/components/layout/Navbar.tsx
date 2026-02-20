import Link from "next/link";
import { Zap } from "lucide-react";

export default function Navbar() {
    return (
        <header style={{
            position: 'sticky', top: 0, zIndex: 50, width: '100%',
            background: 'rgba(8, 12, 20, 0.85)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
            <div style={{
                maxWidth: '1280px', margin: '0 auto',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 24px', height: '64px',
            }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, #2563eb, #4285F4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 20px -4px rgba(66, 133, 244, 0.6)',
                    }}>
                        <Zap size={18} color="#fff" fill="#fff" />
                    </div>
                    <div>
                        <span style={{
                            fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em',
                            background: 'linear-gradient(135deg, #f0f6ff 30%, #60a5fa)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>FileFlow</span>
                    </div>
                </Link>

                {/* Nav pills */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link href="/" style={{
                        padding: '7px 16px', borderRadius: '8px', fontSize: '0.82rem',
                        fontWeight: 600, color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none', letterSpacing: '0.01em',
                        transition: 'all 0.2s ease',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                        All Tools
                    </Link>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '6px 14px', borderRadius: '8px',
                        background: 'rgba(52, 168, 83, 0.10)',
                        border: '1px solid rgba(52, 168, 83, 0.25)',
                        fontSize: '0.75rem', fontWeight: 600,
                        color: '#4ade80', letterSpacing: '0.02em',
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
                        100% Private
                    </div>
                </nav>
            </div>
        </header>
    );
}
