"use client";

import { useState } from "react";
import * as mammoth from "mammoth";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadFileBlob } from "@/lib/image-utils";
import { Loader2, FileText } from "lucide-react";

export default function DocxToTxtPage() {
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

                // mammoth safely extracts just the text string avoiding complex internal word xml
                const result = await mammoth.extractRawText({ arrayBuffer });
                const text = result.value;

                const baseName = file.name.replace(/\.[^/.]+$/, "");
                const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });

                downloadFileBlob(blob, `${baseName}.txt`);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">DOCX to TXT</h1>
            <p className="text-gray-600 mb-8">Pull the raw semantic text content cleanly out of Microsoft Word documents.</p>

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
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                        {isProcessing ? "Extracting..." : "Extract to TXT"}
                    </button>
                </div>
            )}
        </div>
    );
}
