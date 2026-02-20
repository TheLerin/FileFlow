import Link from "next/link";
import { Zap } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7B2D8E] to-[#E91E63]">
                        <Zap className="h-5 w-5 text-white animate-pulse" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-[#7B2D8E] transition-colors">
                        FileFlow
                    </span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link href="/" className="text-sm font-medium text-gray-600 hover:text-[#7B2D8E]">
                        All Tools
                    </Link>
                    <div className="text-sm font-medium text-gray-400">
                        100% Client-Side Privacy
                    </div>
                </nav>
            </div>
        </header>
    );
}
