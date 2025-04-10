'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactApexChart from 'react-apexcharts';
import { basicTreemapOpts, colorRangeTreemapOpts, distributedTreemapOpts, multipleSeriesTreemapOpts } from '../data';
const BasicCharts = () => {
  return <ComponentContainerCard id="basic" title="Basic Treemap">
      <ReactApexChart height={350} options={basicTreemapOpts} series={basicTreemapOpts.series} type="treemap" />
    </ComponentContainerCard>;
};
const MultipleSeriesCharts = () => {
  return <ComponentContainerCard id="multiple" title="Treemap Multiple Series">
      <ReactApexChart height={350} options={multipleSeriesTreemapOpts} series={multipleSeriesTreemapOpts.series} type="treemap" />
    </ComponentContainerCard>;
};
const DistributedChart = () => {
  return <ComponentContainerCard id="distributed" title="Distributed Treemap">
      <ReactApexChart height={350} options={distributedTreemapOpts} series={distributedTreemapOpts.series} type="treemap" />
    </ComponentContainerCard>;
};
const ColorRangeChart = () => {
  return <ComponentContainerCard id="color-range" title=" Color Range Treemap">
      <ReactApexChart height={350} options={colorRangeTreemapOpts} series={colorRangeTreemapOpts.series} type="treemap" />
    </ComponentContainerCard>;
};
const AllTreemapCharts = () => {
  return <>
      <BasicCharts />
      <MultipleSeriesCharts />
      <DistributedChart />
      <ColorRangeChart />
    </>;
};
export default AllTreemapCharts;