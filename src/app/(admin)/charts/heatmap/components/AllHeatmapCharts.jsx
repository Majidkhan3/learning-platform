'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactApexChart from 'react-apexcharts';
import { basicHeatmapOpts, colorRangeHeatmapOpts, multipleHeatmapOpts, rangeWithoutShadeOpts } from '../data';
const BasicChart = () => {
  return <ComponentContainerCard id="basic" title="Basic Heatmap - Single Series">
      <ReactApexChart height={380} options={basicHeatmapOpts} series={basicHeatmapOpts.series} type="heatmap" />
    </ComponentContainerCard>;
};
const MultipleHeatmapChart = () => {
  return <ComponentContainerCard id="multiple-series" title="Heatmap - Multiple Series">
      <ReactApexChart height={380} options={multipleHeatmapOpts} series={multipleHeatmapOpts.series} type="heatmap" />
    </ComponentContainerCard>;
};
const ColorRangeChart = () => {
  return <ComponentContainerCard id="color-range" title="Heatmap - Color Range">
      <ReactApexChart height={380} options={colorRangeHeatmapOpts} series={colorRangeHeatmapOpts.series} type="heatmap" />
    </ComponentContainerCard>;
};
const RangeWithoutShades = () => {
  return <ComponentContainerCard id="rounded" title="Heatmap - Range without Shades">
      <ReactApexChart height={380} options={rangeWithoutShadeOpts} series={rangeWithoutShadeOpts.series} type="heatmap" />
    </ComponentContainerCard>;
};
const AllHeatmapCharts = () => {
  return <>
      <BasicChart />
      <MultipleHeatmapChart />
      <ColorRangeChart />
      <RangeWithoutShades />
    </>;
};
export default AllHeatmapCharts;