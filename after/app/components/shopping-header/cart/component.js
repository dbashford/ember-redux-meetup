import Component from '@ember/component';
import { connect } from 'ember-redux';
import { purchaseCart } from '../../../actions/creator';
import { getCartItems, getCartTotal } from '../../../reducers/selectors';

const stateToComputed = (state) => ({
  cartItems: getCartItems(state),
  cartTotal: getCartTotal(state)
});

const dispatchToActions = {
  purchaseCart
};

const Cart = Component.extend({
  tagName: '',
  viewCart: false,

  actions: {
    showCart() {
      this.toggleProperty('viewCart');
    },

    cartPurchase() {
      this.set('viewCart', false);
      this.send('purchaseCart');
    }
  }
});

export default connect(stateToComputed, dispatchToActions)(Cart);