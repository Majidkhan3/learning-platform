'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactApexChart from 'react-apexcharts';
import { dateTimeOpts, scatterWithImagesOpts, scatterXYOpts } from '../data';
const ScatterXYChart = () => {
  return <ComponentContainerCard id="basic" title="Scatter (XY) Chart">
      <ReactApexChart height={380} options={scatterXYOpts} series={scatterXYOpts.series} type="scatter" />
    </ComponentContainerCard>;
};
const DatetimeScatterChart = () => {
  return <ComponentContainerCard id="datetime" title="Scatter Chart - Datetime">
      <ReactApexChart height={380} options={dateTimeOpts} series={dateTimeOpts.series} type="scatter" />
    </ComponentContainerCard>;
};
const ImagesChart = () => {
  return <ComponentContainerCard id="images" title=" Scatter - Images">
      <ReactApexChart height={380} options={scatterWithImagesOpts} series={scatterWithImagesOpts.series} type="scatter" />
    </ComponentContainerCard>;
};
const AllScatterCharts = () => {
  return <>
      <ScatterXYChart />
      <DatetimeScatterChart />
      <ImagesChart />
    </>;
};
export default AllScatterCharts;