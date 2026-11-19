import { useEffect, useState } from 'react'
import { ArrowRight, ImageOff } from 'lucide-react'
import {
  ADMIN_STORAGE_KEY,
  readAdminData,
  readAdminImage,
} from '../../utils/adminStorage'

function getGalleryState() {
  try {
    return { gallery: readAdminData().gallery, error: '' }
  } catch (error) {
    return {
      gallery: [],
      error: error.message || 'Gallery data could not be loaded.',
    }
  }
}

function GallerySection({ variant = 'home' }) {
  const isHomeSection = variant === 'home'
  const Heading = isHomeSection ? 'h2' : 'h1'
  const [{ gallery, error }, setGalleryState] = useState(getGalleryState)
  const [images, setImages] = useState({})
  const [imageError, setImageError] = useState('')

  useEffect(() => {
    const refreshGallery = () => setGalleryState(getGalleryState())
    const handleStorage = (event) => {
      if (event.key === ADMIN_STORAGE_KEY || event.key === null) {
        refreshGallery()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('focus', refreshGallery)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('focus', refreshGallery)
    }
  }, [])

  useEffect(() => {
    let active = true
    const objectUrls = []

    Promise.all(
      gallery.map(async (item) => {
        try {
          const blob = await readAdminImage(item.imageId)
          if (!blob) return { id: item.id, url: '' }
          const url = URL.createObjectURL(blob)
          objectUrls.push(url)
          return { id: item.id, url }
        } catch {
          return { id: item.id, url: '' }
        }
      })
    ).then((loadedImages) => {
      if (!active) {
        objectUrls.forEach((url) => URL.revokeObjectURL(url))
        return
      }

      const nextImages = Object.fromEntries(
        loadedImages.map(({ id, url }) => [id, url])
      )
      setImages(nextImages)
      setImageError(
        loadedImages.some((image) => !image.url)
          ? 'One or more gallery images could not be loaded from browser storage.'
          : ''
      )
    })

    return () => {
      active = false
      objectUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [gallery])

  return (
    <section
      id={isHomeSection ? 'home-gallery' : undefined}
      aria-labelledby="gallery-heading"
      className="bg-[#f8f7f5] px-5 py-12 sm:px-8 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="mx-auto mb-7 max-w-2xl text-center sm:mb-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
            MR Footwear moments
          </p>
          <Heading
            id="gallery-heading"
            className="mt-1 text-2xl font-black uppercase tracking-wide text-gray-950 sm:text-3xl"
          >
            Store Gallery
          </Heading>
          <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-orange-500" />
          <p className="mx-auto mt-3 text-sm leading-6 text-gray-600">
            Explore the latest styles and moments from MR Footwear.
          </p>
        </header>

        {(error || imageError) && (
          <p
            role="alert"
            className="mx-auto mb-5 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            {error || imageError}
          </p>
        )}

        {gallery.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-10 text-center">
            <ImageOff size={28} className="mx-auto text-gray-400" />
            <h2 className="mt-3 font-bold text-gray-800">
              New gallery photos coming soon
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Photos added by the store team will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {gallery.map((item) => (
              <figure
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {images[item.id] ? (
                  <img
                    src={images[item.id]}
                    alt={item.caption}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={`${item.caption} image unavailable`}
                    className="flex aspect-[4/3] items-center justify-center bg-gray-100 text-gray-400"
                  >
                    <ImageOff size={24} />
                  </div>
                )}
                <figcaption className="truncate px-3 py-3 text-sm font-semibold text-gray-800">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {isHomeSection && gallery.length > 4 && (
          <a
            href="/gallery"
            className="mx-auto mt-7 inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-800 transition hover:border-orange-400 hover:text-orange-600"
          >
            View full gallery <ArrowRight size={16} />
          </a>
        )}
      </div>
    </section>
  )
}

export default GallerySection
