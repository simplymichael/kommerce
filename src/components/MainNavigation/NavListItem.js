import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../resources/colors';

const NavListItem = styled(Link).attrs(() => ({
  role: 'navigation-list-item',
  className: 'p-2 text-muted',
}))`
  text-decoration: none;
  background-color: transparent;
  display:  'inline-block';

  color: ${colors.navigation.primary.link} !important;

  :hover {
    text-decoration: overline;
    color: ${colors.navigation.primary.linkHover} !important;
  }
`;

NavListItem.propTypes = {
  to: PropTypes.string.isRequired
};

export default NavListItem;
