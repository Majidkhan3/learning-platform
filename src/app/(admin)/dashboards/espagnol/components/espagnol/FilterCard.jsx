'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Badge, Card, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const FilterCard = ({ tags, voices, onVoiceChange }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTag, setSelectedTag] = useState('All')
  const [selectedRating, setSelectedRating] = useState('All')
  const [voice, setVoice] = useState(voices[0]?.id || 'Lucia')
  const [flashCardMode, setFlashCardMode] = useState(false)

  const ratings = ['All', '1', '2', '3', '4']

  useEffect(() => {
    // Initialize from URL params
    const tag = searchParams.get('tag')
    const rating = searchParams.get('rating')
    if (tag) setSelectedTag(tag)
    if (rating) setSelectedRating(rating)
  }, [searchParams])

  const handleTagChange = (tagName) => {
    setSelectedTag(tagName)
    const params = new URLSearchParams(searchParams)
    if (tagName === 'All') {
      params.delete('tag')
    } else {
      params.set('tag', tagName)
    }
    router.push(`?${params.toString()}`)
  }

  const handleRatingChange = (rating) => {
    setSelectedRating(rating)
    const params = new URLSearchParams(searchParams)
    if (rating === 'All') {
      params.delete('rating')
    } else {
      params.set('rating', rating)
    }
    router.push(`?${params.toString()}`)
  }

  const handleVoiceChange = (selectedVoice) => {
    setVoice(selectedVoice)
    onVoiceChange(selectedVoice) // Notify the parent component
  }
 const handleFlashCardModeChange = (e) => {
  const isChecked = e.target.checked
  setFlashCardMode(isChecked)

  if (isChecked) {
    const params = new URLSearchParams()
    if (selectedTag !== 'All') {
      params.set('tag', selectedTag)
    }
    if (selectedRating !== 'All') {
      params.set('rating', selectedRating)
    }

    const flashcardPath = '/flashcard'
    const query = params.toString()
    router.push(`/dashboards/espagnol/${flashcardPath}${query ? `?${query}` : ''}`)
  }
}


  return (
    <Card className="mb-4">
      <Card.Body>
        <h5 className="mb-3">Filtrar por etiqueta:</h5>
        <div className="d-flex flex-wrap gap-2 mb-4">
          {/* Add 'All' option manually */}
          <Badge
            key="all"
            pill
            bg={selectedTag === 'All' ? 'primary' : 'light'}
            text={selectedTag === 'All' ? 'white' : 'dark'}
            className="cursor-pointer"
            onClick={() => handleTagChange('All')}
            style={{ cursor: 'pointer' }}>
            All
          </Badge>
          {/* Render tags dynamically */}
          {tags.map((tag) => (
            <Badge
              key={tag._id}
              pill
              bg={selectedTag === tag.name ? 'primary' : 'light'}
              text={selectedTag === tag.name ? 'white' : 'dark'}
              className="cursor-pointer"
              onClick={() => handleTagChange(tag.name)}
              style={{ cursor: 'pointer' }}>
              {tag.name}
            </Badge>
          ))}
        </div>

        <h5 className="mb-3">Filtrar por calificación</h5>
        <div className="d-flex flex-wrap gap-2 mb-4">
          {ratings.map((rating) => (
            <Badge
              key={rating}
              pill
              bg={selectedRating === rating ? 'primary' : 'light'}
              text={selectedRating === rating ? 'white' : 'dark'}
              className="cursor-pointer"
              onClick={() => handleRatingChange(rating)}
              style={{ cursor: 'pointer' }}>
              {rating === 'All' ? rating : `${rating} ★`}
            </Badge>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div
            onClick={() => handleFlashCardModeChange({ target: { checked: !flashCardMode } })}
            style={{ cursor: 'pointer' }}
            className="d-flex align-items-center">
            <IconifyIcon
              icon="mdi:cards"
              className={`me-2`}
              style={{
                color: flashCardMode ? '#0d6efd' : '#6c757d',
                fontSize: '24px',
              }}
            />
            <span>Modo de tarjetas didácticas</span>
          </div>
          <Form.Select
            size="sm"
            style={{
              width: '180px',
            }}
            value={voice}
            onChange={(e) => handleVoiceChange(e.target.value)}>
            {voices.map((voiceOption) => (
              <option key={voiceOption.id} value={voiceOption.id}>
                {voiceOption.name} ({voiceOption.gender})
              </option>
            ))}
          </Form.Select>
        </div>
      </Card.Body>
    </Card>
  )
}

export default FilterCard
