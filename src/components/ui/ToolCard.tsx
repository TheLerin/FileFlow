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
        <Link
            href={href}
            className="group flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#4285F4] hover:shadow-md active:scale-[0.98]"
        >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-[#4285F4] transition-colors group-hover:bg-[#4285F4]/10">
                <Icon size={32} strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-center text-sm text-gray-500 line-clamp-2">{description}</p>
        </Link>
    );
}
