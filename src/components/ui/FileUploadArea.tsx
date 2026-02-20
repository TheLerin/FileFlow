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
                borderRadius: "var(--radius-card)",
                border: `2px dashed ${isDragging ? "var(--neon-violet)" : "var(--border-mid)"}`,
                background: isDragging
                    ? "rgba(139, 92, 246, 0.05)"
                    : "var(--bg-card)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: isDragging ? "0 0 40px -10px var(--glow-violet)" : "0 4px 20px -5px rgba(0,0,0,0.3)",
                backdropFilter: "blur(12px)",
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
                    zIndex: 10
                }}
                title="Upload Files"
            />

            {/* Icon */}
            <div style={{
                width: "72px", height: "72px",
                borderRadius: "18px",
                background: isDragging ? "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15))" : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                border: `1px solid ${isDragging ? "rgba(139, 92, 246, 0.4)" : "var(--border-soft)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "24px",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: isDragging ? "0 0 24px -6px var(--glow-violet), inset 0 1px 0 rgba(255,255,255,0.1)" : "inset 0 1px 0 rgba(255,255,255,0.05)",
                transform: isDragging ? "scale(1.1) translateY(-4px)" : "scale(1)",
            }}>
                <UploadCloud size={32} color={isDragging ? "var(--neon-cyan)" : "var(--text-secondary)"} />
            </div>

            <h3 style={{
                fontSize: "1.1rem", fontWeight: 600,
                color: isDragging ? "#fff" : "var(--text-primary)",
                marginBottom: "8px", letterSpacing: "-0.01em",
                transition: "color 0.3s ease"
            }}>
                Drop {multiple ? "files" : "a file"} here, or click to browse
            </h3>
            <p style={{
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
            }}>
                All processing happens locally on your device.
                <br />No uploads. Complete privacy.
            </p>

            {accept !== "*" && (
                <div style={{
                    marginTop: "24px", padding: "6px 16px",
                    borderRadius: "999px",
                    background: "rgba(139, 92, 246, 0.1)",
                    border: "1px solid rgba(139, 92, 246, 0.2)",
                    fontSize: "0.75rem", color: "var(--neon-violet)",
                    fontWeight: 600, letterSpacing: "0.05em",
                }}>
                    Accepts: {accept}
                </div>
            )}
        </div>
    );
}
