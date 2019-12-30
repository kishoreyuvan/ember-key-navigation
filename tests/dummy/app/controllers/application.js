import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    showDemo(no) {
      this.set('currentDemo', no);
    }
  }
})
