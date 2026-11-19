
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react'

// Import your three hero images
import HEROONE from  '../../assets/image/HEROONE.jpeg'
import HEROTWO from '../../assets/image/HEROTWO.jpeg'
import HEROTHREE from '../../assets/image/HEROTHREE.jpeg'

const slides = [
  {
    image: HEROONE,
    tag: 'STEP INTO STYLE',
    title: 'Find Your',
    highlight: 'Perfect Pair.',
    description:
      'Discover footwear that matches your personality. Explore stylish designs made for comfort and confidence.',
  },
  {
    image: HEROTWO,
    tag: 'WALK WITH CONFIDENCE',
    title: 'Style That',
    highlight: 'Moves You.',
    description:
      'From everyday sneakers to stylish footwear, find the perfect match for every occasion.',
  },
  {
    image: HEROTHREE,
    tag: 'YOUR STYLE JOURNEY',
    title: 'Every Step',
    highlight: 'Feels Better.',
    description:
      'Upgrade your footwear collection with fresh designs, great comfort and styles you will love.',
  },
]

const HeroSection = () => {
  const [current, setCurrent] = useState(0)

  const whatsappNumber = '919449632966'

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello MR Footwear, I would like to know more about your footwear collection.'
  )}`

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Automatic image slider
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-[#f8f7f4]">

      <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-20">

        {/* LEFT CONTENT */}
        <div className="relative z-10 mx-auto w-full max-w-xl">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />

            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700 sm:text-xs">
              {slides[current].tag}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl xl:text-7xl">
            {slides[current].title}

            <span className="block text-orange-500">
              {slides[current].highlight}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
            {slides[current].description}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

            <a
              href="/products"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gray-950 px-7 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500"
            >
              Explore Collection

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-7 py-4 text-sm font-bold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:text-orange-500"
            >
              <MapPin size={18} />
              Visit Store
            </a>

          </div>

          {/* WhatsApp Link */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-800"
          >
            <MessageCircle size={19} />
            Chat with us on WhatsApp
          </a>

          {/* Features */}
          <div className="mt-10 grid grid-cols-2 gap-5 border-t border-gray-200 pt-7 sm:grid-cols-3">

            <div className="flex items-center gap-3">
              <ShieldCheck
                className="shrink-0 text-orange-500"
                size={25}
              />

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Quality
                </p>
                <p className="text-xs text-gray-500">
                  You can trust
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Star
                className="shrink-0 text-orange-500"
                size={25}
              />

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Latest Styles
                </p>
                <p className="text-xs text-gray-500">
                  Made for you
                </p>
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
              <Truck
                className="shrink-0 text-orange-500"
                size={25}
              />

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Great Choices
                </p>
                <p className="text-xs text-gray-500">
                  Every occasion
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE SLIDER */}
        <div className="relative mx-auto w-full max-w-xl">

          {/* Background Decoration */}
          <div className="absolute -right-5 top-10 h-64 w-64 rounded-full bg-orange-200/60 blur-3xl sm:h-80 sm:w-80" />

          {/* Image Container */}
          <div className="relative rounded-3xl bg-white p-2.5 shadow-xl shadow-gray-300/40 sm:p-3">

            <div className="relative overflow-hidden rounded-2xl">

              {/* Slider */}
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {slides.map((slide, index) => (
                  <img
                    key={slide.image}
                    src={slide.image}
                    alt={`MR Footwear collection ${index + 1}`}
                    className="h-[300px] w-full shrink-0 object-cover sm:h-[400px] md:h-[450px] lg:h-[480px]"
                  />
                ))}
              </div>

              {/* Image Caption */}
              <div className="absolute bottom-5 left-5 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:px-5 sm:py-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500 sm:text-xs">
                  MR FOOTWEAR
                </p>

                <p className="mt-1 text-base font-extrabold text-gray-950 sm:text-lg">
                  Walk With Confidence
                </p>
              </div>

              {/* Previous Button */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-orange-500 hover:text-white sm:left-4 sm:h-11 sm:w-11"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-orange-500 hover:text-white sm:right-4 sm:h-11 sm:w-11"
              >
                <ChevronRight size={22} />
              </button>

              {/* Slider Dots */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === index
                        ? 'w-7 bg-orange-500'
                        : 'w-2 bg-white/80 hover:bg-orange-300'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* Floating Label */}
          <div className="absolute -right-1 -top-4 rounded-xl bg-gray-950 px-4 py-3 text-white shadow-lg sm:-right-5 sm:px-5">
            <p className="text-xs font-medium text-gray-300">
              Your Style
            </p>

            <p className="text-sm font-bold">
              Your Every Step
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
