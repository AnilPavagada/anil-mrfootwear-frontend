import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'

const mapLink = 'https://maps.app.goo.gl/Y5uVFLi93FuzUq59A'

const whatsappLink = `https://wa.me/919449632966?text=${encodeURIComponent(
  'Hello MR Footwear, I would like to get in touch.'
)}`

const contactItems = [
  {
    icon: MapPin,
    title: 'Visit our store',
    detail: '#7 Municipal Complex, New Bus Stand, Pavagada, Karnataka 561202',
    href: mapLink,
  },
  {
    icon: Phone,
    title: 'Call us',
    detail: '+91 94496 32966',
    href: 'tel:+919449632966',
  },
  {
    icon: Mail,
    title: 'Email us',
    detail: 'mrfootwearpvg@gmail.com',
    href: 'mailto:mrfootwearpvg@gmail.com',
  },
  {
    icon: Clock3,
    title: 'Store hours',
    detail: 'Open every day, 9:00 AM – 9:00 PM',
  },
]

function ContactUs({ variant = 'page' }) {
  const isHomeSection = variant === 'home'
  const Heading = isHomeSection ? 'h2' : 'h1'

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#080808] px-5 py-14 text-white sm:px-8 sm:py-18 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-orange-600/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-36 -z-10 h-[28rem] w-[28rem] rounded-full bg-orange-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-2xl sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-400 sm:text-sm">
            {isHomeSection ? 'Come say hello' : 'We’re here to help'}
          </p>
          <Heading className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            {isHomeSection ? 'Let’s get you ' : 'Contact '}
            <span className="text-orange-500">
              {isHomeSection ? 'moving.' : 'MR Footwear'}
            </span>
          </Heading>
          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Questions about a pair, our collection, or store hours? Reach out
            to our team or stop by our Pavagada store. We’d be happy to help.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {contactItems.map(({ icon: Icon, title, detail, href }) => {
                const card = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400 transition group-hover:border-orange-500/50 group-hover:bg-orange-500 group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-white">
                        {title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-6 text-gray-400">
                        {detail}
                      </span>
                    </span>
                  </>
                )

                const className =
                  'group flex min-h-28 items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-white/[0.07] sm:p-5'

                return href ? (
                  <a
                    key={title}
                    href={href}
                    target={href === mapLink ? '_blank' : undefined}
                    rel={href === mapLink ? 'noopener noreferrer' : undefined}
                    className={className}
                  >
                    {card}
                  </a>
                ) : (
                  <div key={title} className={className}>
                    {card}
                  </div>
                )
              })}
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-green-700 sm:w-auto"
            >
              <MessageCircle size={19} />
              Chat with us on WhatsApp
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121212] p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                  Find us
                </p>
                <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Your next pair is nearby.
                </h3>
              </div>
              <MapPin className="shrink-0 text-orange-500" size={25} />
            </div>

            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open MR Footwear location in Google Maps"
              className="group relative mt-5 flex min-h-52 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#1a1b19] sm:min-h-64"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-60 [background-image:linear-gradient(28deg,transparent_47%,#353632_48%,#353632_50%,transparent_51%),linear-gradient(145deg,transparent_42%,#353632_43%,#353632_45%,transparent_46%),linear-gradient(90deg,transparent_48%,#2c2d2a_49%,#2c2d2a_51%,transparent_52%)] [background-size:120px_100px,160px_130px,190px_150px]"
              />
              <div className="absolute left-[17%] top-[23%] h-2 w-2 rounded-full bg-orange-500/80 shadow-[0_0_22px_8px_rgba(249,115,22,0.18)]" />
              <div className="absolute bottom-[22%] right-[18%] h-2 w-2 rounded-full bg-orange-500/80 shadow-[0_0_22px_8px_rgba(249,115,22,0.18)]" />

              <div className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-[#101010]/95 px-5 py-4 text-center shadow-xl transition group-hover:border-orange-500/50">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30">
                  <MapPin size={24} />
                </span>
                <span className="mt-3 text-sm font-bold text-white">
                  MR Footwear
                </span>
                <span className="mt-1 max-w-52 text-xs leading-5 text-gray-400">
                  #7 Municipal Complex, New Bus Stand, Pavagada
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-orange-400">
                  Open in Google Maps
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </a>

            <div className="mt-4 flex flex-col justify-between gap-3 text-sm sm:flex-row sm:items-center">
              <p className="text-gray-400">Pavagada, Karnataka 561202</p>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-orange-400 transition hover:text-orange-300"
              >
                Get directions <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
