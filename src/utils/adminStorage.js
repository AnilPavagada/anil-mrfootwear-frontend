import { INITIAL_PRODUCT_CATEGORIES } from './productCategories'

export const ADMIN_STORAGE_KEY = 'mr-footwear-admin-v1'
export const REVIEWS_STORAGE_KEY = 'mr-footwear-reviews-v1'

const imageDatabaseName = 'mr-footwear-admin-images-v1'
const imageStoreName = 'images'
const maxImageSize = 8 * 1024 * 1024
const categoryVersion = 3

const legacyCategoryNames = new Map([
  ["men's shoes", "Men's Shoes / Slippers"],
  ["women's shoes", "Women's Shoes / Slippers"],
  ['sports shoes', 'Sports Shoes / Slippers'],
  ['kids shoes', 'Kids Shoes / Slippers'],
  ['school shoes', 'School Shoes / Slippers'],
  ['formal shoes', 'Casual & Formal'],
  ['casual shoes', 'Casual & Formal'],
  ['sandals', 'Casual & Formal'],
  ['slippers', 'Casual & Formal'],
  ['slippers & sandals', 'Casual & Formal'],
  ["women's footwear", "Women's Shoes / Slippers"],
  ['womens footwear', "Women's Shoes / Slippers"],
  ["men's footwear", "Men's Shoes / Slippers"],
  ['mens footwear', "Men's Shoes / Slippers"],
  ['kids footwear', 'Kids Shoes / Slippers'],
])

export const initialAdminData = {
  categoryVersion,
  products: [
    {
      id: 'product-demo-1',
      name: 'Air Flex Runner',
      sku: 'MR-AFR-001',
      category: 'Sports Shoes / Slippers',
      price: 2499,
      stock: 18,
      description: 'Lightweight everyday running shoes.',
      imageId: '',
    },
    {
      id: 'product-demo-2',
      name: 'Classic Leather Formal',
      sku: 'MR-CLF-002',
      category: 'Casual & Formal',
      price: 3199,
      stock: 7,
      description: 'A clean, comfortable formal style.',
      imageId: '',
    },
    {
      id: 'product-demo-3',
      name: 'Everyday Comfort Sandal',
      sku: 'MR-ECS-003',
      category: 'Casual & Formal',
      price: 899,
      stock: 0,
      description: 'An easy slip-on sandal for daily wear.',
      imageId: '',
    },
  ],
  categories: INITIAL_PRODUCT_CATEGORIES,
  gallery: [],
}

export const initialAdminReviews = [
  {
    id: 'review-demo-1',
    name: 'Ravi Kumar',
    feedback: 'Excellent quality! Very comfortable for everyday use.',
    rating: 5,
    createdAt: '2026-11-18T10:30:00.000Z',
    status: 'approved',
  },
  {
    id: 'review-demo-2',
    name: 'Anitha S',
    feedback: 'Very comfortable shoes and helpful service.',
    rating: 4,
    createdAt: '2026-11-17T09:15:00.000Z',
    status: 'pending',
  },
  {
    id: 'review-demo-3',
    name: 'Suresh K',
    feedback: 'Good selection and a friendly store team.',
    rating: 5,
    createdAt: '2026-11-16T13:45:00.000Z',
    status: 'approved',
  },
]

function createStorageError(message) {
  return new Error(message)
}

export function readAdminData() {
  const savedData = window.localStorage.getItem(ADMIN_STORAGE_KEY)
  if (!savedData) return initialAdminData

  let parsedData
  try {
    parsedData = JSON.parse(savedData)
  } catch {
    throw createStorageError('Saved admin data is unreadable. Clear browser storage to reset the demo.')
  }

  if (
    !parsedData ||
    !Array.isArray(parsedData.products) ||
    !Array.isArray(parsedData.categories) ||
    !Array.isArray(parsedData.gallery) ||
    (parsedData.categoryVersion !== undefined &&
      ![1, 2, categoryVersion].includes(parsedData.categoryVersion)) ||
    !parsedData.products.every(
      (product) =>
        product &&
        typeof product.id === 'string' &&
        typeof product.name === 'string' &&
        typeof product.sku === 'string' &&
        typeof product.category === 'string' &&
        Number.isFinite(product.price) &&
        product.price >= 0 &&
        Number.isInteger(product.stock) &&
        product.stock >= 0 &&
        typeof product.description === 'string' &&
        typeof product.imageId === 'string'
    ) ||
    !parsedData.categories.every(
      (category) =>
        category &&
        typeof category.id === 'string' &&
        typeof category.name === 'string'
    ) ||
    !parsedData.gallery.every(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        typeof item.imageId === 'string' &&
        typeof item.caption === 'string' &&
        typeof item.createdAt === 'string' &&
        !Number.isNaN(Date.parse(item.createdAt))
    )
  ) {
    throw createStorageError('Saved admin data has an invalid format.')
  }

  if (parsedData.categoryVersion === categoryVersion) return parsedData

  const normalizeCategoryName = (name) =>
    legacyCategoryNames.get(name.toLowerCase()) || name
  const categoriesByName = new Map()
  parsedData.categories.forEach((category) => {
    const name = normalizeCategoryName(category.name)
    const builtInCategory = INITIAL_PRODUCT_CATEGORIES.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    )
    const normalizedName = builtInCategory?.name || name
    const key = normalizedName.toLowerCase()
    if (!categoriesByName.has(key)) {
      categoriesByName.set(key, { ...category, name: normalizedName })
    }
  })
  INITIAL_PRODUCT_CATEGORIES.forEach((category) => {
    const key = category.name.toLowerCase()
    if (!categoriesByName.has(key)) categoriesByName.set(key, category)
  })
  const builtInNames = new Set(
    INITIAL_PRODUCT_CATEGORIES.map((category) => category.name.toLowerCase())
  )
  const migratedCategories = [
    ...INITIAL_PRODUCT_CATEGORIES.map(
      (category) => categoriesByName.get(category.name.toLowerCase()) || category
    ),
    ...[...categoriesByName.entries()]
      .filter(([name]) => !builtInNames.has(name))
      .map(([, category]) => category),
  ]

  const migratedData = {
    ...parsedData,
    categoryVersion,
    categories: migratedCategories,
    products: parsedData.products.map((product) => ({
      ...product,
      category: normalizeCategoryName(product.category),
    })),
  }
  window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(migratedData))
  return migratedData
}

