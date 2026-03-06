"use client";

interface Recommendation {
  category: string;
  emoji: string;
  suggestions: string[];
}

interface RecommendationPanelProps {
  recommendations: Recommendation[] | null;
  isLoading: boolean;
}

const defaultCategories: Recommendation[] = [
  { category: "Makeup", emoji: "💄", suggestions: [] },
  { category: "Hairstyle", emoji: "💇‍♀️", suggestions: [] },
  { category: "Costume", emoji: "👗", suggestions: [] },
  { category: "Jewelry", emoji: "💎", suggestions: [] },
];

export default function RecommendationPanel({ recommendations, isLoading }: RecommendationPanelProps) {
  const items = recommendations || defaultCategories;

  return (
    <div className="w-full">
      <h2 className="text-xl font-serif font-semibold text-rose-800 mb-4">
        AI Recommendations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.category}
            className="rounded-xl border border-rose-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{item.emoji}</span>
              <h3 className="font-semibold text-rose-700 text-sm">
                {item.category}
              </h3>
            </div>
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-3 bg-rose-100 rounded-full animate-pulse w-3/4" />
                <div className="h-3 bg-rose-100 rounded-full animate-pulse w-1/2" />
              </div>
            ) : item.suggestions.length > 0 ? (
              <ul className="space-y-1">
                {item.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-rose-600 text-xs flex items-start gap-1">
                    <span className="text-rose-300 mt-0.5">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-rose-300 text-xs italic">
                Generate a look to see recommendations
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
