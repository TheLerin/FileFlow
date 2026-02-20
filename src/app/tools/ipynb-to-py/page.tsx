"use client";

import { useState } from "react";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadFileBlob } from "@/lib/image-utils";
import { Loader2, FileCode } from "lucide-react";

export default function IpynbToPyPage() {
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

                // Extract strictly code cells
                const scriptLines: string[] = [];

                notebook.cells.forEach((cell: any) => {
                    if (cell.cell_type === 'code') {
                        const source = Array.isArray(cell.source) ? cell.source.join("") : cell.source;
                        scriptLines.push(source);
                        scriptLines.push("\n\n");
                    }
                });

                const pyData = scriptLines.join("");
                const baseName = file.name.replace(/\.[^/.]+$/, "");
                const blob = new Blob([pyData], { type: "text/x-python;charset=utf-8;" });

                downloadFileBlob(blob, `${baseName}.py`);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">IPYNB to Python</h1>
            <p className="text-gray-600 mb-8">Unpack Jupyter Notebooks and extract a clean, raw `.py` script containing only the executable code blocks.</p>

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
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#4285F4] hover:bg-[#3367D6]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileCode className="w-5 h-5" />}
                        {isProcessing ? "Extracting script..." : "Extract to .py"}
                    </button>
                </div>
            )}
        </div>
    );
}
