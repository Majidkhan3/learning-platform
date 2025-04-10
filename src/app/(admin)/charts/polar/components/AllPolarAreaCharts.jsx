'use client';

import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { basicPolarAreaOpts, monochromePolarAreaOpts } from '../data';
const BasicChart = () => {
  return <ComponentContainerCard id="basic" title="Basic Polar Area Chart">
      <ReactApexChart height={380} options={basicPolarAreaOpts} series={basicPolarAreaOpts.series} type="polarArea" />
    </ComponentContainerCard>;
};
const MonochromeChart = () => {
  const [renderCount, setRenderCount] = useState(0);
  useEffect(() => {
    if (renderCount < 2) setRenderCount(() => renderCount + 1);
  }, [renderCount]);
  return renderCount && <ComponentContainerCard id="monochrome" title="Monochrome Polar Area">
        <ReactApexChart height={380} options={monochromePolarAreaOpts} series={monochromePolarAreaOpts.series} type="polarArea" />
      </ComponentContainerCard>;
};
const AllPolarAreaCharts = () => {
  return <>
      <BasicChart />
      <MonochromeChart />
    </>;
};
export default AllPolarAreaCharts;