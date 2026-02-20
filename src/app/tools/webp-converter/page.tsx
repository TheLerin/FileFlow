"use client";

import { useState } from "react";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { fileToImageURL, loadImageFromDataURL, downloadFileBlob } from "@/lib/image-utils";
import { Loader2, Repeat } from "lucide-react";

export default function WebpConverterPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [targetFormat, setTargetFormat] = useState<"image/jpeg" | "image/png">("image/png");

    const handleConvert = async () => {
        if (files.length === 0) return;

        try {
            setIsProcessing(true);
            setError(null);

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Convert to data url to load into canvas
                const dataUrl = await fileToImageURL(file);
                const img = await loadImageFromDataURL(dataUrl);

                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");

                if (!ctx) throw new Error("Canvas context failed.");
                ctx.drawImage(img, 0, 0);

                const extension = targetFormat === "image/jpeg" ? "jpg" : "png";

                canvas.toBlob((blob) => {
                    if (blob) {
                        const baseName = file.name.replace(/\.[^/.]+$/, "");
                        downloadFileBlob(blob, `${baseName}.${extension}`);
                    }
                }, targetFormat, targetFormat === "image/jpeg" ? 0.95 : 1);
            }

        } catch (err: any) {
            console.error(err);
            setError("An error occurred. Ensure the selected files are valid image files.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">WebP Converter</h1>
            <p className="text-gray-600 mb-8">Convert next-gen WebP images backward into standard PNG or JPG files.</p>

            <FileUploadArea onFileSelect={setFiles} multiple accept="image/webp" />

            {files.length > 0 && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Files to Convert ({files.length})</h3>

                    <div className="mb-6 flex items-center gap-4 border-b pb-6">
                        <span className="text-sm font-medium text-gray-700">Convert to:</span>
                        <select
                            value={targetFormat}
                            onChange={(e) => setTargetFormat(e.target.value as any)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B2D8E] outline-none"
                        >
                            <option value="image/png">PNG (Preserves Transparency)</option>
                            <option value="image/jpeg">JPG (Smaller Size)</option>
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Repeat className="w-5 h-5" />}
                        {isProcessing ? "Converting..." : "Download Converted Images"}
                    </button>
                </div>
            )}
        </div>
    );
}
