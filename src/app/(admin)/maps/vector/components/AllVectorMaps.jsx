'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { CanadaVectorMap, IraqVectorMap, RussiaVectorMap, SpainVectorMap, WorldVectorMap } from '@/components/VectorMap';
const WorldVectorMaps = () => {
  const worldMapOptions = {
    map: 'world',
    zoomOnScroll: true,
    zoomButtons: true,
    markersSelectable: true,
    markers: [{
      name: 'Canada',
      coords: [56.1304, -106.3468]
    }, {
      name: 'Brazil',
      coords: [-14.235, -51.9253]
    }, {
      name: 'Russia',
      coords: [61, 105]
    }, {
      name: 'China',
      coords: [35.8617, 104.1954]
    }, {
      name: 'United States',
      coords: [37.0902, -95.7129]
    }],
    markerStyle: {
      initial: {
        fill: '#7f56da'
      },
      selected: {
        fill: '#22c55e'
      }
    },
    regionStyle: {
      initial: {
        fill: 'rgba(169,183,197, 0.3)',
        fillOpacity: 1
      }
    }
  };
  return <ComponentContainerCard id="world_vector_map" title="World Vector Map" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.
        </>}>
      <div id="world-map-markers2">
        <WorldVectorMap height="360px" width="100%" options={worldMapOptions} />
      </div>
    </ComponentContainerCard>;
};
const CanadaMap = () => {
  return <ComponentContainerCard id="canada_vector_map" title="Canada Vector Map" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.{' '}
        </>}>
      <CanadaVectorMap height="360px" width="100%" options={{
      zoomOnScroll: false,
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          fill: '#1e84c4'
        }
      }
    }} />
    </ComponentContainerCard>;
};
const RussiaMap = () => {
  return <ComponentContainerCard id="russia_vector_map" title="Russia Vector Map" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.
        </>}>
      <RussiaVectorMap height="360px" width="100%" options={{
      zoomOnScroll: false,
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          fill: '#1bb394'
        }
      }
    }} />
    </ComponentContainerCard>;
};
const IraqMap = () => {
  return <ComponentContainerCard id="iraq_vector_map" title="Iraq Vector Map" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.{' '}
        </>}>
      <IraqVectorMap height="360px" width="100%" options={{
      zoomOnScroll: false,
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          fill: '#f8ac59'
        }
      }
    }} />
    </ComponentContainerCard>;
};
const SpainMap = () => {
  return <ComponentContainerCard id="spain_vector_map" title="Spain Vector Map" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.{' '}
        </>}>
      <SpainVectorMap height="360px" width="100%" options={{
      zoomOnScroll: false,
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          fill: '#23c6c8'
        }
      }
    }} />
    </ComponentContainerCard>;
};
const AllVectorMaps = () => {
  return <>
      <WorldVectorMaps />
      <CanadaMap />
      <RussiaMap />
      <IraqMap />
      <SpainMap />
    </>;
};
export default AllVectorMaps;