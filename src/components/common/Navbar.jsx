
import { useState } from 'react'
import {
  Menu,
  X,
  Search,
  ChevronDown,
} from 'lucide-react'

import logo from '../../assets/image/MR Footwear Crowned Sneaker Logo.png'
import WhatsAppIcon from './WhatsAppIcon'
import { createWhatsAppLink } from '../../utils/contactLinks'
import {
  ALL_COLLECTIONS_CATEGORY,
  PRODUCT_CATEGORY_FILTERS,
} from '../../utils/productCategories'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Login', href: '/login' },
  ]

  const productLinks = [
    { name: ALL_COLLECTIONS_CATEGORY.name, href: '/products' },
    ...PRODUCT_CATEGORY_FILTERS.map((category) => ({
      name: category.label,
      href: `/products/${category.slug}`,
    })),
  ]

  const whatsappLink = createWhatsAppLink(
    'Hello MR Footwear, I would like to enquire about your footwear collection.'
  )

  const closeMobileMenu = () => {
    setMenuOpen(false)
    setMobileProductsOpen(false)
  }

  const navClass =
    'whitespace-nowrap text-[13px] font-semibold tracking-[0.2px] text-gray-700 transition-colors duration-200 hover:text-orange-600'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white shadow-sm">

      <nav className="mx-auto flex min-h-[82px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Brand Logo */}
        <a href="/" className="flex shrink-0 items-center">
          <img
            src={logo}
            alt="MR Footwear Logo"
            className="h-[62px] w-auto max-w-[185px] rounded-md object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 xl:flex 2xl:gap-7">

          {navLinks.slice(0, 2).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={navClass}
            >
              {link.name}
            </a>
          ))}

          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className={`${navClass} flex items-center gap-1`}
              aria-expanded={productsOpen}
            >
              Products

              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  productsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {productsOpen && (
              <div className="absolute left-0 top-full mt-5 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl">

                {productLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setProductsOpen(false)}
                    className="block px-5 py-3 text-[13px] font-medium text-gray-700 transition-colors hover:bg-orange-50 hover:pl-6 hover:text-orange-600"
                  >
                    {item.name}
                  </a>
                ))}

              </div>
            )}
          </div>

          {navLinks.slice(2).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={navClass}
            >
              {link.name}
            </a>
          ))}

        </div>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">

          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search products"
            aria-expanded={searchOpen}
            className="rounded-full p-2.5 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
          >
            <Search size={20} />
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with MR Footwear on WhatsApp"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-2.5 text-[13px] font-bold tracking-wide text-white shadow-md shadow-green-900/10 transition duration-200 hover:bg-[#1ebe5d] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168a45]"
          >
            <WhatsAppIcon size={20} />
            WhatsApp
          </a>

        </div>

        {/* Tablet and Mobile Actions */}
        <div className="flex shrink-0 items-center gap-2 xl:hidden">

          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search products"
            aria-expanded={searchOpen}
            className="rounded-full p-2.5 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
          >
            <Search size={20} />
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with MR Footwear on WhatsApp"
            title="Chat with MR Footwear on WhatsApp"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] p-2.5 text-white shadow-sm transition hover:bg-[#1ebe5d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168a45] sm:px-4"
          >
            <WhatsAppIcon size={20} />

            <span className="hidden text-[11px] font-semibold min-[360px]:inline sm:text-[13px]">
              WhatsApp
            </span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-800 transition hover:bg-orange-50 hover:text-orange-600"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>

      </nav>

      {searchOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-gray-100 bg-white px-4 py-4 shadow-lg sm:px-6">
          <form
            action="/products"
            method="get"
            className="mx-auto flex max-w-2xl items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100"
          >
            <Search
              size={18}
              className="ml-2 shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              name="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search shoes, sandals, and more..."
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile and Tablet Navigation */}
      {menuOpen && (
        <div className="max-h-[calc(100vh-82px)] overflow-y-auto border-t border-gray-100 bg-white px-5 py-5 shadow-lg xl:hidden">

          <div className="mx-auto flex max-w-7xl flex-col gap-1">

            {navLinks.slice(0, 2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold tracking-wide text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Products Dropdown */}
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold tracking-wide text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
              aria-expanded={mobileProductsOpen}
            >
              Products

              <ChevronDown
                size={17}
                className={`transition-transform duration-200 ${
                  mobileProductsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileProductsOpen && (
              <div className="ml-5 flex flex-col border-l-2 border-orange-400 py-1">

                {productLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="px-5 py-3 text-[13px] font-medium text-gray-600 transition hover:text-orange-600"
                  >
                    {item.name}
                  </a>
                ))}

              </div>
            )}

            {navLinks.slice(2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold tracking-wide text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile WhatsApp Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with MR Footwear on WhatsApp"
              className="mt-4 flex items-center gap-3 rounded-2xl bg-[#25D366] px-4 py-3.5 text-left text-white shadow-md shadow-green-900/10 transition hover:bg-[#1ebe5d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168a45]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                <WhatsAppIcon size={22} />
              </span>
              <span>
                <span className="block text-sm font-bold">
                  Chat with us on WhatsApp
                </span>
                <span className="mt-0.5 block text-xs text-white/85">
                  Ask us about styles, stock, or store hours
                </span>
              </span>
            </a>

          </div>
        </div>
      )}

    </header>
  )
}

export default Navbar
