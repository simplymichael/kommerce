import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import device from '../../utils/device';

const SearchDiv = styled.div`
  float: right;
  display: inline-block;
  margin-top: 1px;
  margin-right: 0px;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 5px;
  border: 1px solid #333;
  border-radius: 2px;

  @media (min-width: ${device.mobileS}) and (max-width: ${device.tablet}) { /* 375 */
    float: none;
  }
`;

const SearchLink = styled(Link)`
  position: relative;
`;

const SearchInput = styled.input`
  width: 350px;
  padding: 0 5px;
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 0;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: #eee;
  transition: all .25s linear;

  :focus {
    background: #eee;
    color: #222;
  }

  @media (min-width: ${device.mobileS}) and (max-width: ${device.mobileL}) {
    width: 200px;
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

function Svg(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
       width="20" height="20" fill="none" stroke="currentColor"
       strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
       role="img" viewBox="0 0 24 24" focusable="false" color="#eee">
      <title>Search</title>
      <circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path>
   </svg>
  );
}

function SearchBtn(props) {
  return (
    <SearchLink to="#" onClick={props.clickHandler}>
      <Svg />
    </SearchLink>
  );
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'focused': false,
      'collapsed': true
    };
  }

  clickHandler(e) {
    e.preventDefault();

    this.setState(currState => ({
        'focused': !currState.focused,
        'collapsed': !currState.collapsed
      }),
      _ => this.state.focused && this.searchInput.focus()
    );
  }

  render() {
    return (
      <SearchDiv>
        <SearchInput
          type="text"
          placeholder="Search"
          collapsed={this.state.collapsed}
          ref={input => this.searchInput = input} />
        <SearchBtn clickHandler={e => this.clickHandler(e)} />
      </SearchDiv>
    );
  }
}

export default SearchForm;
