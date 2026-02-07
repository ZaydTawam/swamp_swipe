"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { listings, Listing } from "@/data/listings";

interface Preferences {
  minPrice: number;
  maxPrice: number;
  beds: number;
  commuteMode: "walking" | "biking" | "driving" | "bus";
  maxCommuteTime: number;
  liveliness: 1 | 2 | 3 | 4 | 5;
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedListings, setLikedListings] = useState<string[]>([]);
  const [skippedListings, setSkippedListings] = useState<string[]>([]);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  // Load liked listings from localStorage on mount
  useEffect(() => {
    const savedLiked = localStorage.getItem("swampswipe_liked");
    if (savedLiked) {
      setLikedListings(JSON.parse(savedLiked));
    }
  }, []);

  // Save liked listings to localStorage whenever they change
  useEffect(() => {
    if (likedListings.length > 0) {
      localStorage.setItem("swampswipe_liked", JSON.stringify(likedListings));
    }
  }, [likedListings]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    minPrice: 700,
    maxPrice: 1200,
    beds: 2,
    commuteMode: "biking",
    maxCommuteTime: 15,
    liveliness: 3,
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem("swampswipe_preferences");
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    } else {
      // Show preferences modal on first visit
      setShowPreferences(true);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("swampswipe_preferences", JSON.stringify(preferences));
  }, [preferences]);

  // Calculate score for each listing
  const calculateScore = (listing: Listing): number => {
    let score = 0;

    // Price range (50 points) - weighted more heavily
    if (listing.price >= preferences.minPrice && listing.price <= preferences.maxPrice) {
      score += 50;
    }

    // Floorplan (15 points)
    if (listing.floorplan.beds === preferences.beds) {
      score += 15;
    }

    // Commute time (25 points)
    const commuteTime = listing.commuteMins[preferences.commuteMode];
    if (commuteTime <= preferences.maxCommuteTime) {
      score += 25;
    }

    // Liveliness (10 points) - scale based on difference
    const livelinessDiff = Math.abs(listing.liveliness - preferences.liveliness);
    score += Math.max(0, 10 - livelinessDiff * 2);

    return score;
  };

  // Sort listings by score (high to low) and memoize
  const sortedListings = useMemo(() => {
    return [...listings]
      .map((listing) => ({
        ...listing,
        score: calculateScore(listing),
      }))
      .sort((a, b) => b.score - a.score);
  }, [preferences]);

  const currentListing = sortedListings[currentIndex];
  const hasMoreListings = currentIndex < sortedListings.length;

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

  const handleSavePreferences = () => {
    setShowPreferences(false);
    setCurrentIndex(0); // Reset to first listing
    setLikedListings([]);
    setSkippedListings([]);
  };

  const getLivelinessLabel = (score: number) => {
    const labels = ["Very Quiet", "Quiet", "Moderate", "Lively", "Very Lively"];
    return labels[score - 1];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">SwampSwipe</h1>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShowPreferences(true)}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              Preferences
            </button>
            <div className="flex gap-3 text-sm font-medium">
              <Link href="/liked" className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{likedListings.length}</span>
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{skippedListings.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {hasMoreListings ? (
          <>
            {/* Card Stack */}
            <div className="relative w-full max-w-md h-150">
              {sortedListings.slice(currentIndex, currentIndex + 3).map((listing, index) => {
                if (index === 0) {
                  return (
                    <SwipeCard
                      key={listing.id}
                      listing={listing}
                      onLike={handleLike}
                      onNope={handleNope}
                      exitDirection={exitDirection}
                      getLivelinessLabel={getLivelinessLabel}
                      score={listing.score}
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
                    <ListingCard listing={listing} getLivelinessLabel={getLivelinessLabel} score={listing.score} />
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-8 mt-8">
              <button
                onClick={handleNope}
                className="w-16 h-16 rounded-full bg-white border-2 border-red-500 hover:bg-red-50 active:scale-95 transition-all shadow-lg flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={handleLike}
                className="w-16 h-16 rounded-full bg-white border-2 border-green-500 hover:bg-green-50 active:scale-95 transition-all shadow-lg flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center max-w-md border border-gray-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All done!</h2>
            <p className="text-gray-600">
              You&apos;ve reviewed all available listings. Check back later for more apartments.
            </p>
          </div>
        )}
      </div>

      {/* Preferences Modal */}
      <PreferencesModal
        show={showPreferences}
        preferences={preferences}
        onPreferencesChange={setPreferences}
        onSave={handleSavePreferences}
        onClose={() => setShowPreferences(false)}
      />
    </div>
  );
}

function PreferencesModal({
  show,
  preferences,
  onPreferencesChange,
  onSave,
  onClose,
}: {
  show: boolean;
  preferences: Preferences;
  onPreferencesChange: (prefs: Preferences) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Your Preferences</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Monthly Budget: ${preferences.minPrice} - ${preferences.maxPrice}
              </label>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600">Min Price</label>
                  <input
                    type="range"
                    min="500"
                    max="2000"
                    step="50"
                    value={preferences.minPrice}
                    onChange={(e) =>
                      onPreferencesChange({ ...preferences, minPrice: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Max Price</label>
                  <input
                    type="range"
                    min="500"
                    max="2000"
                    step="50"
                    value={preferences.maxPrice}
                    onChange={(e) =>
                      onPreferencesChange({ ...preferences, maxPrice: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => onPreferencesChange({ ...preferences, beds: num })}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      preferences.beds === num
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Commute Mode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Commute Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { mode: "walking", icon: "🚶", label: "Walking" },
                  { mode: "biking", icon: "🚴", label: "Biking" },
                  { mode: "driving", icon: "🚗", label: "Driving" },
                  { mode: "bus", icon: "🚌", label: "Bus" },
                ].map(({ mode, icon, label }) => (
                  <button
                    key={mode}
                    onClick={() =>
                      onPreferencesChange({
                        ...preferences,
                        commuteMode: mode as any,
                      })
                    }
                    className={`py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      preferences.commuteMode === mode
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="text-xl">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Commute Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Max Commute Time: {preferences.maxCommuteTime} minutes
              </label>
              <input
                type="range"
                min="5"
                max="45"
                step="5"
                value={preferences.maxCommuteTime}
                onChange={(e) =>
                  onPreferencesChange({
                    ...preferences,
                    maxCommuteTime: parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 min</span>
                <span>45 min</span>
              </div>
            </div>

            {/* Liveliness */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Neighborhood Vibe
              </label>
              <div className="flex gap-2">
                {[
                  { val: 1, label: "😴 Quiet" },
                  { val: 2, label: "🤫 Calm" },
                  { val: 3, label: "😊 Moderate" },
                  { val: 4, label: "🎉 Lively" },
                  { val: 5, label: "🔥 Party" },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    onClick={() =>
                      onPreferencesChange({
                        ...preferences,
                        liveliness: val as 1 | 2 | 3 | 4 | 5,
                      })
                    }
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                      preferences.liveliness === val
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg"
            >
              Save & Start Swiping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function SwipeCard({
  listing,
  onLike,
  onNope,
  exitDirection,
  getLivelinessLabel,
  score,
  style,
}: {
  listing: Listing & { score: number };
  onLike: () => void;
  onNope: () => void;
  exitDirection: "left" | "right" | null;
  getLivelinessLabel: (score: number) => string;
  score: number;
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
      <ListingCard listing={listing} showOverlay getLivelinessLabel={getLivelinessLabel} score={score} x={x} />
    </motion.div>
  );
}

function ListingCard({
  listing,
  showOverlay = false,
  getLivelinessLabel,
  score,
  x,
}: {
  listing: Listing & { score?: number };
  showOverlay?: boolean;
  getLivelinessLabel?: (score: number) => string;
  score?: number;
  x?: any;
}) {
  const likeOpacity = x ? useTransform(x, [0, 120], [0, 1]) : undefined;
  const nopeOpacity = x ? useTransform(x, [-120, 0], [1, 0]) : undefined;

  const getMatchColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-gray-400";
  };

  const getMatchLabel = (score: number) => {
    if (score >= 80) return "Great Match";
    if (score >= 60) return "Good Match";
    if (score >= 40) return "Fair Match";
    return "Poor Match";
  };

  return (
    <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      {/* Photo Placeholder */}
      <div className="h-64 bg-gray-100 flex items-center justify-center relative">
        <div className="text-6xl opacity-20">🏠</div>

        {/* Match Score Badge */}
        {score !== undefined && (
          <div className="absolute top-4 right-4">
            <div className={`${getMatchColor(score)} text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5`}>
              <span>{score}%</span>
            </div>
          </div>
        )}

        {/* Swipe Overlays */}
        {showOverlay && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute inset-0 bg-green-500/50 flex items-center justify-center"
            >
              <div className="text-white text-6xl font-bold transform rotate-12 border-4 border-white px-6 py-3 rounded-xl bg-green-500/80">
                LIKE
              </div>
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute inset-0 bg-red-500/50 flex items-center justify-center"
            >
              <div className="text-white text-6xl font-bold transform -rotate-12 border-4 border-white px-6 py-3 rounded-xl bg-red-500/80">
                PASS
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Name & Price */}
        <div>
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{listing.name}</h2>
            {score !== undefined && (
              <span className={`text-xs font-semibold ${getMatchColor(score)} text-white px-2 py-1 rounded`}>
                {getMatchLabel(score)}
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            ${listing.price}
            <span className="text-base text-gray-500 font-normal">/month</span>
          </div>
        </div>

        {/* Floorplan */}
        <div className="flex items-center gap-2 text-gray-700">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="font-medium">
            {listing.floorplan.beds} bed • {listing.floorplan.baths} bath
          </span>
        </div>

        {/* Distance & Commute Times */}
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Distance to UF
            </p>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{listing.distance} mi</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🚶</span>
              <span>{listing.commuteMins.walking} min</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🚴</span>
              <span>{listing.commuteMins.biking} min</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🚗</span>
              <span>{listing.commuteMins.driving} min</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🚌</span>
              <span>{listing.commuteMins.bus} min</span>
            </div>
          </div>
        </div>

        {/* Liveliness */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-500">Neighborhood</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-6 rounded-sm ${
                    level <= listing.liveliness ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {getLivelinessLabel && getLivelinessLabel(listing.liveliness)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
