import { useEffect, useState } from 'react'
import heroOne from '../../assets/image/HEROONE.jpeg'
import heroTwo from '../../assets/image/HEROTWO.jpeg'
import heroThree from '../../assets/image/HEROTHREE.jpeg'

const slides = [
  {
    image: heroOne,
    eyebrow: 'Welcome to',
    title: 'MR FOOTWEAR',
    description: 'Quality Footwear for Men, Women & Kids',
  },
  {
    image: heroTwo,
    eyebrow: 'Shop Our',
    title: 'LATEST COLLECTION',
    description: 'Comfortable, stylish footwear for every occasion',
  },
  {
    image: heroThree,
    eyebrow: 'Built on',
    title: 'QUALITY & TRUST',
    description: 'Discover the right pair from trusted brands',
  },
]

function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((slide) => (slide + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const showPrevious = () => {
    setCurrent((slide) => (slide - 1 + slides.length) % slides.length)
  }

  const showNext = () => {
    setCurrent((slide) => (slide + 1) % slides.length)
  }

  return (
    <section className="relative h-[520px] overflow-hidden bg-[#171b30] text-white sm:h-[620px]">
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            current === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url("${slide.image}")` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/95 via-[#111827]/75 to-[#111827]/10" />

      <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-5 sm:px-8 lg:px-16">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
            {slides[current].eyebrow}
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
            {slides[current].title}
          </h1>
          <p className="mt-5 max-w-md text-base text-gray-200 sm:text-xl">
            {slides[current].description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/products"
              className="rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Shop Collection
            </a>
            <a
              href="/contact"
              className="rounded-lg border border-white/50 px-6 py-3.5 text-sm font-bold text-white transition hover:border-orange-400 hover:text-orange-400"
            >
              Visit Store
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={showPrevious}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur transition hover:bg-orange-500 sm:left-6"
      >
        &#8249;
      </button>

      <button
        type="button"
        onClick={showNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur transition hover:bg-orange-500 sm:right-6"
      >
        &#8250;
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              current === index ? 'w-8 bg-orange-500' : 'w-2.5 bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
