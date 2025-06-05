import dynamic from "next/dynamic";
import { FileText } from 'lucide-react';

const UploadForm = dynamic(() => import("../../../components/UploadForm"), {
  ssr: false,
});

export default function CVPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Dynamic Cover Letter Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create professional cover letters in seconds. Upload your template, fill in the details, and download your personalized document.
          </p>
        </div>

        {/* Main Content */}
        <UploadForm />

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p className="text-sm">
            Powered by modern web technologies • Secure & Private
          </p>
        </div>
      </div>
    </div>
  );
}
