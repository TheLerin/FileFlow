import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
}

export default function ToolCard({ title, description, href, icon: Icon }: ToolCardProps) {
    return (
        <Link href={href} className="tool-card animated-border" style={{ textDecoration: 'none' }}>
            <div className="icon-wrap">
                <Icon size={28} strokeWidth={1.8} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>

            {/* Bottom accent line */}
            <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: '50%', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(66,133,244,0.5), transparent)',
                opacity: 0, transition: 'opacity 0.3s ease',
            }} />
        </Link>
    );
}
