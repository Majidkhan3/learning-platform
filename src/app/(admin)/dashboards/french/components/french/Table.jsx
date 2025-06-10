'use client'
import { useSearchParams } from 'next/navigation'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Form,
  InputGroup,
} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import SynthesisModal from './SynthesisModal'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';

const Table = ({ loading, words, selectedVoice }) => {
  const { user, token } = useAuth();
  const searchParams = useSearchParams()
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const tag = searchParams.get('tag')
    const rating = searchParams.get('rating')

    // Filter and sort words
    const filtered = words.filter((word) => {
      const matchesTag = !tag || tag === 'All' || word.tags?.includes(tag)
      const matchesRating = !rating || rating === 'All' || (word.note && word.note === parseInt(rating))
      const matchesSearch = !searchTerm || 
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesTag && matchesRating && matchesSearch
    })

    // Sort by newest first by default
    const sorted = [...filtered].sort((a, b) => {
      return new Date(b.createdAt || b.dateAdded || 0) - new Date(a.createdAt || a.dateAdded || 0)
    })

    setFilteredData(sorted)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchParams, words, searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / resultsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * resultsPerPage, 
    currentPage * resultsPerPage
  )

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleResultsPerPageChange = (e) => {
    setResultsPerPage(parseInt(e.target.value))
    setCurrentPage(1)
  }

  const handleSort = (order) => {
    const sortedData = [...filteredData].sort((a, b) => {
      return order === 'asc' 
        ? a.word.localeCompare(b.word) 
        : b.word.localeCompare(a.word)
    })
    setFilteredData(sortedData)
  }

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce mot ?')) return
    
    try {
      const response = await fetch(`/api/french/frword/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },  
      })

      if (response.ok) {
        setFilteredData(prev => prev.filter(word => word._id !== id))
        alert('Mot supprimé avec succès !')
      } else {
        const error = await response.json()
        alert(`Échec de la suppression : ${error.message || error.error}`)
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue lors de la suppression')
    }
  }

  return (
    <Row>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
            <CardTitle as="h4">Liste de vocabulaire</CardTitle>
            <div className="d-flex align-items-center">
              <InputGroup size="sm" className="me-2" style={{ width: '200px' }}>
                <Form.Control
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button 
                    variant="outline-secondary"
                    onClick={() => setSearchTerm('')}
                  >
                    <IconifyIcon icon="mdi:close" />
                  </Button>
                )}
              </InputGroup>
              
              <Form.Select 
                size="sm" 
                className="me-2" 
                value={resultsPerPage} 
                onChange={handleResultsPerPageChange}
                style={{ width: '80px' }}
              >
                {[5, 10, 20, 50].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Form.Select>
              
              <Dropdown>
                <DropdownToggle
                  as={Button}
                  variant="outline-light"
                  size="sm"
                  className="rounded d-flex align-items-center"
                >
                  Trier <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem onClick={() => handleSort('asc')}>A à Z</DropdownItem>
                  <DropdownItem onClick={() => handleSort('desc')}>Z à A</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </CardHeader>
          
          <CardBody className="p-0">
            <div className="table-responsive">
              <SynthesisModal 
                reviewData={paginatedData} 
                loading={loading} 
                onDelete={handleDelete} 
                selectedVoice={selectedVoice} 
              />
            </div>
          </CardBody>
          
          <CardFooter>
            <nav aria-label="Navigation des pages">
              <ul className="pagination justify-content-end mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <Button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Précédent
                  </Button>
                </li>
                
                {Array.from({ length: totalPages }, (_, idx) => (
                  <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                    <Button 
                      className="page-link" 
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </Button>
                  </li>
                ))}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <Button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Suivant
                  </Button>
                </li>
              </ul>
            </nav>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  )
}

export default Table