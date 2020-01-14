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
  
  countries: [
    'India', 
    'United States', 
    'United Kingdom',
     ...
  ],

  doStuff(result) {
    alert(`Selected country is ${result}`);
  }
  
{{/docs-snippet}}
