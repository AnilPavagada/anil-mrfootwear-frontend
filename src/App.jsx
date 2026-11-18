
function App() {
  return (
    <div className="min-h-screen bg-black text-white">

      <header className="border-b border-orange-500 p-5">
        <h1 className="text-3xl font-bold">
          MR <span className="text-orange-500">FOOTWEAR</span>
        </h1>
        <p className="text-gray-400">
          Quality Footwear for Men, Women & Kids
        </p>
      </header>

      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">

        <h2 className="text-4xl font-bold md:text-6xl">
          Welcome to MR FOOTWEAR
        </h2>

        <p className="mt-4 text-lg text-red-300">
          Best Prices | Latest Collections | Trusted Quality
        </p>

        <button className="mt-8 rounded-lg bg-orange-500 px-8 py-3 font-bold text-white hover:bg-orange-600">
          Explore Collection
        </button>

      </main>

    </div>
  )
}

export default App
