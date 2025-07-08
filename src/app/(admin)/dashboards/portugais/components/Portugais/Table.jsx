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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const tag = searchParams.get('tag')
    const rating = searchParams.get('rating')

    // Filter words based on selected tag, rating, and search term
    const filtered = words.filter((word) => {
      const matchesTag = !tag || tag === 'All' || word.tags?.includes(tag)
      const matchesRating = !rating || rating === 'All' || (word.note && word.note === parseInt(rating))
      const matchesSearch = !searchTerm || 
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesTag && matchesRating && matchesSearch
    })

    // Sort by creation date (newest first) by default
    const sorted = [...filtered].sort((a, b) => {
      return new Date(b.createdAt || b.dateAdded || 0) - new Date(a.createdAt || a.dateAdded || 0)
    })

    setFilteredData(sorted)
  }, [searchParams, words, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / resultsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)

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
      if (order === 'asc') {
        return a.word.localeCompare(b.word) // Sort A to Z
      } else {
        return b.word.localeCompare(a.word) // Sort Z to A
      }
    })
    setFilteredData(sortedData)
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/portugal/porword/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setFilteredData((prevData) => prevData.filter((word) => word._id !== id))
        alert('Word deleted successfully!')
      } else {
        const errorData = await response.json()
        alert(`Failed to delete word: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error deleting word:', error)
      alert('An error occurred while deleting the word.')
    }
  }

  return (
    <Row>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
            <div>
              <CardTitle as={'h4'}>Lista de vocabulário</CardTitle>
            </div>
            <div className="d-flex align-items-center">
              <InputGroup size="sm" className="me-2" style={{ width: '200px' }}>
                <Form.Control
                  placeholder="Pesquisar palavras.."
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
              <Form.Select size="sm" className="me-2" value={resultsPerPage} onChange={handleResultsPerPageChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Form.Select>
              <Dropdown>
                <DropdownToggle
                  as={'a'}
                  className="btn btn-sm btn-outline-light rounded content-none icons-center"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                 Ordenar<IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem onClick={() => handleSort('asc')}>A to Z</DropdownItem>
                  <DropdownItem onClick={() => handleSort('desc')}>Z to A</DropdownItem>                 
                </DropdownMenu>
              </Dropdown>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="table-responsive">
              <SynthesisModal reviewData={paginatedData} loading={loading} onDelete={handleDelete} selectedVoice={selectedVoice} />
            </div>
          </CardBody>
          <CardFooter>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <Button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                    Anterior
                  </Button>
                </li>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                    <Button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                      {idx + 1}
                    </Button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <Button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                    Próximo
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