'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactApexChart from 'react-apexcharts';
import { basicBoxplotOpts, scatterBoxplotOpts } from '../data';
const BasicChart = () => {
  return <ComponentContainerCard id="basic" title="Basic Boxplot">
      <ReactApexChart height={350} options={basicBoxplotOpts} series={basicBoxplotOpts.series} type="boxPlot" />
    </ComponentContainerCard>;
};
const ScatterChart = () => {
  return <ComponentContainerCard id="scatter" title="Scatter Boxplot">
      <ReactApexChart height={350} options={scatterBoxplotOpts} series={scatterBoxplotOpts.series} type="boxPlot" />
    </ComponentContainerCard>;
};
const AllBoxPlotCharts = () => {
  return <>
      <BasicChart />
      <ScatterChart />
    </>;
};
export default AllBoxPlotCharts;