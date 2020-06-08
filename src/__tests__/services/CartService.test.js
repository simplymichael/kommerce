import { cleanup } from '@testing-library/react';
import Service from '../../services/Service';
import CartService from '../../services/CartService';
import UserService from '../../services/UserService';

let cartService = null;
const timeout = 10000;
const products = [
  { id: 1, name: 'Test product 1', color: 'white', size: 'XL' },
  { id: 2, name: 'Test product 2', color: 'black', size: 'L' },
  { id: 3, name: 'Test product 3', color: 'blue', size: 'M' },
];

beforeEach(() => {
  cartService = Service.getService('CartService');
});

afterEach(cleanup);

describe('CartService', () => {
  it('is an instance of the "Service" class', () => {
    expect(cartService).toBeInstanceOf(Service);
    expect(cartService).toBeInstanceOf(CartService);
    expect(cartService).not.toBeInstanceOf(UserService);
  });

  describe('addItemsToCart()', () => {
    it('adds the specified item to the cart', async () => {
      jest.setTimeout(timeout);
      expect(await cartService.countItemsInCart()).toBe(0);

      await cartService.addToCart(products.slice(0, 1), 1);

      expect(await cartService.countItemsInCart()).toBe(1);

      await cartService.emptyCart();
    });

    it('adds the item and specified quantity to the cart', async () => {
      jest.setTimeout(timeout + 5000);
      expect(await cartService.countItemsInCart()).toBe(0);

      await cartService.addToCart(products.slice(0, 1), 1);

      expect(await cartService.countItemsInCart()).toBe(1);

      await cartService.emptyCart();

      await cartService.addToCart(products.slice(0, 1), 2);

      expect(await cartService.countItemsInCart()).toBe(2);

      await cartService.emptyCart();
    });

    it('returns the items currently in the cart', async () => {
      jest.setTimeout(timeout);
      let itemsInCart = await cartService.getItemsInCart();
      const addedProduct = products.slice(0, 1);
      expect(Array.isArray(itemsInCart)).toBe(true);
      expect(itemsInCart.length).toBe(0);

      await cartService.addToCart(addedProduct, 1);

      itemsInCart = await cartService.getItemsInCart();
      expect(itemsInCart.length).toBe(1);

      const cartItem = itemsInCart.slice(0, 1);

      ['id', 'name', 'color', 'size'].forEach(key => {
        expect(cartItem[key]).toEqual(addedProduct[key]);
      });

      await cartService.emptyCart();
    });
  });

  describe('countItemsInCart()', () => {
    it('returns zero (0) when no items have been added to cart', async () => {
      const itemsCount = await cartService.countItemsInCart();

      expect(itemsCount).toBe(0);
    });

    it('returns the actual count of items added to the cart', async () => {
      jest.setTimeout(timeout);
      await cartService.addToCart(products.slice(0, 1), 1);
      let itemsCount = await cartService.countItemsInCart();

      expect(itemsCount).toEqual(1);

      await cartService.emptyCart();

      await cartService.addToCart(products.slice(1, 1), 2);

      itemsCount = await cartService.countItemsInCart();

      expect(itemsCount).toEqual(2);

      await cartService.emptyCart();
    });
  });
});
