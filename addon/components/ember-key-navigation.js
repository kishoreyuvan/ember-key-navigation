import Component from '@ember/component';
import layout from '../templates/components/ember-key-navigation';
import Evented from '@ember/object/evented';
import { scheduleOnce } from '@ember/runloop';

const KEYS = {
  ENTER: 13,
  DOWN_ARROW: 40,
  UP_ARROW: 38
};

function getOuterHeight(element) {
  let styles = window.getComputedStyle(element);
  let margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
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
  navigationItem : 'key-navigation-item',

  didInsertElement() {
    this._super(...arguments);
    if (this.focusInDefault) {
      this.element.focus();
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);
    if (this.model.length) {
      scheduleOnce('afterRender', this, 'setHighLightedItemProps');
    }
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
      this.trigger('on-select');
      return false;
    }

  },

  mouseMove() {
    // To avoid firing multiple events while scrolling.
    this.set('isKeyPressed', false);
  },

  gotoNext() {
    let highlightedIndex = this.highlightedIndex + 1;
    if (highlightedIndex < this.model.length) {
      this.setHighLightedItemProps(highlightedIndex);
    }
  },

  gotoPrevious() {
    let highlightedIndex = this.highlightedIndex - 1;
    if (highlightedIndex >= 0) {
      this.setHighLightedItemProps(highlightedIndex);
    }
  },

  setHighLightedItemProps(index = 0) {
    this.setProperties({
      isKeyPressed: true,
      highlightedIndex: index,
      highlightedItem: this.model[index]
    });
    this.scrollToVisible();
  },

  setHighLightedItem(item) {
    if (!this.isKeyPressed) {
      this.setHighLightedItemProps(this.model.indexOf(item));
    }
  },

  resetHighlightedItemProps() {
    this.setProperties({
      highlightedIndex: -1,
      highlightedItem: null
    });
  },

  scrollToVisible() {
    let { highlightedIndex } = this;
    let listElement =  this.element.querySelector('.navigation-list-container') || this.element;
    let highlightedElement = this.element.querySelectorAll('.navigation-item')[highlightedIndex];

    let listElementRect = listElement.getBoundingClientRect();
    let highlightedElementRect = highlightedElement.getBoundingClientRect();

    let listElementRectHeight = listElementRect.top + getOuterHeight(listElement);
    let highlightedElementRectHeight = highlightedElementRect.top + getOuterHeight(highlightedElement);
    // For scrollDown
    if (highlightedElementRectHeight > listElementRectHeight) {
      listElement.scrollTop = listElement.scrollTop + (highlightedElementRectHeight - listElementRectHeight);
    }
    // For scrollUp
    if (highlightedElementRect.top < listElementRect.top) {
      listElement.scrollTop = listElement.scrollTop + (highlightedElementRect.top - listElementRect.top);
    }
  }

});
