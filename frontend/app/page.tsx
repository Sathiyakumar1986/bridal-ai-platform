"use client";

import { useState, useCallback, useRef } from "react";
import Header from "../components/Header";
import UploadImage from "../components/UploadImage";
import TemplateSelector from "../components/TemplateSelector";
import ResultViewer from "../components/ResultViewer";
import RecommendationPanel from "../components/RecommendationPanel";

interface Recommendation {
  category: string;
  emoji: string;
  suggestions: string[];
}

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploadedFileRef = useRef<File | null>(null);
  const uploadedServerPath = useRef<string | null>(null);

  const API_BASE = typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:8000`
    : "http://localhost:8000";

  const handleImageUpload = useCallback(async (file: File, previewUrl: string) => {
    if (!previewUrl) {
      setUploadedImage(null);
      setResultImage(null);
      setRecommendations(null);
      setError(null);
      uploadedFileRef.current = null;
      uploadedServerPath.current = null;
      return;
    }
    setUploadedImage(previewUrl);
    setResultImage(null);
    setRecommendations(null);
    setError(null);
    uploadedFileRef.current = file;

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE}/api/upload-image`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        uploadedServerPath.current = data.file_path;
      } else {
        setError(data.detail || "Upload failed");
      }
    } catch {
      uploadedServerPath.current = null;
    }
  }, [API_BASE]);

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedTemplate) return;

    setIsGenerating(true);
    setIsLoadingRecs(true);
    setError(null);

    try {
      const style = selectedTemplate.includes("groom") ? "groom" : "bridal";

      const [recRes, genRes] = await Promise.all([
        fetch(`${API_BASE}/api/recommend-style?style=${style}&skin_tone=medium`),
        uploadedServerPath.current
          ? fetch(`${API_BASE}/api/generate-makeup`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                image_path: uploadedServerPath.current,
                template_id: selectedTemplate,
                style,
              }),
            })
          : Promise.resolve(null),
      ]);

      const recData = await recRes.json();
      if (recData.recommendations) {
        const rec = recData.recommendations;
        setRecommendations([
          { category: "Makeup", emoji: "💄", suggestions: rec.makeup || [] },
          { category: "Hairstyle", emoji: "💇‍♀️", suggestions: rec.hairstyle || [] },
          { category: "Costume", emoji: "👗", suggestions: rec.costume || [] },
          { category: "Jewelry", emoji: "💎", suggestions: rec.jewelry || [] },
        ]);
      }

      if (genRes) {
        const genData = await genRes.json();
        if (genRes.ok && genData.generated_image) {
          setResultImage(`${API_BASE}${genData.generated_image}`);
        } else {
          setResultImage(uploadedImage);
        }
      } else {
        setResultImage(uploadedImage);
      }
    } catch (err) {
      console.error("API call failed, using fallback data", err);
      setResultImage(uploadedImage);
      setRecommendations([
        { category: "Makeup", emoji: "💄", suggestions: ["Soft matte foundation with dewy finish", "Rose gold eyeshadow palette", "Nude lip color with gloss overlay"] },
        { category: "Hairstyle", emoji: "💇‍♀️", suggestions: ["Loose curls with floral accessories", "Elegant updo with pearl pins", "Side-swept waves with crystal clip"] },
        { category: "Costume", emoji: "👗", suggestions: ["Ivory silk lehenga with gold embroidery", "A-line white gown with lace details", "Pastel saree with zari border"] },
        { category: "Jewelry", emoji: "💎", suggestions: ["Kundan choker with matching earrings", "Diamond pendant with pearl drops", "Gold maang tikka with side chains"] },
      ]);
    } finally {
      setIsGenerating(false);
      setIsLoadingRecs(false);
    }
  };

  const canGenerate = uploadedImage && selectedTemplate && !isGenerating;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 shrink-0">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
          </aside>

          <div className="flex-1 space-y-6">
            <UploadImage
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg ${
                canGenerate
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 hover:shadow-xl active:scale-[0.98]"
                  : "bg-rose-200 text-rose-400 cursor-not-allowed"
              }`}
            >
              {isGenerating
                ? "✨ Generating Your Look..."
                : "💍 Generate My Bridal Look"}
            </button>

            <ResultViewer
              resultImage={resultImage}
              originalImage={uploadedImage}
              isGenerating={isGenerating}
            />
          </div>
        </div>

        <div className="mt-10">
          <RecommendationPanel
            recommendations={recommendations}
            isLoading={isLoadingRecs}
          />
        </div>
      </main>

      <footer className="border-t border-rose-200 bg-rose-50/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-rose-400">
          <p>💍 Virtual Bridal & Groom Makeup Studio — Powered by AI</p>
        </div>
      </footer>
    </div>
  );
}
