import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import strings from '../../resources/strings';
import Loading from '../Notifications/Loading';
import { Error } from '../Notifications';
import ImageText from '../ImageText';
import NavListItem from './NavListItem';
import {
  fetchCategories,
  makeSelectCategories,
  makeSelectFetchCategoriesError,
  makeSelectIsFetchingCategories,
} from '../../store/categories';

const NavigationList = (props) => {
  const {
    categories,
    fetchCategories,
    isFetchingCategories,
    fetchCategoriesError,
  } = props;

  useEffect(() => {
    fetchCategories(); // eslint-disable-next-line
  }, []);

  if(isFetchingCategories) {
    return (
      <div style={{
        width: '40px',
        margin: 'auto',
        marginTop: '5px',
      }}>
        <Loading width="40px" height="40px" color="#aaa" opacity="0.5"
          role="categories-loading-indicator" />
      </div>
    );
  }

  if(fetchCategoriesError) {
    return <Error>
      {strings.category.fetchCategoriesError || fetchCategoriesError}
    </Error>;
  }

  let navItems = categories.slice().sort();

  navItems.forEach(item => {
    for(let [key, value] of Object.entries(item)) {
      item[key] = typeof value === 'string' ? value.trim() : value;
    }
  });

  return navItems.map(item => {
    let slug = item.slug;
    slug = (slug.length ? slug : item.name.toLowerCase()).replace(/\s+/, '-');

    return (
      <NavListItem key={slug} to={`/categories/${slug}`}>
        <ImageText src={item.image || ''} width="32px" height="22px"
          style={{
            borderRadius: '2px',
            marginRight: '5px',
          }}>
          {item.name}
        </ImageText>
      </NavListItem>
    );
  });
};

NavigationList.propTypes = {
  categories: PropTypes.array,
  fetchCategories: PropTypes.func,
  isFetchingCategories: PropTypes.bool,
  fetchCategoriesError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
});

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  isFetchingCategories: makeSelectIsFetchingCategories(),
  fetchCategoriesError: makeSelectFetchCategoriesError()
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationList);
