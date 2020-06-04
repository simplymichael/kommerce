import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import Loading from '../Notifications/Loading';
import { Error } from '../Notifications';
import config from '../../.config';
import strings from '../../resources/strings';
import { makeSelectSelectedBrands } from '../../store/brands';
import { makeSelectSelectedColors } from '../../store/colors';
import { makeSelectPriceRange } from '../../store/prices';
import { makeSelectSelectedSizes } from '../../store/sizes';
import {
  countProducts,
  makeSelectProductsCount,
  makeSelectIsCountingProducts,
  makeSelectCountProductsError,
  makeSelectSearchTerm,
} from '../../store/products';

const { priceRangeSelector } = strings;

class CustomPagination extends React.Component {
  constructor(props) {
    super(props);

    const { min, max } = priceRangeSelector;

    this.state = {
      queryData: {
        limit   : config.products.perPage || 10,
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

    this.props.countProducts(queryData);
  }

  componentDidUpdate(prevProps) {
    let needsUpdate = false;
    const { props } = this;
    const watched = [
      'currentPage', 'priceRange', 'selectedColors',
      'selectedBrands', 'selectedSizes', 'searchTerm',
    ];

    for(let i = 0; i < watched.length; i++) {
      const key = watched[i];

      if(prevProps[key] !== props[key]) {
        needsUpdate = true;
      }
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

        this.props.countProducts(queryData);
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

  render() {
    const {
      currentPage,
      productsCount,
      isCountingProducts,
      countProductsError,
      itemsCountPerPage,
    } = this.props;

    if(isCountingProducts) {
      return (
        <div style={{
          width: '50px',
          margin: 'auto',
          marginTop: '25px',
        }}>
          <Loading width="50px" height="50px" color="#aaa" opacity="0.5"
            role="products-loading-indicator" />
        </div>
      );
    }

    if(countProductsError) {
      return <Error>
        {strings.product.countProductsError || countProductsError}
      </Error>;
    }

    return (
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={productsCount}
        pageRangeDisplayed={4}
        onChange={this.props.pageChangeHandler}
        itemClass="page-item"
        linkClass="page-link" />
    );
  }
}

CustomPagination.propTypes = {
  countProducts: PropTypes.func,
  productsCount: PropTypes.number,
  isCountingProducts: PropTypes.bool,
  countProductsError: PropTypes.string,

  // These are already present in the parent (ProductsList) component,
  // maybe pass them from the parent rather than from the stor
  priceRange: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  selectedBrands: PropTypes.array,
  selectedColors: PropTypes.array,
  selectedSizes: PropTypes.array,
  searchTerm: PropTypes.string,

  // These are from the parent component (ProductsList)
  category: PropTypes.string,
  currentPage: PropTypes.number,
  itemsCountPerPage: PropTypes.number,
  pageChangeHandler: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  countProducts: (queryData) => dispatch(countProducts(queryData)),
});

const mapStateToProps = createStructuredSelector({
  productsCount: makeSelectProductsCount(),
  priceRange: makeSelectPriceRange(),
  selectedBrands: makeSelectSelectedBrands(),
  selectedColors: makeSelectSelectedColors(),
  selectedSizes: makeSelectSelectedSizes(),
  searchTerm: makeSelectSearchTerm(),
  isCountingProducts: makeSelectIsCountingProducts(),
  countProductsError: makeSelectCountProductsError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomPagination);
