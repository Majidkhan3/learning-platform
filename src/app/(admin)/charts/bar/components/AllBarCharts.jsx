'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactApexChart from 'react-apexcharts';
import { basicChartOpts, chartWithMarkerOpts, customDataLabelsChartOpts, fullStackedChartOpts, groupedBarChartOpts, imageChartOpts, negativeValueChartOpts, patternChartOpts, reversedChartOpts, stackedChartOpts } from '../data';
const BasicBarChart = () => {
  return <ComponentContainerCard id="basic" title="Basic Bar Chart">
      <ReactApexChart height={380} options={basicChartOpts} series={basicChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const GroupedBarChart = () => {
  return <ComponentContainerCard id="grouped" title="Grouped Bar Chart">
      <ReactApexChart height={380} options={groupedBarChartOpts} series={groupedBarChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const StackedBarChart = () => {
  return <ComponentContainerCard id="stacked" title="Stacked Bar Chart">
      <ReactApexChart height={380} options={stackedChartOpts} series={stackedChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const FullStackedBarChart = () => {
  return <ComponentContainerCard id="full-stacked" title="100% Stacked Bar Chart">
      <ReactApexChart height={380} options={fullStackedChartOpts} series={fullStackedChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const BarWithNegativeValueChart = () => {
  return <ComponentContainerCard id="negative" title="Bar with Negative Values">
      <ReactApexChart height={380} options={negativeValueChartOpts} series={negativeValueChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const ReversedBarChart = () => {
  return <ComponentContainerCard id="reversed" title="Reversed Bar Chart">
      <ReactApexChart height={380} options={reversedChartOpts} series={reversedChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const BarWithImage = () => {
  return <ComponentContainerCard id="image-fill" title="Bar with Image Fill">
      <ReactApexChart height={450} options={imageChartOpts} series={imageChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const CustomDataLabelsChart = () => {
  return <ComponentContainerCard id="datalables" title="Custom DataLabels Bar">
      <ReactApexChart height={450} options={customDataLabelsChartOpts} series={customDataLabelsChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const PatternedBarChart = () => {
  return <ComponentContainerCard id="pattern" title="Patterned Bar Chart">
      <ReactApexChart height={380} options={patternChartOpts} series={patternChartOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const BarChartWithMarkers = () => {
  return <ComponentContainerCard id="pattern" title="Bar with Markers">
      <ReactApexChart height={380} options={chartWithMarkerOpts} series={chartWithMarkerOpts.series} type="bar" />
    </ComponentContainerCard>;
};
const AllBarCharts = () => {
  return <>
      <BasicBarChart />
      <GroupedBarChart />
      <StackedBarChart />
      <FullStackedBarChart />
      <BarWithNegativeValueChart />
      <ReversedBarChart />
      <BarWithImage />
      <CustomDataLabelsChart />
      <PatternedBarChart />
      <BarChartWithMarkers />
    </>;
};
export default AllBarCharts;