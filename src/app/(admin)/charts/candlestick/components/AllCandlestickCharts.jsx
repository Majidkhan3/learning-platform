'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactApexChart from 'react-apexcharts';
import { candlestickWithLineOpts, categoryXAxisChartOpts, simpleChartOpts } from '../data';
const SimpleCandlestickChart = () => {
  return <ComponentContainerCard id="simple" title="Simple Candlestick Chart">
      <ReactApexChart height={400} options={simpleChartOpts} series={simpleChartOpts.series} type="candlestick" className="apex-charts" />
    </ComponentContainerCard>;
};
const CategoryXAxisChart = () => {
  return <ComponentContainerCard id="x-axis" title="Category X-Axis">
      <ReactApexChart height={380} options={categoryXAxisChartOpts} series={categoryXAxisChartOpts.series} type="candlestick" className="apex-charts" />
    </ComponentContainerCard>;
};
const CandlestickWithLine = () => {
  return <ComponentContainerCard id="candlestick-with-line" title="Candlestick with Line">
      <ReactApexChart height={380} options={candlestickWithLineOpts} series={candlestickWithLineOpts.series} type="candlestick" className="apex-charts" />
    </ComponentContainerCard>;
};
const AllCandlestickCharts = () => {
  return <>
      <SimpleCandlestickChart />
      <CategoryXAxisChart />
      <CandlestickWithLine />
    </>;
};
export default AllCandlestickCharts;