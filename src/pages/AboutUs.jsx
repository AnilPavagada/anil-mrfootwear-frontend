import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  ImagePlus,
  MapPin,
  Users,
} from 'lucide-react'

const values = [
  {
    icon: BadgeCheck,
    title: 'Quality choices',
    description:
      'Footwear selected with comfort, style and everyday use in mind.',
  },
  {
    icon: HeartHandshake,
    title: 'Friendly service',
    description:
      'A welcoming team ready to help you find a pair that feels right.',
  },
  {
    icon: Users,
    title: 'For the whole family',
    description:
      'Styles and choices for men, women and kids, all in one place.',
  },
]

function AboutUs() {
  return (
    <div className="bg-white">
      <section className="overflow-hidden bg-[#101010] px-5 py-12 text-white sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-400">
              <a href="/" className="transition hover:text-orange-400">
                Home
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-orange-400">About Us</span>
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-400">
              Step into comfort
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              About
              <span className="block text-orange-500">MR Footwear</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">
              We help people in Pavagada find footwear for their everyday
              journeys, special occasions and everyone in the family.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Visit our store
              <ArrowRight size={17} />
            </a>
          </div>

          <figure
            aria-label="Space for an MR Footwear store or collection photo"
            className="relative mx-auto w-full max-w-2xl"
          >
            <div className="relative flex aspect-[4/3] min-h-64 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_75%_25%,rgba(249,115,22,0.28),transparent_35%),linear-gradient(135deg,#252525,#111111_65%,#26160f)] shadow-2xl shadow-black/40 sm:min-h-80">
              <div
                aria-hidden="true"
                className="absolute inset-5 rounded-2xl border border-dashed border-white/20 sm:inset-8"
              />
              <div className="relative flex max-w-xs flex-col items-center px-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-500/10 text-orange-400">
                  <ImagePlus size={30} strokeWidth={1.6} />
                </span>
                <p className="mt-5 text-lg font-bold text-white">
                  Your store photo goes here
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Replace this space with a photo of your store, team or latest
                  footwear collection.
                </p>
              </div>
              <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-300 sm:bottom-6 sm:right-6">
                MR Footwear · Pavagada
              </span>
            </div>
          </figure>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              Who we are
            </p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
              A step towards
              <span className="block text-orange-600">quality & trust.</span>
            </h2>
            <span className="mt-4 block h-1 w-12 rounded-full bg-orange-500" />
          </div>

          <div className="max-w-3xl">
            <p className="text-base leading-8 text-gray-700">
              MR Footwear is a local footwear store in Pavagada, Karnataka. We
              bring together styles for men, women and kids, with options for
              daily wear, work and special occasions.
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              We believe choosing shoes should feel simple and comfortable.
              That is why we focus on useful choices, friendly assistance and
              helping each customer find a pair that suits their needs.
            </p>
            <a
              href="https://maps.app.goo.gl/Y5uVFLi93FuzUq59A"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700"
            >
              <MapPin size={17} />
              Find us in Pavagada
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f7f5] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              What matters to us
            </p>
            <h2 className="mt-2 text-2xl font-black text-gray-950 sm:text-3xl">
              More than just a pair
            </h2>
          </header>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Icon size={23} />
                </span>
                <h3 className="mt-4 text-base font-bold text-gray-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
