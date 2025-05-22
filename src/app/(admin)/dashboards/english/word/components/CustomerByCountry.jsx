'use client';

import WorldVectorMap from '@/components/VectorMap/WorldMap';
import { Card, CardBody, CardHeader, CardTitle, Col } from 'react-bootstrap';
const CustomerByCountry = () => {
  const worldMapOptions = {
    map: 'world',
    zoomOnScroll: false,
    zoomButtons: !1,
    markersSelectable: !1,
    markers: [{
      name: 'Greenland',
      coords: [72, -42]
    }, {
      name: 'Canada',
      coords: [56.1304, -106.3468]
    }, {
      name: 'Brazil',
      coords: [-14.235, -51.9253]
    }, {
      name: 'Egypt',
      coords: [26.8206, 30.8025]
    }, {
      name: 'Russia',
      coords: [61, 105]
    }, {
      name: 'China',
      coords: [35.8617, 104.1954]
    }, {
      name: 'United States',
      coords: [37.0902, -95.7129]
    }, {
      name: 'Norway',
      coords: [60.472024, 8.468946]
    }, {
      name: 'Ukraine',
      coords: [48.379433, 31.16558]
    }],
    markerStyle: {
      initial: {
        fill: '#5B8DEC'
      },
      selected: {
        fill: '#ed5565'
      }
    },
    labels: {
      markers: {
        render: marker => marker.name
      }
    },
    regionStyle: {
      initial: {
        fill: 'rgba(169,183,197, 0.3)',
        fillOpacity: 1
      }
    }
  };
  return <Col lg={6}>
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Customer By Country</CardTitle>
        </CardHeader>
        <CardBody>
          <WorldVectorMap height="448px" width="100%" options={worldMapOptions} />
        </CardBody>
      </Card>
    </Col>;
};
export default CustomerByCountry;