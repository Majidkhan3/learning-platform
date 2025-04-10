import { Button, Col, FormCheck, Row, Table } from 'react-bootstrap';
import clsx from 'clsx';
import Link from 'next/link';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import UIExamplesList from '@/components/UIExamplesList';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { colorVariants, currency } from '@/context/constants';
import { toSentenceCase } from '@/utils/change-casing';
import { extendedTableData, tableData } from './data';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import avatar7 from '@/assets/images/users/avatar-7.jpg';
import avatar8 from '@/assets/images/users/avatar-8.jpg';
import Image from 'next/image';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Basic Tables'
};
const BasicExample = () => {
  return <ComponentContainerCard id="basic" title="Basic Example" description={<>
          For basic styling—light padding and only horizontal dividers—add the base class <code>.table</code> to any <code>&lt;table&gt;</code>.
        </>}>
      <div className="table-responsive">
        <table className="table table-centered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </ComponentContainerCard>;
};
const TableVariants = () => {
  return <ComponentContainerCard id="variant" title="Variants" description={<>Use contextual classes to color tables, table rows or individual cells.</>}>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Class</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            {colorVariants.slice(0, 7).map((color, idx) => <tr className={`table-${color}`} key={idx}>
                <td>{toSentenceCase(color)}</td>
                <td>Cell</td>
                <td>Cell</td>
              </tr>)}
            <tr className="table-light">
              <td>Light</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ComponentContainerCard>;
};
const StripedRowsTable = () => {
  return <ComponentContainerCard id="striped" title="Striped Rows Table" description={<>
          {' '}
          Use <code>.table-striped</code> to add zebra-striping to any table row within the <code>&lt;tbody&gt;</code>.
        </>}>
      <div className="table-responsive">
        <Table striped className="table-centered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const StripedRowsTableDark = () => {
  return <ComponentContainerCard id="striped-dark" title="Striped Rows Table Dark" description={<>
          Use <code>.table-dark .table-striped</code> to add zebra-striping to any table row within the <code>&lt;tbody&gt;</code>.
        </>}>
      <div className="table-responsive">
        <Table striped variant="dark" align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const StripedRowsTableSuccess = () => {
  return <ComponentContainerCard id="striped-success" title="Striped Rows Table Success" description={<>
          Use <code>.table-success .table-striped</code> to add zebra-striping to any table row within the <code>&lt;tbody&gt;</code>.
        </>}>
      <div className="table-responsive">
        <Table striped variant="success" align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const StripedColumnsTable = () => {
  return <ComponentContainerCard id="striped" title="Striped columns" description={<>
          Use <code>.table-striped-columns </code>to add zebra-striping to any table column.
        </>}>
      <div className="table-responsive-sm">
        <Table striped="columns" align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const StripedColumnsDarkTable = () => {
  return <ComponentContainerCard id="striped-column-dark" title="Striped columns Dark" description={<>
          Use <code>.table-dark .table-striped-columns </code>to add zebra-striping to any table column.
        </>}>
      <div className="table-responsive-sm">
        <Table variant="dark" striped="columns" align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const StripedColumnsSuccessTable = () => {
  return <ComponentContainerCard id="striped-column-success" title="Striped columns Success" description={<>
          Use <code>.table-success .table-striped-columns </code>to add zebra-striping to any table column.
        </>}>
      <div className="table-responsive-sm">
        <Table variant="success" striped="columns" align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const HoverableRowsTable = () => {
  return <ComponentContainerCard id="hoverable-row" title="Hoverable rows" description={<>
          Add <code>.table-hover</code> to enable a hover state on table rows within a <code>&lt;tbody&gt;</code>.
        </>}>
      <div className="table-responsive">
        <Table hover align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const HoverableRowsDarkTable = () => {
  return <ComponentContainerCard id="hoverable-row" title="Hoverable rows Dark" description={<>
          Add <code>.table-dark .table-hover</code> to enable a hover state on table rows within a <code>&lt;tbody&gt;</code>.
        </>}>
      <div className="table-responsive">
        <Table hover variant="dark" align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const ActiveTables = () => {
  return <ComponentContainerCard id="active" title="Active Tables" description={<>
          Highlight a table row or cell by adding a <code>.table-active</code> class.
        </>}>
      <div className="table-responsive">
        <Table align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-active">
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td className="table-active">Larry the Bird</td>
              <td>Simsons</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const ActiveTablesDark = () => {
  return <ComponentContainerCard id="" title="Active Tables Dark" description={<>
          Highlight a table row or cell by adding a <code>.table-dark .table-active</code> class.
        </>}>
      <div className="table-responsive">
        <Table align="center" variant="dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-active">
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td className="table-active">Larry the Bird</td>
              <td>Simsons</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const BorderedTable = () => {
  return <ComponentContainerCard id="bordered" title="Bordered Table" description={<>
          Add <code>.table-bordered</code> for borders on all sides of the table and cells.
        </>}>
      <div className="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const BorderedColorTable = () => {
  return <ComponentContainerCard id="border-color" title="Bordered color Table" description={<>
          Add <code>.table-bordered</code> &amp; <code>.border-primary</code> can be added to change colors.
        </>}>
      <div className="table-responsive">
        <Table bordered className="border-primary" align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const TableWithoutBorders = () => {
  return <ComponentContainerCard id="borderless" title="Tables without borders" description={<>
          Add <code>.table-borderless</code> for a table without borders..
        </>}>
      <div className="table-responsive">
        <Table borderless align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const TableWithoutBordersDark = () => {
  return <ComponentContainerCard id="borderless-dark" title="Tables without borders Dark" description={<>
          Add <code>.table-borderless</code> <code>.table-dark</code> for a table without borders and dark table.
        </>}>
      <div className="table-responsive">
        <Table borderless align="center" variant="dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const SmallTables = () => {
  return <ComponentContainerCard id="small" title="Small tables" description={<>
          Add <code>.table-sm </code>to make any .table more compact by cutting all cell padding in half.
        </>}>
      <div className="table-responsive">
        <Table size="sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const SmallTableDark = () => {
  return <ComponentContainerCard id="small-dark" title="Small tables Dark" description={<>
          Add <code>.table-sm </code> <code>.table-dark </code>to make any .table more compact by cutting all cell padding in half.
        </>}>
      <div className="table-responsive">
        <Table size="sm" variant="dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const VerticalAlignmentTable = () => {
  return <ComponentContainerCard id="alignment" title="Vertical alignment" description={<>
          Table cells of <code>&lt;thead&gt;</code> are always vertical aligned to the bottom. Table cells in <code>&lt;tbody&gt;</code> inherit their
          alignment from <code>&lt;table&gt;</code> and are aligned to the top by default. Use the <Link href="">vertical align</Link> classes to
          re-align where needed.
        </>}>
      <div className="table-responsive">
        <table className="table align-middle table-centered">
          <thead>
            <tr>
              <th scope="col" className="w-25">
                Heading 1
              </th>
              <th scope="col" className="w-25">
                Heading 2
              </th>
              <th scope="col" className="w-25">
                Heading 3
              </th>
              <th scope="col" className="w-25">
                Heading 4
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                This cell inherits <code>vertical-align: middle;</code> from the table
              </td>
              <td>
                This cell inherits <code>vertical-align: middle;</code> from the table
              </td>
              <td>
                This cell inherits <code>vertical-align: middle;</code> from the table
              </td>
              <td>
                This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works
                in the preceding cells.
              </td>
            </tr>
            <tr className="align-bottom">
              <td>
                This cell inherits <code>vertical-align: bottom;</code> from the table row
              </td>
              <td>
                This cell inherits <code>vertical-align: bottom;</code> from the table row
              </td>
              <td>
                This cell inherits <code>vertical-align: bottom;</code> from the table row
              </td>
              <td>
                This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works
                in the preceding cells.
              </td>
            </tr>
            <tr>
              <td>
                This cell inherits <code>vertical-align: middle;</code> from the table
              </td>
              <td>
                This cell inherits <code>vertical-align: middle;</code> from the table
              </td>
              <td className="align-top">This cell is aligned to the top.</td>
              <td>
                This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works
                in the preceding cells.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ComponentContainerCard>;
};
const NestingTable = () => {
  return <ComponentContainerCard id="nesting" title="Nesting Table" description={<>Border styles, active styles, and table variants are not inherited by nested tables.</>}>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-centered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Header</th>
                      <th scope="col">Header</th>
                      <th scope="col">Header</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A</td>
                      <td>First</td>
                      <td>Last</td>
                    </tr>
                    <tr>
                      <td>B</td>
                      <td>First</td>
                      <td>Last</td>
                    </tr>
                    <tr>
                      <td>C</td>
                      <td>First</td>
                      <td>Last</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ComponentContainerCard>;
};
const TableHead = () => {
  return <ComponentContainerCard id="head-option" title="Table head" description={<>
          Similar to tables and dark tables, use the modifier classes <code>.table-light</code>to make <code>&lt;thead&gt;</code>s appear light or
          dark gray.
        </>}>
      <div className="table-responsive">
        <Table align="center">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const TableHeadDark = () => {
  return <ComponentContainerCard id="tablehead" title="Table head Dark" description={<>
          Similar to tables and dark tables, use the modifier classes <code>.table-dark</code> to make <code>&lt;thead&gt;</code>s appear light or
          dark gray.
        </>}>
      <div className="table-responsive">
        <Table align="center">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const TableWithFooter = () => {
  return <ComponentContainerCard id="tablefoot" title="Table foot">
      <div className="table-responsive mt-2">
        <Table align="center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
          <tfoot>
            <tr>
              <td>Footer</td>
              <td>Footer</td>
              <td>Footer</td>
              <td>Footer</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const TableWithCaption = () => {
  return <ComponentContainerCard id="captions" title="Captions" description={<>
          A <code>&lt;caption&gt;</code> functions like a heading for a table. It helps users with screen readers to find a table and understand what
          it’s about and decide if they want to read it.
        </>}>
      <div className="table-responsive">
        <Table align="center">
          <caption>List of users</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const TableWithCaptionTop = () => {
  return <ComponentContainerCard id="captions-top" title="Captions" description={<>
          You can also put the <code>&lt;caption&gt;</code> on the top of the table with <code>.caption-top</code>
        </>}>
      <div className="table-responsive">
        <Table align="center" className="caption-top">
          <caption>List of users</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const TableGroupDividers = () => {
  return <ComponentContainerCard id="dividers" title="Table group dividers" description={<>
          Add a thicker border, darker between table groups—<code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, and <code>&lt;tfoot&gt;</code>
          —with <code>.table-group-divider</code>. Customize the color by changing the <code>border-top-color</code> (which we don’t currently provide
          a utility class for at this time).
        </>}>
      <div className="table-responsive">
        <Table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {tableData.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.handle}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const AlwaysResponsiveTable = () => {
  return <ComponentContainerCard id="responsive" title="Always responsive" description={<>
          Across every breakpoint, use <code>.table-responsive</code> for horizontally scrolling tables.
        </>}>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ComponentContainerCard>;
};
const TableWithAvatars = () => {
  return <ComponentContainerCard id="avatar" title="With avatars" description={<>A list of all the users in your account including their name, title, email and role.</>}>
      <div className="table-responsive">
        <Table hover align="center">
          <thead className="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Title</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {extendedTableData.map(item => <tr className={clsx({
            'table-active': item.verified
          })} key={item.id}>
                <td>
                  <div className="d-flex align-items-center gap-1">
                    {item.avatar && <Image src={item.avatar} alt="avatar" className="avatar-sm rounded-circle" />}
                    <div className="d-block">
                      <h5 className="mb-0 d-flex align-items-center gap-1">
                        {item.name}
                        {item.verified && <IconifyIcon icon="bxs:badge-check" className="text-success" />}{' '}
                      </h5>
                    </div>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <Button variant="primary" size="sm" className="w-100">
                    Edit
                  </Button>
                </td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const TableWithCheckboxes = () => {
  return <ComponentContainerCard id="with-checkbox" title="With checkboxes" description={<>A list of all the users in your account including their name, title, email and role.</>}>
      <div className="table-responsive">
        <Table striped borderless align="center">
          <thead className="table-light">
            <tr>
              <th scope="col">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="flexCheckDefault5" />
                </div>
              </th>
              <th scope="col">Name</th>
              <th scope="col">Title</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {extendedTableData.map(item => <tr key={item.id}>
                <td>
                  <FormCheck id={`flexCheckDefault${item.id}`} />
                </td>
                <td>{item.name}</td>
                <td>{item.title}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <Button variant="primary" size="sm" className="w-100">
                    Edit
                  </Button>
                </td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>;
};
const NestingTable2 = () => {
  return <ComponentContainerCard id="nesting1" title="Nesting Table" description={<>Border styles, active styles, and table variants are not inherited by nested tables.</>}>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-centered">
          <thead>
            <tr>
              <th scope="col">Invoice Number</th>
              <th scope="col">Invoice Amount</th>
              <th scope="col">Confirmation by the client</th>
              <th scope="col">Planned payment date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>F-011221/21</td>
              <td>{currency} 879.500</td>
              <td>11/05/2023</td>
              <td>12/05/2023</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">ERP number</th>
                      <th scope="col">Carrier legal entity</th>
                      <th scope="col">Responsible logistician</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>3-128-3</td>
                      <td>ToBrookfield Asset Management</td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <Image src={avatar7} alt="avatar7" className="avatar-sm rounded-circle" />
                          <div className="d-block">
                            <h5 className="mb-0">Kevin C. Reyes</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-success-subtle text-success py-1 px-2">Verified</span>
                      </td>
                    </tr>
                    <tr>
                      <td>3-128-2</td>
                      <td>Brookfield Asset Management</td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <Image src={avatar6} alt="avatar6" className="avatar-sm rounded-circle" />
                          <div className="d-block">
                            <h5 className="mb-0">Mary J. Germain</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-warning-subtle text-warning py-1 px-2">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td>3-128-1</td>
                      <td>Westfield Asset Management</td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <Image src={avatar8} alt="avatar8" className="avatar-sm rounded-circle" />
                          <div className="d-block">
                            <h5 className="mb-0">Charlotte J. Torres</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-danger-subtle text-danger py-1 px-2">Rejected</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>F-011221/19</td>
              <td>{currency} 93.250</td>
              <td>9/05/2023</td>
              <td>10/05/2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ComponentContainerCard>;
};
const BasicTables = () => {
  return <>
      <PageTitle title="Basic Tables" subName="Table" />
      <Row>
        <Col xl={9}>
          <BasicExample />
          <TableVariants />
          <StripedRowsTable />
          <StripedRowsTableDark />
          <StripedRowsTableSuccess />
          <StripedColumnsTable />
          <StripedColumnsDarkTable />
          <StripedColumnsSuccessTable />
          <HoverableRowsTable />
          <HoverableRowsDarkTable />
          <ActiveTables />
          <ActiveTablesDark />
          <BorderedTable />
          <BorderedColorTable />
          <TableWithoutBorders />
          <TableWithoutBordersDark />
          <SmallTables />
          <SmallTableDark />
          <TableGroupDividers />
          <VerticalAlignmentTable />
          <NestingTable />
          <TableHead />
          <TableHeadDark />
          <TableWithFooter />
          <TableWithCaption />
          <TableWithCaptionTop />
          <AlwaysResponsiveTable />
          <TableWithAvatars />
          <TableWithCheckboxes />
          <NestingTable2 />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#basic',
          label: 'Basic Example'
        }, {
          link: '#variant',
          label: 'Variant Table'
        }, {
          link: '#striped',
          label: 'Striped Rows Table'
        }, {
          link: '#hoverable-row',
          label: 'Hoverable rows'
        }, {
          link: '#active',
          label: 'Active Table'
        }, {
          link: '#bordered',
          label: 'Bordered Table'
        }, {
          link: '#border-color',
          label: 'Bordered color Table'
        }, {
          link: '#small',
          label: 'Small Table'
        }, {
          link: '#alignment',
          label: 'Alignment Table'
        }, {
          link: '#nesting',
          label: 'Nesting Table'
        }, {
          link: '#head-option',
          label: 'Table head options'
        }, {
          link: '#tablefoot',
          label: 'Tablefoot'
        }, {
          link: '#captions',
          label: 'Captions'
        }, {
          link: '#responsive',
          label: 'Always Responsive Table'
        }]} />
        </Col>
      </Row>
    </>;
};
export default BasicTables;