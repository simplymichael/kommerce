import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import colors from '../../resources/colors';
import strings from '../../resources/strings';

const productColors = colors.product;
const ProductContainer = styled.div`
  border-radius: 5px;
  padding: 7px;
  text-align: center;
  margin-bottom: 30px;
  border: 1px solid ${() => productColors.borderColor};
  background: ${() => productColors.backgroundColor};

  :hover {
    /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    -webkit-box-shadow: 3px 3px 5px 6px ${() => productColors.shadowColor};

    /* Firefox 3.5 - 3.6 */
    -moz-box-shadow: 3px 3px 5px 6px ${() => productColors.shadowColor};

    /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
    box-shadow: 3px 3px 5px 6px ${() => productColors.shadowColor};
  }
`;
const ImageContainer = styled.div`
  padding: 15px;
  margin: auto;
  background: ${() => productColors.imageBackgroundColor};
`;
const Image = styled.img`
  border-radius: 3px;
  width: 100%;
  vertical-align: middle;
  border-style: none;
`;
const ProductTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 18px;
  padding: 5px;
  color: ${() => productColors.textColor};
`;
const AddToCartButton = styled(Button)`
  border-radius: .25rem;
  color: ${() => productColors.actionButtonTextColor};
  border-color: ${() => productColors.actionButtonBorderColor}
  background-color: ${() => productColors.actionButtonColor};

  :hover {
    color: ${() => productColors.actionButtonHoverTextColor};
    border-color: ${() => productColors.actionButtonHoverBorderColor}
    background-color: ${() => productColors.actionButtonHoverColor}
  }
`;
const ProductLink = styled(Link)`
  color: ${() => productColors.linkColor} !important;

  :hover {
    color: ${() => productColors.linkHoverColor} !important;
  }
`;
const ProductAttributes = styled.div`
  margin-bottom: 15px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding-top: 5px;
  padding-bottom: 5px;
`;
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
 * This component serves to display the summary in a controlled and uniform manner.
 * Also, by using this component solely to display a product
 * (and not also for fetching the product),
 * we avoid having a componentDidMount()
 * that fetches the product over and over again whenever we have to display the product,
 * e.g: if we hide (ie, remove from the DOM) the parent and then show it again.
 */
const ProductSummary = ({ product, addToCart }) => {
  const productPage = `/products/${product.id}`;
  const linkTitle = 'Click to go to product detail page';

  return (
    <ProductContainer role={`product-${product.id}-summary`}>
      <ImageContainer>
        <ProductLink to={productPage} role={'product-image-link'}
          title={linkTitle}>
          <Image src={product.defaultImage.url}
            alt={`${product.name} image`}
            title={`${product.name} image`} />
        </ProductLink>
      </ImageContainer>
      <ProductTitle>
        <ProductLink to={productPage} role={'product-name-link'}
          title={linkTitle}>
          {product.name}
        </ProductLink>
      </ProductTitle>

      <ProductAttributes>
        <ProductAttribute width="100%" title={`Brand: ${product.brand}`}
          backgroundColor="violet">
          <AttributeLabel>Brand</AttributeLabel>
          <AttributeValue role="attribute-brand">
            {product.brand}
          </AttributeValue>
        </ProductAttribute>
      </ProductAttributes>

      <ProductAttributes>
        <ProductAttribute title={`Size: ${product.size}`}
          backgroundColor="#aae">
          <AttributeLabel>Size</AttributeLabel>
          <AttributeValue role="attribute-size">
            {product.size}
          </AttributeValue>
        </ProductAttribute>
        <ProductAttribute title={`Color: ${product.color}`}
          backgroundColor={product.color}>
          <AttributeLabel>Color</AttributeLabel>
          <AttributeValue role="attribute-color">
            {product.color}
          </AttributeValue>
        </ProductAttribute>
        <ProductAttribute title={`Price: ${product.price}`}
          backgroundColor="#900">
          <AttributeLabel>
            Price ({strings.currency.symbol})
          </AttributeLabel>
          <AttributeValue role="attribute-price">
            {product.price}
          </AttributeValue>
        </ProductAttribute>
      </ProductAttributes>

      <AddToCartButton role="add-to-cart-button" onClick={() => {
        addToCart(product, {
          color: product.color || 'any',
          size: product.size || 'any',
          quantity: 1,
        });
      }}>
      Add to cart
      </AddToCartButton>
    </ProductContainer>
  );
};

ProductSummary.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    brand: PropTypes.string,
    color: PropTypes.string,
    defaultImage: PropTypes.shape({
      url: PropTypes.string,
    }),
    price: PropTypes.number,
    size: PropTypes.string,
  }),
  addToCart: PropTypes.func,
};

export default ProductSummary;
