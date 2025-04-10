'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactApexChart from 'react-apexcharts';
import { bubbleChart3DOpts, simpleChartOpts } from '../data';
const SimpleBubbleChart = () => {
  return <ComponentContainerCard id="simple" title="Simple Bubble Chart">
      <ReactApexChart height={380} options={simpleChartOpts} series={simpleChartOpts.series} type="bubble" />
    </ComponentContainerCard>;
};
const BubbleChart3D = () => {
  return <ComponentContainerCard id="3d-bubble" title="3D Bubble Chart">
      <ReactApexChart height={380} options={bubbleChart3DOpts} series={bubbleChart3DOpts.series} type="bubble" />
    </ComponentContainerCard>;
};
const AllBubbleCharts = () => {
  return <>
      <SimpleBubbleChart />
      <BubbleChart3D />
    </>;
};
export default AllBubbleCharts;