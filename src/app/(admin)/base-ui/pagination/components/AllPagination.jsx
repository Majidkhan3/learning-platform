'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Pagination } from 'react-bootstrap';
const DefaultPagination = () => {
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(<Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>);
  }
  return <ComponentContainerCard id="default-buttons" title="Default Pagination" description={<>
          Use the button classes on an <code>&lt;a&gt;</code>, <code>&lt;button&gt;</code> or <code>&lt;input&gt;</code> element.
        </>}>
      <nav>
        <Pagination>
          <Pagination.Prev>Previous</Pagination.Prev>
          {items}
          <Pagination.Next>Next</Pagination.Next>
        </Pagination>
      </nav>

      <nav>
        <Pagination>
          <Pagination.Prev />
          {items}
          <Pagination.Next />
        </Pagination>
      </nav>
    </ComponentContainerCard>;
};
const RoundedPagination = () => {
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(<Pagination.Item key={number} active={number === 2}>
        {number}
      </Pagination.Item>);
  }
  return <ComponentContainerCard id="rounded-pagination" title="Rounded Pagination" description={<>Simple pagination inspired by Rdio, great for apps and search results.</>}>
      <nav>
        <Pagination className="pagination-rounded">
          <Pagination.Prev>Previous</Pagination.Prev>
          {items}
          <Pagination.Next>Next</Pagination.Next>
        </Pagination>
      </nav>
      <nav aria-label="Page navigation example">
        <Pagination className="pagination-rounded mb-0">
          <Pagination.Prev />
          {items}
          <Pagination.Next />
        </Pagination>
      </nav>
    </ComponentContainerCard>;
};
const PaginationAlignment = () => {
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(<Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>);
  }
  return <ComponentContainerCard id="alignment" title="Alignment" description={<>Change the alignment of pagination components with flexbox utilitie</>}>
      <nav aria-label="Page navigation example">
        <Pagination className="justify-content-center">
          <Pagination.Prev>Previous</Pagination.Prev>
          {items}
          <Pagination.Next>Next</Pagination.Next>
        </Pagination>
      </nav>
      <nav aria-label="Page navigation example">
        <Pagination className="justify-content-end mb-0">
          <Pagination.Prev>Previous</Pagination.Prev>
          {items}
          <Pagination.Next>Next</Pagination.Next>
        </Pagination>
      </nav>
    </ComponentContainerCard>;
};
const PaginationSizes = () => {
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(<Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>);
  }
  return <ComponentContainerCard id="sizing" title="Sizing" description={<>
          Add <code>.pagination-lg</code> or <code>.pagination-sm</code> for additional sizes.
        </>}>
      <nav aria-label="...">
        <Pagination size="lg">{items}</Pagination>
      </nav>
      <nav aria-label="...">
        <Pagination>{items}</Pagination>
      </nav>
      <nav aria-label="...">
        <Pagination size="sm" className="mb-0">
          {items}
        </Pagination>
      </nav>
    </ComponentContainerCard>;
};
const AllPagination = () => {
  return <>
      <DefaultPagination />
      <RoundedPagination />
      <PaginationAlignment />
      <PaginationSizes />
    </>;
};
export default AllPagination;