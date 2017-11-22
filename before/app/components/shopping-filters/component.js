import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  router: inject(),
  tagName: '',
  showOnlyAvailable: false,
  actions: {
    toggleOnlyAvailable() {
      const showOnlyAvailable = !this.get('showOnlyAvailable');
      this.get('router').transitionTo({
        queryParams: {
          showOnlyAvailable: showOnlyAvailable ? true : undefined
        }
      });
    }
  }
});