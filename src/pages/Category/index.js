import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import ProductsList from '../../components/Products/ProductsList';
import BrandsFilter from '../../components/Filters/BrandsFilter';
import ColorsFilter from '../../components/Filters/ColorsFilter';
import PricesFilter from '../../components/Filters/PricesFilter';
import SizesFilter from '../../components/Filters/SizesFilter';

const FiltersContainer = styled.div`
  background: ${props => props.background || '#fff'};
  border: ${props => props.border || 'none'};
  padding: ${props => props.padding || '10px 15px'}
`;

const Category = (props) => {
  return (
    <Row>
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
          category={ props.match.params.id /* eslint-disable-line */ } />
      </Col>
    </Row>
  );
};

export default Category;
