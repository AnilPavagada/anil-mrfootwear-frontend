import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Footprints, MessageCircle } from 'lucide-react'

const styles = [
  {
    name: "Men's Running Shoes",
    label: "MEN'S | ACTIVE",
    tone: 'from-[#e8edf2] to-[#cdd8e2]',
  },
  {
    name: "Women's Everyday Sneakers",
    label: "WOMEN'S | EVERYDAY",
    tone: 'from-[#f2e8e9] to-[#e5ccce]',
  },
  {
    name: 'Sports Shoes',
    label: 'SPORT | COMFORT',
    tone: 'from-[#e6ece4] to-[#cbd8c5]',
  },
  {
    name: 'Casual Sandals',
    label: "MEN'S | CASUAL",
    tone: 'from-[#f1e7db] to-[#dfcbb3]',
  },
  {
    name: "Kids' Everyday Shoes",
    label: 'KIDS | DAILY WEAR',
    tone: 'from-[#f3eddc] to-[#e5d8b8]',
  },
]

const whatsappLinkFor = (name) =>
  `https://wa.me/919449632966?text=${encodeURIComponent(
    `Hello MR Footwear, please share the current availability and price for ${name}.`
  )}`

function LatestCollection() {
  const stylesRef = useRef(null)

  const scrollStyles = (direction) => {
    const container = stylesRef.current
    if (!container) return

    container.scrollBy({
      left: direction * container.clientWidth * 0.8,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="latest-collection"
      aria-labelledby="latest-collection-heading"
      className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
          <header>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              Featured
            </p>
            <h2
              id="latest-collection-heading"
              className="mt-1 text-2xl font-black uppercase tracking-wide text-gray-950 sm:text-3xl"
            >
              Our Latest Collection
            </h2>
            <span className="mt-3 block h-1 w-12 rounded-full bg-orange-500" />
          </header>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollStyles(-1)}
              aria-label="Scroll to previous styles"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollStyles(1)}
              aria-label="Scroll to more styles"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={stylesRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] [scrollbar-color:#f97316_#e5e7eb]"
        >
          {styles.map(({ name, label, tone }) => (
            <article
              key={name}
              className="w-[78%] min-w-[240px] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-[42%] sm:min-w-[250px] lg:w-[calc((100%-4rem)/5)] lg:min-w-[210px] lg:max-w-none"
            >
              <div
                className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${tone} sm:h-56`}
              >
                <span
                  aria-hidden="true"
                  className="absolute h-36 w-36 rounded-full border border-white/40 bg-white/25 blur-sm"
                />
                <span
                  aria-hidden="true"
                  className="absolute h-28 w-28 rounded-full border border-white/50"
                />
                <Footprints
                  size={78}
                  strokeWidth={1.25}
                  aria-hidden="true"
                  className="relative -rotate-12 text-gray-800 drop-shadow-sm transition-transform duration-300 hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                  NEW STYLE
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <p className="text-[10px] font-bold tracking-[0.14em] text-orange-600">
                  {label}
                </p>
                <h3 className="mt-2 min-h-11 text-sm font-bold leading-5 text-gray-950 sm:text-base">
                  {name}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Ask us for current availability and price.
                </p>
                <a
                  href={whatsappLinkFor(name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
                >
                  <MessageCircle size={15} />
                  Enquire on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-2 text-center text-xs text-gray-500">
          Styles and availability may vary. Contact us for the latest stock and pricing.
        </p>
      </div>
    </section>
  )
}

export default LatestCollection
