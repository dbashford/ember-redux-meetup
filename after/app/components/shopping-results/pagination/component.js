import Component from '@ember/component';
import { connect } from 'ember-redux';
import { onFirstPage, onLastPage } from '../../../reducers/selectors';
import {
  updatePageSize,
  firstPage,
  previousPage,
  nextPage,
  lastPage
} from '../../../actions/creator';

const stateToComputed = (state) => ({
  pageSize: state.shop.pageSize,
  onFirstPage: onFirstPage(state),
  onLastPage: onLastPage(state)
});

const dispatchToActions = {
  updatePageSize,
  firstPage,
  previousPage,
  nextPage,
  lastPage
};

const PAGE_SIZES = [5, 10, 25];

const Paginator = Component.extend({
  tagName: '',
  pageSizes: PAGE_SIZES
});

export default connect(stateToComputed, dispatchToActions)(Paginator);