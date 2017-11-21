import Component from '@ember/component';
import { computed } from '@ember/object';

const PAGE_SIZES = [5, 10, 25];

export default Component.extend({
  tagName: '',

  pageSizes: PAGE_SIZES,

  onFirstPage: computed('pageNumber', function() {
    return this.get('pageNumber') < 2;
  }),

  lastPageNumber: computed('pageSize', 'results', function() {
    const { pageSize, results } = this.getProperties('pageSize', 'results');
    return Math.ceil(results.length / pageSize);
  }),

  onLastPage: computed('pageNumber', 'lastPageNumber', function() {
    return this.get('pageNumber') >= this.get('lastPageNumber');
  }),

  actions: {
    first() {
      this.sendAction('updatePageNumber', 1);
    },
    previous() {
      this.sendAction('updatePageNumber', this.get('pageNumber') - 1);
    },
    next() {
      this.sendAction('updatePageNumber', this.get('pageNumber') + 1);
    },
    last() {
      this.sendAction('updatePageNumber', this.get('lastPageNumber'));
    },
    updatePageSize(val) {
      this.sendAction('updatePageSize', parseInt(val, 10));
      this.sendAction('updatePageNumber', 1);

    }
  }

});