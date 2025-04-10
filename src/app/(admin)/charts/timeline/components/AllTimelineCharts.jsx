'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactApexChart from 'react-apexcharts';
import { advancedTimelineOpts, basicTimelineOpts, distributedTimelineOpts, groupRowsTimelineOpts, multiSeriesTimelineOpts } from '../data';
const BasicChart = () => {
  return <ComponentContainerCard id="basic" title="Basic Timeline">
      <ReactApexChart height={350} options={basicTimelineOpts} series={basicTimelineOpts.series} type="rangeBar" />
    </ComponentContainerCard>;
};
const DistributedChart = () => {
  return <ComponentContainerCard id="distributed" title="Distributed Timeline">
      <ReactApexChart height={350} options={distributedTimelineOpts} series={distributedTimelineOpts.series} type="rangeBar" />
    </ComponentContainerCard>;
};
const MultiSeriesChart = () => {
  return <ComponentContainerCard id="multi-series" title="Multi Series Timeline">
      <ReactApexChart height={350} options={multiSeriesTimelineOpts} series={multiSeriesTimelineOpts.series} type="rangeBar" />
    </ComponentContainerCard>;
};
const AdvancedChart = () => {
  return <ComponentContainerCard id="advanced" title="Advanced Timeline">
      <ReactApexChart height={350} options={advancedTimelineOpts} series={advancedTimelineOpts.series} type="rangeBar" />
    </ComponentContainerCard>;
};
const GroupRowsChart = () => {
  return <ComponentContainerCard id="group-rows" title="Multiple Series - Group Rows">
      <ReactApexChart height={350} options={groupRowsTimelineOpts} series={groupRowsTimelineOpts.series} type="rangeBar" />
    </ComponentContainerCard>;
};
const AllTimelineCharts = () => {
  return <>
      <BasicChart />
      <DistributedChart />
      <MultiSeriesChart />
      <AdvancedChart />
      <GroupRowsChart />
    </>;
};
export default AllTimelineCharts;