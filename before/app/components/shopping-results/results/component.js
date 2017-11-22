import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  pageOfResults: computed('results', 'pageSize', 'pageNumber', function() {
    const { pageSize, pageNumber, results } =
      this.getProperties('pageSize', 'pageNumber', 'results');
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize > results.length ? results.length : start + pageSize;
    return results.slice(start, end);
  })

});