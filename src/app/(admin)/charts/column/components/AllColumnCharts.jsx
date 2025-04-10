'use client';

import ReactApexChart from 'react-apexcharts';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import DynamicLoaded from './DynamicLoaded';
import { basicChartOpts, columnWithNegativeValueOpts, columnWithRotatedLabelsOpts, dataLabelsChartOpts, distributedColumnOpts, fullStackedChartOpts, groupLabelChartOpts, markersChartOpts, rangeColumnOpts, stackedChartOpts } from '../data';
const BasicColumnChart = () => {
  return <ComponentContainerCard id="basic" title="Basic Column Chart">
      <ReactApexChart height={396} options={basicChartOpts} series={basicChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const ColumnChartWithDataLabels = () => {
  return <ComponentContainerCard id="datalabels" title="Column Chart with Datalabels">
      <ReactApexChart height={380} options={dataLabelsChartOpts} series={dataLabelsChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const StackedColumnChart = () => {
  return <ComponentContainerCard id="stacked" title="Stacked Column Chart">
      <ReactApexChart height={380} options={stackedChartOpts} series={stackedChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const FullStackedColumnChart = () => {
  return <ComponentContainerCard id="full-stacked" title="100% Stacked Column Chart">
      <ReactApexChart height={380} options={fullStackedChartOpts} series={fullStackedChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const ColumnWithMarkersChart = () => {
  return <ComponentContainerCard id="markers" title="Column with Markers">
      <ReactApexChart height={380} options={markersChartOpts} series={markersChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const ColumnWithGroupLabel = () => {
  return <ComponentContainerCard id="group" title="Column with Group Label">
      <ReactApexChart height={380} options={groupLabelChartOpts} series={groupLabelChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const ColumnChartWithAnnotations = () => {
  return <ComponentContainerCard id="rotate-labels" title="Column Chart with rotated labels & Annotations">
      <ReactApexChart height={380} options={columnWithRotatedLabelsOpts} series={columnWithRotatedLabelsOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const NegativeValuesChart = () => {
  return <ComponentContainerCard id="negative-value" title="Column Chart with negative values">
      <ReactApexChart height={380} options={columnWithNegativeValueOpts} series={columnWithNegativeValueOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const DistributedChart = () => {
  return <ComponentContainerCard id="distributed" title="Distributed Column Chart">
      <ReactApexChart height={380} options={distributedColumnOpts} series={distributedColumnOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const RangeColumnChart = () => {
  return <ComponentContainerCard id="range" title="Range Column Chart">
      <ReactApexChart height={380} options={rangeColumnOpts} series={rangeColumnOpts.series} type="rangeBar" />
    </ComponentContainerCard>;
};
const AllColumnCharts = () => {
  return <>
      <BasicColumnChart />
      <ColumnChartWithDataLabels />
      <StackedColumnChart />
      <FullStackedColumnChart />
      <ColumnWithMarkersChart />
      <ColumnWithGroupLabel />
      <ColumnChartWithAnnotations />
      <NegativeValuesChart />
      <DistributedChart />
      <RangeColumnChart />
      <DynamicLoaded />
    </>;
};
export default AllColumnCharts;