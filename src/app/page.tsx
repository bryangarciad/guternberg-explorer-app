import { SearchInput } from "@/components/SearchInput"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <header className="bg-blue-700 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center">Gutenberg Project</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Discover Classic Literature</h2>
        <SearchInput />
      </main>
    </div>
  )
}
