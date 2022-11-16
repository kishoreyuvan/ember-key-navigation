// BEGIN-SNIPPET myOwnNavItem.js
import layout from '../templates/components/myOwnNavItem';
import NavItem from 'ember-key-navigation/components/key-navigation-item';
import { computed } from '@ember/object';

export default NavItem.extend({
  layout,
  formattedCountryName: computed('model', function () {
    let countryCode = this.model.slice(0, 2).toUpperCase();
    return `${this.model} - ${countryCode}`;
  }),

  onOptionSelected() {
    alert(`Selected country is ${this.formattedCountryName}`);
  },
});
// END-SNIPPET
