import React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { Book } from "@/model/book"
import Image from 'next/image'

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
          <Image
            src={book.cover_url || "/placeholder.svg"}
            alt={`Cover of ${book.title}`}
            className="w-48 h-auto mx-auto rounded-md shadow-md hover:shadow-lg transition-shadow"
          />
        </Link>
        <div className="flex-grow">
          <h3 className="text-3xl font-bold">Metadata</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              {Object.entries(book).map(([key, value]) => (
                key !== "cover_url" &&
                <div key={key} className="col-span-2 sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{key}</dt>
                  <dd className="mt-1 text-sm text-gray-900" >{value}</dd>
                </div>
              ))}
            </dl>
          </div>
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

