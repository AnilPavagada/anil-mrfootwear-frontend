import { useEffect, useState } from 'react'
import { ImagePlus, Share2 } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { createWhatsAppLink } from '../../utils/contactLinks'
import { readAdminImage } from '../../utils/adminStorage'

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

const createProductMessage = (product) =>
  [
    'Hello MR Footwear, I am interested in this product:',
    `Product: ${product.name}`,
    `SKU: ${product.sku}`,
    `Category: ${product.category}`,
    `Price: ${formatPrice(product.price)}`,
    `Availability: ${
      product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'
    }`,
    `Description: ${product.description || 'No description available.'}`,
  ].join('\n')

const createImageFile = (blob, productName) => {
  const extension = blob.type.split('/')[1]?.split('+')[0] || 'jpg'
  const fileName =
    productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') ||
    'product'

  return new File([blob], `${fileName}.${extension}`, { type: blob.type })
}

const downloadImage = (file) => {
  const imageUrl = URL.createObjectURL(file)
  const downloadLink = document.createElement('a')
  downloadLink.href = imageUrl
  downloadLink.download = file.name
  document.body.append(downloadLink)
  downloadLink.click()
  downloadLink.remove()
  window.setTimeout(() => URL.revokeObjectURL(imageUrl), 1000)
}

const convertToPng = async (file) => {
  if (file.type === 'image/png') return file
  if (typeof createImageBitmap !== 'function') {
    throw new Error('This browser cannot copy this image type.')
  }

  const bitmap = await createImageBitmap(file)
  try {
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not prepare the image for copying.')
    context.drawImage(bitmap, 0, 0)

    return await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Could not prepare the image for copying.'))
      }, 'image/png')
    })
  } finally {
    bitmap.close()
  }
}

const copyImageToClipboard = (file) => {
  if (
    !navigator.clipboard?.write ||
    typeof ClipboardItem === 'undefined'
  ) {
    return Promise.reject(new Error('Image clipboard is not supported.'))
  }

  const imageData = convertToPng(file)
  return navigator.clipboard.write([
    new ClipboardItem({ 'image/png': imageData }),
  ])
}

const supportsFileSharing = (file) => {
  if (
    !file ||
    typeof navigator.share !== 'function' ||
    typeof navigator.canShare !== 'function'
  ) {
    return false
  }

  try {
    return navigator.canShare({ files: [file] })
  } catch {
    return false
  }
}

