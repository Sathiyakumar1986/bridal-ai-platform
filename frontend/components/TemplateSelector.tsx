"use client";

import { useState } from "react";

interface Template {
  id: string;
  name: string;
  category: "bridal" | "groom";
  emoji: string;
  description: string;
}

const templates: Template[] = [
  { id: "bridal-classic", name: "Classic Bridal", category: "bridal", emoji: "👰", description: "Elegant traditional bridal makeup" },
  { id: "bridal-modern", name: "Modern Glam", category: "bridal", emoji: "✨", description: "Contemporary glamorous look" },
  { id: "bridal-natural", name: "Natural Beauty", category: "bridal", emoji: "🌸", description: "Soft and natural bridal look" },
  { id: "bridal-bold", name: "Bold & Beautiful", category: "bridal", emoji: "💄", description: "Dramatic and bold makeup style" },
  { id: "bridal-south-asian", name: "South Asian Bridal", category: "bridal", emoji: "🪷", description: "Traditional South Asian bridal look" },
  { id: "groom-classic", name: "Classic Groom", category: "groom", emoji: "🤵", description: "Clean and polished groom look" },
  { id: "groom-modern", name: "Modern Groom", category: "groom", emoji: "😎", description: "Trendy modern groom styling" },
  { id: "groom-traditional", name: "Traditional Groom", category: "groom", emoji: "👳", description: "Traditional groom appearance" },
];

interface TemplateSelectorProps {
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const [activeTab, setActiveTab] = useState<"bridal" | "groom">("bridal");

  const filtered = templates.filter((t) => t.category === activeTab);

  return (
    <div id="templates" className="w-full">
      <h2 className="text-xl font-serif font-semibold text-rose-800 mb-4">
        Choose a Style
      </h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("bridal")}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
            activeTab === "bridal"
              ? "bg-rose-600 text-white shadow-md"
              : "bg-rose-100 text-rose-600 hover:bg-rose-200"
          }`}
        >
          👰 Bridal
        </button>
        <button
          onClick={() => setActiveTab("groom")}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
            activeTab === "groom"
              ? "bg-rose-600 text-white shadow-md"
              : "bg-rose-100 text-rose-600 hover:bg-rose-200"
          }`}
        >
          🤵 Groom
        </button>
      </div>
      <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
        {filtered.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
              selectedTemplate === template.id
                ? "border-rose-500 bg-rose-50 shadow-md ring-2 ring-rose-200"
                : "border-rose-100 bg-white hover:border-rose-300 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{template.emoji}</span>
              <div>
                <p className="font-semibold text-rose-800 text-sm">
                  {template.name}
                </p>
                <p className="text-rose-400 text-xs">{template.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
