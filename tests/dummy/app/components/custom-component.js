import layout from '../templates/components/custom-component';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  formattedCountryName: computed('model', function() {
    let countryCode = this.model.slice(0, 2).toUpperCase();
    return `${this.model} - ${countryCode}`;
  })
});
