import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  pageSize: null,
  pageNumber: null,
  results: null,

  pagingLabel: computed('pageSize', 'pageNumber', function() {
    const { pageSize, pageNumber, results } =
      this.getProperties('pageSize', 'pageNumber', 'results');
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize > results.length ? results.length : start + pageSize;
    return `${start + 1} to ${end}`;
  }),

  resultTotal: computed('results', function() {
    return this.get('results').length;
  })
});