import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const RangeSlider = ({min, max, step, currentValue,
  labelFormatter, changeHandler}) => (
  <InputRange
    step={step}
    minValue={min}
    maxValue={max}
    value={currentValue}
    onChange={value => changeHandler(value)}
    formatLabel={value => labelFormatter(value)} />
);

RangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  currentValue: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  labelFormatter: PropTypes.func,
  changeHandler: PropTypes.func,
};

export default RangeSlider;
