import React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { Book } from "@/model/book"

interface BookDetailsProps {
  book: Book
}

export const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
        <p className="text-xl text-gray-600">By {book.author}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500">Published: {book.original_publication}</p>
        <Link href={`/read/${book.id}`}>
          <img
            src={book.cover_url || "/placeholder.svg"}
            alt={`Cover of ${book.title}`}
            className="w-48 h-auto mx-auto rounded-md shadow-md hover:shadow-lg transition-shadow"
          />
        </Link>
        {Object.entries(book).map(([key, val]) => (
          <React.Fragment key={key}>
            <h4>{key}</h4>
            <p>{val}</p>
          </React.Fragment>
        ))}
      </CardContent>
      <CardFooter>
        <Link href={`/read/${book.id}`} className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <BookOpen className="mr-2 h-4 w-4" /> Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

