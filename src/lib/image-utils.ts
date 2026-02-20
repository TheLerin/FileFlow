/**
 * Converts a File object (e.g., from an input type="file" or drag-and-drop) into an HTMLImageElement.
 */
export function fileToImageURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                resolve(e.target.result as string);
            } else {
                reject(new Error("Failed to read file."));
            }
        };
        reader.onerror = () => reject(new Error("File reading error."));
        reader.readAsDataURL(file);
    });
}

/**
 * Loads an image from a Data URL into an HTMLImageElement wrapper.
 */
export function loadImageFromDataURL(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load image."));
        img.src = dataUrl;
    });
}

/**
 * Common handler that transparently converts HEIC to standard blobs if needed,
 * then returns an object URL that can be directly used in <img src="..." />
 */
export async function getProcessableImageUrl(file: File): Promise<string> {
    let blobToProcess: File | Blob = file;

    // Transparently convert HEIC files
    if (file.type === "image/heic" || file.type === "image/heif" || file.name.toLowerCase().endsWith(".heic")) {
        try {
            const heic2anyModule = await import("heic2any");
            const heic2any = heic2anyModule.default;
            const converted = await heic2any({ blob: file, toType: "image/jpeg" });
            blobToProcess = Array.isArray(converted) ? converted[0] : converted;
        } catch (e) {
            console.warn("HEIC Conversion failed:", e);
            throw new Error("Could not decode HEIC image. The file might be corrupted or unsupported.");
        }
    }

    return URL.createObjectURL(blobToProcess as Blob);
}

/**
 * Helper utility to trigger a file download from a Blob in the browser.
 */
export function downloadFileBlob(blob: Blob, filename: string) {
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
