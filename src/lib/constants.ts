import {
    FileImage,
    FileMinus,
    FilePlus,
    Image as ImageIcon,
    Key,
    LockOpen,
    Merge,
    RotateCw,
    Scissors
} from "lucide-react";

export const TOOLS = [
    // PDF Utilities
    {
        id: "merge-pdf",
        title: "Merge PDF",
        description: "Combine multiple PDF files into one.",
        href: "/tools/merge-pdf",
        icon: Merge,
    },
    {
        id: "split-pdf",
        title: "Split PDF",
        description: "Separate one page or a whole set for easy conversion.",
        href: "/tools/split-pdf",
        icon: Scissors,
    },
    {
        id: "compress-pdf",
        title: "Compress PDF",
        description: "Reduce file size while saving quality.",
        href: "/tools/compress-pdf",
        icon: FileMinus,
    },
    {
        id: "rotate-pdf",
        title: "Rotate PDF",
        description: "Rotate your PDFs the way you need them.",
        href: "/tools/rotate-pdf",
        icon: RotateCw,
    },
    {
        id: "add-watermark",
        title: "Add Watermark",
        description: "Stamp an image or text over your PDF in seconds.",
        href: "/tools/add-watermark",
        icon: FilePlus,
    },
    {
        id: "protect-pdf",
        title: "Protect PDF",
        description: "Encrypt your PDF with a password.",
        href: "/tools/protect-pdf",
        icon: Key,
    },
    {
        id: "unlock-pdf",
        title: "Unlock PDF",
        description: "Remove PDF password security.",
        href: "/tools/unlock-pdf",
        icon: LockOpen,
    },
    // Image Utilities
    {
        id: "image-to-pdf",
        title: "Image to PDF",
        description: "Convert JPG, PNG, and WebP to PDF.",
        href: "/tools/image-to-pdf",
        icon: FileImage,
    },
    {
        id: "pdf-to-image",
        title: "PDF to Image",
        description: "Extract images from PDF or convert pages to images.",
        href: "/tools/pdf-to-image",
        icon: ImageIcon,
    },
];
