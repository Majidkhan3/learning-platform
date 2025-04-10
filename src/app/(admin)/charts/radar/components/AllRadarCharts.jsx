'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Button } from 'react-bootstrap';
import { basicRadarOpts, multipleSeriesOpts, polygonFillOpts } from '../data';
const BasicChart = () => {
  return <ComponentContainerCard id="basic" title="Basic Radar Chart">
      <ReactApexChart height={350} options={basicRadarOpts} series={basicRadarOpts.series} type="radar" />
    </ComponentContainerCard>;
};
const PolygonFillChart = () => {
  return <ComponentContainerCard id="polygon" title="Radar with Polygon-fill">
      <ReactApexChart height={350} options={polygonFillOpts} series={polygonFillOpts.series} type="radar" />
    </ComponentContainerCard>;
};
const MultipleSeriesChart = () => {
  const [data, setData] = useState([{
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20]
  }, {
    name: 'Series 2',
    data: [20, 30, 40, 80, 20, 80]
  }, {
    name: 'Series 3',
    data: [44, 76, 78, 13, 43, 10]
  }]);
  function update() {
    function randomSeries() {
      const arr = [];
      for (let i = 0; i < 6; i++) {
        arr.push(Math.floor(Math.random() * 100));
      }
      return arr;
    }
    setData([{
      name: 'Series 1',
      data: randomSeries()
    }, {
      name: 'Series 2',
      data: randomSeries()
    }, {
      name: 'Series 3',
      data: randomSeries()
    }]);
  }
  return <ComponentContainerCard id="multiple-series" title="Radar – Multiple Series">
      <ReactApexChart height={350} options={multipleSeriesOpts} series={data} type="radar" />
      <div className="text-center mt-2">
        <Button variant="primary" size="sm" onClick={() => update()}>
          Update
        </Button>
      </div>
    </ComponentContainerCard>;
};
const AllRadarCharts = () => {
  return <>
      <BasicChart />
      <PolygonFillChart />
      <MultipleSeriesChart />
    </>;
};
export default AllRadarCharts;