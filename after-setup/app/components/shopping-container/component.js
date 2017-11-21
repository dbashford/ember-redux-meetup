import Component from '@ember/component';
import { computed, set } from '@ember/object';

export default Component.extend({
  classNames: ['container'],

  // inputs
  inventory: null,
  resultIds: null,

  cart: [],

  results: computed('inventory', 'resultIds', function() {
    const { inventory, resultIds } = this.getProperties('inventory', 'resultIds');
    const fullResults = resultIds.map((id) => {
      return inventory.findBy('id', id);
    });
    return fullResults;
  }),

  // remove anything in a cart from the results
  availableResults: computed('results', 'cartItems.@each.quantity', function() {
    const cartItems = this.get('cartItems');

    const availableResults = this.get('results').map((result) => {
      let newResult = result;
      const cartItem = cartItems.findBy('id', result.id);
      if (cartItem) {
        newResult = {
          ...result,
          inventoryCount: result.inventoryCount - cartItem.quantity,
          countInCart: cartItem.quantity
        };
      }
      return newResult;
    });

    return availableResults;
  }),

  cartItems: computed('inventory', 'cart.@each.count', function() {
    const inventory = this.get('inventory');
    const cart = this.get('cart');
    const cartWithQuantity = cart.map((cartItem) => {
      return {
        ...inventory.findBy('id', cartItem.id),
        quantity: cartItem.count
      };
    });
    return cartWithQuantity;
  }),

  actions: {
    addToCart(id) {
      const cart = this.get('cart');
      const cartItem = cart.findBy('id', id);
      if (!cartItem) {
        cart.pushObject({ id, count: 1 });
      } else {
        set(cartItem, 'count', cartItem.count + 1);
      }
    },

    purchaseCart() {
      const cart = this.get('cart');
      const inventory = this.get('inventory').map((invItem) => {
        const cartItem = cart.findBy('id', invItem.id);
        if (cartItem) {
          invItem = {
            ...invItem,
            inventoryCount: invItem.inventoryCount - cartItem.count
          };
        }
        return invItem;
      });
      this.set('inventory', inventory);
      this.set('cart', []);
    }
  }
});