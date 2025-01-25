"use client"

import { useHighlightedText } from "@/hooks/useHighlightedText"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Book } from "@/model/book"

interface ReaderProps {
  book: Book
}

export const Reader: React.FC<ReaderProps> = ({ book }) => {
  const { highlightedText, addHighlightedText } = useHighlightedText()

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      addHighlightedText(selection.toString())
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
          <p className="text-xl text-gray-600">By {book.author}</p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh]">
            <div className="text-gray-800 leading-relaxed prose prose-lg" onMouseUp={handleTextSelection}>
              {book.content}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {highlightedText.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Highlighted Text</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {highlightedText.map((text, index) => (
                <li key={index} className="text-gray-700">
                  {text}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
