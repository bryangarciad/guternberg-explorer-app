"use client"

import React, {useState, useCallback} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import axios from "axios"

interface ReaderProps {
  book: string
}

interface highlightedTextWithAnalysis {
  highlightedText: string;
  analysis?: {[key: string]: string};
}

export const Reader: React.FC<ReaderProps> = ({ book }) => {
   const [highlightedText, setHighlightedText] = useState<highlightedTextWithAnalysis[]>([])
  
    const addHighlightedText = useCallback((text: string) => {
      setHighlightedText((prev) => [...prev, {highlightedText: text}])
    }, [])
  

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      addHighlightedText(selection.toString())
    }
  }

  const handleOnRemove = (idx: number) => {
    if (idx === undefined) return
    const slice = highlightedText.filter((_, i) => i !== idx)
    setHighlightedText([...slice]);
  }

  const handleOnAnalyze = async (text: string, index: number) => {
    try {
      const response = await axios.post(`http://147.182.188.166:8000/book-analize/`, {
        data: text
      });
      if (response.status === 200) {
        const analysis = response.data.data;
        const updatedHighlightedTextWithAnalysis = highlightedText.map((item, idx) => {
          if (index === idx) {
            item.analysis = analysis
          }

          return item;
        })

        setHighlightedText([...updatedHighlightedTextWithAnalysis])
      }
    } catch (err) {
      console.error(err)
      alert("Could not communicate with the analytics service")
    }
  }

  return (
    <div className="h-[80vh] w-[52vw] space-y-8">
      <Card>
        <CardContent>
          <ScrollArea className="h-[80vh] w-[50vw]">
            <div className="text-gray-800 leading-relaxed prose prose-lg" onMouseUp={handleTextSelection}>
              {book}
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
                  <span key={index}>
                    <li className="text-gray-700">
                      {text}
                    </li>
                    <Badge variant="secondary"  onClick={() => handleOnAnalyze(text, index)}>Analyze</Badge>
                    <Badge variant="destructive" onClick={() => handleOnRemove(index)}>Remove</Badge>
                  </span>
            ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
