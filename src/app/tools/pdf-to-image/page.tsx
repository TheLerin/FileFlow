"use client";

import { useState } from "react";
import JSZip from "jszip";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadFileBlob } from "@/lib/image-utils";
import { Loader2, Image as ImageIcon } from "lucide-react";

export default function PdfToImagePage() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (files: File[]) => {
        if (files.length > 0) setFile(files[0]);
    };

    const handleConvert = async () => {
        if (!file) return;

        try {
            setIsProcessing(true);
            setError(null);

            const arrayBuffer = await file.arrayBuffer();

            const pdfjsLib = await import("pdfjs-dist");
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdfDoc = await loadingTask.promise;
            const numPages = pdfDoc.numPages;

            const zip = new JSZip();

            for (let i = 1; i <= numPages; i++) {
                const page = await pdfDoc.getPage(i);

                // Define scale (higher scale = better quality image export)
                const viewport = page.getViewport({ scale: 2.0 });

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) throw new Error("Canvas context is null");

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                } as any;

                await page.render(renderContext).promise;

                const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
                if (!blob) throw new Error("Canvas failed to create Blob");

                const baseName = file.name.replace(/\.[^/.]+$/, "");
                zip.file(`${baseName}_page_${i}.jpg`, blob);
            }

            const zipContent = await zip.generateAsync({ type: "uint8array" });
            downloadFileBlob(new Blob([zipContent as any], { type: "application/zip" }), `images_${Date.now()}.zip`);

        } catch (err: any) {
            console.error(err);
            setError("An error occurred. Ensure the PDF is not password protected or corrupted.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">PDF to Image</h1>
            <p className="text-gray-600 mb-8">Extract every page of your PDF perfectly rendered into an image file.</p>

            <FileUploadArea onFileSelect={handleFileSelect} accept=".pdf" />

            {file && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected File (to render as JPGs)</h3>
                    <p className="mb-6 text-sm text-gray-600 font-mono">{file.name}</p>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                        {isProcessing ? "Rendering Pages..." : "Extract Images to ZIP"}
                    </button>
                </div>
            )}
        </div>
    );
}
