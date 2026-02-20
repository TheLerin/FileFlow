"use client";

import { useState } from "react";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { getProcessableImageUrl, loadImageFromDataURL, downloadFileBlob } from "@/lib/image-utils";
import { Loader2, Minimize2 } from "lucide-react";

export default function CompressImagePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quality, setQuality] = useState<number>(70);

    const handleConvert = async () => {
        if (files.length === 0) return;

        try {
            setIsProcessing(true);
            setError(null);

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                const dataUrl = await getProcessableImageUrl(file);
                const img = await loadImageFromDataURL(dataUrl);

                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");

                if (!ctx) throw new Error("Canvas context failed.");
                ctx.drawImage(img, 0, 0);

                // Convert to quality scale 0.0 to 1.0 using standard JPEG compression
                canvas.toBlob((blob) => {
                    if (blob) {
                        const baseName = file.name.replace(/\.[^/.]+$/, "");
                        downloadFileBlob(blob, `${baseName}_compress.jpg`);
                    }
                }, "image/jpeg", quality / 100);
            }

        } catch (err: any) {
            console.error(err);
            setError("An error occurred during compression.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Compress Image</h1>
            <p className="text-gray-600 mb-8">Reduce the file size of your images via JPEG compression locally.</p>

            <FileUploadArea onFileSelect={setFiles} multiple accept="image/*" />

            {files.length > 0 && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected Files ({files.length})</h3>

                    <div className="mb-6 border-b pb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Compression Quality: <span className="font-bold text-[#7B2D8E]">{quality}%</span>
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={quality}
                            onChange={(e) => setQuality(Number(e.target.value))}
                            className="w-full accent-[#7B2D8E]"
                        />
                        <p className="text-xs text-gray-500 mt-2 flex justify-between">
                            <span>Smallest File</span>
                            <span>Highest Quality</span>
                        </p>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Minimize2 className="w-5 h-5" />}
                        {isProcessing ? "Compressing..." : "Process & Download"}
                    </button>
                </div>
            )}
        </div>
    );
}
