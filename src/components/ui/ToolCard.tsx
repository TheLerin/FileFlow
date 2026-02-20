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
        <Link href={href} className="tool-card" style={{ textDecoration: 'none' }}>
            <div className="icon-wrap">
                <Icon size={24} strokeWidth={2} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </Link>
    );
}
