import Service from './Service';

class CartService extends Service {
  constructor(cartName = 'shoppingCart') {
    super();

    this.cartName = cartName;
  }

  addToCart(product, quantity) {
    const productKey = this._generateProductKey(product);
    const cart = JSON.parse(localStorage.getItem(this.cartName)) || {};
    const existingProduct = cart[productKey];
    let storageData = {};

    // If product already exists in cart,
    // just increment the quantity by the new quantity specified
    if(existingProduct) {
      const existingQuantity = parseInt(existingProduct.quantity);
      storageData = {
        ...existingProduct,
        quantity: existingQuantity + parseInt(quantity)
      };
    } else {
      storageData = {
        ...product,
        quantity: parseInt(quantity)
      };
    }

    if(storageData.quantity < 1 || Number.isNaN(storageData.quantity)) {
      storageData.quantity = 1;
    }

    cart[productKey] = storageData;

    this._persistCart(cart);

    return this.getItemsInCart();
  }

  removeFromCart(product) {
    const cart = JSON.parse(localStorage.getItem(this.cartName));

    if(cart) {
      const productKey = this._generateProductKey(product);
      delete cart[productKey];
      this._persistCart(cart);
    }

    return this.getItemsInCart();
  }

  getItemsInCart() {
    const cart = JSON.parse(localStorage.getItem(this.cartName) || '{}');
    const data = [];
    // const route = { url: '/cart', method: 'get', isProtected: false };

    for(let x in cart) {
      if(cart.hasOwnProperty(x)) { //eslint-disable-line
        data.push(cart[x]);
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  }

  async getCartPrice () {
    const items = await this.getItemsInCart();
    const priceTotal = items.slice().reduce((total, item) => {
      return total + parseFloat(item.price) * parseInt(item.quantity);
    }, 0).toPrecision(4);

    return new Promise((resolve) => {
      setTimeout(() => resolve({
        subTotal: priceTotal,
        grandTotal: priceTotal,
      }), 1000);
    });
  }

  async countItemsInCart() {
    const items = await this.getItemsInCart();
    const count = items.reduce((acc, item) => {
      acc += item.quantity;
      return acc;
    }, 0);

    return new Promise((resolve) => {
      setTimeout(() => resolve(count), 1000);
    });
  }

  emptyCart() {
    localStorage.removeItem(this.cartName);

    return this.getItemsInCart();
  }

  _generateProductKey(product) {
    const { id, color, size } = product;
    return `product_${id}_${color}_${size}`;
  }

  _persistCart(cart) {
    localStorage.setItem(this.cartName, JSON.stringify(cart));
  }
}

export default CartService;
