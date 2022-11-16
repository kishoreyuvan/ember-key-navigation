/* eslint-disable ember/no-classic-components */
/* eslint-disable ember/require-tagless-components */
/* eslint-disable ember/no-classic-classes */
// BEGIN-SNIPPET demo2.js
import Component from '@ember/component';
import layout from '../templates/components/demo2';
import { countries } from 'dummy/utils/countrylist';

export default Component.extend({
  layout,
  showContextMenu: false,

  init() {
    this._super(...arguments);
    this.set('results', countries);
  },

  contextMenu() {
    this.toggleProperty('showContextMenu');
    return false;
  },

  doStuff(result) {
    alert(`Selected country is ${result}`);
  },
});
// END-SNIPPET
