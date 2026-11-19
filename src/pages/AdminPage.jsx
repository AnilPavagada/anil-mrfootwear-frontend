import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  FileImage,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Pencil,
  Plus,
  Search,
  Star,
  Tags,
  Trash2,
  Upload,
  X,
  XCircle,
} from 'lucide-react'
import StoredImage from '../components/common/StoredImage'
import {
  deleteAdminImage,
  initialAdminData,
  initialAdminReviews,
  readAdminData,
  readAdminReviews,
  saveAdminData,
  saveAdminImage,
  saveAdminReviews,
  ADMIN_STORAGE_KEY,
  REVIEWS_STORAGE_KEY,
} from '../utils/adminStorage'

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: Tags },
  { id: 'gallery', label: 'Gallery', icon: FileImage },
  { id: 'reviews', label: 'Reviews', icon: Star },
]

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

const makeId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

function StatusBadge({ status }) {
  const styles = {
    approved: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    rejected: 'bg-rose-100 text-rose-700',
    active: 'bg-emerald-100 text-emerald-700',
    'out of stock': 'bg-rose-100 text-rose-700',
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${
        styles[status] || 'bg-slate-100 text-slate-600'
      }`}
    >
      {status}
    </span>
  )
}

function ReviewStars({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={13}
          fill={index < rating ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{rating} out of 5 stars</span>
    </span>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2
            id="admin-modal-title"
            className="text-lg font-extrabold text-slate-900"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={19} />
          </button>
        </header>
        {children}
      </section>
    </div>
  )
}

function AdminPage() {
  const [initialState] = useState(() => {
    try {
      return {
        data: readAdminData(),
        reviews: readAdminReviews(),
        error: '',
      }
    } catch (storageError) {
      return {
        data: initialAdminData,
        reviews: initialAdminReviews,
        error: storageError.message || 'Could not load admin data.',
      }
    }
  })
  const [data, setData] = useState(initialState.data)
  const [reviews, setReviews] = useState(initialState.reviews)
  const [currentView, setCurrentView] = useState('dashboard')
  const [error, setError] = useState(initialState.error)
  const [notice, setNotice] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [reviewFilter, setReviewFilter] = useState('all')
  const [modal, setModal] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  })
  const [productImage, setProductImage] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [categoryName, setCategoryName] = useState('')
  const [galleryCaption, setGalleryCaption] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const galleryInput = useRef(null)

  useEffect(() => {
    const refreshData = () => {
      try {
        setData(readAdminData())
        setReviews(readAdminReviews())
        setError('')
      } catch (storageError) {
        setError(storageError.message || 'Could not refresh admin data.')
      }
    }
    const handleStorage = (event) => {
      if (
        event.key === ADMIN_STORAGE_KEY ||
        event.key === REVIEWS_STORAGE_KEY ||
        event.key === null
      ) {
        refreshData()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('focus', refreshData)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('focus', refreshData)
    }
  }, [])

  const pendingReviews = reviews.filter((review) => review.status === 'pending')
  const visibleProducts = data.products.filter((product) => {
    const query = searchText.trim().toLowerCase()
    return (
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  })
  const visibleReviews = reviews
    .filter((review) => reviewFilter === 'all' || review.status === reviewFilter)
    .slice()
    .sort((first, second) =>
      (second.createdAt || '').localeCompare(first.createdAt || '')
    )
  const categoryCounts = data.categories.map((category) => ({
    ...category,
    productCount: data.products.filter(
      (product) => product.category === category.name
    ).length,
  }))

  const setView = (view) => {
    setCurrentView(view)
    setMobileMenuOpen(false)
    setError('')
    setNotice('')
  }

  const persistData = (nextData) => {
    try {
      saveAdminData(nextData)
      setData(nextData)
      setError('')
      return true
    } catch {
      setError('Could not save your changes in this browser. Please try again.')
      return false
    }
  }

  const persistReviews = (nextReviews) => {
    try {
      saveAdminReviews(nextReviews)
      setReviews(nextReviews)
      setError('')
      return true
    } catch {
      setError('Could not save review changes in this browser. Please try again.')
      return false
    }
  }

  const openProductModal = (product = null) => {
    setEditingProduct(product)
    setProductForm(
      product
        ? {
            name: product.name,
            sku: product.sku,
            category: product.category,
            price: String(product.price),
            stock: String(product.stock),
            description: product.description || '',
          }
        : {
            name: '',
            sku: '',
            category: data.categories[0]?.name || '',
            price: '',
            stock: '',
            description: '',
          }
    )
    setProductImage(null)
    setError('')
    setModal('product')
  }

  const handleProductSave = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')
    const name = productForm.name.trim()
    const sku = productForm.sku.trim()
    const category = productForm.category
    const price = Number(productForm.price)
    const stock = Number(productForm.stock)

    if (!name || !sku || !category || !Number.isFinite(price) || price < 0) {
      setError('Enter a product name, SKU, category, and valid price.')
      return
    }
    if (!Number.isInteger(stock) || stock < 0) {
      setError('Stock must be a whole number of zero or more.')
      return
    }
    if (
      data.products.some(
        (product) =>
          product.sku.toLowerCase() === sku.toLowerCase() &&
          product.id !== editingProduct?.id
      )
    ) {
      setError('That SKU is already used by another product.')
      return
    }

    let uploadedImageId = ''
    try {
      if (productImage) uploadedImageId = await saveAdminImage(productImage)
      const product = {
        id: editingProduct?.id || makeId('product'),
        name,
        sku,
        category,
        price,
        stock,
        description: productForm.description.trim(),
        imageId: uploadedImageId || editingProduct?.imageId || '',
      }
      const nextData = {
        ...data,
        products: editingProduct
          ? data.products.map((item) =>
              item.id === editingProduct.id ? product : item
            )
          : [product, ...data.products],
      }

      if (!persistData(nextData)) {
        if (uploadedImageId) await deleteAdminImage(uploadedImageId)
        return
      }

      setModal('')
      setNotice(editingProduct ? 'Product updated.' : 'Product added.')
      if (uploadedImageId && editingProduct?.imageId) {
        try {
          await deleteAdminImage(editingProduct.imageId)
        } catch {
          setError('Product saved, but the previous image could not be removed.')
        }
      }
    } catch (saveError) {
      if (uploadedImageId) {
        try {
          await deleteAdminImage(uploadedImageId)
        } catch {
          setError(
            `${saveError.message} The uploaded image could not be cleaned up.`
          )
          return
        }
      }
      setError(saveError.message || 'Could not save the product.')
    }
  }

  const handleProductDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"?`)) return
    const nextData = {
      ...data,
      products: data.products.filter((item) => item.id !== product.id),
    }
    if (!persistData(nextData)) return
    if (product.imageId) {
      try {
        await deleteAdminImage(product.imageId)
      } catch {
        setError('Product was deleted, but its stored image could not be removed.')
        return
      }
    }
    setNotice('Product deleted.')
  }

  const openCategoryModal = (category = null) => {
    setEditingCategory(category)
    setCategoryName(category?.name || '')
    setError('')
    setModal('category')
  }

  const handleCategorySave = (event) => {
    event.preventDefault()
    const name = categoryName.trim()
    if (!name) {
      setError('Enter a category name.')
      return
    }
    if (
      data.categories.some(
        (category) =>
          category.name.toLowerCase() === name.toLowerCase() &&
          category.id !== editingCategory?.id
      )
    ) {
      setError('That category already exists.')
      return
    }

    const nextData = {
      ...data,
      categories: editingCategory
        ? data.categories.map((category) =>
            category.id === editingCategory.id
              ? { ...category, name }
              : category
          )
        : [...data.categories, { id: makeId('category'), name }],
      products: editingCategory
        ? data.products.map((product) =>
            product.category === editingCategory.name
              ? { ...product, category: name }
              : product
          )
        : data.products,
    }
    if (persistData(nextData)) {
      setModal('')
      setNotice(editingCategory ? 'Category updated.' : 'Category added.')
    }
  }

  const handleCategoryDelete = (category) => {
    const linkedProducts = data.products.filter(
      (product) => product.category === category.name
    )
    if (linkedProducts.length > 0) {
      setError(
        `Move or delete ${linkedProducts.length} product(s) before deleting this category.`
      )
      return
    }
    if (!window.confirm(`Delete the "${category.name}" category?`)) return
    const nextData = {
      ...data,
      categories: data.categories.filter((item) => item.id !== category.id),
    }
    if (persistData(nextData)) setNotice('Category deleted.')
  }

  const handleGalleryUpload = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    if (files.length === 0) return

    setIsUploading(true)
    setError('')
    setNotice('')
    const savedImageIds = []
    try {
      for (const file of files) {
        savedImageIds.push(await saveAdminImage(file))
      }
      const newItems = savedImageIds.map((imageId, index) => ({
        id: makeId('gallery'),
        imageId,
        caption: galleryCaption.trim() || files[index].name,
        createdAt: new Date().toISOString(),
      }))
      const nextData = { ...data, gallery: [...newItems, ...data.gallery] }
      if (!persistData(nextData)) {
        for (const imageId of savedImageIds) await deleteAdminImage(imageId)
        return
      }
      setGalleryCaption('')
      setNotice(
        `${files.length} ${files.length === 1 ? 'image' : 'images'} added to the gallery.`
      )
    } catch (uploadError) {
      for (const imageId of savedImageIds) {
        try {
          await deleteAdminImage(imageId)
        } catch {
          setError(
            `${uploadError.message} Some uploaded images could not be cleaned up.`
          )
          setIsUploading(false)
          return
        }
      }
      setError(uploadError.message || 'Could not upload the selected images.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleGalleryDelete = async (item) => {
    if (!window.confirm('Remove this image from the gallery?')) return
    const nextData = {
      ...data,
      gallery: data.gallery.filter((image) => image.id !== item.id),
    }
    if (!persistData(nextData)) return
    try {
      await deleteAdminImage(item.imageId)
      setNotice('Gallery image removed.')
    } catch {
      setError('Gallery item was removed, but its stored image could not be deleted.')
    }
  }

  const handleReviewStatus = (review, status) => {
    const nextReviews = reviews.map((item) =>
      item.id === review.id ? { ...item, status } : item
    )
    if (persistReviews(nextReviews)) {
      setNotice(`Review ${status}.`)
    }
  }

  const pageTitle =
    navigation.find((item) => item.id === currentView)?.label || 'Dashboard'
  const todaysDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="min-h-screen bg-[#f2f4f9] text-slate-900 lg:flex">
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-20 bg-slate-950/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col bg-[#17191d] text-white transition-transform duration-200 lg:static lg:z-auto lg:min-h-screen lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <a href="/" className="flex items-center gap-3" aria-label="MR Footwear home">
            <span className="text-[27px] font-black leading-none tracking-tight">
              M<span className="text-orange-500">R</span>
            </span>
            <span className="border-l border-white/20 pl-3 text-[10px] font-bold uppercase leading-4 tracking-[0.18em] text-slate-300">
              Footwear
              <br />
              Admin
            </span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <nav aria-label="Admin navigation" className="flex-1 space-y-1 px-3 py-5">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              aria-current={currentView === id ? 'page' : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                currentView === id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-950/20'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {label}
              {id === 'reviews' && pendingReviews.length > 0 && (
                <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-[10px]">
                  {pendingReviews.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <a
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/8 hover:text-white"
          >
            <LogOut size={18} />
            View storefront
            <ArrowRight size={15} className="ml-auto" />
          </a>
          <p className="px-4 pb-2 pt-3 text-[10px] leading-4 text-slate-500">
            Frontend demo only. Add server authentication before production.
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            >
              <Menu size={21} />
            </button>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                MR Footwear
              </p>
              <h1 className="text-lg font-extrabold leading-tight sm:text-xl">
                {pageTitle}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 sm:inline-flex">
              <CalendarDays size={15} className="text-orange-500" />
              {todaysDate}
            </span>
            <button
              type="button"
              aria-label={`${pendingReviews.length} pending reviews`}
              onClick={() => {
                setReviewFilter('pending')
                setView('reviews')
              }}
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50"
            >
              <Bell size={18} />
              {pendingReviews.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white">
                  {pendingReviews.length}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-extrabold text-orange-700">
                A
              </span>
              <span className="hidden text-sm font-bold text-slate-800 sm:block">
                Admin
              </span>
              <ChevronDown size={15} className="hidden text-slate-400 sm:block" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-5 sm:px-7 sm:py-7 lg:px-9">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-slate-500">
                {currentView === 'dashboard'
                  ? 'Welcome back, Admin!'
                  : `Manage your store ${pageTitle.toLowerCase()}.`}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Prototype data is saved in this browser until the Spring Boot API is connected.
              </p>
            </div>
            {currentView === 'products' && (
              <button
                type="button"
                onClick={() => openProductModal()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/15 transition hover:bg-orange-600"
              >
                <Plus size={17} />
                Add product
              </button>
            )}
            {currentView === 'categories' && (
              <button
                type="button"
                onClick={() => openCategoryModal()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/15 transition hover:bg-orange-600"
              >
                <Plus size={17} />
                Add category
              </button>
            )}
          </div>

          {(error || notice) && (
            <div
              role={error ? 'alert' : 'status'}
              className={`mb-5 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
                error
                  ? 'border-rose-200 bg-rose-50 text-rose-800'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-800'
              }`}
            >
              {error ? (
                <CircleAlert size={18} className="mt-0.5 shrink-0" />
              ) : (
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              )}
              <span>{error || notice}</span>
              <button
                type="button"
                aria-label="Dismiss message"
                onClick={() => {
                  setError('')
                  setNotice('')
                }}
                className="ml-auto rounded p-0.5 opacity-70 hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {currentView === 'dashboard' && (
            <Dashboard
              data={data}
              reviews={reviews}
              pendingReviews={pendingReviews}
              onView={setView}
              onAddProduct={() => openProductModal()}
              onUploadGallery={() => galleryInput.current?.click()}
              onReviewStatus={handleReviewStatus}
            />
          )}

          {currentView === 'products' && (
            <ProductsView
              products={visibleProducts}
              searchText={searchText}
              onSearch={setSearchText}
              onEdit={openProductModal}
              onDelete={handleProductDelete}
            />
          )}

          {currentView === 'categories' && (
            <CategoriesView
              categories={categoryCounts}
              onEdit={openCategoryModal}
              onDelete={handleCategoryDelete}
            />
          )}

          {currentView === 'gallery' && (
            <GalleryView
              gallery={data.gallery}
              caption={galleryCaption}
              isUploading={isUploading}
              onCaptionChange={setGalleryCaption}
              onFilesChange={handleGalleryUpload}
              onDelete={handleGalleryDelete}
            />
          )}

          {currentView === 'reviews' && (
            <ReviewsView
              reviews={visibleReviews}
              filter={reviewFilter}
              onFilter={setReviewFilter}
              onStatusChange={handleReviewStatus}
            />
          )}
        </main>
      </div>

      <input
        ref={galleryInput}
        type="file"
        accept="image/*"
        multiple
        onChange={handleGalleryUpload}
        className="sr-only"
        tabIndex={-1}
        aria-label="Upload gallery images"
      />

      {modal === 'product' && (
        <Modal
          title={editingProduct ? 'Edit product' : 'Add product'}
          onClose={() => setModal('')}
        >
          <form onSubmit={handleProductSave} className="space-y-4 p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Product name" required>
                <input
                  required
                  maxLength={100}
                  value={productForm.name}
                  onChange={(event) =>
                    setProductForm({ ...productForm, name: event.target.value })
                  }
                  placeholder="e.g. Air Flex Runner"
                  className={inputClass}
                />
              </FormField>
              <FormField label="SKU" required>
                <input
                  required
                  maxLength={40}
                  value={productForm.sku}
                  onChange={(event) =>
                    setProductForm({ ...productForm, sku: event.target.value })
                  }
                  placeholder="e.g. MR-AFR-001"
                  className={inputClass}
                />
              </FormField>
              <FormField label="Category" required>
                <select
                  required
                  value={productForm.category}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      category: event.target.value,
                    })
                  }
                  className={inputClass}
                >
                  {data.categories.length === 0 && (
                    <option value="">Add a category first</option>
                  )}
                  {data.categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Price (INR)" required>
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={productForm.price}
                  onChange={(event) =>
                    setProductForm({ ...productForm, price: event.target.value })
                  }
                  placeholder="2499"
                  className={inputClass}
                />
              </FormField>
              <FormField label="Stock quantity" required>
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={productForm.stock}
                  onChange={(event) =>
                    setProductForm({ ...productForm, stock: event.target.value })
                  }
                  placeholder="10"
                  className={inputClass}
                />
              </FormField>
              <FormField label="Product image">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setProductImage(event.target.files?.[0] || null)
                  }
                  className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-orange-50 file:px-3 file:py-2 file:font-bold file:text-orange-700 hover:file:bg-orange-100"
                />
                <span className="mt-1 block text-[11px] text-slate-400">
                  Image files up to 8 MB are stored in this browser.
                </span>
              </FormField>
            </div>
            <FormField label="Description">
              <textarea
                rows={3}
                maxLength={500}
                value={productForm.description}
                onChange={(event) =>
                  setProductForm({
                    ...productForm,
                    description: event.target.value,
                  })
                }
                placeholder="Add product details"
                className={`${inputClass} resize-y`}
              />
            </FormField>
            {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModal('')}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                {editingProduct ? 'Save changes' : 'Add product'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'category' && (
        <Modal
          title={editingCategory ? 'Edit category' : 'Add category'}
          onClose={() => setModal('')}
        >
          <form onSubmit={handleCategorySave} className="space-y-5 p-5 sm:p-6">
            <FormField label="Category name" required>
              <input
                required
                maxLength={60}
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                placeholder="e.g. Kids Shoes"
                className={inputClass}
              />
            </FormField>
            {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModal('')}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                {editingCategory ? 'Save changes' : 'Add category'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10'

function FormField({ label, required, children }) {
  return (
    <label className="block text-xs font-bold text-slate-700">
      {label}
      {required && <span className="ml-1 text-rose-500">*</span>}
      <span className="mt-1.5 block font-normal">{children}</span>
    </label>
  )
}

function Dashboard({
  data,
  reviews,
  pendingReviews,
  onView,
  onAddProduct,
  onUploadGallery,
  onReviewStatus,
}) {
  const metrics = [
    {
      label: 'Total products',
      value: data.products.length,
      icon: Package,
      color: 'bg-orange-50 text-orange-600',
      change: `${data.products.filter((product) => product.stock > 0).length} in stock`,
    },
    {
      label: 'Gallery photos',
      value: data.gallery.length,
      icon: FileImage,
      color: 'bg-blue-50 text-blue-600',
      change: 'Storefront images',
    },
    {
      label: 'Total reviews',
      value: reviews.length,
      icon: Star,
      color: 'bg-violet-50 text-violet-600',
      change: `${pendingReviews.length} need review`,
    },
    {
      label: 'Categories',
      value: data.categories.length,
      icon: Tags,
      color: 'bg-emerald-50 text-emerald-600',
      change: 'Product groups',
    },
  ]
  const quickActions = [
    { label: 'Add product', icon: Plus, color: 'bg-orange-500', action: onAddProduct },
    { label: 'Upload gallery', icon: Upload, color: 'bg-blue-600', action: onUploadGallery },
    {
      label: 'Manage categories',
      icon: Tags,
      color: 'bg-emerald-600',
      action: () => onView('categories'),
    },
    {
      label: 'View reviews',
      icon: Star,
      color: 'bg-violet-600',
      action: () => onView('reviews'),
    },
  ]
  const recentReviews = reviews
    .slice()
    .sort((first, second) =>
      (second.createdAt || '').localeCompare(first.createdAt || '')
    )
    .slice(0, 3)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon, color, change }) => (
          <article
            key={label}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                <Icon size={20} />
              </span>
              {label === 'Total reviews' && pendingReviews.length > 0 ? (
                <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700">
                  Action needed
                </span>
              ) : (
                <ArrowUpRight size={16} className="text-slate-300" />
              )}
            </div>
            <p className="mt-4 text-xs font-semibold text-slate-500">{label}</p>
            <p className="mt-0.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {value}
            </p>
            <p className="mt-1 text-[11px] text-slate-400">{change}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <header className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
            <div>
              <h2 className="font-extrabold text-slate-900">Recent reviews</h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Approve customer feedback before it appears publicly
              </p>
            </div>
            <button
              type="button"
              onClick={() => onView('reviews')}
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
            >
              View all <ArrowRight size={14} />
            </button>
          </header>
          {recentReviews.length === 0 ? (
            <EmptyState icon={Star} title="No reviews yet" detail="Customer feedback will appear here." />
          ) : (
            <div className="divide-y divide-slate-100">
              {recentReviews.map((review) => (
                <article
                  key={review.id}
                  className="flex flex-wrap items-start gap-3 px-4 py-4 sm:px-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-extrabold text-orange-700">
                    {review.name
                      .split(/\s+/)
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-sm font-bold text-slate-800">{review.name}</p>
                      <ReviewStars rating={review.rating} />
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                      {review.feedback}
                    </p>
                    {review.status === 'pending' && (
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => onReviewStatus(review, 'approved')}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100"
                        >
                          <Check size={13} /> Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => onReviewStatus(review, 'rejected')}
                          className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1.5 text-[11px] font-bold text-rose-700 hover:bg-rose-100"
                        >
                          <X size={13} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                  <StatusBadge status={review.status || 'approved'} />
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="font-extrabold text-slate-900">Quick actions</h2>
          <p className="mt-1 text-xs text-slate-400">Manage the storefront</p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {quickActions.map(({ label, icon: Icon, color, action }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                className={`flex min-h-[76px] flex-col items-start justify-between rounded-xl ${color} p-3 text-left text-white transition hover:brightness-105`}
              >
                <Icon size={19} />
                <span className="text-xs font-bold">{label}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onView('products')}
            className="mt-4 flex w-full items-center justify-between rounded-xl border border-slate-200 px-3.5 py-3 text-left text-xs font-bold text-slate-600 transition hover:bg-slate-50"
          >
            View all products <ArrowRight size={15} />
          </button>
        </section>
      </div>

      <ActivityChart />
    </div>
  )
}

function ActivityChart() {
  const points = [
    [35, 119],
    [98, 107],
    [161, 109],
    [224, 82],
    [287, 65],
    [350, 34],
    [413, 62],
  ]
  const chartLine = points.map(([x, y], index) => `${index ? 'L' : 'M'} ${x} ${y}`).join(' ')
  const chartArea = `${chartLine} L 413 150 L 35 150 Z`

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-extrabold text-slate-900">Sales / enquiries overview</h2>
          <p className="mt-1 text-xs text-slate-400">
            Sample chart layout — connect the API to show live figures
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Demo enquiries
        </span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox="0 0 440 180"
          role="img"
          aria-label="Sample weekly enquiry trend, not live data"
          className="h-44 min-w-[400px] w-full"
        >
          {[30, 70, 110, 150].map((y) => (
            <line
              key={y}
              x1="25"
              x2="425"
              y1={y}
              y2={y}
              stroke="#e9edf4"
              strokeWidth="1"
            />
          ))}
          <path d={chartArea} fill="url(#chart-fill)" />
          <path
            d={chartLine}
            fill="none"
            stroke="#f97316"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          {points.map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="4" fill="#f97316" />
          ))}
          <defs>
            <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity=".2" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
            (day, index) => (
              <text
                key={day}
                x={35 + index * 63}
                y="172"
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="10"
              >
                {day}
              </text>
            )
          )}
        </svg>
      </div>
    </section>
  )
}

function ProductsView({
  products,
  searchText,
  onSearch,
  onEdit,
  onDelete,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <header className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h2 className="font-extrabold">Product inventory</h2>
          <p className="mt-1 text-xs text-slate-400">{products.length} products shown</p>
        </div>
        <label className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchText}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className={`${inputClass} pl-9`}
          />
        </label>
      </header>
      {products.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products found"
          detail="Try another search or add your first product."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-bold">Product</th>
                <th className="px-4 py-3 font-bold">SKU</th>
                <th className="px-4 py-3 font-bold">Category</th>
                <th className="px-4 py-3 font-bold">Price</th>
                <th className="px-4 py-3 font-bold">Stock</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <StoredImage
                        imageId={product.imageId}
                        alt={`${product.name} product`}
                        className="h-11 w-11 shrink-0 rounded-xl object-cover"
                      />
                      <span className="font-bold text-slate-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{product.sku}</td>
                  <td className="px-4 py-3 text-slate-600">{product.category}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{product.stock}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={product.stock > 0 ? 'active' : 'out of stock'} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(product)}
                        aria-label={`Delete ${product.name}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function CategoriesView({ categories, onEdit, onDelete }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <div>
          <h2 className="font-extrabold">Product categories</h2>
          <p className="mt-1 text-xs text-slate-400">
            {categories.length} categories in your catalog
          </p>
        </div>
      </div>
      {categories.length === 0 ? (
        <EmptyState icon={Tags} title="No categories yet" detail="Add a category to organize products." />
      ) : (
        <div className="divide-y divide-slate-100">
          {categories.map((category) => (
            <article
              key={category.id}
              className="flex flex-wrap items-center gap-3 py-4 first:pt-1 last:pb-1"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Tags size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-800">{category.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {category.productCount} linked {category.productCount === 1 ? 'product' : 'products'}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(category)}
                  aria-label={`Edit ${category.name}`}
                  className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-orange-600"
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(category)}
                  aria-label={`Delete ${category.name}`}
                  className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function GalleryView({
  gallery,
  caption,
  isUploading,
  onCaptionChange,
  onFilesChange,
  onDelete,
}) {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-dashed border-orange-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <Upload size={22} />
          </span>
          <h2 className="mt-3 font-extrabold text-slate-900">Upload gallery images</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose one or more image files. Each image can be up to 8 MB.
          </p>
          <label className="mt-4 block text-left text-xs font-bold text-slate-700">
            Caption (optional, applies to each selected image)
            <input
              value={caption}
              onChange={(event) => onCaptionChange(event.target.value)}
              maxLength={100}
              placeholder="e.g. New season collection"
              className={`${inputClass} mt-1.5`}
            />
          </label>
          <label className="mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600">
            <ImagePlus size={17} />
            {isUploading ? 'Uploading...' : 'Choose images'}
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={isUploading}
              onChange={onFilesChange}
              className="sr-only"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold">Gallery library</h2>
            <p className="mt-1 text-xs text-slate-400">{gallery.length} saved images</p>
          </div>
        </div>
        {gallery.length === 0 ? (
          <EmptyState icon={FileImage} title="Your gallery is empty" detail="Upload images to build your store gallery." />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {gallery.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-xl border border-slate-100 bg-white"
              >
                <StoredImage
                  imageId={item.imageId}
                  alt={item.caption}
                  className="aspect-square w-full object-cover"
                />
                <div className="flex items-center justify-between gap-2 p-2.5">
                  <p className="line-clamp-2 min-w-0 text-xs font-semibold text-slate-700">
                    {item.caption}
                  </p>
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    aria-label={`Remove ${item.caption}`}
                    className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function ReviewsView({ reviews, filter, onFilter, onStatusChange }) {
  const filters = [
    { id: 'all', label: 'All reviews' },
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
  ]

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-extrabold">Customer reviews</h2>
          <p className="mt-1 text-xs text-slate-400">
            Pending reviews stay hidden from the public review page until approved.
          </p>
        </div>
        <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onFilter(item.id)}
              aria-pressed={filter === item.id}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                filter === item.id
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>
      {reviews.length === 0 ? (
        <EmptyState icon={Star} title="No reviews in this view" detail="Choose another filter or wait for customer feedback." />
      ) : (
        <div className="divide-y divide-slate-100">
          {reviews.map((review) => (
            <article key={review.id} className="py-4 first:pt-5 last:pb-1 sm:py-5">
              <div className="flex flex-wrap items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-extrabold text-orange-700">
                  {review.name
                    .split(/\s+/)
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-800">{review.name}</h3>
                    <ReviewStars rating={review.rating} />
                    <StatusBadge status={review.status || 'approved'} />
                  </div>
                  <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                    {review.feedback}
                  </p>
                  <time
                    dateTime={review.createdAt}
                    className="mt-2 block text-[11px] text-slate-400"
                  >
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleString()
                      : 'Date unavailable'}
                  </time>
                </div>
                <div className="flex flex-wrap gap-2">
                  {review.status !== 'approved' && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(review, 'approved')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <CheckCircle2 size={15} /> Approve
                    </button>
                  )}
                  {review.status !== 'rejected' && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(review, 'rejected')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                    >
                      <XCircle size={15} /> Reject
                    </button>
                  )}
                  {review.status === 'rejected' && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(review, 'pending')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-100"
                    >
                      <Clock3 size={15} /> Mark pending
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function EmptyState({ icon: Icon, title, detail }) {
  return (
    <div className="px-5 py-12 text-center">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon size={20} />
      </span>
      <h3 className="mt-3 text-sm font-bold text-slate-700">{title}</h3>
      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </div>
  )
}

export default AdminPage
