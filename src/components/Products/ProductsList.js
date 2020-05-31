import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Loading from '../Notifications/Loading';
import { Error } from '../Notifications';
import ProductSummary from './ProductSummary';
import config from '../../config';
import strings from '../../resources/strings';
import { makeSelectSelectedBrands } from '../../store/brands';
import { makeSelectSelectedColors } from '../../store/colors';
import { makeSelectPriceRange } from '../../store/prices';
import { makeSelectSelectedSizes } from '../../store/sizes';
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
  constructor(props) {
    super(props);

    const { min, max } = priceRangeSelector;
    this.queryData = {
      page    : 1,
      limit   : config.products.perPage || 10,
      colors  : [],
      sizes   : [],
      brands  : [],
      orderBy : {},
      priceRange : { min, max },
    };
  }

  componentDidMount() {
    this.props.fetchProducts(this.queryData);
  }

  componentDidUpdate(prevProps) {
    let propsChanged = false;

    if(prevProps.priceRange !== this.props.priceRange) {
      propsChanged = true;
      this.queryData.priceRange = this.props.priceRange;
    }
    if(prevProps.selectedColors !== this.props.selectedColors) {
      propsChanged = true;
      this.queryData.colors = this.props.selectedColors;
    }
    if(prevProps.selectedBrands !== this.props.selectedBrands) {
      propsChanged = true;
      this.queryData.brands = this.props.selectedBrands;
    }
    if(prevProps.selectedSizes !== this.props.selectedSizes) {
      propsChanged = true;
      this.queryData.sizes = this.props.selectedSizes;
    }
    if(propsChanged) {
      this.props.fetchProducts(this.queryData);
    }
  }

  render() {
    const {
      products, container, weight,
      renderer, isFetchingProducts,
      fetchProductsError,
    } = this.props;

    if(isFetchingProducts) {
      return (
        <div style={{
          width: '100px',
          margin: 'auto',
          marginTop: '50px',
        }}>
          <Loading width="100px" height="100px" color="#aaa" opacity="0.5"
            role="products-loading-indicator" />
        </div>
      );
    }

    if(fetchProductsError) {
      return <Error>
        {strings.product.fetchProductsError || fetchProductsError}
      </Error>;
    }

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
  priceRange: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  selectedBrands: PropTypes.array,
  selectedColors: PropTypes.array,
  selectedSizes: PropTypes.array,
  fetchProducts: PropTypes.func,
  isFetchingProducts: PropTypes.bool,
  fetchProductsError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  fetchProducts: (queryData) => dispatch(fetchProducts(queryData)),
});

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  priceRange: makeSelectPriceRange(),
  selectedBrands: makeSelectSelectedBrands(),
  selectedColors: makeSelectSelectedColors(),
  selectedSizes: makeSelectSelectedSizes(),
  isFetchingProducts: makeSelectIsFetchingProducts(),
  fetchProductsError: makeSelectFetchProductsError()
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
