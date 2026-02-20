"use client";

import { useState, useRef } from "react";
import FileUploadArea from "@/components/ui/FileUploadArea";
import { downloadFileBlob } from "@/lib/image-utils";
import { Loader2, FileText } from "lucide-react";
import { marked } from "marked";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function IpynbToPdfPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const renderRef = useRef<HTMLDivElement>(null);

    const handleConvert = async () => {
        if (files.length === 0 || !renderRef.current) return;

        try {
            setIsProcessing(true);
            setError(null);

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                const text = await file.text();
                const notebook = JSON.parse(text);

                if (!notebook.cells || !Array.isArray(notebook.cells)) {
                    throw new Error("Invalid .ipynb format.");
                }

                const mdLines: string[] = [];
                notebook.cells.forEach((cell: any) => {
                    const source = Array.isArray(cell.source) ? cell.source.join("") : cell.source;
                    if (cell.cell_type === 'markdown') {
                        mdLines.push(source);
                        mdLines.push("\n\n");
                    } else if (cell.cell_type === 'code') {
                        mdLines.push("```python\n");
                        mdLines.push(source);
                        mdLines.push("\n```\n\n");
                    }
                });

                // Parse markdown immediately into raw HTML
                const htmlContent = marked.parse(mdLines.join(""));

                // Inject temporarily into DOM to rasterize it flawlessly
                renderRef.current.innerHTML = htmlContent as string;

                // Wait extremely briefly for layout reflow natively
                await new Promise(r => setTimeout(r, 100));

                // Rasterize the injected DOM node exactly as shown
                const canvas = await html2canvas(renderRef.current, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                });

                const imgData = canvas.toDataURL("image/png");

                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

                const blob = pdf.output('blob');
                const baseName = file.name.replace(/\.[^/.]+$/, "");
                downloadFileBlob(blob, `${baseName}.pdf`);

                renderRef.current.innerHTML = ""; // Clean up
            }

        } catch (err: any) {
            console.error(err);
            setError("An error occurred. Ensure the selected files are valid Jupyter Notebooks (.ipynb).");
        } finally {
            setIsProcessing(false);
            if (renderRef.current) renderRef.current.innerHTML = "";
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">IPYNB to PDF</h1>
            <p className="text-gray-600 mb-8">Completely export your Notebooks into clean, vector-scaled PDF documents.</p>

            <FileUploadArea onFileSelect={setFiles} multiple accept=".ipynb" />

            {files.length > 0 && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl mx-auto">
                    <h3 className="font-semibold text-gray-800 mb-4">Notebooks to Extract ({files.length})</h3>
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
                        className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#34A853] hover:bg-[#2A8742]"
                            }`}
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                        {isProcessing ? "Rendering PDF Streams..." : "Export as PDF"}
                    </button>
                </div>
            )}

            {/* Hidden Render Target for html2canvas extraction */}
            <div className="absolute top-[-9999px] left-[-9999px] opacity-0 pointer-events-none">
                <div
                    ref={renderRef}
                    style={{ width: '800px', padding: '40px', background: '#fff', color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', lineHeight: 1.6 }}
                ></div>
            </div>

        </div>
    );
}
