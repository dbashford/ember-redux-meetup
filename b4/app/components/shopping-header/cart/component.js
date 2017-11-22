import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  viewCart: false,

  processedCart: computed('cartItems.@each.quantity', function() {
    let total = 0;
    const cartItems = this.get('cartItems').map((item) => {
      item.itemTotalCost = item.quantity * item.cost;
      total += item.itemTotalCost;
      return item;
    });

    return {
      total,
      cartItems
    };
  }),

  actions: {
    showCart() {
      this.toggleProperty('viewCart');
    },

    purchaseCart() {
      this.sendAction('purchaseCart');
      this.toggleProperty('viewCart');
    }
  }
});