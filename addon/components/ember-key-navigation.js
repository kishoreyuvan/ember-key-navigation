/* eslint-disable ember/no-component-lifecycle-hooks */
/* eslint-disable ember/require-tagless-components */
/* eslint-disable ember/no-classic-classes */
/* eslint-disable ember/no-classic-components */
import Component from '@ember/component';
import layout from '../templates/components/ember-key-navigation';
import Evented from '@ember/object/evented';
import { scheduleOnce } from '@ember/runloop';
import { isEmpty } from '@ember/utils';

const KEYS = {
  ENTER: 13,
  DOWN_ARROW: 40,
  UP_ARROW: 38,
};

function getOuterHeight(element) {
  let styles = window.getComputedStyle(element);
  let margin =
    parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
  return element.offsetHeight + margin;
}

export default Component.extend(Evented, {
  layout,
  attributeBindings: ['tabindex'],
  tabindex: -1,
  highlightedIndex: -1,
  highlightedItem: null,
  isKeyPressed: false,
  focusInDefault: false,
  navigationItem: 'key-navigation-item',
  disabledPath: null,

  didInsertElement() {
    this._super(...arguments);
    if (this.focusInDefault) {
      this.element.focus();
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);
    if (this.model.length && this._navItems !== this.model) {
      this._navItems = this.model;
      if (this.highlightedIndex >= 0) {
        scheduleOnce('afterRender', this, 'retainHighlightedIndex');
      } else {
        scheduleOnce('afterRender', this, 'highlightFirstNonDisabledItem');
      }
    }
  },

  retainHighlightedIndex() {
    let index = this.highlightedIndex;
    if (index >= 0 && index < this.model.length && !this.isItemDisabled(index)) {
      this.setHighLightedItemProps(index);
    } else {
      this.highlightFirstNonDisabledItem();
    }
  },

  highlightFirstNonDisabledItem() {
    this.set('highlightedIndex', -1);
    this.gotoNext();
  },

  keyDown(event) {
    let { keyCode } = event;

    if (keyCode === KEYS.DOWN_ARROW) {
      this.gotoNext();
      return false;
    }

    if (keyCode === KEYS.UP_ARROW) {
      this.gotoPrevious();
      return false;
    }

    if (keyCode === KEYS.ENTER) {
      if (!this.isItemDisabled(this.highlightedIndex)) {
        this.trigger('on-select');
      }
      return false;
    }
  },

  mouseMove() {
    // To avoid firing multiple events while scrolling.
    this.set('isKeyPressed', false);
  },

  isItemDisabled(index) {
    let item = this.model[index];
    if (!this.disabledPath || isEmpty(item)) {
      return false;
    }
    return Boolean(item[this.disabledPath]);
  },

  gotoNext() {
    let highlightedIndex = this.highlightedIndex + 1;
    while (highlightedIndex < this.model.length) {
      if (!this.isItemDisabled(highlightedIndex)) {
        this.setHighLightedItemProps(highlightedIndex);
        return;
      }
      highlightedIndex++;
    }
  },

  gotoPrevious() {
    let highlightedIndex = this.highlightedIndex - 1;
    while (highlightedIndex >= 0) {
      if (!this.isItemDisabled(highlightedIndex)) {
        this.setHighLightedItemProps(highlightedIndex);
        return;
      }
      highlightedIndex--;
    }
  },

  setHighLightedItemProps(index = 0) {
    this.setProperties({
      isKeyPressed: true,
      highlightedIndex: index,
      highlightedItem: this.model[index],
    });
    this.scrollToVisible();
  },

  setHighLightedItem(item) {
    if (!this.isKeyPressed) {
      this.setHighLightedItemProps(this.model.indexOf(item));
    }
  },

  scrollToVisible() {
    let { highlightedIndex } = this;
    let listElement =
      this.element.querySelector('.navigation-list-container') || this.element;
    let highlightedElement =
      this.element.querySelectorAll('.navigation-item')[highlightedIndex];

    let listElementRect = listElement.getBoundingClientRect();
    let highlightedElementRect =
      highlightedElement && highlightedElement.getBoundingClientRect();

    let listElementRectHeight =
      listElementRect.top + getOuterHeight(listElement);
    let highlightedElementRectHeight =
      highlightedElementRect.top + getOuterHeight(highlightedElement);
    // For scrollDown
    if (highlightedElementRectHeight > listElementRectHeight) {
      listElement.scrollTop =
        listElement.scrollTop +
        (highlightedElementRectHeight - listElementRectHeight);
    }
    // For scrollUp
    if (highlightedElementRect.top < listElementRect.top) {
      listElement.scrollTop =
        listElement.scrollTop +
        (highlightedElementRect.top - listElementRect.top);
    }
  },
});
