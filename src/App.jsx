
import Navbar from './components/common/Navbar'
import HeroSection from './components/home/HeroSection'
import Footer from './components/common/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
