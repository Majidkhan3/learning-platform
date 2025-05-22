'use client'

import React, { useState, useEffect, useCallback } from 'react'
import PageTitle from '@/components/PageTitle'
import { Col, Row, Card, Button, Form, Spinner } from 'react-bootstrap'
import Link from 'next/link'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'
import { extractTextFromPdf } from '@/utils/pdfUtils'
import { useRouter } from 'next/navigation'

// Define interfaces for better type safety
interface AuthUser {
  _id: string
  // Add other user properties if available
}

interface DialogueEntry {
  _id: string
  url?: string // Assuming 'url' might be optional
  createdAt: string // Or Date, if you parse it into a Date object
  // Add other properties from your dialogue model if needed for display
}

const CardText = () => {
  const { user }: any = useAuth() // Typed user
  const [file, setFile] = useState<File | null>(null) // Typed file state
  const [loading, setLoading] = useState(false)
  const [generatedDialogues, setGeneratedDialogues] = useState<string>('') // API returns a single string
  const [dialogues, setDialogues] = useState<DialogueEntry[]>([]) // Typed dialogues from DB
  const [fetching, setFetching] = useState(true)
  const [extractedText, setExtractedText] = useState('')
  const [fileName, setFileName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const generateDialoguesFromApi = useCallback(
    async (text: string) => {
      if (!text.trim() || !user?._id) {
        if (!user?._id) console.error('User ID is missing, cannot generate dialogues.')
        return
      }
      setLoading(true)
      try {
        const res = await fetch('/api/english/endialogues/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            userId: user._id,
            fileName: fileName,
          }),
        })
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ message: 'Failed to parse error response' }))
          throw new Error(errorData.message || `API error! status: ${res.status}`)
        }
        const data = await res.json()
        router.push(`/dashboards/english/dialogues/view/${data.dialogueId}`)

        setGeneratedDialogues(data.dialogues || '') // API returns a string
      } catch (err) {
        console.error('Error generating dialogues from API:', err)
      } finally {
        setLoading(false)
      }
    },
    [user, fileName, setLoading, setGeneratedDialogues], // Added user and fileName to dependencies
  )

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault()
    }
    if (extractedText && extractedText.trim() !== '' && !loading) {
      await generateDialoguesFromApi(extractedText)
    } else if (!extractedText.trim()) {
      console.log('No extracted text to submit.')
    }
  }

  const handlePDFSelected = async (selectedFile: File) => {
    try {
      setIsProcessing(true)
      setFileName(selectedFile.name)
      setExtractedText('')
      setGeneratedDialogues('') // Clear previous dialogues
      const text = await extractTextFromPdf(selectedFile)
      setExtractedText(text)
    } catch (error) {
      console.error('Error processing PDF:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (extractedText && extractedText.trim() !== '') {
      generateDialoguesFromApi(extractedText)
    }
  }, [extractedText, generateDialoguesFromApi])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile) // Update file state
      validateAndProcessFile(selectedFile)
    }
  }, []) // validateAndProcessFile is stable if its dependencies are stable

  const validateAndProcessFile = useCallback(
    (fileToProcess: File) => {
      if (fileToProcess.type !== 'application/pdf') {
        alert('Please upload a valid PDF file.')
        return
      }
      handlePDFSelected(fileToProcess)
    },
    [], // handlePDFSelected can be added if it's memoized with useCallback and its deps are stable
    // For now, assuming it's stable or doesn't need to be a dep here if its identity doesn't change often
  )

  useEffect(() => {
    const fetchDialogues = async () => {
      if (!user?._id) {
        setFetching(false)
        return
      }
      try {
        setFetching(true)
        const res = await fetch(`/api/english/endialogues?userId=${user._id}`)
        if (!res.ok) {
          throw new Error(`Failed to fetch dialogues: ${res.status}`)
        }
        const data = await res.json()
        setDialogues(data.dialogues || [])
      } catch (err) {
        console.error('Error fetching dialogues:', err)
      } finally {
        setFetching(false)
      }
    }

    if (user?._id) {
      fetchDialogues()
    } else {
      setFetching(false)
    }
  }, [user?._id])
  // Add this after other state declarations
  const handleDelete = async (dialogueId: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce dialogue ?')) {
      try {
        const res = await fetch(`/api/english/endialogues/${dialogueId}`, {
          method: 'DELETE',
        })

        if (res.ok) {
          // Remove the deleted dialogue from state
          setDialogues(dialogues.filter((d) => d._id !== dialogueId))
        } else {
          throw new Error('Failed to delete dialogue')
        }
      } catch (error) {
        console.error('Error deleting dialogue:', error)
        alert('Une erreur est survenue lors de la suppression')
      }
    }
  }
  return (
    <>
      {/* <PageTitle title="Gestionnaire de Dialogues" /> */}
      <div className="mb-4">
        <Link href="/dashboards/english/dialogues/youtube">
          <Button variant="primary">Use a Youtube video</Button>
        </Link>
      </div>

      <Card className="mb-4">
        <Card.Header className="bg-light fw-bold">Send a PDF file</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>PDF file (podcast in English)</Form.Label>
              <Form.Control
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={isProcessing || loading}
              />
              <small className="text-muted">Dialogues will be generated using Claude (Anthropic)</small>
            </Form.Group>
            {isProcessing && (
              <div className="d-flex align-items-center mb-3">
                <Spinner size="sm" animation="border" className="me-2" />
                <span>Processando o PDF...</span>
              </div>
            )}
            <Button variant="primary" type="submit" disabled={loading || isProcessing || !extractedText.trim()}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" as="span" role="status" aria-hidden="true" />
                  <span className="ms-1">Geração em andamento...</span>
                </>
              ) : (
                'Send and generate Dialogues'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Display generated dialogues (which is a single string) */}
      {generatedDialogues && (
        <Card className="mb-4">
          <Card.Header className="bg-success text-white">Dialogues générés</Card.Header>
          <Card.Body style={{ maxHeight: '300px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
            {/* If generatedDialogues is a single string, display it directly */}
            <p>{generatedDialogues}</p>
          </Card.Body>
        </Card>
      )}

      <h5 className="fw-bold mb-3">Processed files</h5>

      {fetching ? (
        <Spinner animation="border" />
      ) : dialogues.length > 0 ? (
        dialogues.map(
          (
            dialogue: DialogueEntry, // Explicitly type dialogue here
          ) => (
            <Card className="mb-3" key={dialogue._id}>
              <Card.Body>
                <p className="mb-1">
                  <strong>{dialogue.url || 'Source inconnue'}</strong>
                </p>
                <p className="text-muted small">Added on: {new Date(dialogue.createdAt).toLocaleString()}</p>
                <div className="d-flex gap-2">
                  <Link href={`/dashboards/engglish/dialogues/view/${dialogue._id}`}>
                    <Button variant="outline-primary" size="sm">
                    See the dialogues
                    </Button>
                  </Link>
                  <Button variant="outline-danger" size="sm" onClick={(e) => handleDelete(dialogue._id, e)}>
                DELETE
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ),
        )
      ) : (
        <p>No dialogue found.</p>
      )}
    </>
  )
}

export default CardText
