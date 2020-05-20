# Kommerce

Responsive E-commerce store front, made with React.

## [Requirements Document](./requirements.md)

## Tech
- React
- React-Bootstrap
- Styled Components

## Available Features
- Clean and responsive interface, plays well on Laptop, tablet and mobile phone devices
- Pre-nav
    - login and registration links
    - Smart cart link
        - displays a count of the unique products in the cart,
        - click to navigate to cart page
- Top Navigation
    - category links
    - search form
- Footer
    - Contact information
    - Social media links
    - Recent products listing
    - Copyright info

## Routes
| **Name**                                       |  **Route**        |
|------------------------------------------------|-------------------|
| [Home page](./src/pages/Home/index.js)         | `/`               |
| [Category Page](./src/pages/Category/index.js) | `/categories/:id` |
| [Product Page](./src/pages/Product/index.js)   | `/products/:id`   |
| [Sign-in Page](./src/pages/Login/index.js)     | `/signin`         |
| [Sign-up Page](./src/pages/Register/index.js)  | `/signup`         |
| [Cart page](./src/pages/Cart/index.js)         | `/cart`           |
| [Checkout page](./src/pages/Checkout/index.js) | `/checkout`       |
