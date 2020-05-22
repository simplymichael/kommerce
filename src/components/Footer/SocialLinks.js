import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  BehanceIcon, FacebookIcon, TwitterIcon, InstagramIcon
} from '../Icons';

const UnorderedList = styled.ul`
  margin-right: 20px;
`;

const SocialLink = ({role, url, icon}) => {
  const Icon = icon;

  return (
    <li className="list-inline-item" role={role}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Icon />
      </a>
    </li>
  );
};

const SocialLinks = props => {
  const { behance_url, facebook_url, instagram_url, twitter_url } = props;

  return (
    <UnorderedList className="list-unstyled list-inline" role="social-links">
      <SocialLink
        role="facebook_page_link"
        url={facebook_url}
        icon={FacebookIcon} />

      <SocialLink
        role="twitter_page_link"
        url={twitter_url}
        icon={TwitterIcon} />

      <SocialLink
        role="instagram_page_link"
        url={instagram_url}
        icon={InstagramIcon} />

      <SocialLink
        role="behance_page_link"
        url={behance_url}
        icon={BehanceIcon} />
    </UnorderedList>
  );
};

SocialLink.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.func.isRequired,
  role: PropTypes.string,
};

SocialLinks.propTypes = {
  behance_url: PropTypes.string,
  facebook_url: PropTypes.string,
  twitter_url: PropTypes.string,
  instagram_url: PropTypes.string,
};

export default SocialLinks;
