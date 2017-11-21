import Component from '@ember/component';
import { inject } from '@ember/service';
import { connect } from 'ember-redux';
import { firstPage } from '../../actions/creator';

const stateToComputed = (state) => ({
  showOnlyAvailable: state.shop.showOnlyAvailable
});

const dispatchToActions = {
  firstPage
};

const Filters = Component.extend({
  tagName: '',

  router: inject(),
  actions: {
    toggleOnlyAvailable() {
      this.send('firstPage');
      const showOnlyAvailable = !this.get('showOnlyAvailable');
      this.get('router').transitionTo({
        queryParams: {
          showOnlyAvailable: showOnlyAvailable ? true : undefined
        }
      });
    }
  }
});

export default connect(stateToComputed, dispatchToActions)(Filters);