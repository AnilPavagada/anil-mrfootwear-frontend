
import { useState } from 'react'
import {
  Menu,
  X,
  Search,
  ChevronDown,
  MessageCircle,
} from 'lucide-react'

import logo from '../../assets/image/MR Footwear Crowned Sneaker Logo.png'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

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
    { name: 'All Products', href: '/products' },
    { name: "Men's Shoes", href: '/products/men' },
    { name: "Women's Shoes", href: '/products/women' },
    { name: 'Sports Shoes', href: '/products/sports' },
    { name: 'Kids Shoes', href: '/products/kids' },
  ]

  const whatsappNumber = '919449632966'

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello MR Footwear, I would like to enquire about your footwear collection.'
  )}`

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
            aria-label="Search products"
            className="rounded-full p-2.5 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
          >
            <Search size={20} />
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-[13px] font-semibold tracking-wide text-white shadow-sm transition duration-200 hover:bg-green-700 hover:shadow-md"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

        </div>

        {/* Tablet and Mobile Actions */}
        <div className="flex shrink-0 items-center gap-2 xl:hidden">

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Enquiry"
            className="flex items-center justify-center rounded-lg bg-green-600 p-2.5 text-white transition hover:bg-green-700 sm:gap-2 sm:px-4"
          >
            <MessageCircle size={19} />

            <span className="hidden text-[13px] font-semibold sm:inline">
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
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-green-700"
            >
              <MessageCircle size={19} />
              WhatsApp Enquiry
            </a>

          </div>
        </div>
      )}

    </header>
  )
}

export default Navbar
