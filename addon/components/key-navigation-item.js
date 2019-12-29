import Component from '@ember/component';
import layout from '../templates/components/key-navigation-item';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNameBindings: [':navigation-item', 'isActive:active'],
  isActive: computed('highlightedItem', 'model', function() {
    return this.highlightedItem === this.model;
  }),

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
    if(this.onSelect) {
      this.onSelect(this.model);
    }
  },

  click() {
    this.onOptionSelected();
  },

  willDestroyElement() {
    this.navigationWrapper.off('on-select', this, 'onOptionSelected');
    this._super(...arguments);
  }
});
