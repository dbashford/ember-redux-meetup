import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import inventory from './data';
import * as ACTIONS from '../actions/types';

const initialState = Immutable.from({
  inventory,
  showOnlyAvailable: false,
  cart: [],
  pageSize: 5,
  pageNumber: 1
});

export default handleActions({
  [ACTIONS.INIT_PARAMS]: (state, { payload }) => {
    return state.set('showOnlyAvailable', payload.showOnlyAvailable);
  },

  [ACTIONS.ADD_TO_CART]: (state, { payload: { id } }) => {
    const matchingCartItem = state.cart.filter((item) => item.id === id);
    let cart;
    if (matchingCartItem.length > 0) {
      const cartItem = matchingCartItem[0];
      // if item already in cart, then update the count
      const updatedCartItem = cartItem.set('count', cartItem.count + 1);
      // then filter item out and add it back
      cart = state.cart
        .filter((item) => item.id !== id)
        .concat(updatedCartItem);
    } else {
      cart = state.cart.concat({ id, count: 1 });
    }
    return state.set('cart', cart);
  },

  [ACTIONS.PURCHASE_CART]: (state) => {
    const { cart, inventory } = state;
    const newInventory = inventory.map((invItem) => {
      const cartItem = cart.filter((item) => item.id === invItem.id);
      // if matching cart item, then update inventory count, deducting
      // quantity that was purchased
      if (cartItem.length > 0) {
        invItem = invItem.set('inventoryCount', invItem.inventoryCount - cartItem[0].count);
      }
      return invItem;
    });
    return state.merge({ inventory: newInventory, cart: [] });
  },

  [ACTIONS.UPDATE_PAGE_SIZE]: (state, { payload }) => {
    return state.set('pageSize', payload);
  },

  [ACTIONS.UPDATE_PAGE_NUMBER]: (state, { payload }) => {
    return state.set('pageNumber', payload);
  }

}, initialState);