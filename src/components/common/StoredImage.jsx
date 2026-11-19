import { useEffect, useState } from 'react'
import { CircleAlert, ImagePlus } from 'lucide-react'
import { readAdminImage } from '../../utils/adminStorage'

function StoredImage({ imageId, alt, className = '' }) {
  const [loadedImage, setLoadedImage] = useState({ id: '', url: '' })

  useEffect(() => {
    if (!imageId) return undefined

    let active = true
    let objectUrl = ''
    readAdminImage(imageId)
      .then((blob) => {
        if (active) {
          objectUrl = blob ? URL.createObjectURL(blob) : ''
          setLoadedImage({ id: imageId, url: objectUrl })
        }
      })
      .catch(() => {
        if (active) setLoadedImage({ id: imageId, url: '' })
      })

    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [imageId])

  if (loadedImage.id === imageId && loadedImage.url) {
    return <img src={loadedImage.url} alt={alt} className={className} />
  }

  const failed = Boolean(imageId && loadedImage.id === imageId)
  return (
    <span
      aria-label={failed ? 'Image could not be loaded' : alt}
      title={
        failed ? 'Image could not be loaded from browser storage' : alt
      }
      className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`}
    >
      {failed ? (
        <CircleAlert size={20} aria-hidden="true" />
      ) : (
        <ImagePlus size={20} aria-hidden="true" />
      )}
    </span>
  )
}

export default StoredImage
