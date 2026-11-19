
import Navbar from './components/common/Navbar'
import HeroSection from './components/home/HeroSection'
import Footer from './components/common/Footer'
import ContactUs from './pages/ContactUs'
import Reviews from './pages/Reviews'

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '')
  const isContactPage = currentPath === '/contact'
  const isReviewsPage = currentPath === '/reviews'

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {isReviewsPage ? (
          <Reviews />
        ) : isContactPage ? (
          <ContactUs />
        ) : (
          <>
            <HeroSection />
            <ContactUs variant="home" />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
