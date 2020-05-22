import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UnorderedList = styled.ul`
  margin-right: 40px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const SecondaryPages = () => (
  <div className="menus d-flex">
    <UnorderedList className="list-unstyled" role="secondary-pages-links">
      <ListItem>
        <Link to="/about">About</Link>
      </ListItem>
      <ListItem>
        <Link to="/privacy">Privacy</Link>
      </ListItem>
    </UnorderedList>
    <UnorderedList className="list-unstyled">
      <ListItem>
        <Link to="/faq">FAQ</Link>
      </ListItem>
      <ListItem>
        <Link to="/contact">Contact</Link>
      </ListItem>
    </UnorderedList>
  </div>
);

export default SecondaryPages;
