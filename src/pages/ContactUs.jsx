import { Clock3, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'

const whatsappLink = `https://wa.me/919449632966?text=${encodeURIComponent(
  'Hello MR Footwear, I would like to get in touch.'
)}`

const mapLink =
  'https://www.google.com/maps/search/?api=1&query=MR+Footwear+Pavagada'

const contactItems = [
  {
    icon: MapPin,
    title: 'Visit Our Store',
    content: (
      <>
        #7 Municipal Complex, New Bus Stand
        <br />
        Pavagada, Karnataka 561202
      </>
    ),
    href: mapLink,
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 94496 32966',
    href: 'tel:+919449632966',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'mrfootwearpvg@gmail.com',
    href: 'mailto:mrfootwearpvg@gmail.com',
  },
  {
    icon: Clock3,
    title: 'Opening Hours',
    content: (
      <>
        Every day
        <br />
        9:00 AM – 9:00 PM
      </>
    ),
  },
]

function ContactUs() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#111111] px-5 py-16 text-white sm:py-20">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-400">
            We’re here to help
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
            Have a question about our footwear or need help finding the right
            pair? Get in touch or visit our store in Pavagada.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section aria-labelledby="contact-details-heading">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              Get in touch
            </p>
            <h2
              id="contact-details-heading"
              className="mt-2 text-2xl font-bold text-gray-950 sm:text-3xl"
            >
              We’d love to hear from you
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600">
              Our team is happy to help with store information, product
              availability and footwear enquiries.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contactItems.map(({ icon: Icon, title, content, href }) => {
                const details = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                      <Icon size={21} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-gray-900">
                        {title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-gray-600">
                        {content}
                      </span>
                    </span>
                  </>
                )

                return (
                  <div
                    key={title}
                    className="flex min-h-28 items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    {href ? (
                      <a
                        href={href}
                        className="flex items-start gap-4 focus-visible:outline-2 focus-visible:outline-orange-500"
                      >
                        {details}
                      </a>
                    ) : (
                      details
                    )}
                  </div>
                )
              })}
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-green-700"
            >
              <MessageCircle size={19} />
              Chat with us on WhatsApp
            </a>
          </section>

          <section
            aria-labelledby="store-location-heading"
            className="flex min-h-80 flex-col justify-between overflow-hidden rounded-2xl bg-gray-100 p-6 sm:p-8"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                Find us
              </p>
              <h2
                id="store-location-heading"
                className="mt-2 text-2xl font-bold text-gray-950"
              >
                Visit our store
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
                Drop by to explore our latest collection and get help from our
                friendly team.
              </p>
            </div>

            <div className="relative mt-8 flex min-h-48 items-center justify-center overflow-hidden rounded-xl border border-orange-100 bg-[radial-gradient(ellipse_at_20%_20%,#fff_0%,#fff_22%,transparent_23%),radial-gradient(ellipse_at_80%_70%,#fff_0%,#fff_24%,transparent_25%),linear-gradient(135deg,#f6eadb,#e6eee4)]">
              <div className="absolute inset-x-0 top-1/2 h-3 -rotate-12 bg-white/80" />
              <div className="absolute inset-y-0 left-1/3 w-3 rotate-12 bg-white/80" />
              <div className="relative flex flex-col items-center rounded-xl bg-white px-5 py-3 text-center shadow-lg">
                <MapPin size={25} className="text-orange-600" />
                <span className="mt-1 text-sm font-bold text-gray-900">
                  MR Footwear
                </span>
                <span className="text-xs text-gray-500">Pavagada</span>
              </div>
            </div>

            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700"
            >
              <Navigation size={17} />
              Get directions
            </a>
          </section>
        </div>
      </main>
    </div>
  )
}

export default ContactUs
