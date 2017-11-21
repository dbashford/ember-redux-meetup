import Component from '@ember/component';
import { computed } from '@ember/object';
import { connect } from 'ember-redux';
import { numberOfResults } from '../../../reducers/selectors';

const stateToComputed = (state) => ({
  numberOfResults: numberOfResults(state),
  pageSize: state.shop.pageSize,
  pageNumber: state.shop.pageNumber
});

const ResultHeader = Component.extend({
  pagingLabel: computed('pageSize', 'pageNumber', function() {
    const { pageSize, pageNumber, numberOfResults } =
      this.getProperties('pageSize', 'pageNumber', 'numberOfResults');
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize > numberOfResults ? numberOfResults : start + pageSize;
    return `${start + 1} to ${end}`;
  })
});

export default connect(stateToComputed)(ResultHeader);