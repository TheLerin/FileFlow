/**
 * Helper utility to trigger a file download from a Uint8Array in the browser.
 */
export function downloadBlob(data: Uint8Array, filename: string, mimeType: string = "application/pdf") {
    const blob = new Blob([data as any], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}
