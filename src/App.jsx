
import Navbar from './components/common/Navbar'
import HeroSection from './components/home/HeroSection'
import CategorySection from './components/home/CategorySection'
import LatestCollection from './components/home/LatestCollection'
import GallerySection from './components/home/GallerySection'
import Footer from './components/common/Footer'
import ContactUs from './pages/ContactUs'
import Reviews from './pages/Reviews'
import WhyChooseUs from './pages/WhyChooseUs'
import AboutUs from './pages/AboutUs'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import ProductsPage from './pages/ProductsPage'

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '')
  const isAdminPage = currentPath === '/admin'
  const isLoginPage = currentPath === '/login'
  const isContactPage = currentPath === '/contact'
  const isReviewsPage = currentPath === '/reviews'
  const isGalleryPage = currentPath === '/gallery'
  const isWhyChooseUsPage = currentPath === '/why-choose-us'
  const isAboutUsPage = currentPath === '/about'
  const isProductsPage =
    currentPath === '/products' || currentPath.startsWith('/products/')

  if (isAdminPage) return <AdminPage />

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {isLoginPage ? (
          <>
            <LoginPage />
            <WhyChooseUs variant="home" />
            <Reviews variant="home" />
            <ContactUs variant="home" />
          </>
        ) : isAboutUsPage ? (
          <AboutUs />
        ) : isReviewsPage ? (
          <Reviews />
        ) : isWhyChooseUsPage ? (
          <WhyChooseUs />
        ) : isGalleryPage ? (
          <GallerySection variant="page" />
        ) : isProductsPage ? (
          <ProductsPage />
        ) : isContactPage ? (
          <ContactUs />
        ) : (
          <>
            <HeroSection />
            <CategorySection />
            <LatestCollection />
            <GallerySection />
            <WhyChooseUs variant="home" />
            <Reviews variant="home" />
            <ContactUs variant="home" />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
