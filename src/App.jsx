
import Navbar from './components/common/Navbar'
import HeroSection from './components/home/HeroSection'
import CategorySection from './components/home/CategorySection'
import LatestCollection from './components/home/LatestCollection'
import Footer from './components/common/Footer'
import ContactUs from './pages/ContactUs'
import Reviews from './pages/Reviews'
import WhyChooseUs from './pages/WhyChooseUs'
import AboutUs from './pages/AboutUs'

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '')
  const isContactPage = currentPath === '/contact'
  const isReviewsPage = currentPath === '/reviews'
  const isWhyChooseUsPage = currentPath === '/why-choose-us'
  const isAboutUsPage = currentPath === '/about'

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {isAboutUsPage ? (
          <AboutUs />
        ) : isReviewsPage ? (
          <Reviews />
        ) : isWhyChooseUsPage ? (
          <WhyChooseUs />
        ) : isContactPage ? (
          <ContactUs />
        ) : (
          <>
            <HeroSection />
            <CategorySection />
            <LatestCollection />
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
