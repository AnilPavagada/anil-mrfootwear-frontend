import { MessageCircle, Star } from 'lucide-react'

const reviews = [
  {
    name: 'Ravi K.',
    initials: 'RK',
    category: 'Comfort & quality',
    quote:
      'Great collection and comfortable footwear. The team helped me choose a pair that feels right for everyday wear.',
  },
  {
    name: 'Anitha R.',
    initials: 'AR',
    category: 'Friendly service',
    quote:
      'I found stylish options at a good price, and the staff made the shopping experience easy and welcoming.',
  },
  {
    name: 'Suresh M.',
    initials: 'SM',
    category: 'Great selection',
    quote:
      'There are plenty of choices for the family. It was easy to find something for different styles and occasions.',
  },
]

const whatsappLink = `https://wa.me/919449632966?text=${encodeURIComponent(
  'Hello MR Footwear, I would like to share my shopping experience.'
)}`

function Reviews() {
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
            Customer stories
          </p>
          <h1
            id="reviews-heading"
            className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
          >
            Steps made <span className="text-orange-500">better.</span>
          </h1>
          <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
            A great pair is only part of the experience. Here are a few sample
            notes about the comfort, selection and service at MR Footwear.
          </p>
        </header>

        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/[0.06] sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className="flex gap-1 text-orange-400"
                  aria-label="5 out of 5 stars (sample review)"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-orange-300">
                  Sample review
                </span>
              </div>

              <p className="mt-5 flex-1 text-sm leading-7 text-gray-300">
                “{review.quote}”
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-xs font-bold text-orange-300">
                  {review.initials}
                </span>
                <div>
                  <h2 className="text-sm font-bold text-white">{review.name}</h2>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {review.category}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-gray-500">
          These are sample reviews. Replace them with verified customer
          feedback before publishing.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <MessageCircle size={18} />
            Share your experience
          </a>
        </div>
      </div>
    </section>
  )
}

export default Reviews
