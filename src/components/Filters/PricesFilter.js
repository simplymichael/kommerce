import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import strings from '../../resources/strings';
import RangeSlider from '../RangeSlider';
import { FilterContainer, FilterHeader } from './FilterContainer';
import { onAdjustPriceRange, makeSelectPriceRange } from '../../store/prices';

const PriceFilterContainer = styled(FilterContainer)`
  padding-bottom: 30px;
`;

const PriceFilterHeader = styled(FilterHeader)`
  margin-bottom: 20px;
`;

const PriceRangeSliderContainer = styled(Container)`
  padding-left: 10px;
  padding-right: 10px;
`;

const PriceFilters = props => {
  const rangeConfig = strings.priceRangeSelector;
  const { priceChangeHandler } = props; // coming from store
  const role = props.role || 'prices-filter-container';

  const [currentValue, setCurrentValue] = React.useState({
    min: rangeConfig.initialMinValue,
    max: rangeConfig.initialMaxValue
  });

  return (
    <PriceFilterContainer role={role}>
      <PriceFilterHeader>Price range</PriceFilterHeader>
      <PriceRangeSliderContainer>
        <RangeSlider
          min={rangeConfig.min}
          max={rangeConfig.max}
          step={rangeConfig.step}
          currentValue={currentValue}
          labelFormatter={val => `${rangeConfig.currency}${val}`}
          changeHandler={val => {
            setCurrentValue(val);
            priceChangeHandler(val);
          }} />
      </PriceRangeSliderContainer>
    </PriceFilterContainer>
  );
};

PriceFilters.propTypes = {
  role: PropTypes.string,
  priceChangeHandler: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  priceChangeHandler: (val) => dispatch(onAdjustPriceRange(val)),
});

const mapStateToProps = createStructuredSelector({
  price: makeSelectPriceRange(),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceFilters);
