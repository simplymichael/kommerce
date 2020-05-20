import React from 'react';
import styled from 'styled-components';
import {
  BehanceIcon, FacebookIcon, TwitterIcon, InstagramIcon
} from './social-icons';

const UnorderedList = styled.ul`
  margin-right: 20px;
`;

const SocialLink = ({url, icon}) => {
  const Icon = icon;
  return (
    <li className="list-inline-item">
      <a href={url}>
        <Icon />
      </a>
    </li>
  );
}

export default () => (
  <UnorderedList className="list-unstyled list-inline">
    <SocialLink url="" icon={FacebookIcon} />
    <SocialLink url="" icon={TwitterIcon} />
    <SocialLink url="" icon={InstagramIcon} />
    <SocialLink url="" icon={BehanceIcon} />
  </UnorderedList>
);
