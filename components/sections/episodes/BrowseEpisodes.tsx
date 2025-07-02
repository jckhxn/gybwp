"use client";

import { useState } from "react";
import { BrowseEpisodesSection } from "@/types";

interface BrowseEpisodesProps {
  section: BrowseEpisodesSection;
}

export function BrowseEpisodes({ section }: BrowseEpisodesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    title = "Browse Episodes",
    subtitle,
    showFeatured = true,
    episodesPerPage = 12,
    showFilters = true,
  } = section;

  // TODO: Fetch episodes data from Sanity
  const episodes: any[] = []; // Placeholder
  const categories = ["Business", "Leadership", "Technology", "HR"]; // Placeholder

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {showFilters && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Episodes
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {episodes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No episodes found. Episodes will appear here once added to the
              CMS.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Episode cards will be rendered here */}
            {episodes.map((episode) => (
              <div
                key={episode._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Episode card content */}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {episodes.length > episodesPerPage && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              {/* Pagination buttons */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">Page {currentPage}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 border rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
