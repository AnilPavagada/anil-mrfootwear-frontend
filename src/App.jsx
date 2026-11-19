
import Navbar from './components/common/Navbar'
import HeroSection from './components/home/HeroSection'
import Footer from './components/common/Footer'
import ContactUs from './pages/ContactUs'

function App() {
  const isContactPage = window.location.pathname.replace(/\/+$/, '') === '/contact'

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {isContactPage ? <ContactUs /> : <HeroSection />}
      </main>
      <Footer />
    </div>
  )
}

export default App
