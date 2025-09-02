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
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // Handle window resize for responsive pagination
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 576)
    }

    // Set initial value
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const tag = searchParams.get('tag')
    const ratingParam = searchParams.get('rating')
    const selectedRatings = ratingParam ? ratingParam.split(',') : []

    // Filter words based on selected tag, ratings (multi), and search term
    const filtered = words.filter((word) => {
      const matchesTag =
        !tag || tag === 'All' || word.tags?.includes(tag)

      const matchesRating =
        !ratingParam ||
        selectedRatings.includes('All') ||
       (selectedRatings.includes('Aucune évaluation') && (!word.note || word.note === 0)) || // <-- NEW: No rating filter
        (word.note && selectedRatings.includes(String(word.note)))

      const matchesSearch =
        !searchTerm ||
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation?.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesTag && matchesRating && matchesSearch
    })

    const sorted = [...filtered].sort((a, b) => {
      return (
        new Date(b.createdAt || b.dateAdded || 0) -
        new Date(a.createdAt || a.dateAdded || 0)
      )
    })

    setFilteredData(sorted)
    setCurrentPage(1) // reset to first page when filters change
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
      if (order === 'date-desc') {
        return new Date(b.createdAt || b.dateAdded || 0) - new Date(a.createdAt || a.dateAdded || 0) // Newest first
      } else if (order === 'date-asc') {
        return new Date(a.createdAt || a.dateAdded || 0) - new Date(b.createdAt || b.dateAdded || 0) // Oldest first
      }
      else if (order === 'A-Z') {
        return (a.word || "").localeCompare(b.word || "")
      } else if (order === 'Z-A') {
        return (b.word || "").localeCompare(a.word || "")
      }
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
          <CardHeader className="border-bottom">
            <div
              className="d-flex flex-row align-items-center gap-2 w-100 overflow-auto"
              style={{ whiteSpace: "nowrap" }}
            >
              {/* Title */}
              <CardTitle as="h4" className="mb-0 flex-shrink-0">
                Liste de vocabulaire
              </CardTitle>

              {/* Search box */}
              <InputGroup size="sm" className="flex-grow-1" style={{ minWidth: "200px" }}>
                <Form.Control
                  placeholder="Rechercher des mots..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button variant="outline-secondary" onClick={() => setSearchTerm("")}>
                    <IconifyIcon icon="mdi:close" />
                  </Button>
                )}
              </InputGroup>

              {/* Results per page */}
              <Form.Select
                size="sm"
                value={resultsPerPage}
                onChange={handleResultsPerPageChange}
                className="flex-shrink-0"
                style={{ width: "90px" }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Form.Select>

              {/* Sort dropdown */}
              <Form.Select
                size="sm"
                className="flex-shrink-0"
                style={{ width: "170px" }}
                onChange={(e) => handleSort(e.target.value)}
                defaultValue="date-desc"
              >
                <option value="date-desc">Le plus récent en premier</option>
                <option value="date-asc">Le plus ancien en premier</option>
                <option value="A-Z">A - Z</option>
                <option value="Z-A">Z - A</option>
              </Form.Select>
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

          <CardFooter className="py-2">
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm justify-content-end mb-1">
                {/* Prev */}
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    ‹
                  </button>
                </li>

                {/* Numbers with window + ellipses */}
                {(() => {
                  // 🔹 Responsive max visible pages
                  const isSmallScreen = window.innerWidth < 576; // Bootstrap "sm"
                  const MAX_VISIBLE = isSmallScreen ? 3 : 4;

                  const pages = Math.ceil(filteredData.length / resultsPerPage) || 1;
                  const half = Math.floor(MAX_VISIBLE / 2);

                  let start = Math.max(1, currentPage - half);
                  let end = Math.min(pages, start + MAX_VISIBLE - 1);
                  if (end - start + 1 < MAX_VISIBLE)
                    start = Math.max(1, end - MAX_VISIBLE + 1);

                  const items = [];

                  // First page + ellipsis
                  if (start > 1) {
                    items.push(
                      <li
                        key={1}
                        className={`page-item ${currentPage === 1 ? "active" : ""}`}
                      >
                        <button className="page-link" onClick={() => handlePageChange(1)}>
                          1
                        </button>
                      </li>
                    );
                    if (start > 2) {
                      items.push(
                        <li key="start-ellipsis" className="page-item disabled">
                          <span className="page-link px-1">…</span>
                        </li>
                      );
                    }
                  }

                  // Window of pages
                  for (let p = start; p <= end; p++) {
                    items.push(
                      <li
                        key={p}
                        className={`page-item ${currentPage === p ? "active" : ""}`}
                      >
                        <button className="page-link" onClick={() => handlePageChange(p)}>
                          {p}
                        </button>
                      </li>
                    );
                  }

                  // Last page + ellipsis
                  if (end < pages) {
                    if (end < pages - 1) {
                      items.push(
                        <li key="end-ellipsis" className="page-item disabled">
                          <span className="page-link px-1">…</span>
                        </li>
                      );
                    }
                    items.push(
                      <li
                        key={pages}
                        className={`page-item ${currentPage === pages ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(pages)}
                        >
                          {pages}
                        </button>
                      </li>
                    );
                  }

                  return items;
                })()}

                {/* Next */}
                <li
                  className={`page-item ${currentPage === Math.ceil(filteredData.length / resultsPerPage) ||
                    filteredData.length === 0
                    ? "disabled"
                    : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    ›
                  </button>
                </li>
              </ul>
            </nav>

            {/* Compact counter */}
            <div
              className="text-end mt-1"
              style={{ fontSize: "0.75rem", color: "#6c757d" }}
            >
              {filteredData.length === 0
                ? "0 resultados"
                : `${(currentPage - 1) * resultsPerPage + 1}–${Math.min(
                  currentPage * resultsPerPage,
                  filteredData.length
                )} de ${filteredData.length}`}
            </div>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  )
}

export default Table