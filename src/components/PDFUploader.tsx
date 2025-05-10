import React, { useState, useCallback } from 'react'

interface PDFUploaderProps {
  onPDFSelected: (file: File) => void
  isProcessing: boolean
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onPDFSelected, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      validateAndProcessFile(file)
    }
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      validateAndProcessFile(file)
    }
  }, [])

  const validateAndProcessFile = useCallback(
    (file: File) => {
      if (file.type !== 'application/pdf') {
        alert('Please upload a valid PDF file.')
        return
      }

      onPDFSelected(file)
    },
    [onPDFSelected],
  )

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
        } transition-all duration-200`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}>
        <input id="file-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" disabled={isProcessing} />

        <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
          <h3 className="text-lg font-semibold mb-1">Upload PDF</h3>
          <p className="text-sm text-gray-500 mb-4">Drag & drop or click to select</p>
          <div className="flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors">
            <span>Select PDF</span>
          </div>
        </label>
      </div>
    </div>
  )
}

export default PDFUploader
