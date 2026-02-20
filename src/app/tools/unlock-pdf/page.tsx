"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadBlob } from "@/lib/pdf-utils";
import { Loader2, Unlock } from "lucide-react";

export default function UnlockPdfPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [needsPassword, setNeedsPassword] = useState(false);

    const handleFileSelect = async (files: File[]) => {
        if (files.length === 0) return;
        const f = files[0];
        setFile(f);
        setError(null);

        // Initial check to see if it's encrypted
        try {
            const arrayBuffer = await f.arrayBuffer();
            // Try to load without password. If it throws, it's encrypted.
            await PDFDocument.load(arrayBuffer);
            setNeedsPassword(false);
            setError("This PDF is not password protected. There's nothing to unlock!");
        } catch (err: any) {
            if (err.message?.includes("encrypted") || err.message?.includes("password")) {
                setNeedsPassword(true);
            } else {
                setError("Invalid PDF file or corruption detected.");
            }
        }
    };

    const handleUnlock = async () => {
        if (!file || !password) return;

        try {
            setIsProcessing(true);
            setError(null);

            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { password } as any);

            // Save it out without the password
            const pdfBytes = await pdfDoc.save();
            downloadBlob(pdfBytes, `unlocked_${Date.now()}.pdf`);

        } catch (err: any) {
            console.error(err);
            if (err.message?.includes("Incorrect password")) {
                setError("Incorrect password. Please try again.");
            } else {
                setError("Failed to decrypt the PDF. It may use unsupported encryption.");
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Unlock PDF</h1>
            <p className="text-gray-600 mb-8">Remove password security from your PDF. You must know the original password.</p>

            <FileUploadArea onFileSelect={handleFileSelect} accept=".pdf" />

            {file && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected File</h3>
                    <p className="mb-6 text-sm text-gray-600 font-mono">{file.name}</p>

                    {needsPassword && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Document Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter the password to unlock"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7B2D8E] focus:border-transparent outline-none transition-shadow"
                            />
                        </div>
                    )}

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        onClick={handleUnlock}
                        disabled={isProcessing || !needsPassword || !password}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing || !needsPassword || !password ? "bg-gray-300 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Unlock className="w-5 h-5" />}
                        {isProcessing ? "Unlocking..." : "Unlock & Remove Password"}
                    </button>
                </div>
            )}
        </div>
    );
}
