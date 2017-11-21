import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { initParams } from '../actions/creator';

export default Route.extend({
  redux: inject(),

  queryParams: {
    showOnlyAvailable: {
      refreshModel: true
    }
  },

  model(params) {
    this.get('redux').dispatch(initParams(params));
  }
});