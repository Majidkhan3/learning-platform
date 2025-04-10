'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactApexChart from 'react-apexcharts';
import { basicRadialBarOpts, circleWithImageOpts, customAngleOpts, gradientCircularOpts, multipleRadialBarsOpts, semiCircleGaugeOpts, strokedCircularGuageOpts } from '../data';
const BasicChart = () => {
  return <ComponentContainerCard id="basic" title="Basic RadialBar Chart">
      <ReactApexChart height={320} options={basicRadialBarOpts} series={basicRadialBarOpts.series} type="radialBar" />
    </ComponentContainerCard>;
};
const MultipleRadialBarsChart = () => {
  return <ComponentContainerCard id="multiple" title="Multiple RadialBars">
      <ReactApexChart height={320} options={multipleRadialBarsOpts} series={multipleRadialBarsOpts.series} type="radialBar" />
    </ComponentContainerCard>;
};
const CircleChart = () => {
  return <ComponentContainerCard id="circle-angle" title="Circle Chart - Custom Angle">
      <ReactApexChart height={380} options={customAngleOpts} series={customAngleOpts.series} type="radialBar" />
    </ComponentContainerCard>;
};
const CircleChartWithImage = () => {
  return <ComponentContainerCard id="image" title="Circle Chart with Image">
      <ReactApexChart height={360} options={circleWithImageOpts} series={circleWithImageOpts.series} type="radialBar" />
    </ComponentContainerCard>;
};
const StrokedCircularGaugeChart = () => {
  return <ComponentContainerCard id="stroked-guage" title="Stroked Circular Gauge">
      <ReactApexChart height={380} options={strokedCircularGuageOpts} series={strokedCircularGuageOpts.series} type="radialBar" />
    </ComponentContainerCard>;
};
const GradientCircularChart = () => {
  return <ComponentContainerCard id="gradient" title="Gradient Circular Chart">
      <ReactApexChart height={330} options={gradientCircularOpts} series={gradientCircularOpts.series} type="radialBar" />
    </ComponentContainerCard>;
};
const SemiCircleGauge = () => {
  return <ComponentContainerCard id="semi-circle" title="Semi Circle Gauge">
      <ReactApexChart height={400} options={semiCircleGaugeOpts} series={semiCircleGaugeOpts.series} type="radialBar" />
    </ComponentContainerCard>;
};
const AllRadialBarCharts = () => {
  return <>
      <BasicChart />
      <MultipleRadialBarsChart />
      <CircleChart />
      <CircleChartWithImage />
      <StrokedCircularGaugeChart />
      <GradientCircularChart />
      <SemiCircleGauge />
    </>;
};
export default AllRadialBarCharts;