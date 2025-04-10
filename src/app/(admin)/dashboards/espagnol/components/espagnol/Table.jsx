"use client";
import { useSearchParams } from 'next/navigation';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SynthesisModal from './SynthesisModal';

const Table = ({ loading, words }) => {
  const searchParams = useSearchParams();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const tag = searchParams.get('tag');
    const rating = searchParams.get('rating');

    // Filter words based on selected tag and rating
    const filtered = words.filter((word) => {
      const matchesTag = !tag || tag === 'All' || word.tags?.includes(tag);
      const matchesRating = !rating || rating === 'All' || word.note >= parseInt(rating);
      return matchesTag && matchesRating;
    });

    setFilteredData(filtered);
  }, [searchParams, words]);

  return (
    <Row>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
            <div>
              <CardTitle as={'h4'}>Liste de vocabulaire</CardTitle>
            </div>
            <Dropdown>
              <DropdownToggle
                as={'a'}
                className="btn btn-sm btn-outline-light rounded content-none icons-center"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                This Month <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Download</DropdownItem>
                <DropdownItem>Export</DropdownItem>
                <DropdownItem>Import</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardHeader>
          <CardBody className="p-0">
            <div className="table-responsive">
              <SynthesisModal reviewData={filteredData} loading={loading} />
            </div>
          </CardBody>
          <CardFooter>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end mb-0">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

export default Table;