function ProductWhatsAppShare({
  product,
  compact = false,
  enableImageShare = false,
  className = '',
}) {
  const [imageState, setImageState] = useState({
    imageId: '',
    file: null,
    loading: false,
    error: '',
  })
  const [whatsAppOpened, setWhatsAppOpened] = useState(false)
  const [imageCopied, setImageCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!product.imageId) return undefined

    let active = true
    readAdminImage(product.imageId)
      .then((blob) => {
        if (!active) return
        if (!blob) {
          setImageState({
            imageId: product.imageId,
            file: null,
            loading: false,
            error: 'The saved product image could not be found.',
          })
          return
        }
        if (typeof File === 'undefined') {
          setImageState({
            imageId: product.imageId,
            file: null,
            loading: false,
            error: 'This browser cannot prepare the product image for sharing.',
          })
          return
        }

        setImageState({
          imageId: product.imageId,
          file: createImageFile(blob, product.name),
          loading: false,
          error: '',
        })
      })
      .catch((error) => {
        if (active) {
          setImageState({
            imageId: product.imageId,
            file: null,
            loading: false,
            error: error.message || 'The product image could not be loaded.',
          })
        }
      })

    return () => {
      active = false
    }
  }, [product.imageId, product.name])

  const imageFile =
    imageState.imageId === product.imageId ? imageState.file : null
  const isLoading =
    Boolean(product.imageId) &&
    (imageState.imageId !== product.imageId || imageState.loading)
  const imageError =
    imageState.imageId === product.imageId ? imageState.error : ''
  const message = createProductMessage(product)
  const canShareImage = supportsFileSharing(imageFile)

  const handleWhatsAppClick = (event) => {
    setNotice('')
    if (isLoading) {
      event.preventDefault()
      setNotice('Preparing the product image. Please try again in a moment.')
      return
    }

    if (whatsAppOpened) {
      event.preventDefault()
      setNotice(
        'WhatsApp was already opened for this product. Send the current draft to avoid duplicate messages.'
      )
      return
    }

    setWhatsAppOpened(true)
    if (imageFile) {
      if (imageCopied) {
        setNotice(
          'Product details are pre-filled. Paste the copied image into the WhatsApp chat before sending.'
        )
      } else if (
        navigator.clipboard?.write &&
        typeof ClipboardItem !== 'undefined'
      ) {
        copyImageToClipboard(imageFile)
          .then(() => {
            setImageCopied(true)
            setNotice(
              'Product details are pre-filled. The image is copied; paste it into the WhatsApp chat before sending.'
            )
          })
          .catch(() => {
            downloadImage(imageFile)
            setNotice(
              'Product details are pre-filled. The image was downloaded; attach it in WhatsApp before sending.'
            )
          })
      } else {
        downloadImage(imageFile)
        setNotice(
          'Product details are pre-filled. The image was downloaded; attach it in WhatsApp before sending.'
        )
      }
    } else if (product.imageId) {
      setNotice(
        `${imageError || 'The product image is unavailable.'} Product details will open in WhatsApp at +91 9449632966.`
      )
    }
  }

  const handleImageShare = async () => {
    setNotice('')
    if (!imageFile || isSharing) return

    if (canShareImage) {
      setIsSharing(true)
      try {
        await navigator.share({
          title: product.name,
          text: message,
          files: [imageFile],
        })
        setNotice('Product image and details shared.')
      } catch (error) {
        if (error.name !== 'AbortError') {
          setNotice(
            'Image sharing did not complete. Use the fixed-number WhatsApp button to copy or download the image.'
          )
        }
      } finally {
        setIsSharing(false)
      }
      return
    }

    if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
      downloadImage(imageFile)
      setNotice('Image downloaded. Attach it to the WhatsApp message manually.')
      return
    }

    copyImageToClipboard(imageFile)
      .then(() => {
        setImageCopied(true)
        setNotice('Image copied. Click the fixed-number WhatsApp button, then paste it before sending.')
      })
      .catch(() => {
        downloadImage(imageFile)
        setNotice('Image could not be copied, so it was downloaded for manual attachment.')
      })
  }

  return (
    <div className={compact ? 'inline-flex flex-col items-center' : 'block'}>
      <span className="inline-flex items-center gap-1">
        <a
          href={createWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          aria-label={`Open WhatsApp at +91 9449632966 for ${product.name}`}
          aria-disabled={isLoading || whatsAppOpened}
          className={`${className || 'inline-flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600'} ${
            whatsAppOpened ? 'cursor-not-allowed opacity-60' : ''
          }`}
        >
          <WhatsAppIcon size={compact ? 16 : 17} />
          <span className={compact ? 'sr-only' : ''}>
            {isLoading
              ? 'Preparing image...'
              : whatsAppOpened
                ? 'WhatsApp opened'
                : 'Share product on WhatsApp'}
          </span>
        </a>
        {enableImageShare && imageFile && (
          <button
            type="button"
            onClick={handleImageShare}
            aria-label={
              canShareImage
                ? `Send ${product.name} image and details`
                : `Copy ${product.name} image`
            }
            title={
              canShareImage
                ? 'Send the image and product details; choose WhatsApp and a customer chat'
                : 'Copy the product image for pasting into WhatsApp'
            }
            disabled={isSharing}
            className={
              compact
                ? 'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-50'
                : 'mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-orange-200 px-3 py-2.5 text-xs font-bold text-orange-700 transition hover:bg-orange-50 disabled:opacity-50'
            }
          >
            {canShareImage ? (
              <Share2 size={compact ? 16 : 17} aria-hidden="true" />
            ) : (
              <ImagePlus size={compact ? 16 : 17} aria-hidden="true" />
            )}
            <span className={compact ? 'sr-only' : ''}>
              {canShareImage ? 'Send image + details' : 'Copy product image'}
            </span>
          </button>
        )}
      </span>
      {notice && (
        <span
          role="status"
          aria-live="polite"
          className="mt-1 max-w-56 text-center text-[10px] leading-4 text-slate-500"
        >
          {notice}
        </span>
      )}
    </div>
  )
}

export default ProductWhatsAppShare
