import Component from '@ember/component';
import layout from '../templates/components/demo1';
import { computed } from '@ember/object';
import { countries } from 'dummy/utils/countrylist';

export default Component.extend({
  layout,
  search_text: '',

  results: computed('search_text', 'data', function() {
    let searchText = this.search_text.toLowerCase();
    return this.data.filter((item) => item.toLowerCase().includes(searchText));
  }),

  init() {
    this._super(...arguments);
    this.set('data', countries);
  },

  doStuff(result) {
    alert(`Selected country is ${result}`);
  }
});
