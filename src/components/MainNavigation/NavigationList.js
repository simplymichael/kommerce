import React from 'react';
import PropTypes from 'prop-types';
import ImageText from '../ImageText';
import NavListItem from './NavListItem';

const NavigationList = ({ categories }) => {
  categories = categories || [
    { name: 'Shirts', slug: '', image: 'https://imgur.com/3u2mj7h.png' },
    { name: 'Shoes', slug: '', image: 'https://imgur.com/dV36lmS.png' },
    { name: 'Electronics', slug: '', image: 'https://imgur.com/3u2mj7h.png' },
    { name: 'Home Appliances', slug: '', image: 'https://imgur.com/dV36lmS.png' }
  ];

  let navItems = categories.slice().sort();

  navItems.forEach(item => {
    for(let [key, value] of Object.entries(item)) {
      item[key] = value.trim();
    }
  });

  return navItems.map(item => {
    let slug = item.slug;
    slug = (slug.length ? slug : item.name.toLowerCase()).replace(/\s+/, '-');

    return (
      <NavListItem key={slug} to={`/categories/${slug}`}>
        <ImageText src={item.image || ''} width="32px" height="22px">
          {item.name}
        </ImageText>
      </NavListItem>
    );
  });
};

NavigationList.propTypes = {
  categories: PropTypes.array,
};

export default NavigationList;
