// BEGIN-SNIPPET demo2.js
import Component from '@ember/component';
import layout from '../templates/components/demo2';
import { countries } from 'dummy/utils/countrylist';

export default Component.extend({
  layout,
  init() {
    this._super(...arguments);
    this.set('results', countries);
  },

  doStuff(result) {
    alert(`Selected country is ${result}`);
  }
});
 // END-SNIPPET
