"use client";

import { useState, useCallback } from "react";
import { UploadCloud } from "lucide-react";

interface FileUploadAreaProps {
    onFileSelect: (files: File[]) => void;
    multiple?: boolean;
    accept?: string;
}

export default function FileUploadArea({
    onFileSelect,
    multiple = false,
    accept = "*",
}: FileUploadAreaProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);

            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
                if (!multiple && files.length > 1) {
                    onFileSelect([files[0]]);
                } else {
                    onFileSelect(files);
                }
            }
        },
        [onFileSelect, multiple]
    );

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                onFileSelect(Array.from(e.target.files));
            }
            // Reset input value so the same file can be selected again if needed
            e.target.value = "";
        },
        [onFileSelect]
    );

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex w-full max-w-2xl cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition-all ${isDragging
                    ? "border-[#7B2D8E] bg-[#7B2D8E]/5"
                    : "border-gray-300 bg-gray-50 hover:border-[#7B2D8E]/50 hover:bg-gray-100"
                }`}
        >
            <input
                type="file"
                multiple={multiple}
                accept={accept}
                onChange={handleFileInput}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                title="Upload Files"
            />

            <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
                <UploadCloud className="h-8 w-8 text-[#7B2D8E]" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Choose {multiple ? "files" : "a file"} or drag & drop it here
            </h3>
            <p className="text-sm text-gray-500">
                100% Secure. Files are processed locally on your device and never leave your browser.
            </p>
        </div>
    );
}
