import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FilterContainer, FilterHeader } from './FilterContainer';
import { fetchSizes, onSizeClick, makeSelectSizes } from '../../store/sizes';

const Size = styled.span`
  display: inline-block;
  width: 50px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  background: #aae;
  border-radius: 4px;
  color: #fafafa; /*#212529;*/
  cursor: pointer;
  text-align: center;

  ${props => props.selected && css`
    background: #dc3545 /*#900*/
  `}
`;

const SizeFilter = ({size, selected, clickHandler}) => {
  // If already selected, then we want to deselect it,
  // so, select should be false.
  // Otherwise, we want to select it,
  // so select should be true.
  const select = selected ? false : true;
  const displayTitle = selected
    ? `Click to clear size filter: ${size}`
    : `Click to filter by size: ${size}`;

  return (
    <Size
      role={`size-${size.toLowerCase().replace(/\s+/g, '_')}-selector`}
      selected={selected}
      title={displayTitle}
      onClick={() => clickHandler(size, select)}>
      {size}
    </Size>
  );
};

const SizeFilters = props => {
  const { fetchSizes, sizeClickHandler, sizes } = props; //coming from store
  const role = props.role || 'sizes-filter-container';

  useEffect(() => {
    fetchSizes(); // eslint-disable-next-line
  }, []);

  return (
    <FilterContainer role={role}>
      <FilterHeader>Size</FilterHeader>
      <div>
        {sizes.map(size => (
          <SizeFilter
            key={size.key}
            size={size.value}
            selected={size.selected}
            clickHandler={(size, select) => { sizeClickHandler(size, select); }}/>
        ))}
      </div>
    </FilterContainer>
  );
};

SizeFilter.propTypes = {
  size: PropTypes.string,
  selected: PropTypes.bool,
  clickHandler: PropTypes.func,
};

SizeFilters.propTypes = {
  role: PropTypes.string,
  sizes: PropTypes.array,
  fetchSizes: PropTypes.func,
  sizeClickHandler: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  fetchSizes: () => dispatch(fetchSizes()),
  sizeClickHandler: (size, select) => dispatch(onSizeClick(size, select)),
});

const mapStateToProps = createStructuredSelector({
  sizes: makeSelectSizes(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SizeFilters);
