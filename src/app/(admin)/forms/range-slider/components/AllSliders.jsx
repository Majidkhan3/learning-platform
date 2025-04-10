'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import useRangeSlider from '@/hooks/useRangeSlider';
import Nouislider from 'nouislider-react';
import { useState } from 'react';
const BasicSlider = () => {
  return <ComponentContainerCard id="basic-range" title="Basic Range Slider" titleClass="mb-3">
      <Nouislider range={{
      min: 0,
      max: 255
    }} start={127} connect={[true, false]} />
    </ComponentContainerCard>;
};
const VerticalRangeSlider = () => {
  return <ComponentContainerCard id="vertical-range" title="Vertical Range Slider" titleClass="mb-3">
      <Nouislider style={{
      height: '150px'
    }} range={{
      min: 0,
      max: 200
    }} start={[60, 160]} connect orientation="vertical" />
    </ComponentContainerCard>;
};
const MultiElementsSlider = () => {
  return <ComponentContainerCard id="multi-range" title="Multi Elements Range" titleClass="mb-3">
      <Nouislider range={{
      min: 0,
      max: 100
    }} start={[20, 80]} connect />
    </ComponentContainerCard>;
};
const ColorPicker = () => {
  const colors = ['red', 'green', 'blue'];
  const [state, setState] = useState('rgb(127, 127, 127)');
  const onUpdate = index => value => {
    colors[index] = value[0];
    setState(`rgb(${colors.join(',')})`);
  };
  return <ComponentContainerCard id="colorpicker-range" title="Colorpicker" titleClass="mb-3">
      {colors.map((color, idx) => <Nouislider key={idx} id={color} connect={[true, false]} onUpdate={onUpdate(idx)} orientation="vertical" style={{
      height: '200px'
    }} range={{
      min: 0,
      max: 255
    }} start={[125]} />)}
      <div id="result" style={{
      background: state
    }} />
    </ComponentContainerCard>;
};
const ValueRangeSlider = () => {
  const {
    selectedRanges2,
    onSlide3
  } = useRangeSlider();
  return <ComponentContainerCard id="value-range" title="Value Range Slider" titleClass="mb-3">
      <Nouislider behaviour="tap" step={350} range={{
      min: 0,
      max: 10000
    }} start={[500, 4000]} connect onSlide={value => onSlide3(1, value)} />
      <div className="d-flex justify-content-between mt-3">
        <p>value: {selectedRanges2 ? <span>{selectedRanges2[1]}</span> : null}</p>
      </div>
    </ComponentContainerCard>;
};
const TooltipRangeSlider = () => {
  return <ComponentContainerCard id="tooltip" title="Tooltip" titleClass="mb-3">
      <div className="p-3">
        <Nouislider range={{
        min: 0,
        max: 100
      }} start={[20, 75]} connect tooltips={[true, true]} />
      </div>
    </ComponentContainerCard>;
};
const SoftLimitSlider = () => {
  return <ComponentContainerCard id="soft-limits" title="Soft Limits" titleClass="mb-3">
      <div className="mb-3 pb-5">
        <Nouislider range={{
        min: 0,
        max: 100
      }} start={50} pips={{
        mode: 'values',
        values: [20, 80],
        density: 4
      }} />
      </div>
    </ComponentContainerCard>;
};
const AllSliders = () => {
  return <>
      <BasicSlider />
      <VerticalRangeSlider />
      <MultiElementsSlider />
      <ColorPicker />
      <ValueRangeSlider />
      <TooltipRangeSlider />
      <SoftLimitSlider />
    </>;
};
export default AllSliders;