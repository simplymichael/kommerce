import React from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import ProductSummary from './ProductSummary';

/**
 * Displays List of products
 * Accepted props:
 * - products (required): array of (product) objects
 * - container (optional):
 *      the container to hold each product rendered in the "renderer" component.
 *      Default is the (bootstrap) Col.
 * - weight (optional; values: 1 - 12):
 *      lets us specify the (relative) width of each product
 *      displayed in the list (via the Col component),
 *      useful especially when you don't specify a "container" prop.
 * - renderer (optional): defines the component for rendering each product;
 *      This component holds the product details (name, image, etc),
 *      as well as the "add-to-cart" button.
 *      the component receives the product to render.
 *      The default renderer is the ProductSummary component
 *
 * When rendering the products with the default ProductSummary component
 * (ie, when "renderer" props is not specified),
 * each product object - in the supplied props.products collection -
 * must have the properties:
 * - id,
 * - name
 * - defaultImageUrl
 *
 * NOTE: if you specify a custom renderer,
 * you need to implement the functionality for adding the product to cart
 * on click of the add-to-cart-button.
 * See the ProductSummary component for an example implementation.
 */
const ProductsList = ({ products, container, weight, renderer }) => {
  const containerWeight = weight || '3';
  const ProductContainer = container || Col;
  const ProcessorComponent = renderer || ProductSummary;

  return products.map(product => (
    <ProductContainer key={product.id} md={containerWeight}>
      <ProcessorComponent product={product} />
    </ProductContainer>
  ));
};

ProductsList.propTypes = {
  products: PropTypes.array,
  container: PropTypes.node,
  weight: PropTypes.string,
  renderer: PropTypes.node,
};

export default ProductsList;
