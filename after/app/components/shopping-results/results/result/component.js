import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import { connect } from 'ember-redux';
import { addToCart } from '../../../../actions/creator';

const dispatchToActions = {
  addToCart
};

const Result = Component.extend({
  classNames: ['single-result'],

  isDiscontinued: equal('result.inventoryCount', -1),
  isOutOfStock: equal('result.inventoryCount', 0),
  isLowInventory: computed('result.inventoryCount', function() {
    const inv = this.get('result.inventoryCount');
    return inv > 0 && inv < 4;
  }),
  isAvailable: computed('result.inventoryCount', function() {
    const inv = this.get('result.inventoryCount');
    return inv > 0;
  })
});

export default connect(null, dispatchToActions)(Result);