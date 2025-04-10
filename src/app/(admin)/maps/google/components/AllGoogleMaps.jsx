'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import UIExamplesList from '@/components/UIExamplesList';
import { InfoWindow, Polyline } from 'google-maps-react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
const BasicMap = ({
  google
}) => {
  return <ComponentContainerCard id="basic_google_map" title="Basic Example" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.
        </>}>
      <div className="gmaps" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
        <Map google={google} zoom={14} initialCenter={{
        lat: 21.569874,
        lng: 71.5893798
      }} style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }} zoomControlOptions={{
        position: google.maps.ControlPosition.LEFT_TOP
      }}></Map>
      </div>
    </ComponentContainerCard>;
};
const MapWithMarkers = ({
  google
}) => {
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };

  // handles operation on marker click
  const onBasicMarkerClick = () => {
    alert('You clicked in this marker');
  };

  // handles operation on marker click
  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
    setShowingInfoWindow(true);
  };
  return <ComponentContainerCard id="google_map" title="Markers Google Map" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.
        </>}>
      <div className="gmaps" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
        <Map google={google} zoom={18} initialCenter={{
        lat: 21.569874,
        lng: 71.5893798
      }} style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }} zoomControlOptions={{
        position: google.maps.ControlPosition.LEFT_TOP
      }}>
          <Marker title={'This is sweet home.'} name={'Home sweet home!'} position={{
          lat: 21.569874,
          lng: 71.5893798
        }} onClick={onBasicMarkerClick}></Marker>

          <Marker name="Current location" title={'Marker with InfoWindow'} position={{
          lat: 21.56969,
          lng: 71.5893798
        }} onClick={onMarkerClick}></Marker>
          <InfoWindow marker={activeMarker} onClose={onInfoWindowClose} visible={showingInfoWindow}>
            <div>
              <p>{selectedPlace.name}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    </ComponentContainerCard>;
};
const StreetViewMap = ({
  google
}) => {
  let mapRef = useRef();

  /**
   * Activate the street view
   */
  const activateStreetView = position => {
    if (mapRef) {
      const mapObj = mapRef.map.getStreetView();
      mapObj.setPov({
        heading: 34,
        pitch: 10
      });
      mapObj.setPosition(position);
      mapObj.setVisible(true);
    }
  };
  return <ComponentContainerCard id="street_view" title="Street View Panoramas Google Map" description={<>
          {' '}
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.
        </>}>
      <div className="gmaps" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
        <Map google={google} ref={map => mapRef = map} zoom={14} initialCenter={{
        lat: 40.7295174,
        lng: -73.9986496
      }} style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }} streetViewControl={true} onReady={() => {
        activateStreetView({
          lat: 40.7295174,
          lng: -73.9986496
        });
      }}></Map>
      </div>
    </ComponentContainerCard>;
};
const PolyLineMap = ({
  google
}) => {
  const polyline = [{
    lat: 37.789411,
    lng: -122.422116
  }, {
    lat: 37.785757,
    lng: -122.421333
  }, {
    lat: 37.789352,
    lng: -122.415346
  }];
  return <ComponentContainerCard id="poly_line" title="PolyLine Google Map" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.
        </>}>
      <div className="gmaps" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
        <Map className="map" google={google} style={{
        height: '100%',
        position: 'relative',
        width: '100%'
      }} zoom={14} zoomControlOptions={{
        position: google.maps.ControlPosition.LEFT_TOP
      }}>
          <Polyline fillColor="#0000FF" fillOpacity={0.35} path={polyline} strokeColor="#0000FF" strokeOpacity={0.8} strokeWeight={2} />
        </Map>
      </div>
    </ComponentContainerCard>;
};
const LightStyledMap = ({
  google
}) => {
  const mapStyles = [{
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{
      color: '#e9e9e9'
    }, {
      lightness: 17
    }]
  }, {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{
      color: '#f5f5f5'
    }, {
      lightness: 20
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#ffffff'
    }, {
      lightness: 17
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
      color: '#ffffff'
    }, {
      lightness: 29
    }, {
      weight: 0.2
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{
      color: '#ffffff'
    }, {
      lightness: 18
    }]
  }, {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{
      color: '#ffffff'
    }, {
      lightness: 16
    }]
  }, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{
      color: '#f5f5f5'
    }, {
      lightness: 21
    }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{
      color: '#dedede'
    }, {
      lightness: 21
    }]
  }, {
    elementType: 'labels.text.stroke',
    stylers: [{
      visibility: 'on'
    }, {
      color: '#ffffff'
    }, {
      lightness: 16
    }]
  }, {
    elementType: 'labels.text.fill',
    stylers: [{
      saturation: 36
    }, {
      color: '#333333'
    }, {
      lightness: 40
    }]
  }, {
    elementType: 'labels.icon',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{
      color: '#f2f2f2'
    }, {
      lightness: 19
    }]
  }, {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#fefefe'
    }, {
      lightness: 20
    }]
  }, {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{
      color: '#fefefe'
    }, {
      lightness: 17
    }, {
      weight: 1.2
    }]
  }];
  return <ComponentContainerCard id="ultra_light" title="Ultra Light With Labels" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.
        </>}>
      <div className="gmaps" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
        <Map google={google} initialCenter={{
        lat: -12.043333,
        lng: -77.028333
      }} style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }} styles={mapStyles} zoomControlOptions={{
        position: google.maps.ControlPosition.LEFT_TOP
      }}></Map>
      </div>
    </ComponentContainerCard>;
};
const DarkStyledMap = ({
  google
}) => {
  const mapStyles = [{
    featureType: 'all',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }]
  }, {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{
      saturation: 36
    }, {
      color: '#000000'
    }, {
      lightness: 40
    }]
  }, {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{
      visibility: 'on'
    }, {
      color: '#000000'
    }, {
      lightness: 16
    }]
  }, {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#000000'
    }, {
      lightness: 20
    }]
  }, {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{
      color: '#000000'
    }, {
      lightness: 17
    }, {
      weight: 1.2
    }]
  }, {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#e5c163'
    }]
  }, {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#c4c4c4'
    }]
  }, {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#e5c163'
    }]
  }, {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{
      color: '#000000'
    }, {
      lightness: 20
    }]
  }, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{
      color: '#000000'
    }, {
      lightness: 21
    }, {
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.business',
    elementType: 'geometry',
    stylers: [{
      visibility: 'on'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#e5c163'
    }, {
      lightness: '0'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#ffffff'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [{
      color: '#e5c163'
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{
      color: '#000000'
    }, {
      lightness: 18
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#575757'
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#ffffff'
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'labels.text.stroke',
    stylers: [{
      color: '#2c2c2c'
    }]
  }, {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{
      color: '#000000'
    }, {
      lightness: 16
    }]
  }, {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#999999'
    }]
  }, {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{
      color: '#000000'
    }, {
      lightness: 19
    }]
  }, {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{
      color: '#000000'
    }, {
      lightness: 17
    }]
  }];
  return <ComponentContainerCard id="dark_view" title="Dark" description={<>
          {' '}
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.
        </>}>
      <div className="gmaps" style={{
      position: 'relative',
      overflow: 'hidden'
    }}>
        <Map google={google} initialCenter={{
        lat: -12.043333,
        lng: -77.028333
      }} style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }} styles={mapStyles} zoomControlOptions={{
        position: google.maps.ControlPosition.LEFT_TOP
      }}></Map>
      </div>
    </ComponentContainerCard>;
};
const AllGoogleMaps = ({
  google
}) => {
  return <Row>
      <Col xl={9}>
        <BasicMap google={google} />
        <MapWithMarkers google={google} />
        <StreetViewMap google={google} />
        <PolyLineMap google={google} />
        <LightStyledMap google={google} />
        <DarkStyledMap google={google} />
      </Col>

      <Col xl={3}>
        <UIExamplesList examples={[{
        link: '#basic_google_map',
        label: 'Basic'
      }, {
        link: '#google_map',
        label: 'Markers Google Map'
      }, {
        link: '#street_view',
        label: 'Street View Panoramas Google Map'
      }, {
        link: '#poly_line',
        label: 'PolyLine Google Map'
      }, {
        link: '#ultra_light',
        label: 'Ultra Light With Labels'
      }, {
        link: '#dark_view',
        label: 'Dark'
      }]} />
      </Col>
    </Row>;
};
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA'
})(AllGoogleMaps);