'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Button } from 'react-bootstrap';
import { donutUpdateOpts, gradientDonutOpts, imageFillOpts, monochromePieOpts, patternedDonutOpts, simpleDonutOpts, simplePieOpts } from '../data';
const SimpleChart = () => {
  return <ComponentContainerCard id="simple_pie" title="Simple Pie Chart">
      <ReactApexChart height={320} options={simplePieOpts} series={simplePieOpts.series} type="pie" />
    </ComponentContainerCard>;
};
const SimpleDonutChart = () => {
  return <ComponentContainerCard id="simple_donut" title="Simple Donut Chart">
      <ReactApexChart height={320} options={simpleDonutOpts} series={simpleDonutOpts.series} type="donut" />
    </ComponentContainerCard>;
};
const MonochromeChart = () => {
  return <ComponentContainerCard id="monochrome" title="Monochrome Pie Chart">
      <ReactApexChart height={320} options={monochromePieOpts} series={monochromePieOpts.series} type="pie" />
    </ComponentContainerCard>;
};
const GradientDonutChart = () => {
  return <ComponentContainerCard id="gradient" title="Gradient Donut Chart">
      <ReactApexChart height={320} options={gradientDonutOpts} series={gradientDonutOpts.series} type="donut" />
    </ComponentContainerCard>;
};
const PatternedDonutChart = () => {
  return <ComponentContainerCard id="patterned" title="Patterned Donut Chart">
      <ReactApexChart height={320} options={patternedDonutOpts} series={patternedDonutOpts.series} type="donut" />
    </ComponentContainerCard>;
};
const PieChartWithImageChart = () => {
  return <ComponentContainerCard id="image" title="Pie Chart with Image fill">
      <ReactApexChart height={320} options={imageFillOpts} series={imageFillOpts.series} type="pie" />
    </ComponentContainerCard>;
};
const DonutUpdateChart = () => {
  const [data, setData] = useState([44, 55, 13, 33]);
  function appendData() {
    const arr = data.map(function () {
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    });
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);
    return setData(arr);
  }
  function removeData() {
    const arr = data.map(function () {
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    });
    arr.pop();
    return setData(arr);
  }
  function randomize() {
    return setData(data.map(function () {
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    }));
  }
  function reset() {
    return setData([44, 55, 13, 33]);
  }
  return <ComponentContainerCard id="update" title="Donut Update">
      <ReactApexChart height={320} options={donutUpdateOpts} series={data} type="donut" />
      <div className="text-center mt-2 flex-centered gap-1">
        <Button variant="primary" size="sm" onClick={randomize}>
          RANDOMIZE
        </Button>
        <Button variant="primary" size="sm" onClick={appendData}>
          ADD
        </Button>
        <Button variant="primary" size="sm" onClick={removeData}>
          REMOVE
        </Button>
        <Button variant="primary" size="sm" onClick={reset}>
          RESET
        </Button>
      </div>
    </ComponentContainerCard>;
};
const AllPieCharts = () => {
  return <>
      <SimpleChart />
      <SimpleDonutChart />
      <MonochromeChart />
      <GradientDonutChart />
      <PatternedDonutChart />
      <PieChartWithImageChart />
      <DonutUpdateChart />
    </>;
};
export default AllPieCharts;