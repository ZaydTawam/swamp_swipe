"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { listings, Listing } from "@/data/listings";

export default function LikedPage() {
  const [likedListings, setLikedListings] = useState<Listing[]>([]);

  useEffect(() => {
    // Load liked listing IDs from localStorage
    const savedLiked = localStorage.getItem("swampswipe_liked");
    if (savedLiked) {
      const likedIds: string[] = JSON.parse(savedLiked);
      // Filter listings to only include liked ones
      const liked = listings.filter((listing) => likedIds.includes(listing.id));
      setLikedListings(liked);
    }
  }, []);

  const handleRemove = (id: string) => {
    // Remove from state
    const updated = likedListings.filter((listing) => listing.id !== id);
    setLikedListings(updated);

    // Update localStorage
    const updatedIds = updated.map((listing) => listing.id);
    localStorage.setItem("swampswipe_liked", JSON.stringify(updatedIds));
  };

  const getLivelinessLabel = (score: number) => {
    const labels = ["Very Quiet", "Quiet", "Moderate", "Lively", "Very Lively"];
    return labels[score - 1];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Liked Apartments</h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{likedListings.length} {likedListings.length === 1 ? 'apartment' : 'apartments'}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {likedListings.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No liked apartments yet</h2>
            <p className="text-gray-600 mb-6">Start swiping to find your perfect place!</p>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Swiping
            </Link>
          </div>
        ) : (
          // Grid of Liked Listings
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Apartment Image */}
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemove(listing.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors shadow-md group"
                    title="Remove from liked"
                  >
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  {/* Name & Price */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{listing.name}</h3>
                    <div className="text-2xl font-bold text-blue-600 mt-1">
                      ${listing.price}
                      <span className="text-sm text-gray-500 font-normal">/month</span>
                    </div>
                  </div>

                  {/* Floorplan */}
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-sm font-medium">
                      {listing.floorplan.beds} bed • {listing.floorplan.baths} bath
                    </span>
                  </div>

                  {/* Distance */}
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium">{listing.distance} mi from UF</span>
                  </div>

                  {/* Commute Times */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span>🚶</span>
                      <span>{listing.commuteMins.walking} min</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span>🚴</span>
                      <span>{listing.commuteMins.biking} min</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span>🚗</span>
                      <span>{listing.commuteMins.driving} min</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span>🚌</span>
                      <span>{listing.commuteMins.bus} min</span>
                    </div>
                  </div>

                  {/* Liveliness */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Neighborhood</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-1.5 h-5 rounded-sm ${
                              level <= listing.liveliness ? "bg-blue-500" : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {getLivelinessLabel(listing.liveliness)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
