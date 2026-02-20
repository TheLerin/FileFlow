"use client";

import { useState } from "react";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadFileBlob } from "@/lib/image-utils";
import { Loader2, Globe } from "lucide-react";
import { marked } from "marked";

export default function IpynbToHtmlPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConvert = async () => {
        if (files.length === 0) return;

        try {
            setIsProcessing(true);
            setError(null);

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                const text = await file.text();
                const notebook = JSON.parse(text);

                if (!notebook.cells || !Array.isArray(notebook.cells)) {
                    throw new Error("Invalid .ipynb format.");
                }

                const mdLines: string[] = [];

                notebook.cells.forEach((cell: any) => {
                    const source = Array.isArray(cell.source) ? cell.source.join("") : cell.source;
                    if (cell.cell_type === 'markdown') {
                        mdLines.push(source);
                        mdLines.push("\n\n");
                    } else if (cell.cell_type === 'code') {
                        mdLines.push("```python\n");
                        mdLines.push(source);
                        mdLines.push("\n```\n\n");
                    }
                });

                const mdData = mdLines.join("");
                // Parse markdown immediately into raw HTML
                const htmlContent = marked.parse(mdData);

                const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${file.name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; line-height: 1.6; padding: 40px; max-w-4xl; margin: 0 auto; color: #333; }
    pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; }
    code { font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; font-size: 85%; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

                const baseName = file.name.replace(/\.[^/.]+$/, "");
                const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8;" });

                downloadFileBlob(blob, `${baseName}.html`);
            }

        } catch (err: any) {
            console.error(err);
            setError("An error occurred. Ensure the selected files are valid Jupyter Notebooks (.ipynb).");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">IPYNB to HTML</h1>
            <p className="text-gray-600 mb-8">Export Jupyter notebooks perfectly wrapped into styled offline webpages naturally.</p>

            <FileUploadArea onFileSelect={setFiles} multiple accept=".ipynb" />

            {files.length > 0 && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-4">Notebooks to Extract ({files.length})</h3>
                    <ul className="mb-6 space-y-2 max-h-48 overflow-y-auto">
                        {files.map((file, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">{index + 1}</span>
                                {file.name}
                            </li>
                        ))}
                    </ul>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#EA4335] hover:bg-[#D53F32]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Globe className="w-5 h-5" />}
                        {isProcessing ? "Rendering HTML..." : "Convert to HTML"}
                    </button>
                </div>
            )}
        </div>
    );
}
