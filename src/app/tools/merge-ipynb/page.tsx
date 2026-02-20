"use client";

import { useState } from "react";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadFileBlob } from "@/lib/image-utils";
import { Loader2, Merge } from "lucide-react";

export default function MergeIpynbPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleMerge = async () => {
        if (files.length < 2) {
            setError("Please upload at least two notebooks to merge.");
            return;
        }

        try {
            setIsProcessing(true);
            setError(null);

            let mergedNotebook: any = null;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const text = await file.text();
                const notebook = JSON.parse(text);

                if (!notebook.cells || !Array.isArray(notebook.cells)) {
                    throw new Error(`Invalid .ipynb format in file: ${file.name}`);
                }

                if (i === 0) {
                    // Use the first notebook as the base architecture foundation
                    mergedNotebook = notebook;
                    // Add a markdown cell to mark the merge point
                    mergedNotebook.cells.push({
                        cell_type: "markdown",
                        metadata: {},
                        source: [`# Merged from: ${file.name}`]
                    });
                } else {
                    // Append subsequent cells
                    mergedNotebook.cells.push({
                        cell_type: "markdown",
                        metadata: {},
                        source: [`# Merged from: ${file.name}`]
                    });
                    mergedNotebook.cells.push(...notebook.cells);
                }
            }

            const mergedJson = JSON.stringify(mergedNotebook, null, 2);
            const blob = new Blob([mergedJson], { type: "application/json;charset=utf-8;" });

            downloadFileBlob(blob, `merged_notebook_${Date.now()}.ipynb`);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred during merging.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Merge Notebooks</h1>
            <p className="text-gray-600 mb-8">Combine multiple `.ipynb` notebooks sequentially into one single master notebook instantly.</p>

            <FileUploadArea onFileSelect={setFiles} multiple accept=".ipynb" />

            {files.length > 0 && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-4">Notebooks to Merge ({files.length})</h3>
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
                        onClick={handleMerge}
                        disabled={isProcessing || files.length < 2}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing || files.length < 2 ? "bg-gray-400 cursor-not-allowed" : "bg-[#FBBC05] hover:bg-[#D5A004]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Merge className="w-5 h-5" />}
                        {isProcessing ? "Merging JSON blocks..." : "Merge Notebooks"}
                    </button>
                </div>
            )}
        </div>
    );
}
