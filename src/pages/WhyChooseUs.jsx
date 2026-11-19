import {
  BadgeCheck,
  HeartHandshake,
  MapPin,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react'

const reasons = [
  {
    icon: Sparkles,
    title: 'Fresh styles',
    description:
      'Explore footwear for everyday wear, work, celebrations and everything in between.',
  },
  {
    icon: BadgeCheck,
    title: 'Comfort and quality',
    description:
      'Find thoughtfully selected styles made to feel good through your day.',
  },
  {
    icon: Wallet,
    title: 'Options for your budget',
    description:
      'Choose from a range of footwear styles and prices for your needs.',
  },
  {
    icon: Users,
    title: 'For the whole family',
    description:
      'Shop for men, women and kids in one convenient place.',
  },
  {
    icon: HeartHandshake,
    title: 'Friendly help',
    description:
      'Our team is here to help you explore styles and find the right pair.',
  },
  {
    icon: MapPin,
    title: 'Local and convenient',
    description:
      'Visit MR Footwear at the New Bus Stand in Pavagada, Karnataka.',
  },
]

function WhyChooseUs({ variant = 'page' }) {
  const isHomeSection = variant === 'home'
  const Heading = isHomeSection ? 'h2' : 'h1'

  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="relative isolate overflow-hidden bg-[#090909] px-5 py-14 text-white sm:px-8 sm:py-18 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-orange-600/15 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-400 sm:text-sm">
            The MR Footwear difference
          </p>
          <Heading
            id="why-choose-us-heading"
            className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
          >
            Why choose <span className="text-orange-500">MR Footwear?</span>
          </Heading>
          <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
            We make it easier to find footwear you love, with styles for the
            family and friendly help when you need it.
          </p>
        </header>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-12 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/[0.07] sm:p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white">
                <Icon size={23} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-white/[0.04] to-white/[0.04] p-5 sm:grid-cols-3 sm:p-7">
          <div className="sm:border-r sm:border-white/10 sm:pr-5">
            <p className="text-sm font-bold text-orange-400">For every day</p>
            <p className="mt-1 text-sm text-gray-400">
              Everyday comfort and styles for special moments.
            </p>
          </div>
          <div className="sm:border-r sm:border-white/10 sm:px-5">
            <p className="text-sm font-bold text-orange-400">For everyone</p>
            <p className="mt-1 text-sm text-gray-400">
              Footwear options for men, women and children.
            </p>
          </div>
          <div className="sm:pl-5">
            <p className="text-sm font-bold text-orange-400">Right here in Pavagada</p>
            <p className="mt-1 text-sm text-gray-400">
              Visit us at the New Bus Stand and shop in person.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/products"
            className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 sm:w-auto"
          >
            Explore collection
          </a>
          <a
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 px-5 py-3.5 text-sm font-bold text-white transition hover:border-orange-400 hover:text-orange-400 sm:w-auto"
          >
            Visit our store
          </a>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
