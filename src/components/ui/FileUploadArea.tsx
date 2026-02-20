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
                onFileSelect(multiple ? files : [files[0]]);
            }
        },
        [onFileSelect, multiple]
    );

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                onFileSelect(Array.from(e.target.files));
            }
            e.target.value = "";
        },
        [onFileSelect]
    );

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "640px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 32px",
                textAlign: "center",
                cursor: "pointer",
                borderRadius: "16px",
                border: `2px dashed ${isDragging ? "rgba(66,133,244,0.6)" : "rgba(255,255,255,0.10)"}`,
                background: isDragging
                    ? "rgba(66,133,244,0.06)"
                    : "rgba(255,255,255,0.02)",
                transition: "all 0.25s ease",
                boxShadow: isDragging ? "0 0 40px -10px rgba(66,133,244,0.4)" : "none",
            }}
        >
            <input
                type="file"
                multiple={multiple}
                accept={accept}
                onChange={handleFileInput}
                style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    opacity: 0, cursor: "pointer",
                }}
                title="Upload Files"
            />

            {/* Icon */}
            <div style={{
                width: "64px", height: "64px",
                borderRadius: "16px",
                background: isDragging ? "rgba(66,133,244,0.2)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isDragging ? "rgba(66,133,244,0.4)" : "rgba(255,255,255,0.10)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "20px",
                transition: "all 0.25s ease",
                boxShadow: isDragging ? "0 0 24px -6px rgba(66,133,244,0.5)" : "none",
            }}>
                <UploadCloud size={28} color={isDragging ? "#4285F4" : "rgba(255,255,255,0.4)"} />
            </div>

            <h3 style={{
                fontSize: "1rem", fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                marginBottom: "8px", letterSpacing: "-0.01em",
            }}>
                Drop {multiple ? "files" : "a file"} here, or click to browse
            </h3>
            <p style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.3)",
                lineHeight: 1.6,
            }}>
                All processing happens locally on your device.
                <br />No uploads. No servers. Complete privacy.
            </p>

            {accept !== "*" && (
                <div style={{
                    marginTop: "16px", padding: "4px 12px",
                    borderRadius: "999px",
                    background: "rgba(66,133,244,0.08)",
                    border: "1px solid rgba(66,133,244,0.2)",
                    fontSize: "0.72rem", color: "rgba(66,133,244,0.8)",
                    fontWeight: 600, letterSpacing: "0.05em",
                }}>
                    Accepts: {accept}
                </div>
            )}
        </div>
    );
}
