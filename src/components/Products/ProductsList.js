import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import ProductSummary from './ProductSummary';
import strings from '../../resources/strings';

import { makeSelectSelectedBrands } from '../../store/brands';
import {
  fetchProducts,
  makeSelectProducts,
  makeSelectFetchProductsError,
  makeSelectIsFetchingProducts,
} from '../../store/products';

const { priceRangeSelector } = strings;

/**
 * Displays List of products
 * Accepted props:
 * - products (required): array of (product) objects
 * - container (optional):
 *      the container to hold each product rendered in the "renderer" component.
 *      Default is the (bootstrap) Col.
 * - weight (optional; values: 1 - 12):
 *      lets us specify the (relative) width of each product
 *      displayed in the list (via the Col component),
 *      useful especially when you don't specify a "container" prop.
 * - renderer (optional): defines the component for rendering each product;
 *      This component holds the product details (name, image, etc),
 *      as well as the "add-to-cart" button.
 *      the component receives the product to render.
 *      The default renderer is the ProductSummary component
 *
 * When rendering the products with the default ProductSummary component
 * (ie, when "renderer" props is not specified),
 * each product in the props.products collection must have the properties:
 * - id,
 * - name
 * - defaultImageUrl
 *
 * NOTE: if you specify a custom renderer,
 * you need to implement the functionality for adding the product to cart
 * on click of the add-to-cart-button.
 * See the ProductSummary component for an example implementation.
 */
class ProductsList extends React.Component {

  componentDidMount() {
    const { min, max } = priceRangeSelector;

    this.props.fetchProducts({
      page  : 1,
      limit : 1,
      color : '',
      size  : '',
      brands: this.props.selectedBrands.length ? this.props.selectedBrands : [],
      orderBy: {},
      priceRange : { min, max },
    });
  }

  componentDidUpdate(prevProps) {
    const { min, max } = priceRangeSelector;

    if(prevProps.selectedBrands !== this.props.selectedBrands) {
      this.props.fetchProducts({
        page  : 1,
        count : 1,
        color : '',
        size  : '',
        brands: this.props.selectedBrands,
        priceRange : { min, max },
      });
    }
  }

  render() {
    const { products, container, weight, renderer } = this.props;

    const containerWeight = weight || '3';
    const ProductContainer = container || Col;
    const ProcessorComponent = renderer || ProductSummary;
    const productsArray = (products || []).slice().map(product => {
      product.defaultImage = product.images
        .filter(img => img.default === true)
        .pop();

      return product;
    });

    return productsArray.map(product => (
      <ProductContainer key={product.id} md={containerWeight}>
        <ProcessorComponent product={product} />
      </ProductContainer>
    ));
  }
}

ProductsList.propTypes = {
  products: PropTypes.array,
  container: PropTypes.node,
  weight: PropTypes.string,
  renderer: PropTypes.node,
  selectedBrands: PropTypes.array,
  fetchProducts: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  fetchProducts: (queryData) => dispatch(fetchProducts(queryData)),
});

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  selectedBrands: makeSelectSelectedBrands(),
  isFetchingProducts: makeSelectIsFetchingProducts(),
  fetchProductsError: makeSelectFetchProductsError()
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
