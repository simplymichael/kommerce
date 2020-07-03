import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
import {
  fetchColors,
  onColorClick,
  makeSelectColors,
} from '../../store/colors';

const FiltersContainer = styled.div`
  background: ${props => props.background || '#fff'};
  border: ${props => props.border || 'none'};
  padding: ${props => props.padding || '10px 15px'}
`;

const Home = (props) => {
  const { fetchColors, colorClickHandler, colors } = props; // coming from store

  useEffect(() => {
    fetchColors(); // eslint-disable-next-line
  }, []);

  return (
    <Layout pageMeta={strings.pages.home().pageMeta}>
      <Col md="3" role="sidebar">
        <FiltersContainer border="1px solid #eee" role="filters-container">
          <ColorsFilter
            role="colors-filter-container"
            colors={colors}
            colorClickHandler={colorClickHandler} />

          <SizesFilter role="sizes-filter-container" />
          <PricesFilter role="prices-filter-container" />
          <BrandsFilter role="brands-filter-container" />
        </FiltersContainer>
      </Col>
      <Col md="9" role="main-content">
        <ProductsList weight="4" />
      </Col>
    </Layout>
  );
};

Home.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
