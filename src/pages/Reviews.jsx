import { useEffect, useState } from 'react'
import { Send, Star } from 'lucide-react'
import { REVIEWS_STORAGE_KEY } from '../utils/adminStorage'

const isStoredReview = (review) =>
  review !== null &&
  typeof review === 'object' &&
  typeof review.id === 'string' &&
  typeof review.name === 'string' &&
  typeof review.feedback === 'string' &&
  Number.isInteger(review.rating) &&
  review.rating >= 1 &&
  review.rating <= 5 &&
  typeof review.createdAt === 'string' &&
  !Number.isNaN(Date.parse(review.createdAt)) &&
  (review.status === undefined ||
    ['pending', 'approved', 'rejected'].includes(review.status))

function readStoredReviews() {
  let savedReviews

  try {
    savedReviews = window.localStorage.getItem(REVIEWS_STORAGE_KEY)
  } catch {
    return {
      reviews: [],
      error: 'Your browser blocked access to saved reviews.',
    }
  }

  if (!savedReviews) return { reviews: [], error: '' }

  let parsedReviews
  try {
    parsedReviews = JSON.parse(savedReviews)
  } catch {
    return { reviews: [], error: 'Saved review data could not be read.' }
  }

  if (!Array.isArray(parsedReviews) || !parsedReviews.every(isStoredReview)) {
    return {
      reviews: [],
      error: 'Saved review data is invalid and could not be displayed.',
    }
  }

  return { reviews: parsedReviews, error: '' }
}

function Reviews({ variant = 'page' }) {
  const isHomeSection = variant === 'home'
  const Heading = isHomeSection ? 'h2' : 'h1'

  const [savedReviewState, setSavedReviewState] = useState(readStoredReviews)
  const [name, setName] = useState('')
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(5)
  const [status, setStatus] = useState('')
  const reviews = savedReviewState.reviews
  const publicReviews = reviews.filter(
    (review) => (review.status || 'approved') === 'approved'
  )
  const storageError = savedReviewState.error

  useEffect(() => {
    const refreshReviews = () => setSavedReviewState(readStoredReviews())
    const handleStorage = (event) => {
      if (event.key === REVIEWS_STORAGE_KEY || event.key === null) {
        refreshReviews()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('focus', refreshReviews)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('focus', refreshReviews)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('')
    setSavedReviewState((currentState) => ({
      ...currentState,
      error: '',
    }))

    const trimmedName = name.trim()
    const trimmedFeedback = feedback.trim()

    if (!trimmedName || !trimmedFeedback) {
      setStatus('Please enter your name and feedback before submitting.')
      return
    }

    const nextReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: trimmedName,
      feedback: trimmedFeedback,
      rating,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }
    const updatedReviews = [nextReview, ...reviews]

    try {
      window.localStorage.setItem(
        REVIEWS_STORAGE_KEY,
        JSON.stringify(updatedReviews)
      )
    } catch {
      setSavedReviewState({
        reviews,
        error: 'Could not save your review in this browser. Please try again.',
      })
      return
    }

    setSavedReviewState({ reviews: updatedReviews, error: '' })
    setName('')
    setFeedback('')
    setRating(5)
    setStatus(
      'Thank you! Your review is saved and waiting for admin approval.'
    )
  }

  return (
    <section
      aria-labelledby="reviews-heading"
      className="relative isolate min-h-[70vh] overflow-hidden bg-[#080808] px-5 py-14 text-white sm:px-8 sm:py-18 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-orange-600/15 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-400 sm:text-sm">
            Customer feedback
          </p>
          <Heading
            id="reviews-heading"
            className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
          >
            Share your <span className="text-orange-500">experience.</span>
          </Heading>
          <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
            Tell us what you think about your visit, our service or your new
            footwear.
          </p>
        </header>

        <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:mt-10 lg:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-7"
          >
            <h2 className="text-xl font-bold text-white">Write a review</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Reviews are saved in this browser and appear publicly after admin
              approval.
            </p>

            <label
              htmlFor="review-name"
              className="mt-6 block text-sm font-semibold text-gray-200"
            >
              Your name
            </label>
            <input
              id="review-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={60}
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />

            <fieldset className="mt-5">
              <legend className="text-sm font-semibold text-gray-200">
                Your rating
              </legend>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 5 }, (_, index) => {
                  const starRating = index + 1

                  return (
                    <button
                      key={starRating}
                      type="button"
                      onClick={() => setRating(starRating)}
                      aria-label={`Rate ${starRating} out of 5 stars`}
                      aria-pressed={rating === starRating}
                      className="rounded p-1 text-orange-400 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-orange-400"
                    >
                      <Star
                        size={24}
                        fill={starRating <= rating ? 'currentColor' : 'none'}
                      />
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <label
              htmlFor="review-feedback"
              className="mt-5 block text-sm font-semibold text-gray-200"
            >
              Your feedback
            </label>
            <textarea
              id="review-feedback"
              name="feedback"
              rows={4}
              maxLength={600}
              required
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Share a few words about your experience..."
              className="mt-2 w-full resize-y rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
            <p className="mt-1 text-right text-xs text-gray-500">
              {feedback.length}/600
            </p>

            {storageError && (
              <p role="alert" className="mt-3 text-sm text-red-400">
                {storageError}
              </p>
            )}
            {status && (
              <p role="status" className="mt-3 text-sm text-orange-300">
                {status}
              </p>
            )}

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              <Send size={17} />
              Add your review
            </button>
          </form>

          <section aria-labelledby="recent-reviews-heading">
            <div className="flex items-center justify-between gap-3">
              <h2
                id="recent-reviews-heading"
                className="text-xl font-bold text-white"
              >
                Recent reviews
              </h2>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-400">
                {publicReviews.length}{' '}
                {publicReviews.length === 1 ? 'review' : 'reviews'}
              </span>
            </div>

            {publicReviews.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-10 text-center">
                <Star size={26} className="mx-auto text-orange-400" />
                <p className="mt-3 font-semibold text-white">
                  Be the first to share feedback
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Your review will appear here after you submit it.
                </p>
              </div>
            ) : (
              <div className="mt-4 max-h-[34rem] space-y-3 overflow-y-auto pr-1">
                {publicReviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-1 text-orange-400">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          size={15}
                          fill={index < review.rating ? 'currentColor' : 'none'}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="sr-only">{review.rating} out of 5 stars</span>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-gray-300">
                      {review.feedback}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
                      <p className="text-sm font-semibold text-white">
                        {review.name}
                      </p>
                      <time
                        dateTime={review.createdAt}
                        className="text-xs text-gray-500"
                      >
                        {new Date(review.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}

export default Reviews
