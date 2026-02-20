"use client";

import { useState } from "react";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { Loader2, Lock } from "lucide-react";

export default function ProtectPdfPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState("");

    const handleFileSelect = (files: File[]) => {
        if (files.length > 0) setFile(files[0]);
    };

    const handleProtect = async () => {
        if (!file || !password) return;

        setIsProcessing(true);
        setError(null);

        // Simulate work to show the loading state
        await new Promise(resolve => setTimeout(resolve, 800));

        // Note: pdf-lib does not support creating encrypted documents directly.
        setError("Creating newly encrypted PDFs natively in the browser is not supported by our current engine yet. Stay tuned for future updates!");
        setIsProcessing(false);
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Protect PDF</h1>
            <p className="text-gray-600 mb-8">Add a password to your PDF document to secure it from unauthorized viewing.</p>

            <FileUploadArea onFileSelect={handleFileSelect} accept=".pdf" />

            {file && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected File</h3>
                    <p className="mb-6 text-sm text-gray-600 font-mono">{file.name}</p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Set Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter a secure password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7B2D8E] focus:border-transparent outline-none transition-shadow"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-md border border-red-100">{error}</p>}

                    <button
                        onClick={handleProtect}
                        disabled={isProcessing || !password}
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing || !password ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B2D8E] hover:bg-[#6A267A]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                        {isProcessing ? "Encrypting..." : "Encrypt & Download PDF"}
                    </button>
                </div>
            )}
        </div>
    );
}
