## Desired Features:

### Look and feel
- Nice looking and responsive interface, plays well on Laptop, tablet and mobile phone screens

### Global elements
- **Top Navigation**:
  - Smart cart link:
    - detects when products have been added to the cart,
    - displays a count of the unique products in the cart,
    - click to navigate to cart page
  - search form
  - login and registration links
- **Footer**:
  - Social media links
  - Display most recent products

### Pages
- **Home**: List products in store with "add to cart" buttons
- **Product category**: List products in category with "add to cart" buttons
  - **Product sub-category**: List products by sub-category when on a given product category page
- **Product details**: Display details of a selected product
  - product reviews (with 5-star rating) on the product details page
  - "Add product review" form with 5-star rating
  - Add item to cart: Specify product Color and Size while adding item to cart
  - Remove item from cart
  - Increase or decrease quantity of given item in cart
- **Login**: Display login form
- **Register**: Display registration form
- **Cart**: Display Cart details
  - View items in cart
  - Remove item from cart
  - Clear (empty) items in cart
- **Checkout**: Display checkout form and order review
    - customer primary details
    - billing address
    - payment method,
    - order review,
    - checkout button
    - payment options: Paypal or Credit Card

### Features on products listing pages (Home, Product (sub) Category)
- Filter displayed products by Brand, Color, Price, Size

## Routes
|------------------------------------------------|-------------------|
| **Name**                                       |  **Route**        |
|------------------------------------------------|-------------------|
| [Home page](./src/pages/Home/index.js)         | `/`               |
| [Category Page](./src/pages/Category/index.js) | `/categories/:id` |
| [Product Page](./src/pages/Product/index.js)   | `/products/:id`   |
| [Sign-in Page](./src/pages/Login/index.js)     | `/signin`         |
| [Sign-up Page](./src/pages/Register/index.js)  | `/signup`         |
| [Cart page](./src/pages/Cart/index.js)         | `/cart`           |
| [Checkout page](./src/pages/Checkout/index.js) | `/checkout`       |
