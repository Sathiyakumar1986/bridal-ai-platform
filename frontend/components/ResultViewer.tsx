"use client";

interface ResultViewerProps {
  resultImage: string | null;
  originalImage?: string | null;
  isGenerating: boolean;
}

export default function ResultViewer({ resultImage, originalImage, isGenerating }: ResultViewerProps) {
  return (
    <div id="results" className="w-full">
      <h2 className="text-xl font-serif font-semibold text-rose-800 mb-4">
        Your Result
      </h2>
      <div className="rounded-2xl border-2 border-rose-200 bg-white shadow-md overflow-hidden">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-64 sm:h-80 bg-gradient-to-br from-rose-50 to-pink-50">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
              <span className="absolute inset-0 flex items-center justify-center text-2xl">💄</span>
            </div>
            <p className="text-rose-600 font-medium mt-4">
              Creating your perfect look...
            </p>
            <p className="text-rose-400 text-sm mt-1">
              AI is working its magic
            </p>
          </div>
        ) : resultImage ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {originalImage && (
                <div className="relative border-r border-rose-100">
                  <div className="absolute top-3 left-3 bg-white/90 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full shadow z-10">
                    Before
                  </div>
                  <img
                    src={originalImage}
                    alt="Original photo"
                    className="w-full h-64 sm:h-80 object-contain bg-gray-50"
                  />
                </div>
              )}
              <div className="relative">
                <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow z-10">
                  After
                </div>
                <img
                  src={resultImage}
                  alt="Generated makeup result"
                  className={`w-full h-64 sm:h-80 object-contain bg-rose-50 ${!originalImage ? "" : ""}`}
                />
              </div>
            </div>
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-3 text-center">
              <p className="text-white text-sm font-medium">
                Makeup Applied Successfully
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 sm:h-80 bg-gradient-to-br from-rose-50 to-pink-50">
            <span className="text-5xl mb-3 opacity-40">🪞</span>
            <p className="text-rose-400 font-medium">
              Your transformed look will appear here
            </p>
            <p className="text-rose-300 text-sm mt-1">
              Upload a photo and select a template to begin
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
