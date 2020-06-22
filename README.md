# Kommerce
[![Travis (.com)](https://img.shields.io/travis/com/simplymichael/kommerce)](https://travis-ci.com/github/simplymichael/kommerce)
[![Codecov](https://img.shields.io/codecov/c/github/simplymichael/kommerce)](https://codecov.io/gh/simplymichael/kommerce)

Responsive E-commerce store front, made with React.

### Home page
![Home page image](https://imgur.com/sicPgIC.png)

---

### Product details page
![Product details page image](https://imgur.com/mRiLzLK.png)

---

### Cart page
![Cart page image](https://imgur.com/NR88aHi.png)

---

### Checkout page
![Checkout page image](https://imgur.com/gz1oj2N.png)

---

## Tech
- [React](https://www.npmjs.com/package/create-react-app)
- [React-Bootstrap](https://www.npmjs.com/package/react-bootstrap)
- [React Router](https://www.npmjs.com/package/react-router-dom)
- [Styled Components](https://www.npmjs.com/package/styled-components)
- [JSON-server](https://www.npmjs.com/package/json-server)

## Available Features
- Clean and responsive interface, plays well on Laptop, tablet and smartphone devices
- List products in store (Home page)
- List products by categories (Product Category page)
- Filter products by brand, color, size, and price range
- Full-text searching of products
- Display details of a selected product (Product page)
- Display product reviews (Product page)
- "Add product review" form with 5-star rating
- Add item to cart
- Remove item from cart
- Increase or decrease quantity of given item in cart
- Specify product Color and Size while adding item to cart
- View items in cart (Cart page)
- Clear (empty) items in cart (Cart page)
- Smart cart link detects when products have been added to the cart,
  and displays a count of the unique products in the cart, allowing navigation to the cart
- Checkout page with billing address, payment method, and order review and checkout sections
- Credit Card or Paypal payment options
- Signup and Signin pages
- Demo API server

## Page sections
- Pre-nav
    - Login and registration links
    - Search form
    - Smart cart link
        - displays a count of the unique products in the cart,
        - click to navigate to cart page
- Top Navigation
    - category links
- Page body (with Sidebar and Main content sections)
- Footer
    - Contact information
    - Social media links
    - Recent products listing
    - Copyright info

## Routes
| **Name**                                        |  **Route**            |
|-------------------------------------------------|-----------------------|
| [Home page](./src/pages/Home/index.js)          | `/`                   |
| [Category Page](./src/pages/Category/index.js)  | `/categories/:id`     |
| [Search Page](./src/pages/Search/index.js)      | `/search?query=<str>` |
| [Product Page](./src/pages/Product/index.js)    | `/products/:id`       |
| [Sign-in Page](./src/pages/Login/index.js)      | `/signin`             |
| [Sign-up Page](./src/pages/Register/index.js)   | `/signup`             |
| [Cart page](./src/pages/Cart/index.js)          | `/cart`               |
| [Checkout page](./src/pages/Checkout/index.js)  | `/checkout`           |

## Running
This project uses [run-script-os](https://www.npmjs.com/package/run-script-os)
to ensure a consistent npm scripts interface on both Windows and Unix systems.

To run the application in development mode, run the following on the command line:

`npm run dev`

Executing this command will do the following:

- start the development API server listening port 3001
- run the `react-scripts start` and serve the frontend app on port 3000

To specify an alternate port (8080, for example) for the frontend react app,
run instead with the following command:

`set port=8080 && npm run dev`.

 See the **API Server** section for how to specify an alternate port for the development API server.

 **Note**: When you execute the `npm run dev` command on Windows systems, it will start a new ***CMD*** window.
 You will have to keep this window open for the API server to stay running and serving API requests made from the frontend.

## API Server
The development API server runs [json-server](https://www.npmjs.com/package/json-server) on port 3001 by default.
To use a different port, copy `src/dev-server/.env.example.js` to `src/dev-server/.env.js`, and change `host.port` to the desired port number.

### Restarting the API Server
If the server is mistakenly stopped, it can be restarted by running: `npm run serve`.


## Configuration
The project uses three configuration files:

- `src/.config.js`: This file holds configuration information related to the business or webiste;
  values that are usually stable, and can be configured by non-developers.
  It contain such things as the business address and social media handles that hardly change.
  To create this file, copy the `src/.config.example.js` file to `src/.config.js`, and modify the values as necessary.

- `src/.env.js`: This file holds configuration information that are dynamic, and environment-dependent.
  Values such as the user language (for determining which language files to load),
  and ports for the API server are stored in this file.
  To create this file, copy the `src/.env.example.js` file to `src/.env.js`, and modify the values as necessary.

- `src/dev-server/.env.js`: This file holds configuration information for the accompanying dev API server  for testing the application.
  To create this file, copy the `src/dev-server/.env.example.js` to `src/dev-server/.env.js` and edit the values as necessary.

**Note**: The `api.port` port number inside `src/.env.js` must match the `host.port` in the `src/dev-server/.env.js` file.
This is as expected.

- The `api.port` key of the `src/.env.js` file allows you configure the port number of the API server.
- The `host.port` key of the `src/dev-server/.env.` allows you to configure the port on which the API server should run.

## Contributing
### Adding a new page

- Create a new directory with the name of the page in the `src/pages/` directory.
- Register it in the `src/pages/index.js` file.

### Adding a new state item to the store

- If it relies on external data, you can create a dev mock of the data as follows:
    - Add the data to the *src/__DATA__/<resourceType>.json* file
    - Import the file into the *src/__DATA__/api.js* file.
- If it relies on a service, add its service to the *src/services/* directory.
- Add its state handlers to the *src/store/* directory.
  For example, to add a *users* item to the store, you would create a directory named *users* under the *src/store/* directory.
  This directory will contain the files for managing users' state data via the store.
- Register it in the *src/store/sagas.js* file.
- Bind the component that uses the state to the store with the `connect` method of *react-redux*;

## Acknowledgements

- The data for countries and states is taken from this [gist](https://gist.github.com/ebaranov/41bf38fdb1a2cb19a781)
  by [Eugene Baranov](https://gist.github.com/ebaranov)
- The demo shop images are taken from [unsplash](https://unsplash.com).
  They were posted by the following users:
    - [Revolt](https://unsplash.com/@revolt)
    - [Paul Gaudriault](https://unsplash.com/@pl_gt)
    - [Irene Kredenets](https://unsplash.com/@ikredenets)
    - [Mohammad Metri](https://unsplash.com/@mohammadmetri)
    - [Alexandra Gorn](https://unsplash.com/@alexagorn)
    - [Wengang Zhai](https://unsplash.com/@wgzhai)
    - [Malvestida Magazine](https://unsplash.com/@malvestida)
    - [Md Salman](https://unsplash.com/@mohammadsalman)
    - [Alex Haigh](https://unsplash.com/@kiikiiosaka)
    - [Nicolas J Leclercq](https://unsplash.com/@nicolasjleclercq)
    - [Patrik Michalicka](https://unsplash.com/@patrikmichalicka)
    - [Gunnar Sigurðarson](https://unsplash.com/@sigurdarson)
    - [Malte Wingen](https://unsplash.com/@maltewingen)
    - [Álvaro Bernal](https://unsplash.com/@abn)
    - [David Švihovec](https://unsplash.com/@iamdavid_10)
    - [Muhannad Ajjan](https://unsplash.com/@isword)
