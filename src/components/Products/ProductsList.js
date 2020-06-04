import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Loading from '../Notifications/Loading';
import { Error } from '../Notifications';
import Pagination from './Pagination';
import ProductSummary from './ProductSummary';
import config from '../../.config';
import strings from '../../resources/strings';
import { makeSelectSelectedBrands } from '../../store/brands';
import { makeSelectSelectedColors } from '../../store/colors';
import { makeSelectPriceRange } from '../../store/prices';
import { makeSelectSelectedSizes } from '../../store/sizes';
import {
  fetchProducts,
  makeSelectProducts,
  makeSelectSearchTerm,
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

    this.state = {
      queryData: {
        page    : 1,
        limit   : config.products.perPage,
        colors  : [],
        sizes   : [],
        brands  : [],
        orderBy : {},
        priceRange : { min, max },
        searchTerm: '',
      }
    };
  }

  componentDidMount() {
    let queryData = { ...this.state.queryData };

    if(this.props.category) {
      queryData.categories = [this.props.category];
    }

    this.props.fetchProducts(queryData);
  }

  componentDidUpdate(prevProps, prevState) {
    let needsUpdate = false;
    const { props } = this;
    const watched = [
      'priceRange', 'selectedColors',
      'selectedBrands', 'selectedSizes', 'searchTerm',
    ];

    for(let i = 0; i < watched.length; i++) {
      const key = watched[i];

      if(prevProps[key] !== props[key]) {
        needsUpdate = true;
      }
    }

    if(prevState.queryData.page !== this.state.queryData.page) {
      needsUpdate = true;
    }

    if(needsUpdate) {
      const setStateCallback = () => {
        let queryData = { ...this.state.queryData };

        // On category pages, we'll have the category
        // supplied by the parent via props received from
        // react-router-dom's props.match.params.category
        if(this.props.category) {
          queryData.categories = [this.props.category];
        }

        props.fetchProducts(queryData);
      };

      this.setState(currState => ({
        queryData: {
          ...currState.queryData,
          priceRange: props.priceRange,
          colors: props.selectedColors,
          brands: props.selectedBrands,
          sizes: props.selectedSizes,
          searchTerm: props.searchTerm,
        }
      }), setStateCallback);
    }
  }

  handlePageChange(pageNumber) {
    this.setState(currState => ({
      queryData: {
        ...currState.queryData,
        page: pageNumber
      }
    }));
  }

  render() {
    const {
      products, container, weight, renderer, category,
      isFetchingProducts, fetchProductsError,
    } = this.props;

    const { page } = this.state.queryData;

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

    return (
      <>
        <Row role="products-list-container">
          {productsArray.map(product => (
            <ProductContainer key={product.id} md={containerWeight}
              role="product-container">
              <ProcessorComponent product={product} />
            </ProductContainer>
          ))}
        </Row>
        <Row>
          <Col md="4">&nbsp;</Col>
          <Col md="4">
            <div style={{ margin: 'auto' }}>
              <Pagination
                currentPage={page}
                category={category}
                itemsCountPerPage={config.products.perPage}
                pageChangeHandler={this.handlePageChange.bind(this)} />
            </div>
          </Col>
          <Col md="4">&nbsp;</Col>
        </Row>
      </>
    );
  }
}

ProductsList.propTypes = {
  products: PropTypes.array,
  category: PropTypes.string,
  container: PropTypes.node,
  weight: PropTypes.string,
  renderer: PropTypes.node,
  page: PropTypes.number,
  priceRange: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  selectedBrands: PropTypes.array,
  selectedColors: PropTypes.array,
  selectedSizes: PropTypes.array,
  searchTerm: PropTypes.string,
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
  searchTerm: makeSelectSearchTerm(),
  isFetchingProducts: makeSelectIsFetchingProducts(),
  fetchProductsError: makeSelectFetchProductsError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
