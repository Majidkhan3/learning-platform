'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import Link from 'next/link';
import { Button, Card, CardBody, CardTitle } from 'react-bootstrap';
const AllDataTables = ({
  dataTableRecords
}) => {
  return <>
      <Card>
        <CardBody>
          <CardTitle as={'h5'} className="anchor mb-1" id="overview">
            Overview
            <Button variant="outline-success" size="sm" className="rounded-2 float-end" href="https://gridjs.io" target="_blank">
              Official Website
            </Button>
          </CardTitle>
          <p className="sub-header">Grid.js is a Free and open-source JavaScript table plugin</p>
          <CardTitle as={'h5'} className="anchor mb-1" id="basic">
            Basic
            <Link className="anchor-link" href="#basic">
              #
            </Link>
          </CardTitle>
          <p className="text-muted">
            The most basic list group is an unordered list with list items and the proper classes. Build upon it with the options that follow, or with
            your own CSS as needed.
          </p>
          <div>
            <div className="py-3">
              <Grid data={dataTableRecords} pagination={{
              limit: 5
            }} search={true} />
            </div>
          </div>
        </CardBody>
      </Card>

      <ComponentContainerCard id="pagination" title="Pagination" description={<>
            Pagination can be enabled by setting <code>pagination: true</code>:
          </>}>
        <div className="pt-3">
          <Grid data={dataTableRecords} pagination={{
          limit: 5
        }} />
        </div>
      </ComponentContainerCard>

      <ComponentContainerCard id="search" title="Search" description={<>
            Grid.js supports global search on all rows and columns. Set <code>search: true</code> to enable the search plugin:
          </>}>
        <div className="pt-3">
          <Grid data={dataTableRecords} pagination={{
          limit: 5
        }} search={true} />
        </div>
      </ComponentContainerCard>

      <ComponentContainerCard id="sorting" title="Sorting" description={<>
            To enable sorting, simply add <code>sort: true</code> to your config:
          </>}>
        <div className="pt-3">
          <Grid data={dataTableRecords} pagination={{
          limit: 5
        }} sort />
        </div>
      </ComponentContainerCard>

      <ComponentContainerCard id="loading_state" title="Loading State" description={<>
            Grid.js renders a loading bar automatically while it waits for the data to be fetched. Here we are using an async function to demonstrate
            this behaviour (e.g. an async function can be a XHR call to a server backend)
          </>}>
        <div className="pt-3">
          <Grid columns={['Name', 'Email', 'Phone Number']} sort={true} search={true} pagination={{
          limit: 5
        }} data={() => {
          return new Promise(resolve => {
            setTimeout(() => resolve([['John', 'john@example.com', '(353) 01 222 3333'], ['Mark', 'mark@gmail.com', '(01) 22 888 4444']]), 4000);
          });
        }} />
        </div>
      </ComponentContainerCard>

      <ComponentContainerCard id="fixed_header" title="Fixed Header" description={<>
            The most basic list group is an unordered list with list items and the proper classes. Build upon it with the options that follow, or with
            your own CSS as needed.
          </>}>
        <div className="pt-3">
          <Grid data={dataTableRecords} columns={['id', 'name', 'email', 'position', 'company', 'country']} height="320px" fixedHeader={true} pagination={{
          limit: 10
        }} />
        </div>
      </ComponentContainerCard>

      <ComponentContainerCard id="hidden_column" title="Hidden Columns" description={<>
            The most basic list group is an unordered list with list items and the proper classes. Build upon it with the options that follow, or with
            your own CSS as needed.
          </>}>
        <div className="pt-3">
          <Grid data={dataTableRecords} columns={[{
          id: 'id',
          hidden: true
        }, 'name', 'email', 'position', 'company']} sort={true} pagination={{
          limit: 5
        }} />
        </div>
      </ComponentContainerCard>
    </>;
};
export default AllDataTables;