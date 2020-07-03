import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FilterContainer, FilterHeader } from './FilterContainer';

const Color = styled.span`
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 5px;
  background-color: ${props => props.backgroundColor || 'none'};

  ${props => props.outer && css`
    margin-bottom: 5px;
  `}

  ${props => props.selected && css`
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    padding: 4.2px;
    border-radius: 30px;
    text-align: center;
  `}

  ${props => props.transparent && css`
    border: 1px solid #999;
  `}
`;

const ColorFilter = ({color, selected, clickHandler}) => {
  const role = `color-${color.replace(/\s+/g, '_')}-selector`;

  if(selected) {
    return (
      <Color
        outer
        role={role}
        selected={selected}
        transparent={color === 'white'}
        title={`Click to clear color filter: ${color}`}
        onClick={() => clickHandler(color, false)}>
        <Color backgroundColor={color} />
      </Color>
    );
  } else {
    return (
      <Color
        role={role}
        transparent={color === 'white'}
        backgroundColor={color}
        title={`Click to filter by color: ${color}`}
        onClick={() => clickHandler(color, true)} />
    );
  }
};

const ColorFilters = props => {
  const { role, colorClickHandler, colors } = props;

  return (
    <FilterContainer role={role}>
      <FilterHeader role="colors-filter-header">Color</FilterHeader>
      <div>
        {colors.map(color => (
          <ColorFilter
            key={color.name}
            color={color.name}
            selected={color.selected}
            clickHandler={(color, select) => colorClickHandler(color, select)} />
        ))}
      </div>
    </FilterContainer>
  );
};

ColorFilter.propTypes = {
  color: PropTypes.string,
  selected: PropTypes.bool,
  clickHandler : PropTypes.func,
};

ColorFilters.propTypes = {
  role: PropTypes.string,
  colors: PropTypes.array,
  colorClickHandler: PropTypes.func,
};

ColorFilters.defaultProps = {
  role: 'colors-filter-container',
  colors: []
};

export default ColorFilters;
