"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { fileToImageURL, loadImageFromDataURL } from "@/lib/image-utils";
import { downloadBlob } from "@/lib/pdf-utils";
import { Loader2, FileImage } from "lucide-react";

export default function ImageToPdfPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConvert = async () => {
        if (files.length === 0) return;

        try {
            setIsProcessing(true);
            setError(null);

            const pdfDoc = await PDFDocument.create();

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                let imageToEmbed;
                const arrayBuffer = await file.arrayBuffer();

                // Check if JPG or PNG based on type, otherwise use Canvas to normalize to PNG first
                if (file.type === "image/jpeg" || file.type === "image/jpg") {
                    imageToEmbed = await pdfDoc.embedJpg(arrayBuffer);
                } else if (file.type === "image/png") {
                    imageToEmbed = await pdfDoc.embedPng(arrayBuffer);
                } else {
                    // Other types (e.g. WebP) -> convert to PNG ArrayBuffer via canvas
                    const dataUrl = await fileToImageURL(file);
                    const img = await loadImageFromDataURL(dataUrl);
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0);

                    const pngBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
                    if (!pngBlob) throw new Error("Canvas toBlob failed");

                    const newAb = await pngBlob.arrayBuffer();
                    imageToEmbed = await pdfDoc.embedPng(newAb);
                }

                // Add page matching exactly the dimensions of the image
                const page = pdfDoc.addPage([imageToEmbed.width, imageToEmbed.height]);
                page.drawImage(imageToEmbed, {
                    x: 0,
                    y: 0,
                    width: imageToEmbed.width,
                    height: imageToEmbed.height,
                });
            }

            const pdfBytes = await pdfDoc.save();
            downloadBlob(pdfBytes, `images_${Date.now()}.pdf`);

        } catch (err: any) {
            console.error(err);
            setError("An error occurred. Make sure all files are valid images.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Image to PDF</h1>
            <p className="text-gray-600 mb-8">Combine multiple images (JPG, PNG, WebP) into a single PDF document.</p>

            <FileUploadArea onFileSelect={setFiles} multiple accept="image/*" />

            {files.length > 0 && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-4">Images to combine ({files.length} pages)</h3>

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
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileImage className="w-5 h-5" />}
                        {isProcessing ? "Generating PDF..." : "Generate PDF Document"}
                    </button>
                </div>
            )}
        </div>
    );
}
