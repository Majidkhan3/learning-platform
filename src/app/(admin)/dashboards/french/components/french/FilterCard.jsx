'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Badge, Card, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const FilterCard = ({ tags, voices, onVoiceChange }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTags, setSelectedTags] = useState(['All']) // Changed to array
  const [selectedRatings, setSelectedRatings] = useState(['All']) // Changed to array
  const [voice, setVoice] = useState(voices[0]?.id)
  const [flashCardMode, setFlashCardMode] = useState(false)

  const ratings = ['All','Aucune évaluation', '1', '2', '3', '4']

  useEffect(() => {
    // Initialize from URL params
    const tagParam = searchParams.get('tag')
    const ratingParam = searchParams.get('rating')
    
    if (tagParam) {
      setSelectedTags(tagParam.split(','))
    } else {
      setSelectedTags(['All'])
    }
    
    if (ratingParam) {
      setSelectedRatings(ratingParam.split(','))
    } else {
      setSelectedRatings(['All'])
    }
  }, [searchParams])

  const updateUrlParams = () => {
    const params = new URLSearchParams()
    
    // Add tags if any are selected and not just "All"
    if (selectedTags.length > 0 && !(selectedTags.length === 1 && selectedTags[0] === 'All')) {
      params.set('tag', selectedTags.join(','))
    } else {
      params.delete('tag')
    }
    
    // Add ratings if any are selected and not just "All"
    if (selectedRatings.length > 0 && !(selectedRatings.length === 1 && selectedRatings[0] === 'All')) {
      params.set('rating', selectedRatings.join(','))
    } else {
      params.delete('rating')
    }
    
    router.push(`?${params.toString()}`)
  }

  const handleTagChange = (tagName) => {
    setSelectedTags(prev => {
      if (tagName === 'All') {
        // If clicking "All", clear all other selections
        return ['All']
      } else if (prev.includes(tagName)) {
        // Remove tag if already selected
        const newTags = prev.filter(tag => tag !== tagName)
        // If no tags left, default to "All"
        return newTags.length === 0 ? ['All'] : newTags
      } else {
        // Add tag and remove "All" if it was selected
        const newTags = prev.filter(tag => tag !== 'All')
        return [...newTags, tagName]
      }
    })
  }

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev => {
      if (rating === 'All') {
        // If clicking "All", clear all other selections
        return ['All']
      } else if (prev.includes(rating)) {
        // Remove rating if already selected
        const newRatings = prev.filter(r => r !== rating)
        // If no ratings left, default to "All"
        return newRatings.length === 0 ? ['All'] : newRatings
      } else {
        // Add rating and remove "All" if it was selected
        const newRatings = prev.filter(r => r !== 'All')
        return [...newRatings, rating]
      }
    })
  }

  // Update URL when filters change
  useEffect(() => {
    updateUrlParams()
  }, [selectedTags, selectedRatings])

  const handleVoiceChange = (selectedVoice) => {
    setVoice(selectedVoice)
    onVoiceChange(selectedVoice)
  }

  const handleFlashCardModeChange = (e) => {
    const isChecked = e.target.checked
    setFlashCardMode(isChecked)

    if (isChecked) {
      const params = new URLSearchParams()
      
      // Add tags if not "All"
      if (selectedTags.length > 0 && !(selectedTags.length === 1 && selectedTags[0] === 'All')) {
        params.set('tag', selectedTags.join(','))
      }
      
      // Add ratings if not "All"
      if (selectedRatings.length > 0 && !(selectedRatings.length === 1 && selectedRatings[0] === 'All')) {
        params.set('rating', selectedRatings.join(','))
      }

      const flashcardPath = '/flashcards'
      const query = params.toString()
      router.push(`/dashboards/french/${flashcardPath}${query ? `?${query}` : ''}`)
    }
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <h5 className="mb-3"> Filtrer par étiquette :</h5>
        <div className="d-flex flex-wrap gap-2 mb-4">
          {/* All option */}
          <Badge
            key="all"
            pill
            bg={selectedTags.includes('All') ? 'primary' : 'light'} // Changed to includes
            text={selectedTags.includes('All') ? 'white' : 'dark'} // Changed to includes
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
              bg={selectedTags.includes(tag.name) ? 'primary' : 'light'} // Changed to includes
              text={selectedTags.includes(tag.name) ? 'white' : 'dark'} // Changed to includes
              className="cursor-pointer"
              onClick={() => handleTagChange(tag.name)}
              style={{ cursor: 'pointer' }}>
              {tag.name}
            </Badge>
          ))}
        </div>

        <h5 className="mb-3">Filtrer par note:</h5>
        <div className="d-flex flex-wrap gap-2 mb-4">
          {ratings.map((rating) => (
            <Badge
              key={rating}
              pill
              bg={selectedRatings.includes(rating) ? 'primary' : 'light'} // Changed to includes
              text={selectedRatings.includes(rating) ? 'white' : 'dark'} // Changed to includes
              className="cursor-pointer"
              onClick={() => handleRatingChange(rating)}
              style={{ cursor: 'pointer' }}>
             {(rating === 'All' || rating === 'Aucune évaluation') ? rating : `${rating} ★`}

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
            <span>Mode carte mémoire</span>
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