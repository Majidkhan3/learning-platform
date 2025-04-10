'use client';

import ChoicesFormInput from '@/components/from/ChoicesFormInput';
import Nouislider from 'nouislider-react';
import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
const PropertiesFilter = () => {
  const [selectedValue, setSelectedValue] = useState([6000, 100000]);
  const handleSliderChange = values => {
    setSelectedValue(values);
  };
  const handleInputChange = event => {
    if (selectedValue[0] <= Math.round(event.target.value)) {
      setSelectedValue([selectedValue[0], Math.round(event.target.value)]);
    }
  };
  return <Col xl={3} lg={12}>
      <Card>
        <CardHeader className="border-bottom">
          <div>
            <CardTitle as={'h4'}>Properties</CardTitle>
            <p className="mb-0">Show 15,780 Properties</p>
          </div>
        </CardHeader>
        <CardBody className="border-light">
          <form>
            <label htmlFor="choices-single-groups" className="form-label">
              Properties Location
            </label>
            <ChoicesFormInput className="form-control" id="choices-single-groups" data-placeholder="Select City">
              <option>Choose a city</option>
              <optgroup label="UK">
                <option value="London">London</option>
                <option value="Manchester">Manchester</option>
                <option value="Liverpool">Liverpool</option>
              </optgroup>
              <optgroup label="FR">
                <option value="Paris">Paris</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
              </optgroup>
              <optgroup label="DE" disabled>
                <option value="Hamburg">Hamburg</option>
                <option value="Munich">Munich</option>
                <option value="Berlin">Berlin</option>
              </optgroup>
              <optgroup label="US">
                <option value="New York">New York</option>
                <option value="Washington" disabled>
                  Washington
                </option>
                <option value="Michigan">Michigan</option>
              </optgroup>
              <optgroup label="SP">
                <option value="Madrid">Madrid</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Malaga">Malaga</option>
              </optgroup>
              <optgroup label="CA">
                <option value="Montreal">Montreal</option>
                <option value="Toronto">Toronto</option>
                <option value="Vancouver">Vancouver</option>
              </optgroup>
            </ChoicesFormInput>
            <div className="mb-3">
              <label htmlFor="typeplace" className="form-label">
                Type Of Place
              </label>
              <input type="text" id="typeplace" className="form-control" />
            </div>
          </form>
          <h5 className="text-dark fw-medium my-3">Custom Price Range :</h5>
          <Nouislider range={{
          min: 0,
          max: 120000
        }} start={selectedValue} connect={true} className="product-price-range" onSlide={handleSliderChange} />
          <div className="formCost d-flex gap-2 align-items-center mt-3">
            <input className="form-control form-control-sm text-center" type="number" id="minCost" value={selectedValue[0]} onChange={handleInputChange} />
            <span className="fw-semibold text-muted">to</span>
            <input className="form-control form-control-sm text-center" type="number" id="maxCost" value={selectedValue[1]} onChange={handleInputChange} />
          </div>
          <h5 className="text-dark fw-medium my-3">Accessibility Features :</h5>
          <Row className="g-1">
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck11" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck11">
                  For Rent
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck12" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck12">
                  For Sale
                </label>
              </div>
            </Col>
          </Row>
          <h5 className="text-dark fw-medium my-3">Properties Type :</h5>
          <Row className="g-1">
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck" defaultChecked />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck">
                  All Properties
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck1">
                  Cottage
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck2" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck1">
                  Villas
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck3" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck1">
                  Apartment
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck4" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck1">
                  Duplex Bungalow
                </label>
              </div>
            </Col>
          </Row>
          <h5 className="text-dark fw-medium my-3">Bedrooms :</h5>
          <div role="group" aria-label="Basic checkbox toggle button group">
            <input type="checkbox" className="btn-check " id="btncheck1" />
            <label className="btn btn-outline-primary me-1" htmlFor="btncheck1">
              1 BHK
            </label>
            <input type="checkbox" className="btn-check" id="btncheck2" />
            <label className="btn btn-outline-primary me-1" htmlFor="btncheck2">
              2 BHK
            </label>
            <input type="checkbox" className="btn-check" id="btncheck3" defaultChecked />
            <label className="btn btn-outline-primary me-1" htmlFor="btncheck3">
              3 BHK
            </label>
            <input type="checkbox" className="btn-check" id="btncheck4" />
            <label className="btn btn-outline-primary my-1" htmlFor="btncheck4">
              4 &amp; 5 BHK
            </label>
          </div>
          <h5 className="text-dark fw-medium my-3">Accessibility Features :</h5>
          <Row className="g-1">
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck5" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck1">
                  Balcony
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck6" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck1">
                  Parking
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck7" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck1">
                  Spa
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck8" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck1">
                  Pool
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck9" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck1">
                  Restaurant
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-2">
                <input className="form-check-input" type="checkbox" id="defaultCheck10" />
                &nbsp;
                <label className="form-check-label ms-1" htmlFor="defaultCheck1">
                  Fitness Club
                </label>
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Button variant="primary" className="w-100">
            Apply
          </Button>
        </CardFooter>
      </Card>
    </Col>;
};
export default PropertiesFilter;