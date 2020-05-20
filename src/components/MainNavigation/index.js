import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import SearchForm from './SearchForm';

const StyledLink = styled(Link)`
  text-decoration: none;
  background-color: transparent;
  display:  'inline-block';

  color: ${colors.navigation.primary.link} !important;

  :hover {
    text-decoration: overline;
    color: ${colors.navigation.primary.linkHover} !important;
  }
`;
const Navigation = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${colors.navigation.primary.link};
  margin: '0';
  padding: '10px 15px';
  border: 'none';
  border-radius: 3px;
  padding-left: 15px;
  padding-right: 15px;
  background: ${colors.navigation.primary.background};
`;
const Nav = styled.nav``;

const MainNavigation = () => {

  // TO DO: get this from some database or state
  const categories = ['Shirts', 'Shoes', 'Electronics', 'Home Appliances'];

  let navItems = categories.slice().sort();

  navItems.unshift('/');

  const listItems = navItems.map(item => {
    let key = item;
    let url = '/';
    let name = strings.appName;

    if(item !== '/') {
      key = item;
      url = `/categories/${item.toLowerCase()}`.replace(/\s+/, '-');
      name = item;
    };

    return (
     <StyledLink key={key} className="p-2 text-muted" to={url}>
      {name}
     </StyledLink>
    )
  });

  return (
    <Navigation className="nav-scroller py-1 mb-2 main-nav">
      <Nav className="nav d-flex justify-content-between">
        {listItems}
        <SearchForm />
      </Nav>
    </Navigation>
  );
}

export default MainNavigation;
