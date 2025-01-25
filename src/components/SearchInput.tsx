"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export const SearchInput = () => {
  const [bookId, setBookId] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (bookId) {
      router.push(`/book/${bookId}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          placeholder="Enter Book ID"
          className="flex-grow"
        />
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </form>
  )
}

