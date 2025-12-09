'use client'
import React, { useState } from 'react'
import { extractTextFromPdf } from '@/utils/pdfUtils'
import PDFUploader from '@/components/PDFUploader'
import TextDisplay from '@/components/TextDisplay'

const CardIndex = () => {
  const [extractedText, setExtractedText] = useState('')
  const [fileName, setFileName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePDFSelected = async (file: File) => {
    try {
      setIsProcessing(true)
      setFileName(file.name)

      const text = await extractTextFromPdf(file)
      setExtractedText(text)
    } catch (error) {
      console.error('Error processing PDF:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClear = () => {
    setExtractedText('')
    setFileName('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Text Extractor</h1>
          <p className="text-lg text-gray-600">Upload a PDF file to extract its text content</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <PDFUploader onPDFSelected={handlePDFSelected} isProcessing={isProcessing} />
        </div>

        <TextDisplay extractedText={extractedText} isProcessing={isProcessing} fileName={fileName} onClear={handleClear} />
      </div>
    </div>
  )
}

export default CardIndex
