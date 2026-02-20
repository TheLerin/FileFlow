"use client";

import { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { getProcessableImageUrl, downloadFileBlob } from "@/lib/image-utils";
import { Loader2, Crop as CropIcon } from "lucide-react";

export default function CropImagePage() {
    const [file, setFile] = useState<File | null>(null);
    const [imgSrc, setImgSrc] = useState<string>("");
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = async (files: File[]) => {
        if (files.length > 0) {
            const f = files[0];
            setFile(f);
            try {
                const url = await getProcessableImageUrl(f);
                setImgSrc(url);
            } catch (err) {
                setError("Failed to load image preview.");
            }
        }
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        imgRef.current = e.currentTarget;
        const { width, height } = e.currentTarget;
        const initialCrop = centerCrop(
            makeAspectCrop({ unit: '%', width: 50 }, NaN, width, height),
            width,
            height
        );
        setCrop(initialCrop);
    };

    const handleExport = async () => {
        if (!completedCrop || !imgRef.current || !file) return;

        try {
            setIsProcessing(true);
            setError(null);

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("No 2d context");

            const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
            const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

            canvas.width = Math.floor(completedCrop.width * scaleX);
            canvas.height = Math.floor(completedCrop.height * scaleY);

            ctx.imageSmoothingQuality = "high";

            const cropX = completedCrop.x * scaleX;
            const cropY = completedCrop.y * scaleY;
            const cropW = completedCrop.width * scaleX;
            const cropH = completedCrop.height * scaleY;

            ctx.drawImage(
                imgRef.current,
                cropX, cropY, cropW, cropH,
                0, 0, canvas.width, canvas.height
            );

            const outMime = file.type === "image/png" ? "image/png" : "image/jpeg";
            const ext = outMime === "image/png" ? "png" : "jpg";

            canvas.toBlob((blob) => {
                if (blob) {
                    const baseName = file.name.replace(/\.[^/.]+$/, "");
                    downloadFileBlob(blob, `${baseName}_cropped.${ext}`);
                }
            }, outMime, 1);

        } catch (err: any) {
            console.error(err);
            setError("An error occurred during cropping.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container flex flex-col items-center mx-auto max-w-5xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 self-start">Crop Image</h1>
            <p className="text-gray-600 mb-8 self-start">Visually trim the edges off your image.</p>

            {!imgSrc && (
                <div className="w-full self-start">
                    <FileUploadArea onFileSelect={handleFileSelect} accept="image/*" />
                </div>
            )}

            {imgSrc && (
                <div className="flex flex-col md:flex-row gap-8 w-full mt-4">
                    <div className="flex-1 overflow-auto bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center justify-center min-h-[400px]">
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                        >
                            <img
                                src={imgSrc}
                                onLoad={onImageLoad}
                                alt="Crop preview"
                                className="max-h-[60vh] object-contain"
                            />
                        </ReactCrop>
                    </div>

                    <div className="w-full md:w-80 flex flex-col gap-4">
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-800 mb-4">Export Options</h3>
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                            <button
                                onClick={handleExport}
                                disabled={isProcessing || !completedCrop?.width || !completedCrop?.height}
                                className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing || !completedCrop?.width || !completedCrop?.height ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                                    }`}
                            >
                                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CropIcon className="w-5 h-5" />}
                                {isProcessing ? "Cropping..." : "Crop & Download"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
