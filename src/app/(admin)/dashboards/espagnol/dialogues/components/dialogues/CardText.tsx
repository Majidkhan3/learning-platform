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
  const { user ,token}: any = useAuth() // Typed user
  const [file, setFile] = useState<File | null>(null) // Typed file state
  const [loading, setLoading] = useState(false)
  const [generatedDialogues, setGeneratedDialogues] = useState<string>('') // API returns a single string
  const [dialogues, setDialogues] = useState<DialogueEntry[]>([]) // Typed dialogues from DB
  const [fetching, setFetching] = useState(true)
  const [extractedText, setExtractedText] = useState('')
  const [fileName, setFileName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const generateDialoguesFromApi = useCallback(
    async (text: string) => {
      if (!text.trim() || !user?._id) {
        if (!user?._id) console.error('User ID is missing, cannot generate dialogues.')
        return
      }
       console.log('Sending token:', token)
      setLoading(true)
      try {
        const res = await fetch('/api/dialogues/create', {
          method: 'POST',
          headers: {
             Authorization: `Bearer ${token}`,
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
        router.push(`/dashboards/espagnol/dialogues/view/${data.dialogueId}`)

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
        const res = await fetch(`/api/dialogues?userId=${user._id}`,{ headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },})
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
        const res = await fetch(`/api/dialogues/${dialogueId}`, {
          method: 'DELETE',
          headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
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
        <Link href="/dashboards/espagnol/dialogues/youtube">
          <Button variant="primary">Utiliser une vidéo YouTube</Button>
        </Link>
      </div>

      <Card className="mb-4">
        <Card.Header className="bg-light fw-bold">Envoyer un fichier PDF</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Fichier PDF (podcast en espagnol)</Form.Label>
              <Form.Control
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={isProcessing || loading}
              />
              <small className="text-muted">Les dialogues seront générés en utilisant Claude (Anthropic)</small>
            </Form.Group>
            {isProcessing && (
              <div className="d-flex align-items-center mb-3">
                <Spinner size="sm" animation="border" className="me-2" />
                <span>Traitement du PDF...</span>
              </div>
            )}
            <Button variant="primary" type="submit" disabled={loading || isProcessing || !extractedText.trim()}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" as="span" role="status" aria-hidden="true" />
                  <span className="ms-1">Génération en cours...</span>
                </>
              ) : (
                'Envoyer et générer des dialogues'
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

      <h5 className="fw-bold mb-3">Archivos procesados</h5>
      <div className="d-flex justify-content-end mb-3">
      <Form.Select
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
  className="mb-3 w-auto"
  aria-label="Trier les dialogues"
>
  <option value="newest">Del más nuevo al más antiguo</option>
  <option value="oldest">Del más antiguo al más nuevo</option>
</Form.Select>
</div>
   {fetching ? (
  <Spinner animation="border" />
) : dialogues.length > 0 ? (
  (
    [...dialogues]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
      .map((dialogue: DialogueEntry) => (
        <Card className="mb-3" key={dialogue._id}>
          <Card.Body>
            <p className="mb-1">
              <strong>{dialogue.url || 'Source inconnue'}</strong>
            </p>
            <p className="text-muted small">
              Ajouté le: {new Date(dialogue.createdAt).toLocaleString()}
            </p>
            <div className="d-flex gap-2">
              <Link href={`/dashboards/espagnol/dialogues/view/${dialogue._id}`}>
                <Button variant="outline-primary" size="sm">
                 Ver los diálogos
                </Button>
              </Link>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={(e) => handleDelete(dialogue._id, e)}
              >
                Supprimer
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))
  )
) : (
  <p>Aucun dialogue trouvé.</p>
)}

    </>
  )
}

export default CardText
