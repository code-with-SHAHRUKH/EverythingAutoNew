'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Play, Pause, Quote } from 'lucide-react';
import Image from "next/image";
import { getGoogleReviews } from '@/http/api';
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from '@/utils/motion';
type Review = {
  author_name: string;
  text?: string;
  rating: number;
  time: number;
  relative_time_description?: string;
  profile_photo_url?: string;
  author_url?: string;
  language?: string;
};

type GoogleReviewsResponse = {
  reviews: Review[];
  rating?: number;
  user_ratings_total?: number;
  place_id?: string;
  place_name?: string;
};

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsPerView, setReviewsPerView] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [googleRating, setGoogleRating] = useState(5);
  const [totalRatings, setTotalRatings] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
// Track ki konsa review expanded hai (index handle karega)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  // ✅ Run Google Ads conversion config only once
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", "AW-17073409546/IXiOCMjWqsgaEIqcns0_", {
        phone_conversion_number: "5167759724",
      });
    }
  }, []);

  // ✅ Fetch reviews from API
  useEffect(() => {
  const fetchReviews = async () => {
    try {
      setLoading(true);

      // ✅ Fetch data from centralized API handler
      const data: GoogleReviewsResponse = await getGoogleReviews();

      if (!data?.reviews || !Array.isArray(data.reviews)) {
        throw new Error("Invalid data format from API");
      }

      // ✅ Filter only 5-star reviews
      const fiveStarReviews = data.reviews.filter(
        (review) => review.rating === 5
      );

      setReviews(fiveStarReviews);
      setGoogleRating(data.rating || 5);
      setTotalRatings(data.user_ratings_total || data.reviews.length);

      console.log("Total reviews from API:", data.reviews.length);
      console.log("5-star reviews:", fiveStarReviews.length);
    } catch (error) {
      console.error("Error fetching Google Reviews:", error);
      // Optionally: fallback data
      // setReviews(mockReviews);
    } finally {
      setLoading(false);
    }
  };

  fetchReviews();
}, []);
const toggleReadMore = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
  // Responsive reviews per view
  useEffect(() => {
    const updateReviewsPerView = () => {
      if (window.innerWidth >= 1024) {
        setReviewsPerView(3); // Desktop: 3 reviews
      } else if (window.innerWidth >= 768) {
        setReviewsPerView(2); // Tablet: 2 reviews
      } else {
        setReviewsPerView(1); // Mobile: 1 review
      }
    };

    updateReviewsPerView();
    window.addEventListener('resize', updateReviewsPerView);
    
    return () => window.removeEventListener('resize', updateReviewsPerView);
  }, []);

  // ✅ Force carousel mode when we have enough reviews
  const shouldShowCarousel = reviews.length > reviewsPerView;

  // ✅ Auto-play carousel with enhanced functionality
  useEffect(() => {
    if (!shouldShowCarousel || !isAutoPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // If we would go beyond the available reviews, cycle back to start
        return nextIndex > reviews.length - reviewsPerView ? 0 : nextIndex;
      });
    }, 4000); // Change every 4 seconds for better engagement

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [shouldShowCarousel, reviews.length, reviewsPerView, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // If we would go beyond the available reviews, cycle back to start
      return nextIndex > reviews.length - reviewsPerView ? 0 : nextIndex;
    });
    // Pause auto-play briefly when user interacts
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = prevIndex - 1;
      // If we would go below 0, cycle to the last possible position
      return prevIndexNew < 0 ? Math.max(0, reviews.length - reviewsPerView) : prevIndexNew;
    });
    // Pause auto-play briefly when user interacts
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => (
    <div className="flex justify-center mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const visibleReviews = reviews.slice(currentIndex, currentIndex + reviewsPerView);
  
  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-b from-slate-50 via-white to-blue-50/60 py-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
              Customer love
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950 lg:text-5xl">
              What Our Customers Say
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/60 py-20">
      <div className="relative mx-auto max-w-screen-xl px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.45)]" />
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-800">
              Testimonials
            </p>
          </div>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950 lg:text-5xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[var(--color-text-light)]">
            We&apos;re proud of our 5-star rating on Google. Here&apos;s what our
            satisfied customers have to say about their experience.
          </p>
          <div className="mx-auto mt-7 flex w-fit flex-wrap items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-2">
              <strong className="text-2xl font-black text-slate-950">{googleRating.toFixed(1)}</strong>
              <div className="flex" aria-label={`${googleRating} out of 5 stars`}>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <span className="h-5 w-px bg-slate-200" />
            <span className="text-sm font-semibold text-slate-600">
              {totalRatings > 0 ? `${totalRatings.toLocaleString()} Google reviews` : "5-star service"}
            </span>
          </div>
        </div>

        {/* Carousel Container */}
        {reviews.length > 0 && (
          <div className="relative mb-12">
            {/* Auto-play Controls */}
            {/* Auto-play Controls - Hidden on Mobile */}
{shouldShowCarousel && (
  <div className="mb-6 flex justify-center">
    <button
      onClick={toggleAutoPlay}
      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
      aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
    >
      {isAutoPlaying ? (
        <Pause className="h-4 w-4" />
      ) : (
        <Play className="h-4 w-4" />
      )}
      <span className="text-sm font-semibold">
        {isAutoPlaying ? 'Auto-play: On' : 'Auto-play: Off'}
      </span>
    </button>
  </div>
)}


            {/* Navigation Buttons - Always show when carousel is enabled */}
            {/* {shouldShowCarousel && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  aria-label="Previous reviews"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  aria-label="Next reviews"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </>
            )} */}

            {/* Reviews Grid */}
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <AnimatePresence mode="wait">
              {visibleReviews.map((review, index) => {
                              const isExpanded = expandedIndex === index;
              
                              return (
                                  <motion.div
                                      key={index}
                                      variants={fadeIn("up", "spring", index * 0.4, 0.75)}
                                  >
                                      <div className="flex justify-center p-0 font-sans">
                                          <div className="flex w-full max-w-sm flex-col md:max-w-md">
              
                                              {/* Review Bubble Card */}
                                              <motion.div
                                                  whileHover={{ scale: 1.02 }}
                                                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                  className="relative mb-5 flex min-h-[285px] w-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_10px_25px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_18px_35px_rgba(30,64,175,0.14)]"
                                              >
                                                  <div>
                                                      {/* Star Rating */}
                                                      <div className="flex justify-center space-x-1 mb-3">
                                                          {[...Array(5)].map((_, i) => (
                                                              <Star
                                                                  key={i}
                                                                  className={`w-5 h-5 ${i < review.rating
                                                                          ? "text-yellow-400 fill-current"
                                                                          : "text-gray-300"
                                                                      }`}
                                                              />
                                                          ))}
                                                      </div>
              
                                                      {/* Review Text with 4-line Clamp & Read More */}
                                                      <Quote className="absolute right-6 top-5 h-8 w-8 text-blue-100 pointer-events-none" />
                                                      
                                                      <p className={`text-center text-lg leading-relaxed text-slate-700 italic ${
                                                          !isExpanded ? 'line-clamp-3' : ''
                                                      }`}>
                                                          &quot;{review.text}&quot;
                                                      </p>
              
                                                      {/* Read More / Show Less Button */}
                                                      {(review?.text?.length ?? 0) > 120 && (
                                                          <div className="text-center mt-2">
                                                              <button
                                                                  onClick={() => toggleReadMore(index)}
                                                                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 focus:outline-none underline"
                                                              >
                                                                  {isExpanded ? "Show Less" : "Read More"}
                                                              </button>
                                                          </div>
                                                      )}
                                                  </div>
              
                                                  {/* Bubble Tail */}
                                                  <div className="absolute left-8 -bottom-2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-200">
                                                  </div>
                                              </motion.div>
              
                                              {/* User Info Section */}
                                              <div className="flex items-center space-x-3 ml-2 px-1">
                                                  <Image
                                                      src={review?.profile_photo_url || "/mypic.png"}
                                                      alt={review.author_name}
                                                      width={48}
                                                      height={48}
                                                      className="rounded-full border border-blue-200 object-cover shadow-sm ring-2 ring-white"
                                                  />
                                                  <div className="flex flex-col text-left">
                                                      <span className="text-lg font-bold text-slate-900">
                                                          {review.author_name}
                                                      </span>
                                                      <span className="text-sm text-gray-500">
                                                          {review.time
                                                              ? new Date(review.time * 1000).toLocaleDateString('en-US', {
                                                                  year: 'numeric',
                                                                  month: 'long',
                                                                  day: 'numeric',
                                                              })
                                                              : review.relative_time_description || 'Recently'}
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </motion.div>
                              );
                          })}
              </AnimatePresence>
            </div>

            {/* Enhanced Carousel Indicators */}
            {shouldShowCarousel && (
              <div className="flex flex-col items-center mt-8 space-y-4">
                {/* Progress Bar */}
                <div className="w-full max-w-md bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${((currentIndex + reviewsPerView) / reviews.length) * 100}%` 
                    }}
                  />
                </div>
                
                {/* Indicator Dots */}
                <div className="flex justify-center space-x-2">
                  {Array.from({ length: Math.ceil(reviews.length / reviewsPerView) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index * reviewsPerView);
                        // Pause auto-play briefly when user interacts
                        setIsAutoPlaying(false);
                        setTimeout(() => setIsAutoPlaying(true), 10000);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        Math.floor(currentIndex / reviewsPerView) === index
                          ? 'bg-red-600 scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Review Counter */}
                <div className="text-sm text-gray-500">
                  Showing {currentIndex + 1}-{Math.min(currentIndex + reviewsPerView, reviews.length)} of {reviews.length} reviews
                </div>
              </div>
            )}
          </div>
        )}

        {/* Button */}
        <div className="text-center">
          <a
            href="https://www.google.com/search?q=everything+auto+franklin+square+reviews"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              style={{
                boxShadow:
                  "inset 0 -2px 5px rgba(249, 195, 195, 0.57), inset 0 2px 5px rgba(19, 19, 19, 0.4), 0 8px 14px rgba(0, 0, 0, 0.22)",
              }}
              size="lg"
              className="action-button action-button-call text-lg px-8 py-4"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Read More Reviews
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
