import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import ProductsList from '../../components/Products/ProductsList';
import BrandsFilter from '../../components/Filters/BrandsFilter';
import ColorsFilter from '../../components/Filters/ColorsFilter';
import PricesFilter from '../../components/Filters/PricesFilter';
import SizesFilter from '../../components/Filters/SizesFilter';
import strings from '../../resources/strings';

const FiltersContainer = styled.div`
  background: ${props => props.background || '#fff'};
  border: ${props => props.border || 'none'};
  padding: ${props => props.padding || '10px 15px'}
`;

const Category = (props) => {
  return (
    <Layout
      pageMeta={strings.pages.category(props.match.params.categoryId).pageMeta}>
      <Col md="3" role="sidebar">
        <FiltersContainer border="1px solid #eee" role="filters-container">
          <ColorsFilter role="colors-filter-container" />
          <SizesFilter role="sizes-filter-container" />
          <PricesFilter role="prices-filter-container" />
          <BrandsFilter role="brands-filter-container" />
        </FiltersContainer>
      </Col>
      <Col md="9" role="main-content">
        <ProductsList
          weight="4"
          category={ props.match.params.categoryId /* eslint-disable-line */ } />
      </Col>
    </Layout>
  );
};

Category.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string,
    }),
  }),
};

export default Category;
