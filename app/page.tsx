"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { listings, Listing } from "@/data/listings";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedListings, setLikedListings] = useState<string[]>([]);
  const [skippedListings, setSkippedListings] = useState<string[]>([]);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  const currentListing = listings[currentIndex];
  const hasMoreListings = currentIndex < listings.length;

  const handleLike = () => {
    if (!currentListing) return;
    setExitDirection("right");
    setLikedListings([...likedListings, currentListing.id]);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setExitDirection(null);
    }, 300);
  };

  const handleNope = () => {
    if (!currentListing) return;
    setExitDirection("left");
    setSkippedListings([...skippedListings, currentListing.id]);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setExitDirection(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-400 via-blue-500 to-orange-600 flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-black/20 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-white">🐊 SwampSwipe</h1>
        <div className="flex gap-6 text-white font-semibold">
          <span className="bg-green-500/30 px-4 py-2 rounded-full border-2 border-green-400">
            Liked: {likedListings.length}
          </span>
          <span className="bg-red-500/30 px-4 py-2 rounded-full border-2 border-red-400">
            Skipped: {skippedListings.length}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {hasMoreListings ? (
          <>
            {/* Card Stack */}
            <div className="relative w-full max-w-md h-150">
              {listings.slice(currentIndex, currentIndex + 3).map((listing, index) => {
                if (index === 0) {
                  return (
                    <SwipeCard
                      key={listing.id}
                      listing={listing}
                      onLike={handleLike}
                      onNope={handleNope}
                      exitDirection={exitDirection}
                      style={{ zIndex: 3 }}
                    />
                  );
                }
                return (
                  <div
                    key={listing.id}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      zIndex: 3 - index,
                      transform: `scale(${1 - index * 0.05}) translateY(${index * 10}px)`,
                      opacity: 1 - index * 0.3,
                    }}
                  >
                    <ListingCard listing={listing} />
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-8 mt-8">
              <button
                onClick={handleNope}
                className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 transition-all shadow-xl flex items-center justify-center text-white text-3xl font-bold border-4 border-white"
              >
                ✕
              </button>
              <button
                onClick={handleLike}
                className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all shadow-xl flex items-center justify-center text-white text-3xl font-bold border-4 border-white"
              >
                ♥
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No more listings!
            </h2>
            <p className="text-gray-600">
              Adjust your preferences or check back later for more apartments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SwipeCard({
  listing,
  onLike,
  onNope,
  exitDirection,
  style,
}: {
  listing: Listing;
  onLike: () => void;
  onNope: () => void;
  exitDirection: "left" | "right" | null;
  style?: React.CSSProperties;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -120, 0, 120, 200], [0, 1, 1, 1, 0]);

  const SWIPE_THRESHOLD = 120;

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      if (info.offset.x > 0) {
        onLike();
      } else {
        onNope();
      }
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity, ...style }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={
        exitDirection
          ? {
              x: exitDirection === "right" ? 500 : -500,
              opacity: 0,
              rotate: exitDirection === "right" ? 25 : -25,
            }
          : {}
      }
      transition={{ duration: 0.3 }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <ListingCard listing={listing} showOverlay x={x} />
    </motion.div>
  );
}

function ListingCard({
  listing,
  showOverlay = false,
  x,
}: {
  listing: Listing;
  showOverlay?: boolean;
  x?: any;
}) {
  const likeOpacity = x ? useTransform(x, [0, 120], [0, 1]) : undefined;
  const nopeOpacity = x ? useTransform(x, [-120, 0], [1, 0]) : undefined;

  return (
    <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Photo Placeholder */}
      <div className="h-64 bg-linear-to-br from-orange-300 to-blue-400 flex items-center justify-center relative">
        <div className="text-white text-6xl">🏢</div>
        {/* Swipe Overlays */}
        {showOverlay && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute inset-0 bg-green-500/50 flex items-center justify-center"
            >
              <div className="text-white text-8xl font-bold transform rotate-12 border-8 border-white px-8 py-4 rounded-2xl">
                LIKE
              </div>
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute inset-0 bg-red-500/50 flex items-center justify-center"
            >
              <div className="text-white text-8xl font-bold transform -rotate-12 border-8 border-white px-8 py-4 rounded-2xl">
                NOPE
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Name & Area */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{listing.name}</h2>
          <p className="text-gray-600">{listing.area}</p>
        </div>

        {/* Price */}
        <div className="text-4xl font-bold text-orange-600">
          ${listing.price}
          <span className="text-lg text-gray-500">/mo</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛏️</span>
            <span className="text-gray-700">
              {listing.floorplan.beds} bed / {listing.floorplan.baths} bath
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪑</span>
            <span className="text-gray-700">
              {listing.furnished ? "Furnished" : "Unfurnished"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-gray-700">
              {listing.petFriendly ? "Pet Friendly" : "No Pets"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚴</span>
            <span className="text-gray-700">
              {listing.commuteMins.biking} min to UF
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {listing.amenities.slice(0, 5).map((amenity) => (
            <span
              key={amenity}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Tap for details hint */}
        <p className="text-center text-gray-400 text-sm pt-2">
          👆 Tap for details
        </p>
      </div>
    </div>
  );
}
