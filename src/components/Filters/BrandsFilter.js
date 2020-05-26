import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FilterContainer, FilterHeader } from './FilterContainer';
import {
  fetchBrands,
  onBrandClick,
  makeSelectBrands
} from '../../store/brands';

const Input = styled.input``;

const UnorderedList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: 'block';
  font-size: '14px';
  color: '#555';
  margin: '10px';
`;

const BrandCheckbox = ({brand, value, selected, clickHandler}) => (
  <Input
    type='checkbox'
    value={value}
    defaultChecked={selected}
    onClick={evt => clickHandler(brand, evt.target.checked)}
  />
);

const BrandsFilter = props => {
  const { fetchBrands, brands, brandClickHandler } = props;
  const role = props.role || 'brand-filters';

  useEffect(() => {
    fetchBrands(); // eslint-disable-next-line
  }, []);

  return (
    <FilterContainer role={role}>
      <FilterHeader>Brand</FilterHeader>
      <UnorderedList>
        {brands.map(brand => (
          <ListItem key={brand.value}>
            <BrandCheckbox
              brand={brand.name}
              value={brand.value}
              selected={brand.selected}
              clickHandler={(brand, checked) => {
                brandClickHandler(brand, checked);
              }}/>
            {brand.name}
          </ListItem>
        ))}
      </UnorderedList>
    </FilterContainer>
  );
};

BrandCheckbox.propTypes = {
  brand: PropTypes.string,
  value: PropTypes.string,
  selected: PropTypes.bool,
  clickHandler: PropTypes.func,
};

BrandsFilter.propTypes = {
  role: PropTypes.string,
  brands: PropTypes.array,
  fetchBrands: PropTypes.func,
  brandClickHandler: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  fetchBrands: () => dispatch(fetchBrands()),
  brandClickHandler: (brand, checked) => dispatch(onBrandClick(brand, checked)),
});

const mapStateToProps = createStructuredSelector({
  brands: makeSelectBrands(),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandsFilter);
