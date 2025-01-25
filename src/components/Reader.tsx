"use client"

import React, {useState, useCallback} from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import axios from "axios"

interface ReaderProps {
  book: string
}

interface AnalysisResults {
  characters: string;
  summary: string;
}
interface highlightedTextWithAnalysis {
  highlightedText: string;
  analysis?: AnalysisResults
}

export const Reader: React.FC<ReaderProps> = ({ book }) => {
  const { toast } = useToast()
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
    const showAnalysis = (analysis: AnalysisResults) => {
      const { characters, summary } = analysis;
      if (!characters || !summary) return
      toast({
        title: "Here is your analysis",
        description: `Main Characters: ${characters}, Summary: ${summary}`,
      });
    }
  
    try {
      if (highlightedText[index]?.analysis) {
        const analysisResults = highlightedText[index]?.analysis
        showAnalysis(analysisResults);
      }
      const response = await axios.post(`http://147.182.188.166:8000/analyze/`, {
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

        showAnalysis(analysis)
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
              {highlightedText.map((item, index) => (
                  <span key={index}>
                    <li className="text-gray-700">
                      {item.highlightedText}
                    </li>
                    <Badge variant="secondary"  onClick={() => handleOnAnalyze(item.highlightedText, index)}>Analyze</Badge>
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
