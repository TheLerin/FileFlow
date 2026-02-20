"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

export default function Navbar() {
    return (
        <div style={{
            position: 'fixed', top: '24px', left: 0, right: 0, zIndex: 50,
            display: 'flex', justifyContent: 'center', pointerEvents: 'none',
            padding: '0 16px'
        }}>
            <header style={{
                pointerEvents: 'auto',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(24px) saturate(200%)',
                WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                border: '1px solid var(--border-soft)',
                boxShadow: '0 8px 32px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                borderRadius: '999px',
                padding: '8px 20px',
                display: 'flex', alignItems: 'center', gap: '32px',
                width: '100%', maxWidth: '800px',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginRight: 'auto' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 20px -5px var(--glow-violet)',
                    }}>
                        <Zap size={16} color="#fff" fill="#fff" />
                    </div>
                    <span className="gradient-text-elite" style={{
                        fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em',
                    }}>FileFlow</span>
                </Link>

                {/* Nav pills */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link href="/" style={{
                        padding: '8px 16px', borderRadius: '999px', fontSize: '0.85rem',
                        fontWeight: 600, color: 'var(--text-primary)',
                        textDecoration: 'none', letterSpacing: '0.01em',
                        transition: 'all 0.3s ease',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid transparent',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                            e.currentTarget.style.borderColor = 'transparent';
                        }}
                    >
                        Tools
                    </Link>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px 16px', borderRadius: '999px',
                        background: 'rgba(6, 182, 212, 0.1)',
                        border: '1px solid rgba(6, 182, 212, 0.25)',
                        fontSize: '0.8rem', fontWeight: 600,
                        color: 'var(--neon-cyan)', letterSpacing: '0.02em',
                        boxShadow: '0 0 15px -5px var(--glow-cyan)'
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-cyan)', display: 'inline-block', boxShadow: '0 0 8px var(--neon-cyan)' }}></span>
                        100% Private
                    </div>
                </nav>
            </header>
        </div>
    );
}
