import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FilterContainer, FilterHeader } from './FilterContainer';
import {
  fetchColors,
  onColorClick,
  makeSelectColors,
} from '../../store/colors';

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
`;

const ColorFilter = ({color, selected, clickHandler}) => {
  const role = `color-${color.replace(/\s+/g, '_')}-selector`;

  if(selected) {
    return (
      <Color
        outer
        role={role}
        selected={selected}
        title={`Click to clear color filter: ${color}`}
        onClick={() => clickHandler(color, false)}>
        <Color backgroundColor={color} />
      </Color>
    );
  } else {
    return (
      <Color
        role={role}
        backgroundColor={color}
        title={`Click to filter by color: ${color}`}
        onClick={() => clickHandler(color, true)} />
    );
  }
};

const ColorFilters = props => {
  const { fetchColors, colorClickHandler, colors } = props; // coming from store
  const role = props.role || 'colors-filter-container';

  useEffect(() => {
    fetchColors(); // eslint-disable-next-line
  }, []);

  return (
    <FilterContainer role={role}>
      <FilterHeader>Color</FilterHeader>
      <div>
        {colors.map(color => (
          <ColorFilter
            key={color.name}
            color={color.name}
            selected={color.selected}
            clickHandler={(color, select) =>
              colorClickHandler(color, select) } />
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
  fetchColors: PropTypes.func,
  colorClickHandler: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  fetchColors: () => dispatch(fetchColors()),
  colorClickHandler: (color, select) => dispatch(onColorClick(color, select)),
});

const mapStateToProps = createStructuredSelector({
  colors: makeSelectColors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorFilters);
