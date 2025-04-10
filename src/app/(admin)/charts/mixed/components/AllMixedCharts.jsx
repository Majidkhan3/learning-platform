'use client';

import ReactApexChart from 'react-apexcharts';
import { lineAreaChartOpts, lineColumnAreaChartOpts, lineColumnChartOpts, multipleYAxisChartOpts } from '../data';
import ComponentContainerCard from '@/components/ComponentContainerCard';
const LineAndColumnChart = () => {
  return <ComponentContainerCard id="line-column" title="Line & Column Chart">
      <ReactApexChart height={380} options={lineColumnChartOpts} series={lineColumnChartOpts.series} type="line" />
    </ComponentContainerCard>;
};
const MultipleYAxisChart = () => {
  return <ComponentContainerCard id="multiple-yaxis" title="Multiple Y-Axis Chart">
      <ReactApexChart height={380} options={multipleYAxisChartOpts} series={multipleYAxisChartOpts.series} type="line" />
    </ComponentContainerCard>;
};
const LineAreaChart = () => {
  return <ComponentContainerCard id="line-area" title="Line & Area Chart">
      <ReactApexChart height={380} options={lineAreaChartOpts} series={lineAreaChartOpts.series} type="line" />
    </ComponentContainerCard>;
};
const LineColumnAndAreaChart = () => {
  return <ComponentContainerCard id="all" title="Line, Column & Area Chart">
      <ReactApexChart height={380} options={lineColumnAreaChartOpts} series={lineColumnAreaChartOpts.series} type="line" />
    </ComponentContainerCard>;
};
const AllMixedCharts = () => {
  return <>
      <LineAndColumnChart />
      <MultipleYAxisChart />
      <LineAreaChart />
      <LineColumnAndAreaChart />
    </>;
};
export default AllMixedCharts;