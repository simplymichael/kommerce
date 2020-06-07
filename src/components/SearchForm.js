import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import device from '../utils/device';
import Icon from './Icons/Icon';

const Form = styled.form`
  display: inline-block;
  border: 1px solid #bbb;
  border-radius: 2px;
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
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 0;
  border: none;
  border-radius: 3px;
  color: #222;
  outline: 0;

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
  handleSubmit(e) {
    e.preventDefault();

    let searchPath = '';

    // We want to support paths like /categories/<categoryName|ID>
    // This way, if you search from category pages,
    // The search results will be displayed on category pages,
    // and also include the category results.
    //const currPath = this.props.location.pathname;

    /*if(currPath.indexOf('categories') > -1) {
      searchPath += `/${currPath}`;
    }*/

    searchPath += `/search?query=${this.searchInput.value}`;

    this.props.history.push(searchPath);
  }

  render() {
    return (
      <Form
        ref={form => this.searchForm = form}
        method="get" action="/search"
        role={this.props.role || 'search-form'}
        onSubmit={this.handleSubmit.bind(this)}>
        <SearchInput
          type="text"
          role="search-input-field"
          placeholder="..."
          ref={input => this.searchInput = input}
          onFocus={() => this.searchInput.placeholder = ''}
          onBlur={() => this.searchInput.placeholder = '...'} />
        <SearchIconBtn to='#' role="search-icon-button"
          clickHandler={e => this.handleSubmit(e)} />
      </Form>
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default withRouter(SearchForm);