export function saveAdminData(data) {
  window.localStorage.setItem(
    ADMIN_STORAGE_KEY,
    JSON.stringify({ ...data, categoryVersion })
  )
}

export function readAdminReviews() {
  const savedReviews = window.localStorage.getItem(REVIEWS_STORAGE_KEY)
  if (!savedReviews) {
    window.localStorage.setItem(
      REVIEWS_STORAGE_KEY,
      JSON.stringify(initialAdminReviews)
    )
    return initialAdminReviews
  }

  let parsedReviews
  try {
    parsedReviews = JSON.parse(savedReviews)
  } catch {
    throw createStorageError('Saved review data is unreadable.')
  }

  if (
    !Array.isArray(parsedReviews) ||
    !parsedReviews.every(
      (review) =>
        review &&
        typeof review.id === 'string' &&
        typeof review.name === 'string' &&
        typeof review.feedback === 'string' &&
        Number.isInteger(review.rating) &&
        review.rating >= 1 &&
        review.rating <= 5 &&
        typeof review.createdAt === 'string' &&
        !Number.isNaN(Date.parse(review.createdAt)) &&
        (review.status === undefined ||
          ['pending', 'approved', 'rejected'].includes(review.status))
    )
  ) {
    throw createStorageError('Saved review data has an invalid format.')
  }

  return parsedReviews.map((review) => ({
    ...review,
    status: ['pending', 'approved', 'rejected'].includes(review.status)
      ? review.status
      : 'approved',
  }))
}

export function saveAdminReviews(reviews) {
  window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews))
}

function openImageDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(createStorageError('This browser does not support local image storage.'))
      return
    }

    const request = window.indexedDB.open(imageDatabaseName, 1)

    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(imageStoreName)) {
        database.createObjectStore(imageStoreName, { keyPath: 'id' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () =>
      reject(request.error || createStorageError('Could not open image storage.'))
  })
}

export async function saveAdminImage(file) {
  if (!file || !file.type.startsWith('image/')) {
    throw createStorageError('Choose a valid image file.')
  }
  if (file.size > maxImageSize) {
    throw createStorageError('Images must be 8 MB or smaller.')
  }

  const database = await openImageDatabase()
  const imageId = `image-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(imageStoreName, 'readwrite')
    transaction.objectStore(imageStoreName).put({
      id: imageId,
      name: file.name,
      type: file.type,
      blob: file,
    })
    transaction.oncomplete = () => resolve(imageId)
    transaction.onerror = () =>
      reject(transaction.error || createStorageError('Could not save the image.'))
    transaction.onabort = () =>
      reject(transaction.error || createStorageError('Image storage was interrupted.'))
  })
}

export async function readAdminImage(imageId) {
  if (!imageId) return null

  const database = await openImageDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(imageStoreName, 'readonly')
    const request = transaction.objectStore(imageStoreName).get(imageId)
    request.onsuccess = () => resolve(request.result?.blob || null)
    request.onerror = () =>
      reject(request.error || createStorageError('Could not load the image.'))
  })
}

export async function deleteAdminImage(imageId) {
  if (!imageId) return

  const database = await openImageDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(imageStoreName, 'readwrite')
    transaction.objectStore(imageStoreName).delete(imageId)
    transaction.oncomplete = () => resolve()
    transaction.onerror = () =>
      reject(transaction.error || createStorageError('Could not delete the image.'))
    transaction.onabort = () =>
      reject(transaction.error || createStorageError('Image deletion was interrupted.'))
  })
}
