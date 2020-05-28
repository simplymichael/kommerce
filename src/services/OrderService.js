import Service from './Service';

class OrderService extends Service {
  placeOrder(orderData = {}) {

    const {
      orderItems,
      orderSubTotal,
      orderGrandTotal,
      billingAddressData,
      paymentCardData,
      paymentMethod
    } = orderData;

    const orderDetails = {
      orderId,
      orderItems,
      orderSubTotal,
      orderGrandTotal,
      billingAddressData,
      paymentCardData,
      paymentMethod
    };

    const orderId = this._saveOrder(orderDetails);

    return new Promise((resolve, reject) => {
      Service.getService('CartService').emptyCart()
        .then(() => resolve(orderId))
        .catch(err => reject(err));
    });
  }

  getOrderDetails(orderId) {
    const orderDetails = localStorage.setItem(
      this._generateOrderKey(orderId));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(orderDetails);
      }, 1000);
    });
  }

  _saveOrder(orderDetails) {
    const orderId = Math.floor(Math.random() * 10);

    localStorage.setItem(
      this._generateOrderKey(orderId), JSON.stringify(orderDetails));

    return orderId;
  }

  _generateOrderKey(orderId) {
    return `localStore_${orderId}`;
  }
}

export default OrderService;
