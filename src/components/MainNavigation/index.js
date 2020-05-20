import React from 'react';
import styled from 'styled-components';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import Logo from '../Logo';
import SearchForm from './SearchForm';
import NavListItem from './NavListItem';
import NavigationList from './NavigationList';

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

export default () => (
  <Navigation className="nav-scroller py-1 mb-2 main-nav">
    <nav className="nav d-flex justify-content-between">
      <NavListItem to="/">
        <Logo width="32px" height="22px">{strings.appName}</Logo>
      </NavListItem>
      <NavigationList />
      <SearchForm />
    </nav>
  </Navigation>
);
