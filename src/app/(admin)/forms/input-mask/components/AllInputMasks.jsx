'use client';

import Link from 'next/link';
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import MaskedInput from 'react-text-mask-legacy';
const AllInputMasks = () => {
  return <Card>
      <CardBody>
        <CardTitle as={'h5'} className="anchor" id="default">
          Input Masks
          <Link className="anchor-link" href="#default">
            #
          </Link>
        </CardTitle>
        <p className="text-muted">A Java-Script Plugin to make masks on form fields and HTML elements.</p>
        <div>
          <Row>
            <Col md={6}>
              <form action="#">
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <MaskedInput mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} placeholder="__/__/___" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;DD/MM/YYYY&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00/00/0000&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Hour</label>
                  <MaskedInput mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]} placeholder="__:__:__" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;HH:MM:SS&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00:00:00&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Date &amp; Hour</label>
                  <MaskedInput mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]} placeholder="__/__/___ __:__:__" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;DD/MM/YYYY HH:MM:SS&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00/00/0000 00:00:00&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">ZIP Code</label>
                  <MaskedInput mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} placeholder="____-__" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;xxxxx-xxx&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00000-000&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Crazy Zip Code</label>
                  <MaskedInput mask={[/\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]} placeholder="_-__-__-__" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;x-xx-xx-xx&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;0-00-00-00&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Money</label>
                  <MaskedInput mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, ',', /\d/, /\d/]} placeholder="__.___.__.__,__" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;Your money&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-mask-format=&quot;000.000.000.000.000,00&quot; </code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Money 2</label>
                  <MaskedInput mask={[/\d/, '.', /\d/, /\d/, /\d/, ',', /\d/, /\d/]} placeholder="#.##0,00" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;#.##0,00&quot;</span>
                  <p className="mt-1">
                    Add attribute{' '}
                    <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;#.#&quot;0,00&quot; data-reverse=&quot;true&quot;</code>
                  </p>
                </div>
              </form>
            </Col>
            <Col md={6}>
              <form action="#">
                <div className="mb-3">
                  <label className="form-label">Telephone</label>
                  <MaskedInput mask={[/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholder="____-____" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;xxxx-xxxx&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;0000-0000&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Telephone with Code Area</label>
                  <MaskedInput mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholder="(__)____-____" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;(xx) xxxx-xxxx&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-toggle=&quot;input-mask&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">US Telephone</label>
                  <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholder="(___)___-____" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;(xxx) xxx-xxxx&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-toggle=&quot;input-mask&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">São Paulo Celphones</label>
                  <MaskedInput mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholder="(__)_____-____" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;(xx) xxxxx-xxxx&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-toggle=&quot;input-mask&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">CPF</label>
                  <MaskedInput mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]} placeholder="___.___.____-__" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;xxx.xxx.xxxx-xx&quot;</span>
                  <p className="mt-1">
                    Add attribute <code>data-mask-format=&quot;000.000.000-00&quot; data-reverse=&quot;true&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">CNPJ</label>
                  <MaskedInput mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]} placeholder="__.___.___/____-__" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;xx.xxx.xxx/xxxx-xx&quot;</span>
                  <p className="mt-1">
                    Add attribute{' '}
                    <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00.000.000/0000-00&quot; data-reverse=&quot;true&quot;</code>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">IP Address</label>
                  <MaskedInput mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]} placeholder="___.___.___.___" className="form-control" />
                  <span className="fs-13 text-muted">e.g &quot;xxx.xxx.xxx.xxx&quot;</span>
                  <p className="mt-1">
                    Add attribute{' '}
                    <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;099.099.099.099&quot; data-reverse=&quot;true&quot;</code>
                  </p>
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>;
};
export default AllInputMasks;