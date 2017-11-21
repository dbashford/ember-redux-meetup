import Component from '@ember/component';
import { connect } from 'ember-redux';
import { pageOfResults } from '../../../reducers/selectors';

const stateToComputed = (state) => ({
  pageOfResults: pageOfResults(state)
});

const Results = Component.extend({});

export default connect(stateToComputed)(Results);