import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import { generateUniqueProductKey } from '../../utils/product';
import {
  addProductToCart,
  makeSelectAddProductToCartError,
  makeSelectProductsBeingAddedToCart,
} from '../../store/cart';

const productColors = colors.product;
const ProductContainer = styled.div`
  border-radius: 5px;
  padding: 7px;
  text-align: center;
  margin-bottom: 30px;
  border: 1px solid ${() => productColors.border};
  background: ${() => productColors.background};

  :hover {
    /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    -webkit-box-shadow: 3px 3px 5px 6px ${() => productColors.shadow};

    /* Firefox 3.5 - 3.6 */
    -moz-box-shadow: 3px 3px 5px 6px ${() => productColors.shadow};

    /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
    box-shadow: 3px 3px 5px 6px ${() => productColors.shadow};
  }
`;
const ImageContainer = styled.div`
  padding: 15px;
  margin: auto;
  background: ${() => productColors.imageBackground};
`;
const Image = styled.img`
  border-radius: 3px;
  width: 100%;
  height: 200px;
  vertical-align: middle;
  border-style: none;
`;
const ProductTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 18px;
  padding: 5px;
  color: ${() => productColors.text};
`;
const AddToCartButton = styled(Button)`
  border-radius: .25rem;
  color: ${() => productColors.actionButtonText};
  border-color: ${() => productColors.actionButtonBorder}
  background-color: ${() => productColors.actionButton};

  :hover {
    color: ${() => productColors.actionButtonHoverText};
    border-color: ${() => productColors.actionButtonHoverBorder}
    background-color: ${() => productColors.actionButtonHover}
  }
`;
const ProductLink = styled(Link)`
  color: ${() => productColors.link} !important;

  :hover {
    color: ${() => productColors.linkHover} !important;
  }
`;
const ProductAttributes = styled.div`
  margin-bottom: 15px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding-top: 5px;
  padding-bottom: 5px;
`;
/*
const ProductAttribute = styled.span`
  display: inline-block;
  width: ${props => props.width || '70px'};
  padding-top: 0;
  padding-bottom: 1px;
  padding-left: 0;
  padding-right: 0;
  margin-right: 5px;
  border: 1px solid transparent;
  border-radius: 2px;
  color: #fff;
  background: ${props => props.backgroundColor};
  font-weight: 700;
  text-transform: capitalize;
`;
const AttributeLabel = styled.small`
  display: block;
  background: #fff;
  color: #555;
`;
const AttributeValue = styled.span``;
*/
const ProductAttribute = styled.span`
  display: inline-block;
  width: ${props => props.width || '70px'};
  padding-top: 0;
  padding-bottom: 1px;
  padding-left: 0;
  padding-right: 0;
  margin-right: 5px;
  border: 1px solid transparent;
  border-radius: 5px;
  color: #fff;
  background: #999; /* ${props => props.backgroundColor} */
  font-weight: 700;
  text-transform: capitalize;
`;

/**
 * Should take a product object as prop,
 * and dispaly a summary of the product's details.
 *
 * It is not (should not be) responsible for fetching the product.
 * Its only job is to display a summary of supplied product.
 * Hence, we don't pass it the product ID.
 *
 * This is because the components that will use this component
 * (HomePage, CategoryPage, RelatedProducts, etc),
 * will usually be components that already have fetched the products,
 * and wish to display them as a list (using the productsList) component.
 * This component serves to display the summary
 * in a controlled and uniform manner.
 * Also, by using this component solely to display a product
 * (and not also for fetching the product),
 * we avoid having a componentDidMount()
 * that fetches the product over and over again
 * whenever we have to display the product,
 * e.g:
 * if we hide (ie, remove from the DOM) the component and then show it again.
 */
const ProductSummary = ({ product, addToCart, addToCartList }) => {
  const productStrings = strings.pages.product(product);
  const cartStrings = strings.pages.cart();
  const productPage = `/products/${product.id}`;
  const linkTitle = productStrings.linkTitle;

  const isAddingProductToCart = () => {
    const productKey = generateUniqueProductKey(product);

    // eslint-disable-next-line
    return (addToCartList.filter(prod =>
      generateUniqueProductKey(prod) === productKey)).length > 0;
  };

  return (
    <ProductContainer
      role={`product-${product.id}-summary`}
      title={`${product.name} (Brand: ${product.brand}, Category: ${product.category})`}>
      <ImageContainer>
        <ProductLink to={productPage} role={'product-image-link'}
          title={linkTitle}>
          <Image src={product.defaultImage.url}
            role="product-image"
            alt={`${product.name} image`}
            title={`${product.name} image`} />
        </ProductLink>
      </ImageContainer>
      <ProductTitle>
        <ProductLink to={productPage} role={'product-name-link'}
          title={linkTitle}>
          { /* eslint-disable-next-line */ }
          <span role="product-name">
            {product.name}
          </span>
        </ProductLink>
      </ProductTitle>
      <ProductAttributes>
        <ProductAttribute
          role="product-size"
          title={`Size: ${product.size}`}
          backgroundColor="#aae">
          {product.size}
        </ProductAttribute>
        &nbsp;
        <ProductAttribute
          role="product-color"
          title={`Color: ${product.color}`}
          backgroundColor={product.color}>
          {product.color}
        </ProductAttribute>
        <ProductAttribute backgroundColor="#900">
          {strings.currency.symbol}
          <span
            role="product-price" // eslint-disable-line
            title={`Price: ${product.price}`}>
            {product.price}
          </span>
        </ProductAttribute>
      </ProductAttributes>

      {isAddingProductToCart() && (
        <AddToCartButton
          role="add-to-cart-button"
          disabled={true}
          className="action-btn btn-processing">
          {cartStrings.addToCart.text}
        </AddToCartButton>
      )}
      {!isAddingProductToCart() && (
        <AddToCartButton
          title={cartStrings.addToCart.title}
          role="add-to-cart-button"
          className="action-btn"
          onClick={() => {
            addToCart(product, {
              color: product.color || 'any',
              size: product.size || 'any',
              quantity: 1,
            });
          }}>
          {cartStrings.addToCart.text}
        </AddToCartButton>
      )}
    </ProductContainer>
  );
};

ProductSummary.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    brand: PropTypes.string,
    color: PropTypes.string,
    category: PropTypes.string,
    defaultImage: PropTypes.shape({
      url: PropTypes.string,
    }),
    price: PropTypes.number,
    size: PropTypes.string,
  }),
  addToCart: PropTypes.func,
  addToCartList: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  addToCart: (product, { color, size, quantity }) =>
    dispatch(addProductToCart(product, { color, size, quantity })),
});

const mapStateToProps = createStructuredSelector({
  error: makeSelectAddProductToCartError(),
  addToCartList: makeSelectProductsBeingAddedToCart(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductSummary);
