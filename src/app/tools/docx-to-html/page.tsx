"use client";

import { useState } from "react";
import * as mammoth from "mammoth";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadFileBlob } from "@/lib/image-utils";
import { Loader2, CodeXml } from "lucide-react";

export default function DocxToHtmlPage() {
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

                const arrayBuffer = await file.arrayBuffer();

                // mammoth neatly converts paragraph, bold, italic styles into web semantic HTML
                const result = await mammoth.convertToHtml({ arrayBuffer });

                // Wrap with a basic HTML5 boilerplate for offline direct-viewing
                const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>${file.name}</title>
   <style>
       body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; }
       p { margin-bottom: 1rem; }
       h1, h2, h3 { color: #111; }
   </style>
</head>
<body>
   ${result.value}
</body>
</html>`;

                const baseName = file.name.replace(/\.[^/.]+$/, "");
                const blob = new Blob([htmlTemplate], { type: "text/html;charset=utf-8;" });

                downloadFileBlob(blob, `${baseName}.html`);
            }

        } catch (err: any) {
            console.error(err);
            setError("An error occurred. Ensure the selected files are valid DOCX files.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">DOCX to HTML</h1>
            <p className="text-gray-600 mb-8">Convert heavy Microsoft Word formatting into clean, semantic Web HTML5 markup instantly.</p>

            <FileUploadArea onFileSelect={setFiles} multiple accept=".docx" />

            {files.length > 0 && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-4">Files to Convert ({files.length})</h3>
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
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CodeXml className="w-5 h-5" />}
                        {isProcessing ? "Generating HTML..." : "Convert to HTML"}
                    </button>
                </div>
            )}
        </div>
    );
}
