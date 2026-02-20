"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadBlob } from "@/lib/pdf-utils";
import { Loader2 } from "lucide-react";

export default function MergePdfPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleMerge = async () => {
        if (files.length < 2) {
            setError("Please select at least 2 PDF files to merge.");
            return;
        }

        try {
            setIsProcessing(true);
            setError(null);

            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedPdfBytes = await mergedPdf.save();
            downloadBlob(mergedPdfBytes, `merged_${Date.now()}.pdf`);

        } catch (err) {
            console.error(err);
            setError("An error occurred while merging the PDFs. Ensure they are valid and not password protected.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Merge PDF</h1>
            <p className="text-gray-600 mb-8">Combine multiple PDF files into one single document securely in your browser.</p>

            <FileUploadArea onFileSelect={setFiles} multiple accept=".pdf" />

            {files.length > 0 && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-4">Files to Merge ({files.length})</h3>
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
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing || files.length < 2 ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                        {isProcessing ? "Merging PDFs..." : "Merge PDFs Now"}
                    </button>
                </div>
            )}
        </div>
    );
}
