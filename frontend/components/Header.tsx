"use client";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 border-b border-rose-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💍</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-rose-800 tracking-wide">
              Virtual Bridal & Groom Studio
            </h1>
            <p className="text-sm text-rose-500 font-light">
              AI-Powered Makeup & Style Recommendations
            </p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-rose-700">
          <a href="#upload" className="hover:text-rose-900 transition-colors">Upload</a>
          <a href="#templates" className="hover:text-rose-900 transition-colors">Templates</a>
          <a href="#results" className="hover:text-rose-900 transition-colors">Results</a>
        </nav>
      </div>
    </header>
  );
}
