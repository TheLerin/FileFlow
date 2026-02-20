"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadBlob } from "@/lib/pdf-utils";
import { Loader2 } from "lucide-react";

export default function SplitPdfPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (files: File[]) => {
        if (files.length > 0) setFile(files[0]);
    };

    const handleSplit = async () => {
        if (!file) return;

        try {
            setIsProcessing(true);
            setError(null);

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const totalPages = pdf.getPageCount();

            if (totalPages === 1) {
                setError("This PDF only has 1 page. Nothing to split!");
                setIsProcessing(false);
                return;
            }

            const zip = new JSZip();

            for (let i = 0; i < totalPages; i++) {
                const newDoc = await PDFDocument.create();
                const [copiedPage] = await newDoc.copyPages(pdf, [i]);
                newDoc.addPage(copiedPage);

                const newBytes = await newDoc.save();
                const baseName = file.name.replace(/\.[^/.]+$/, "");
                zip.file(`${baseName}_page_${i + 1}.pdf`, newBytes);
            }

            const zipContent = await zip.generateAsync({ type: "uint8array" });
            downloadBlob(zipContent, `split_${Date.now()}.zip`, "application/zip");

        } catch (err) {
            console.error(err);
            setError("An error occurred while splitting the PDF. Ensure it is valid and not password protected.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Split PDF</h1>
            <p className="text-gray-600 mb-8">Extract every page of your PDF into separate files, bundled in a ZIP.</p>

            <FileUploadArea onFileSelect={handleFileSelect} accept=".pdf" />

            {file && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected File</h3>
                    <p className="mb-6 text-sm text-gray-600 font-mono">{file.name}</p>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        onClick={handleSplit}
                        disabled={isProcessing}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                        {isProcessing ? "Splitting & Zipping..." : "Split PDF Now"}
                    </button>
                </div>
            )}
        </div>
    );
}
