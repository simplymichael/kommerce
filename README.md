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
| **Name**                                        |  **Route**        |
|-------------------------------------------------|-------------------|
| [Home page](./src/pages/Home/index.js)          | `/`               |
| [Category Page](./src/pages/Category/index.js)  | `/categories/:id` |
| [Product Page](./src/pages/Product/index.js)    | `/products/:id`   |
| [Sign-in Page](./src/pages/Login/index.js)      | `/signin`         |
| [Sign-up Page](./src/pages/Register/index.js)   | `/signup`         |
| [Cart page](./src/pages/Cart/index.js)          | `/cart`           |
| [Checkout page](./src/pages/Checkout/index.js)  | `/checkout`       |
| [About us page](./src/pages/About/index.js)     | `/about`          |
| [Privacy page](./src/pages/Privacy/index.js)    | `/privacy`        |
| [FAQs page](./src/pages/Faq/index.js)           | `/faq`            |
| [Contact us page](./src/pages/Contact/index.js) | `/contact`        |


## Configuration
The project contains two configuration files:

- `src/config.js`: This file holds configuration information related to the business or webiste;
  values that are usually stable, and can be configured by non-developers.
  It contain such things as the business address and social media handles that hardly change.
- `src/.env.js`: This file holds configuration information that are dynamic, and environment-dependent.
  Values such as the user language (for determining which language files to load),
  and ports for the test server are stored in this file.

  To create this file, copy the `src/.env.example.js` file to `src/.env.js`, and modify the values as necessary.

## Contributing
### Steps for adding a new state item to the store

- If it relies on external data, you can mock the functionality by adding the data to the *src/__DATA__/api.json* file.
- If it relies on a service, add its service to the *src/services/* directory.
- Add its state handlers to the *src/store/* directory.
  For example, to add a *users* item to the store,
  you would create a directory named *users* under the *src/store/* directory.
  This directory will the files for managing users' state data via the store.
- Register it in the *src/store/sagas.js* file.
- Bind the component that uses the state to the store with the `connect` method
  of *react-redux*;
