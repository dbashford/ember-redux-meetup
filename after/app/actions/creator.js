import * as ACTIONS from './types';
import { onFirstPage, onLastPage, lastPageNumber } from '../reducers/selectors';

export const initParams = (params) => ({
  type: ACTIONS.INIT_PARAMS,
  payload: {
    showOnlyAvailable: !!params.showOnlyAvailable
  }
});

export const addToCart = ({ id }) => ({
  type: ACTIONS.ADD_TO_CART,
  payload: {
    id
  }
});

export const purchaseCart = () => ({
  type: ACTIONS.PURCHASE_CART
});

export const updatePageSize = (_pageSize) => {
  return (dispatch) => {
    const pageSize = parseInt(_pageSize, 10);
    dispatch({
      type: ACTIONS.UPDATE_PAGE_SIZE,
      payload: pageSize
    });
    dispatch(_updatePageNumber(1));
  };
};

const _updatePageNumber = (pageNumber) => ({
  type: ACTIONS.UPDATE_PAGE_NUMBER,
  payload: pageNumber
});

export const firstPage = () => {
  return _updatePageNumber(1);
};

export const previousPage = () => {
  return (dispatch, getState) => {
    if (!onFirstPage(getState())) {
      const newPageNumber = getState().shop.pageNumber - 1;
      dispatch(_updatePageNumber(newPageNumber));
    }
  };
};

export const nextPage = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (!onLastPage(state)) {
      const newPageNumber = state.shop.pageNumber + 1;
      dispatch(_updatePageNumber(newPageNumber));
    }
  };
};

export const lastPage = () => {
  return (dispatch, getState) => {
    const lastPage = lastPageNumber(getState());
    dispatch(_updatePageNumber(lastPage));
  };
};