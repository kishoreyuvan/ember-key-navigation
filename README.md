ember-key-navigation
==============================================================================

An EmberJS addon for keyboard navigation.

While working with autocomplete or any other results list components, we need to support keyboard navigation. So we can use this addon as wrapper for those components. 

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-key-navigation
```


Usage
------------------------------------------------------------------------------

* Ember Key Navigation component with input field and list of results.

``` handlebars
// template.hbs

<EmberKeyNavigation @model={{this.results}} as |navigationWrapper|>
  <div class="search-input">
    <Input @type="search" @autofocus=true @value={{this.search_text}} @autocomplete="off" @placeholder="Search" />
  </div>
  <div class="navigation-list-container">
    {{#each this.results as |result|}}
      {{navigationWrapper.item @model=result @onSelect=(action doStuff)}}
    {{/each}}
  </div>    
</EmberKeyNavigation>

```
Here, input field has `autofocus` attribute. So the keyboard events bubbles to `EmberKeyNavigation` component.
The class attribute `navigation-list-container` must be present as a container class for results.
The argument `onSelect` will trigger for keyEnter and click events.
`EmberKeyNavigation` component yields the nav item component `keyNavigationItem`.

* Ember Key Navigation component without input field and list of results.

``` handlebars
// template.hbs

<EmberKeyNavigation @focusInDefault=true class="navigation-list-container" @model={{this.results}} as |navigationWrapper|>
  {{#each this.results as |result|}}
    {{navigationWrapper.item @model=result @onSelect=(action doStuff)}}
  {{/each}}    
</EmberKeyNavigation>

```
Here,`focusInDefault` argument used to focus the wrapper component. 
The class `navigation-list-container` used as a container class for results.

* Ember Key Navigation component with written by own nav item component instead of `keyNavigationItem` component.

``` handlebars
// template.hbs

<EmberKeyNavigation @navigationItem='myOwnNavItem' @model={{this.results}} as |navigationWrapper|>
  <div class="search-input">
    <Input @type="search" @autofocus=true @value={{this.search_text}} @autocomplete="off" @placeholder="Search" />
  </div>
  <div class="navigation-list-container">
    {{#each this.results as |result|}}
      {{navigationWrapper.item @model=result @onSelect=(action doStuff)}}
    {{/each}}
  </div>    
</EmberKeyNavigation>

```
Your Own Nav Item component must be sub class of `keyNavigationItem` component.


``` js
// component.js

import NavItem from 'ember-key-navigation/components/key-navigation-item';

export default NavItem.extend({
  ...
});

```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
