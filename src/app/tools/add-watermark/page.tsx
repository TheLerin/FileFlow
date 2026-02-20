"use client";

import { useState } from "react";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadBlob } from "@/lib/pdf-utils";
import { Loader2, Droplet } from "lucide-react";

export default function AddWatermarkPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");

    const handleFileSelect = (files: File[]) => {
        if (files.length > 0) setFile(files[0]);
    };

    const handleApplyWatermark = async () => {
        if (!file || !watermarkText.trim()) return;

        try {
            setIsProcessing(true);
            setError(null);

            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
            const pages = pdfDoc.getPages();

            for (const page of pages) {
                const { width, height } = page.getSize();

                // Approximate size scaling assuming the text spans the page diagonally
                const textSize = 64;
                const textWidth = helveticaFont.widthOfTextAtSize(watermarkText, textSize);
                const textHeight = helveticaFont.heightAtSize(textSize);

                page.drawText(watermarkText, {
                    x: width / 2 - textWidth / 2,
                    y: height / 2 - textHeight / 2,
                    size: textSize,
                    font: helveticaFont,
                    color: rgb(0.5, 0.5, 0.5),
                    opacity: 0.3,
                    rotate: degrees(45),
                });
            }

            const pdfBytes = await pdfDoc.save();
            downloadBlob(pdfBytes, `watermarked_${Date.now()}.pdf`);

        } catch (err) {
            console.error(err);
            setError("An error occurred while adding the watermark. Ensure the PDF is valid and not password protected.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Add Watermark</h1>
            <p className="text-gray-600 mb-8">Stamp a text watermark diagonally across every page of your PDF.</p>

            <FileUploadArea onFileSelect={handleFileSelect} accept=".pdf" />

            {file && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected File</h3>
                    <p className="mb-6 text-sm text-gray-600 font-mono">{file.name}</p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Text</label>
                        <input
                            type="text"
                            value={watermarkText}
                            onChange={(e) => setWatermarkText(e.target.value)}
                            placeholder="e.g. CONFIDENTIAL"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7B2D8E] focus:border-transparent outline-none transition-shadow"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        onClick={handleApplyWatermark}
                        disabled={isProcessing || !watermarkText.trim()}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing || !watermarkText.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                        {isProcessing ? "Adding Watermark..." : "Stamp Watermark & Download"}
                    </button>
                </div>
            )}
        </div>
    );
}
