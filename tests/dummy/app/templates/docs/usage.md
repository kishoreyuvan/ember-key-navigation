# Usage

You can easily wrap any autocomplete, dropdown, or list item component with EmberKeyNavigation component.


{{#docs-snippet name='ex-template-usage.hbs' title="app/templates/components/nav-example.hbs"}} 
  
  <EmberKeyNavigation @model={{this.results}} as |navigationWrapper|>
    <div class="mb-1">
      <Input @class="form-control" @type="search" @autofocus={{true}} @value={{this.search_text}} @autocomplete="off" @placeholder="Search" />
    </div>
    <div class="navigation-list-container">
      {{#each this.results as |result|}}
        <navigationWrapper.item @model={{result}} @onSelect={{action doStuff}}>
          {{result}}
        </navigationWrapper.item>
      {{/each}}
    </div>
  </EmberKeyNavigation>
  
{{/docs-snippet}}


{{#docs-snippet name='ex-js-usage.hbs' title="app/templates/components/nav-example.js"}} 

import Component from '@ember/component';
import layout from '../templates/components/demo1';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  search_text: '',
  
  data: [
    'India', 
    'United States', 
    'United Kingdom',
     ...
  ],

  results: computed('search_text', 'data', function() {
    let searchText = this.search_text.toLowerCase();
    return this.data.filter((item) => item.toLowerCase().includes(searchText));
  }),

  doStuff(result) {
    alert(`Selected country is ${result}`);
  }
});
  
{{/docs-snippet}}

<br>
<div class="docs-text-large-5 hljs-strong my-3">Arguments</div>
<hr>

<section>
  <div class="docs-text-large-3 hljs-strong my-3">Component: EmberKeyNavigation</div>
  
  <div class="">
    <section class="my-4">
      <div class="docs-font-mono docs-text-large-2">
        <strong>model:</strong> <em>Array</em> (Required)
      </div>
      <div class="my-2">
        List of items. (Ex. autocomplete search results)
      </div>
    </section>
    <section class="my-4">
      <div class="docs-font-mono docs-text-large-2">
        <strong>focusInDefault:</strong> <em>Boolean</em> (Optional)
      </div>
      <div class="my-2">
        when <b>EmberKeyNavigation</b> is a wrapper for only list of items, the <b>focusInDefault</b> argument used to focus the container of list items.
        <br>
        Refer the <a href="#/docs/demos"><b>Example 2</b></a> under demo section.
        <br><br>
        <b>Note: </b> EmberKeyNavigation with input field doesn't need this argument.
      </div>
    </section>
    <section class="my-3">
      <div class="docs-font-mono docs-text-large-2">
        <strong>navigationItem:</strong> <em>String</em> (Optional)
      </div>
      <div class="my-2">
        In default, <b>EmberKeyNavigation</b> yields the <b>KeyNavigationItem</b> component as a nav item, If you want custom nav item, write your own nav item component as a sub class of <b>KeyNavigationItem</b> and pass it as a argument.
        <br>
        Refer the <a href="#/docs/demos"><b>Example 3</b></a> under demo section.
      </div>
    </section>
    <b>Note: </b> List items must be wrap inside the 'navigation-list-container' class.
  </div>
  
</section>

<section class="mt-5">
  <div class="docs-text-large-3 hljs-strong my-3">Component: KeyNavigationItem</div>
  
  <div class="">
    <section class="my-4">
      <div class="docs-font-mono docs-text-large-2">
        <strong>model</strong> (Required)
      </div>
      <div class="my-2">
        Each of item in the lists. It will be available as an argument for trigger action.
      </div>
    </section>
    <section class="my-4">
      <div class="docs-font-mono docs-text-large-2">
        <strong>onSelect:</strong> <em>Function</em> (Required)
      </div>
      <div class="my-2">
        Trigger action for click and keyEnter events.
      </div>
    </section>
  </div>
  
</section>
