"use client";

import { useState, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import html2canvas from "html2canvas";
import { downloadFileBlob, getProcessableImageUrl } from "@/lib/image-utils";
import { Loader2, Image as ImageIcon } from "lucide-react";
import FileUploadArea from "@/components/ui/FileUploadArea";

export default function CodeToImagePage() {
    const [code, setCode] = useState<string>("function helloWorld() {\n  console.log('Hello, world!');\n}");
    const [language, setLanguage] = useState<string>("javascript");
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const previewRef = useRef<HTMLDivElement>(null);

    const handleFileSelect = async (files: File[]) => {
        if (files.length > 0) {
            try {
                const text = await files[0].text();
                setCode(text);

                // Auto-detect basic extension
                const ext = files[0].name.split('.').pop()?.toLowerCase();
                const langMap: Record<string, string> = {
                    'js': 'javascript', 'ts': 'typescript', 'py': 'python',
                    'java': 'java', 'c': 'c', 'cpp': 'cpp', 'html': 'html', 'css': 'css',
                    'json': 'json', 'md': 'markdown', 'sh': 'bash'
                };
                if (ext && langMap[ext]) {
                    setLanguage(langMap[ext]);
                }
            } catch (err) {
                setError("Failed to read text file.");
            }
        }
    };

    const handleExport = async () => {
        if (!previewRef.current) return;

        try {
            setIsProcessing(true);
            setError(null);

            // Rasterize the DOM node exactly as shown
            const canvas = await html2canvas(previewRef.current, {
                scale: 2, // High DPI for crisp text
                useCORS: true,
                backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
            });

            const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
            if (blob) {
                downloadFileBlob(blob, `code-snippet_${Date.now()}.png`);
            }

        } catch (err: any) {
            console.error(err);
            setError("An error occurred generating the image.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-5xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Code to Image</h1>
            <p className="text-gray-600 mb-8">Generate beautiful, crisp syntax-highlighted pictures of your code natively in the browser.</p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Controls */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    <FileUploadArea onFileSelect={handleFileSelect} accept=".txt,.js,.ts,.py,.java,.c,.cpp,.html,.css,.json,.md,.sh" />

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B2D8E] outline-none"
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="typescript">TypeScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="c">C</option>
                                <option value="cpp">C++</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="json">JSON</option>
                                <option value="bash">Bash</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Theme</label>
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setTheme("light")}
                                    className={`px-3 py-1 text-sm rounded-md transition-all ${theme === "light" ? "bg-white shadow-sm font-medium" : "text-gray-500 hover:text-gray-700"}`}
                                >Light</button>
                                <button
                                    onClick={() => setTheme("dark")}
                                    className={`px-3 py-1 text-sm rounded-md transition-all ${theme === "dark" ? "bg-gray-800 text-white shadow-sm font-medium" : "text-gray-500 hover:text-gray-700"}`}
                                >Dark</button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="lineNumbers"
                                checked={showLineNumbers}
                                onChange={(e) => setShowLineNumbers(e.target.checked)}
                                className="mr-2 accent-[#7B2D8E]"
                            />
                            <label htmlFor="lineNumbers" className="text-sm text-gray-700">Show Line Numbers</label>
                        </div>

                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B2D8E] outline-none font-mono text-xs"
                            placeholder="Paste your code here..."
                        />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            onClick={handleExport}
                            disabled={isProcessing || !code.trim()}
                            className={`w-full py-3 mt-2 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing || !code.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-[#4285F4] hover:bg-[#3367D6]"
                                }`}
                        >
                            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                            {isProcessing ? "Rendering..." : "Export as PNG"}
                        </button>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="w-full lg:w-2/3 bg-gray-50 border border-gray-200 rounded-xl p-8 flex items-center justify-center overflow-auto">
                    <div
                        ref={previewRef}
                        className="min-w-full max-w-full inline-block rounded-lg shadow-lg overflow-hidden"
                        style={{ padding: '20px', backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff' }}
                    >
                        <SyntaxHighlighter
                            language={language}
                            style={theme === 'dark' ? vscDarkPlus : vs as any}
                            showLineNumbers={showLineNumbers}
                            customStyle={{ margin: 0, background: 'transparent', padding: 0 }}
                        >
                            {code}
                        </SyntaxHighlighter>
                    </div>
                </div>

            </div>
        </div>
    );
}
