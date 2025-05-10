import React from 'react'

interface TextDisplayProps {
  extractedText: string
  isProcessing: boolean
  fileName: string
  onClear: () => void
}

const TextDisplay: React.FC<TextDisplayProps> = ({ extractedText, isProcessing, fileName, onClear }) => {
  if (isProcessing) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center border rounded-lg p-6">
        <p className="text-lg">Extracting text from PDF...</p>
      </div>
    )
  }

  if (!extractedText) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center border rounded-lg p-6 bg-gray-50 text-center">
        <h3 className="text-lg font-semibold">No content to display</h3>
        <p className="text-sm text-gray-500">Upload a PDF to extract and view text</p>
      </div>
    )
  }

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="bg-muted p-4 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="font-medium truncate max-w-[300px]">{fileName}</h3>
        </div>
      </div>
      {/* <ScrollArea className="h-96 p-4"> */}
      <div className="whitespace-pre-wrap font-mono text-sm">{extractedText}</div>
      {/* </ScrollArea> */}
    </div>
  )
}

export default TextDisplay
