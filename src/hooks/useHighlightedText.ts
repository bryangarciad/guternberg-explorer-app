import { useState, useCallback } from "react"

export const useHighlightedText = () => {
  const [highlightedText, setHighlightedText] = useState<string[]>([])

  const addHighlightedText = useCallback((text: string) => {
    setHighlightedText((prev) => [...prev, text])
  }, [])

  return { highlightedText, addHighlightedText }
}
