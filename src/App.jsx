
import Navbar from './components/common/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <main className="flex min-h-[70vh] items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black md:text-6xl">
            Welcome to MR <span className="text-orange-500">FOOTWEAR</span>
          </h1>

          <p className="mt-4 text-gray-600">
            Step into Style. Walk with Confidence.
          </p>
        </div>
      </main>

    </div>
  )
}

export default App
