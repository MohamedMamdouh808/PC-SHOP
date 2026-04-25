import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Icons } from './Icons';
import { useAuth } from '../context/AuthContext';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function ProductReviews({ productId, reviews, averageRating, totalReviews }: ProductReviewsProps) {
  const { user } = useAuth();
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', comment: '' });
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'highest') return b.rating - a.rating;
    return a.rating - b.rating;
  });

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: totalReviews > 0 ? (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100 : 0,
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    console.log('Submitting review:', newReview);
    setIsWritingReview(false);
    setNewReview({ rating: 5, title: '', comment: '' });
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-surface-elevated rounded-2xl p-6 border border-white/5">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1 justify-center mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icons.Star
                  key={star}
                  size={20}
                  className={star <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}
                />
              ))}
            </div>
            <p className="text-slate-400 text-sm">{totalReviews} reviews</p>
          </div>

          <div className="flex-1 w-full max-w-md">
            {ratingCounts.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3 mb-2">
                <span className="text-sm text-slate-400 w-8">{rating}★</span>
                <div className="flex-1 h-2 bg-surface-base rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-slate-400 w-10 text-right">{count}</span>
              </div>
            ))}
          </div>

          <div className="text-center md:text-right">
            <button
              onClick={() => setIsWritingReview(!isWritingReview)}
              className="btn-primary px-6 py-3"
              disabled={!user}
            >
              {isWritingReview ? 'Cancel' : 'Write a Review'}
            </button>
            {!user && (
              <p className="text-xs text-slate-400 mt-2">Sign in to write a review</p>
            )}
          </div>
        </div>
      </div>

      {/* Write Review Form */}
      <AnimatePresence>
        {isWritingReview && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmitReview}
            className="bg-surface-elevated rounded-2xl p-6 border border-white/5 overflow-hidden"
          >
            <h3 className="text-xl font-bold text-white mb-4">Write a Review</h3>
            
            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="p-1"
                  >
                    <Icons.Star
                      size={24}
                      className={star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Title</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                className="w-full bg-surface-base border border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full bg-surface-base border border-white/10 rounded-lg px-4 py-2 text-white h-32 resize-none"
                placeholder="Share your thoughts about this product"
                required
              />
            </div>

            <button type="submit" className="btn-primary px-6 py-2">
              Submit Review
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Sort Dropdown */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Customer Reviews</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-surface-elevated border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-surface-elevated rounded-2xl p-6 border border-white/5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white">{review.userName}</span>
                  {review.verified && (
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icons.Star
                      key={star}
                      size={14}
                      className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-slate-400">
                {format(new Date(review.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
            <h4 className="font-bold text-white mb-2">{review.title}</h4>
            <p className="text-slate-300">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
