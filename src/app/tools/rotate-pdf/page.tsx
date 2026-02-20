"use client";

import { useState } from "react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadBlob } from "@/lib/pdf-utils";
import { Loader2, RotateCw, RotateCcw } from "lucide-react";

export default function RotatePdfPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [queuedRotation, setQueuedRotation] = useState<number>(0);

    const handleFileSelect = (files: File[]) => {
        if (files.length > 0) {
            setFile(files[0]);
            setQueuedRotation(0);
        }
    };

    const handleRotate = async () => {
        if (!file || queuedRotation === 0) return;

        try {
            setIsProcessing(true);
            setError(null);

            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPages();

            for (const page of pages) {
                const currentRotation = page.getRotation().angle;
                // Apply queued rotation, normalize to 360
                const newRotation = (currentRotation + queuedRotation + 360) % 360;
                page.setRotation(degrees(newRotation));
            }

            const pdfBytes = await pdfDoc.save();
            downloadBlob(pdfBytes, `rotated_${Date.now()}.pdf`);

        } catch (err) {
            console.error(err);
            setError("An error occurred while rotating the PDF. Ensure it is valid and not password protected.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Rotate PDF</h1>
            <p className="text-gray-600 mb-8">Rotate all pages in your PDF document effortlessly directly in your browser.</p>

            <FileUploadArea onFileSelect={handleFileSelect} accept=".pdf" />

            {file && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected File</h3>
                    <p className="mb-6 text-sm text-gray-600 font-mono">{file.name}</p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <button
                            onClick={() => setQueuedRotation(r => r - 90)}
                            className="flex-1 py-3 px-4 flex items-center justify-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white font-medium text-gray-700"
                        >
                            <RotateCcw className="w-5 h-5 text-gray-600" /> Rotate Left (-90°)
                        </button>
                        <button
                            onClick={() => setQueuedRotation(r => r + 90)}
                            className="flex-1 py-3 px-4 flex items-center justify-center gap-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors bg-blue-50/50 font-medium text-blue-700 hover:border-blue-300"
                        >
                            <RotateCw className="w-5 h-5 text-blue-600" /> Rotate Right (+90°)
                        </button>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Total Rotation Applied:</span>
                        <span className="font-bold text-[#7B2D8E] text-lg">
                            {queuedRotation > 0 ? `+${queuedRotation}°` : `${queuedRotation}°`}
                        </span>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        onClick={handleRotate}
                        disabled={isProcessing || queuedRotation === 0}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing || queuedRotation === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                        {isProcessing ? "Processing..." : "Download Rotated PDF"}
                    </button>
                </div>
            )}
        </div>
    );
}
