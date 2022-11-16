import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember-key-navigation', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('results', ['India', 'Usa', 'Japan']);

    await render(hbs`
      <EmberKeyNavigation @model=results as |navigationWrapper|>
        {{#each results as |result|}}
          <navigationWrapper.item @model=result>
            {{result}}
          </navigationWrapper.item>
        {{/each}}
      </EmberKeyNavigation>
    `);

    assert.ok(this.element.textContent.trim().includes('India'));
    assert.ok(this.element.textContent.trim().includes('Usa'));
    assert.ok(this.element.textContent.trim().includes('Japan'));
  });
});
