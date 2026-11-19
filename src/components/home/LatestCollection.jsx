import { useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Footprints,
} from 'lucide-react'
import StoredImage from '../common/StoredImage'
import { ADMIN_STORAGE_KEY, readAdminData } from '../../utils/adminStorage'
import WhatsAppIcon from '../common/WhatsAppIcon'
import { createWhatsAppLink } from '../../utils/contactLinks'

const readProducts = () => {
  try {
    return { products: readAdminData().products, error: '' }
  } catch (error) {
    return {
      products: [],
      error: error.message || 'Products could not be loaded.',
    }
  }
}

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

const whatsappLinkFor = (name) =>
  createWhatsAppLink(
    `Hello MR Footwear, please share the current availability and price for ${name}.`
  )

function LatestCollection() {
  const stylesRef = useRef(null)
  const [{ products, error }, setProductState] = useState(readProducts)

  useEffect(() => {
    const refreshProducts = () => setProductState(readProducts())
    const handleStorage = (event) => {
      if (event.key === ADMIN_STORAGE_KEY || event.key === null) {
        refreshProducts()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('focus', refreshProducts)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('focus', refreshProducts)
    }
  }, [])

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

          {products.length > 1 && (
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
          )}
        </div>

        {error && (
          <p
            role="alert"
            className="mb-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            <AlertCircle size={17} />
            {error}
          </p>
        )}

        {products.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center text-sm text-gray-600">
            New products are coming soon. Please contact the store for current
            availability.
          </p>
        ) : (
          <div
            ref={stylesRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] [scrollbar-color:#f97316_#e5e7eb]"
          >
            {products.map((product) => (
              <article
                key={product.id}
                className="w-[78%] min-w-[240px] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-[42%] sm:min-w-[250px] lg:w-[calc((100%-2rem)/3)] lg:min-w-[210px] lg:max-w-none"
              >
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8edf2] to-[#cdd8e2] sm:h-56">
                  {product.imageId ? (
                    <StoredImage
                      imageId={product.imageId}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute h-36 w-36 rounded-full border border-white/40 bg-white/25 blur-sm"
                      />
                      <Footprints
                        size={78}
                        strokeWidth={1.25}
                        aria-hidden="true"
                        className="relative -rotate-12 text-gray-800 drop-shadow-sm"
                      />
                    </>
                  )}
                  <span
                    className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white ${
                      product.stock > 0 ? 'bg-orange-500' : 'bg-gray-600'
                    }`}
                  >
                    {product.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">
                    {product.category}
                  </p>
                  <h3 className="mt-2 min-h-11 text-sm font-bold leading-5 text-gray-950 sm:text-base">
                    {product.name}
                  </h3>
                  <p className="mt-1 min-h-10 text-xs leading-5 text-gray-500">
                    {product.description || 'Ask us for current availability.'}
                  </p>
                  <p className="mt-2 text-base font-extrabold text-gray-950">
                    {formatPrice(product.price)}
                  </p>
                  <a
                    href={whatsappLinkFor(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
                  >
                    <WhatsAppIcon size={16} />
                    Enquire on WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-2 text-center text-xs text-gray-500">
          Styles and availability may vary. Contact us for the latest stock and pricing.
        </p>
      </div>
    </section>
  )
}

export default LatestCollection
