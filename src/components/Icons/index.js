import React from 'react';
import Icon from './Icon';
import iconPaths from './icon-paths';

const makeIcon = path => props => (
  <Icon {...props}>
    <path d={path} />
  </Icon>
);

export const BehanceIcon = makeIcon(iconPaths.behance);

export const CartIcon = makeIcon(iconPaths.cart);

export const FacebookIcon = makeIcon(iconPaths.facebook);

export const InstagramIcon = makeIcon(iconPaths.instagram);

export const TwitterIcon = makeIcon(iconPaths.twitter);
