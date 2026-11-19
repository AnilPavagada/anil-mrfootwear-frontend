import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, Footprints, Search, SlidersHorizontal } from 'lucide-react'
import StoredImage from '../components/common/StoredImage'
import ProductWhatsAppShare from '../components/common/ProductWhatsAppShare'
import { ADMIN_STORAGE_KEY, readAdminData } from '../utils/adminStorage'
import {
  ALL_COLLECTIONS_CATEGORY,
  PRODUCT_CATEGORY_FILTERS,
} from '../utils/productCategories'

const isCategoryMatch = (productCategory, selectedCategory) => {
  const normalizedCategory = productCategory.toLowerCase()
  if (selectedCategory.exactName) {
    return normalizedCategory === selectedCategory.exactName.toLowerCase()
  }
  if (selectedCategory.slug === 'men') {
    return /\bmen\b|\bmens\b/.test(normalizedCategory)
  }
  if (selectedCategory.slug === 'women') {
    return /\bwomen\b|\bwomens\b/.test(normalizedCategory)
  }
  return selectedCategory.matches.some((term) =>
    normalizedCategory.includes(term)
  )
}

const readCatalog = () => {
  try {
    const data = readAdminData()
    return { products: data.products, categories: data.categories, error: '' }
  } catch (error) {
    return {
      products: [],
      categories: [],
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

function ProductsPage() {
  const [{ products, categories, error }, setCatalogState] = useState(readCatalog)
  const [searchText, setSearchText] = useState(
    () => new URLSearchParams(window.location.search).get('search') || ''
  )
  const [sortOrder, setSortOrder] = useState('featured')

  useEffect(() => {
    const refreshCatalog = () => setCatalogState(readCatalog())
    const handleStorage = (event) => {
      if (event.key === ADMIN_STORAGE_KEY || event.key === null) {
        refreshCatalog()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('focus', refreshCatalog)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('focus', refreshCatalog)
    }
  }, [])

  const categoryFilters = useMemo(() => {
    const builtInNames = new Set(
      [
        ALL_COLLECTIONS_CATEGORY.name,
        ...PRODUCT_CATEGORY_FILTERS.map((category) => category.label),
      ].map((name) => name.toLowerCase())
    )
    const customCategories = categories
      .filter((category) => {
        const normalizedName = category.name.toLowerCase()
        return (
          !builtInNames.has(normalizedName) &&
          !PRODUCT_CATEGORY_FILTERS.some((filter) =>
            isCategoryMatch(category.name, filter)
          )
        )
      })
      .map((category) => ({
        label: category.name,
        exactName: category.name,
      }))

    return [
      { label: ALL_COLLECTIONS_CATEGORY.name, slug: '', matches: [] },
      ...PRODUCT_CATEGORY_FILTERS,
      ...customCategories,
    ]
  }, [categories])

  const categorySlug = window.location.pathname
    .replace(/^\/products\/?/, '')
    .replace(/\/+$/, '')
  const searchParams = new URLSearchParams(window.location.search)
  const requestedCategory = searchParams.get('category')
  const selectedCategory =
    categoryFilters.find(
      (category) => category.slug && category.slug === categorySlug
    ) ||
    categoryFilters.find(
      (category) =>
        category.exactName &&
        category.exactName.toLowerCase() === requestedCategory?.toLowerCase()
    ) ||
    categoryFilters.find(
      (category) => category.slug && category.slug === requestedCategory
    ) ||
    categoryFilters[0]
  const query = searchParams
    .get('search')
    ?.trim()
    .toLowerCase() || ''

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatches =
        (!selectedCategory.exactName &&
          selectedCategory.matches.length === 0) ||
        isCategoryMatch(product.category, selectedCategory)
      const searchableText = [
        product.name,
        product.sku,
        product.category,
        product.description,
      ]
        .join(' ')
        .toLowerCase()

      return categoryMatches && (!query || searchableText.includes(query))
    })

    if (sortOrder === 'price-asc') {
      return filtered.sort((first, second) => first.price - second.price)
    }
    if (sortOrder === 'price-desc') {
      return filtered.sort((first, second) => second.price - first.price)
    }
    return filtered
  }, [products, query, selectedCategory, sortOrder])

  return (
    <section className="min-h-[65vh] bg-[#f8f7f5] px-4 py-10 sm:px-7 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
            Find your fit
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-wide text-gray-950 sm:text-4xl">
            {selectedCategory.label}
          </h1>
          <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-orange-500" />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600">
            Browse the MR Footwear collection and find a pair for every step.
          </p>
        </header>

        <div className="mb-7 grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <nav
            aria-label="Product categories"
            className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]"
          >
            {categoryFilters.map((category) => {
              const isSelected = category.exactName
                ? selectedCategory.exactName === category.exactName
                : selectedCategory.slug === category.slug
              const categoryHref = category.exactName
                ? `/products?category=${encodeURIComponent(category.exactName)}`
                : category.slug
                  ? `/products/${category.slug}`
                  : '/products'

              return (
              <a
                  key={category.exactName || category.slug || 'all'}
                  href={categoryHref}
                  aria-current={isSelected ? 'page' : undefined}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition sm:text-sm ${
                    isSelected
                    ? 'border-orange-500 bg-orange-500 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {category.label}
              </a>
              )
            })}
          </nav>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <form
              action="/products"
              method="get"
              className="flex min-w-0 flex-1 items-center rounded-xl border border-gray-200 bg-gray-50 px-3 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 sm:min-w-[250px]"
            >
              {(selectedCategory.slug || selectedCategory.exactName) && (
                <input
                  type="hidden"
                  name="category"
                  value={selectedCategory.slug || selectedCategory.exactName}
                />
              )}
              <Search size={18} className="shrink-0 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                name="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-orange-600"
              >
                Search
              </button>
            </form>

            <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600">
              <SlidersHorizontal size={17} aria-hidden="true" />
              <span className="sr-only">Sort products</span>
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="min-w-0 flex-1 bg-transparent py-3 font-semibold text-gray-800 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-5 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            <AlertCircle size={17} aria-hidden="true" />
            {error}
          </p>
        )}

        <div className="mb-4 flex items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm font-semibold text-gray-700">
            {visibleProducts.length}{' '}
            {visibleProducts.length === 1 ? 'product' : 'products'}
            {query ? ` matching “${query}”` : ''}
          </p>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <Footprints
              size={42}
              strokeWidth={1.4}
              className="mx-auto text-gray-400"
              aria-hidden="true"
            />
            <h2 className="mt-4 text-lg font-bold text-gray-900">
              No products found
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Try another search or choose a different category.
            </p>
            <a
              href="/products"
              className="mt-5 inline-flex rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              View all collections
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8edf2] to-[#cdd8e2]">
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
                  <h2 className="mt-2 min-h-11 text-base font-bold leading-5 text-gray-950">
                    {product.name}
                  </h2>
                  <p className="mt-1 min-h-10 text-xs leading-5 text-gray-500">
                    {product.description || 'Ask us for current availability.'}
                  </p>
                  <p className="mt-2 text-base font-extrabold text-gray-950">
                    {formatPrice(product.price)}
                  </p>
                  <ProductWhatsAppShare
                    product={product}
                    enableImageShare
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductsPage
