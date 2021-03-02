import Component from '@ember/component';
import layout from '../templates/components/key-navigation-item';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNameBindings: [':navigation-item', 'activeClass'],
  isActive: computed('highlightedItem', 'model', function() {
    return this.highlightedItem === this.model;
  }),
  activeClass: computed('isActive', 'activeItemClass', function() {
    return this.isActive ? this.activeItemClass : '';
  }),
  activeItemClass: 'active',

  didUpdateAttrs() {
    this._super(...arguments);
    if (this.isActive) {
      this.navigationWrapper.on('on-select', this, 'onOptionSelected');
    } else {
      this.navigationWrapper.off('on-select', this, 'onOptionSelected');
    }
  },

  mouseEnter() {
    this.setHighLightedItem(this.model);
  },

  onOptionSelected() {
    this.onSelect(this.model);
  },

  click() {
    this.onOptionSelected();
  },

  willDestroyElement() {
    if (this.isActive) {
      this.navigationWrapper.off('on-select', this, 'onOptionSelected');
    }
    this._super(...arguments);
  }
});
