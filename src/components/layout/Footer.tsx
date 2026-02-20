import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white py-8 mt-auto">
            <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">

                <div className="flex items-center gap-2 text-gray-700">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-sm">100% Client-Side.</span>
                    <span className="text-sm text-gray-500">No servers. Total privacy.</span>
                </div>

                <div className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} File Conversion Utility. All processing runs locally in your browser.
                </div>

            </div>
        </footer>
    );
}
