"use client";

import { useState } from "react";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { getProcessableImageUrl, loadImageFromDataURL, downloadFileBlob } from "@/lib/image-utils";
import { Loader2, Maximize } from "lucide-react";

export default function ResizeImagePage() {
    const [file, setFile] = useState<File | null>(null);
    const [img, setImg] = useState<HTMLImageElement | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [targetWidth, setTargetWidth] = useState<number>(0);
    const [targetHeight, setTargetHeight] = useState<number>(0);
    const [maintainRatio, setMaintainRatio] = useState(true);

    const handleFileSelect = async (files: File[]) => {
        if (files.length > 0) {
            const f = files[0];
            setFile(f);
            try {
                const url = await getProcessableImageUrl(f);
                const loadedImg = await loadImageFromDataURL(url);
                setImg(loadedImg);
                setTargetWidth(loadedImg.width);
                setTargetHeight(loadedImg.height);
            } catch (err) {
                setError("Failed to load image preview for dimensions.");
            }
        }
    };

    const handleWidthChange = (w: number) => {
        setTargetWidth(w);
        if (maintainRatio && img && w > 0) {
            setTargetHeight(Math.round(w * (img.height / img.width)));
        }
    };

    const handleHeightChange = (h: number) => {
        setTargetHeight(h);
        if (maintainRatio && img && h > 0) {
            setTargetWidth(Math.round(h * (img.width / img.height)));
        }
    };

    const handleResize = async () => {
        if (!file || !img || targetWidth <= 0 || targetHeight <= 0) return;

        try {
            setIsProcessing(true);
            setError(null);

            const canvas = document.createElement("canvas");
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext("2d");

            if (!ctx) throw new Error("Canvas context failed.");

            // Improve resizing interpolation
            ctx.imageSmoothingQuality = "high";
            ctx.imageSmoothingEnabled = true;

            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            // Save using original type if PNG/JPG else default to JPG
            const outMime = file.type === "image/png" ? "image/png" : "image/jpeg";
            const ext = outMime === "image/png" ? "png" : "jpg";

            canvas.toBlob((blob) => {
                if (blob) {
                    const baseName = file.name.replace(/\.[^/.]+$/, "");
                    downloadFileBlob(blob, `${baseName}_resized.${ext}`);
                }
            }, outMime, 0.95);

        } catch (err: any) {
            console.error(err);
            setError("An error occurred during resizing.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Resize Image</h1>
            <p className="text-gray-600 mb-8">Change the dimensions of your image precisely.</p>

            <FileUploadArea onFileSelect={handleFileSelect} accept="image/*" />

            {file && img && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Original Dimensions</h3>
                    <p className="mb-6 text-sm text-gray-600 font-mono">{img.width}px × {img.height}px</p>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Width (px)</label>
                            <input
                                type="number"
                                value={targetWidth}
                                onChange={(e) => handleWidthChange(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B2D8E] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Height (px)</label>
                            <input
                                type="number"
                                value={targetHeight}
                                onChange={(e) => handleHeightChange(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B2D8E] outline-none"
                            />
                        </div>
                    </div>

                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            id="ratio"
                            checked={maintainRatio}
                            onChange={(e) => setMaintainRatio(e.target.checked)}
                            className="mr-2 accent-[#7B2D8E]"
                        />
                        <label htmlFor="ratio" className="text-sm text-gray-700">Lock Aspect Ratio</label>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        onClick={handleResize}
                        disabled={isProcessing}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Maximize className="w-5 h-5" />}
                        {isProcessing ? "Resizing..." : "Resize & Download"}
                    </button>
                </div>
            )}
        </div>
    );
}
