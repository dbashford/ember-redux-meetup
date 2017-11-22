import Route from '@ember/routing/route';
import inventory from './data';

export default Route.extend({
  queryParams: {
    showOnlyAvailable: {
      refreshModel: true
    }
  },

  model(params) {
    const resultIds = inventory
      .filter((item) => {
        if (params.showOnlyAvailable && item.inventoryCount <= 0) {
          return false;
        }
        return true;
      })
      .map((item) => {
        return item.id;
      });

    return {
      inventory,
      resultIds,
      showOnlyAvailable: !!params.showOnlyAvailable
    };
  }
});