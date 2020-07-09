import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import ProductsList from '../../components/Products/ProductsList';
import BrandsFilter from '../../components/Filters/BrandsFilter';
import ColorsFilter from '../../components/Filters/ColorsFilter';
import PricesFilter from '../../components/Filters/PricesFilter';
import SizesFilter from '../../components/Filters/SizesFilter';
import strings from '../../resources/strings';
import { fetchBrands, onBrandClick, makeSelectBrands } from '../../store/brands';
import { fetchColors, onColorClick, makeSelectColors } from '../../store/colors';
import { fetchSizes, onSizeClick, makeSelectSizes } from '../../store/sizes';

const FiltersContainer = styled.div`
  background: ${props => props.background || '#fff'};
  border: ${props => props.border || 'none'};
  padding: ${props => props.padding || '10px 15px'}
`;

const Search = (props) => {
  const {
    fetchBrands,
    fetchColors,
    fetchSizes,
    brands,
    colors,
    sizes,
    brandClickHandler,
    colorClickHandler,
    sizeClickHandler,
  } = props; // coming from store
  const { query } = queryString.parse(props.location.search);

  useEffect(() => {
    fetchBrands();
    fetchColors();
    fetchSizes(); // eslint-disable-next-line
  }, []);

  return (
    <Layout pageMeta={strings.pages.search(query).pageMeta}>
      <Col md="3" role="sidebar">
        <FiltersContainer border="1px solid #eee" role="filters-container">
          <ColorsFilter
            role="colors-filter-container"
            colors={colors}
            colorClickHandler={colorClickHandler} />

          <SizesFilter
            role="sizes-filter-container"
            sizes={sizes}
            sizeClickHandler={sizeClickHandler} />
          <PricesFilter role="prices-filter-container" />
          <BrandsFilter
            role="brands-filter-container"
            brands={brands}
            brandClickHandler={brandClickHandler} />
        </FiltersContainer>
      </Col>
      <Col md="9" role="main-content">
        <ProductsList weight="4" searchTerm={query} />
      </Col>
    </Layout>
  );
};

Search.propTypes = {
  brands: PropTypes.array,
  colors: PropTypes.array,
  sizes: PropTypes.array,
  fetchBrands: PropTypes.func,
  fetchColors: PropTypes.func,
  fetchSizes: PropTypes.func,
  brandClickHandler: PropTypes.func,
  colorClickHandler: PropTypes.func,
  sizeClickHandler: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

const mapDispatchToProps = dispatch => ({
  fetchBrands: () => dispatch(fetchBrands()),
  fetchColors: () => dispatch(fetchColors()),
  fetchSizes: () => dispatch(fetchSizes()),

  brandClickHandler: (brand, checked) => dispatch(onBrandClick(brand, checked)),
  colorClickHandler: (color, select) => dispatch(onColorClick(color, select)),
  sizeClickHandler: (size, select) => dispatch(onSizeClick(size, select)),
});

const mapStateToProps = createStructuredSelector({
  brands: makeSelectBrands(),
  colors: makeSelectColors(),
  sizes: makeSelectSizes(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
