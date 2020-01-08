# ember-key-navigation

[![npm version](https://badge.fury.io/js/ember-key-navigation.svg)](https://www.npmjs.com/package/ember-key-navigation)
[![GitHub license](https://img.shields.io/github/license/kishoreyuvan/ember-key-navigation.svg)](https://github.com/kishoreyuvan/ember-key-navigation/blob/master/LICENSE.md)
[![Build Status](https://travis-ci.com/kishoreyuvan/ember-key-navigation.svg?branch=master)](https://travis-ci.com/kishoreyuvan/ember-key-navigation)

A Simple EmberJS Addon that supports keyboard navigation inside the list.

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

* Ember Key Navigation component with list of results.

``` handlebars
// template.hbs

<EmberKeyNavigation @focusInDefault={{true}} class="navigation-list-container" @model={{this.countries}} as |navigationWrapper|>
  {{#each this.countries as |country|}}
    <navigationWrapper.item @model={{country}} @onSelect={{action doStuff}}>
      {{country}}
    </navigationWrapper.item>
  {{/each}}    
</EmberKeyNavigation>

```

``` js
// *.js

countries: [
  'India', 
  'United States', 
  'United Kingdom',
   ...
]
  
doStuff(result) {
  alert(`Selected country is ${result}`);
}

```

Helpful Links
------------------------------------------------------------------------------
[Live Demo](https://kishoreyuvan.github.io/ember-key-navigation)


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
