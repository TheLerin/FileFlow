import { TOOLS } from "@/lib/constants";
import ToolCard from "@/components/ui/ToolCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-16">

      {/* Hero Section */}
      <section className="mb-16 max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Everything you need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2D8E] to-[#E91E63]">your files.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
          100% Secure, client-side tools to manipulate, convert, and process your PDFs and images without ever uploading them to a remote server.
        </p>
      </section>

      {/* Tools Grid */}
      {/* PDF Utilities Section */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 border-b pb-2">PDF Utilities</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TOOLS.filter(tool => tool.id.includes('pdf') || tool.id === 'add-watermark').map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </section>

      {/* Image Utilities Section */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 border-b pb-2">Image Utilities</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TOOLS.filter(tool => !tool.id.includes('pdf') && tool.id !== 'add-watermark' && !['excel-to-csv', 'excel-to-json', 'csv-to-excel', 'docx-to-txt', 'docx-to-html', 'code-to-pdf', 'code-to-image', 'ipynb-to-pdf', 'ipynb-to-html', 'ipynb-to-md', 'ipynb-to-py', 'merge-ipynb'].includes(tool.id)).map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </section>

      {/* Office & Data Utilities Section */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 border-b pb-2">Office & Data Utilities</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TOOLS.filter(tool => ['excel-to-csv', 'excel-to-json', 'csv-to-excel', 'docx-to-txt', 'docx-to-html'].includes(tool.id)).map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </section>

      {/* Developer & Data Science Section */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 border-b pb-2">Developer & Data Science</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TOOLS.filter(tool => ['code-to-pdf', 'code-to-image', 'ipynb-to-pdf', 'ipynb-to-html', 'ipynb-to-md', 'ipynb-to-py', 'merge-ipynb'].includes(tool.id)).map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </section>

    </div>
  );
}
