import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import config from '../.config';
import device from '../utils/device';
import strings from '../resources/strings';
import Icon from './Icons/Icon';
import { Error } from './Notifications';
import {
  searchProducts,
  makeSelectIsSearchingProducts,
  makeSelectSearchProductsError,
} from '../store/products';

const Form = styled.form`
  float: right;
  display: inline-block;
  margin-top: 0px;
  margin-right: 0px;
  padding-left: 2px;
  padding-right: 0px;
  padding-top: 0;
  padding-bottom: 0;
  border: 1px solid #bbb;
  border-radius: 2px;

  @media (min-width: ${device.mobileS}) and (max-width: ${device.tablet}) { /* 375 */
    float: none;
  }
`;

const SearchLink = styled(Link)`
  display: inline-block;
  width: 50px;
  background: #bbb;
  padding: 6px;
  padding-bottom: 7px;

  @media (min-width: ${device.mobileS}) and (max-width: ${device.mobileL}) {
    display: none;
  }

  @media (max-width: ${device.tablet}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 550px;
  padding: 0 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 0;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: #222;
  outline: 0;
  transition: all .25s linear;

  :focus {
    color: #222;
    border: none !important;
  }

  @media (min-width: ${device.mobileS}) and (max-width: ${device.mobileL}) {
    width: 200px;
  }

  @media (max-width: ${device.tablet}) {
    width: 300px;
  }

  @media all {
    ${props => props.collapsed && css`
      width: 0;
      padding: 0;
      border: none;
      margin-left: 0;
      margin-right: 0;
    `}
  }
`;

const SearchIcon = () => (
  <Icon width="20" height="20" fillColor="none" stroke="currentColor"
    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
    role="img" focusable="false" color="#eee">
    <title></title>
    <circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path>
  </Icon>
);

const SearchIconBtn = ({ to, role, clickHandler }) => (
  <SearchLink to={to} role={role} onClick={clickHandler}>
    <SearchIcon />
  </SearchLink>
);

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      collapsed: false,
      validationError: '',
    };
  }

  clickHandler(e) {
    e.preventDefault();

    /*this.setState(
      currState => ({
        'focused': !currState.focused,
        'collapsed': !currState.collapsed
      }),
      () => this.state.focused && this.searchInput.focus()
    );*/

    this.handleSubmit(e);
  }

  handleInputChange() {
    // clear the error
    this.setState({
      validationError: '',
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const query = this.searchInput.value;

    if(!query) {
      /*this.setState({
        validationError: 'Please enter a query in the input field',
      });*/

      return;
    }

    // eslint-disable-next-line
    let category = '';
    const { pathname } = this.props.location; // eslint-disable-line

    // eslint-disable-next-line
    if(pathname.indexOf('/categories') === 0) {
      category = pathname.split('/categories/')[1]; //eslint-disable-line
    }

    const queryData = {
      query,
      page  : 1,
      limit : config.products.perPage || 10,
      categories: [category],
    };

    this.props.searchProducts(queryData);
  }

  render() {
    const { isSearchingProducts, searchProductsError } = this.props;
    const { validationError } = this.state;
    let error = validationError;

    if(isSearchingProducts) {
      // do something
    }

    if(searchProductsError) {
      error = strings.search.error || searchProductsError;
    }

    return (
      <>
        <Error>{error}</Error>
        <Form
          role={this.props.role || 'search-form'}
          onSubmit={this.handleSubmit.bind(this)}>
          <SearchInput
            type="text"
            role="search-input-field"
            placeholder="..."
            data-collapsed={this.state.collapsed}
            collapsed={this.state.collapsed}
            disabled={isSearchingProducts}
            className={isSearchingProducts ? 'not-allowed' : ''}
            ref={input => this.searchInput = input}
            onFocus={() => this.searchInput.placeholder = ''}
            onBlur={() => this.searchInput.placeholder = '...'}
            onChange={() => this.handleInputChange()}/>
          <SearchIconBtn to="#" role="search-icon-button"
            clickHandler={e => this.clickHandler(e)} />
        </Form>
      </>
    );
  }
}

SearchIconBtn.propTypes = {
  to: PropTypes.string,
  role: PropTypes.string,
  clickHandler: PropTypes.func,
};

SearchForm.propTypes = {
  role: PropTypes.string,
  searchProducts: PropTypes.func,
  isSearchingProducts: PropTypes.bool,
  searchProductsError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  searchProducts: (queryData) => dispatch(searchProducts(queryData)),
});

const mapStateToProps = createStructuredSelector({
  isSearchingProducts: makeSelectIsSearchingProducts(),
  searchProductsError: makeSelectSearchProductsError()
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchForm));
