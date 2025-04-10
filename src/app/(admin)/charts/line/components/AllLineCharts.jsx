'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactApexChart from 'react-apexcharts';
import { brushChartOpts, brushChartOpts2, dashedLineChartOpts, gradientLineChartOpts, lineChartOpts, lineChartWithAnnotationOpts, lineWithDataLabelOpts, missingChartOpts, steplineChartOpts, syncingChartOpts, syncingChartOpts2, zoomableTimeseriesOpts } from '../data';
const SimpleChart = () => {
  return <ComponentContainerCard id="simple" title="Simple line chart">
      <ReactApexChart height={380} options={lineChartOpts} series={lineChartOpts.series} type="line" />
    </ComponentContainerCard>;
};
const LineWithDataLabels = () => {
  return <ComponentContainerCard id="datalabel" title="Line with Data Labels">
      <ReactApexChart height={380} options={lineWithDataLabelOpts} series={lineWithDataLabelOpts.series} type="line" />
    </ComponentContainerCard>;
};
const ZoomableChart = () => {
  return <ComponentContainerCard id="zoomable" title="Zoomable Timeseries">
      <ReactApexChart height={380} options={zoomableTimeseriesOpts} series={zoomableTimeseriesOpts.series} type="area" />
    </ComponentContainerCard>;
};
const LineChartWithAnnotations = () => {
  return <ComponentContainerCard id="annotations" title="Line Chart with Annotations">
      <ReactApexChart height={380} options={lineChartWithAnnotationOpts} series={lineChartWithAnnotationOpts.series} type="line" />
    </ComponentContainerCard>;
};
const SyncingChart = () => {
  return <ComponentContainerCard id="syncing" title="Syncing charts">
      <ReactApexChart height={200} options={syncingChartOpts} series={syncingChartOpts.series} type="line" />

      <div dir="ltr">
        <ReactApexChart height={160} options={syncingChartOpts2} series={syncingChartOpts2.series} type="line" />
      </div>
    </ComponentContainerCard>;
};
const GradientLineChart = () => {
  return <ComponentContainerCard id="gradient" title=" Gradient Line Chart">
      <ReactApexChart height={374} options={gradientLineChartOpts} series={gradientLineChartOpts.series} type="line" />
    </ComponentContainerCard>;
};
const NullValuesChart = () => {
  return <ComponentContainerCard id="missing" title="Missing / Null values">
      <ReactApexChart height={374} options={missingChartOpts} series={missingChartOpts.series} type="line" />
    </ComponentContainerCard>;
};
const DashedLineChart = () => {
  return <ComponentContainerCard id="dashed" title="Dashed Line Chart">
      <ReactApexChart height={380} options={dashedLineChartOpts} series={dashedLineChartOpts.series} type="line" />
    </ComponentContainerCard>;
};
const StepLineChart = () => {
  return <ComponentContainerCard id="stepline" title="Stepline Chart">
      <ReactApexChart height={344} options={steplineChartOpts} series={steplineChartOpts.series} type="line" />
    </ComponentContainerCard>;
};
const BrushChart = () => {
  return <ComponentContainerCard id="brush" title="Brush Chart">
      <ReactApexChart height={230} options={brushChartOpts} series={brushChartOpts.series} type="line" />
      <ReactApexChart height={130} options={brushChartOpts2} series={brushChartOpts2.series} type="line" />
    </ComponentContainerCard>;
};
const AllLineCharts = () => {
  return <>
      <SimpleChart />
      <LineWithDataLabels />
      <ZoomableChart />
      <LineChartWithAnnotations />
      <SyncingChart />
      <GradientLineChart />
      <NullValuesChart />
      <DashedLineChart />
      <StepLineChart />
      <BrushChart />
    </>;
};
export default AllLineCharts;