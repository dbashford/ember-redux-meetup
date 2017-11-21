import { createSelector } from 'reselect';

const _inventory = (state) => state.shop.inventory;
const _showOnlyAvailable = (state) => state.shop.showOnlyAvailable;
const _cart = (state) => state.shop.cart;
const _pageSize = (state) => state.shop.pageSize;
const _pageNumber = (state) => state.shop.pageNumber;

const _getResults = createSelector(
  [_inventory, _showOnlyAvailable],
  (inventory, showOnlyAvailable) => {
    if (!showOnlyAvailable) {
      return inventory;
    }

    return inventory.filter((item) => {
      return item.inventoryCount > 0;
    });
  }
);

export const getCartItems = createSelector(
  [_inventory, _cart],
  (inventory, cart) => {
    return cart.map((cartItem) => {
      const inventoryItem = inventory.find((item) => item.id === cartItem.id);
      return {
        ...inventoryItem,
        quantity: cartItem.count,
        itemTotalCost: cartItem.count * inventoryItem.cost
      };
    });
  }
);

export const getCartTotal = createSelector(
  [getCartItems],
  (cartItems) => {
    return cartItems.reduce((prev, item) => {
      return prev + item.itemTotalCost;
    }, 0);
  }
);

export const getAvailableResults = createSelector(
  [_getResults, getCartItems],
  (results, cartItems) => {
    return results.map((result) => {
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
  }
);

export const numberOfResults = createSelector(
  [getAvailableResults],
  (results) => results.length
);

export const pageOfResults = createSelector(
  [getAvailableResults, _pageSize, _pageNumber],
  (results, pageSize, pageNumber) => {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize > results.length ? results.length : start + pageSize;
    return results.slice(start, end);
  }
);

export const lastPageNumber = createSelector(
  [_pageSize, numberOfResults],
  (pageSize, numberOfResults) => {
    return Math.ceil(numberOfResults / pageSize);
  }
);

export const onFirstPage = createSelector(
  [_pageNumber],
  (pageNumber) => pageNumber === 1
);

export const onLastPage = createSelector(
  [_pageNumber, lastPageNumber],
  (pageNumber, lastPageNumber) => pageNumber === lastPageNumber
);