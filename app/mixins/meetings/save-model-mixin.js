import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    save: function() {
      var route = this;
      this.currentModel.save().then(function() {
        route.transitionTo('meetings');
      }, function() {
        console.log('Failed to save the model');
      });
    }
  },
  deactivate: function() {
    if (this.currentModel.get('isNew')) {
      this.currentModel.deleteRecord();
    } else {
      this.currentModel.rollback();
    }
  },
  afterModel : function(meeting){
    var _meeting = meeting;
    this.store.find('location').then(function(locations){
      _meeting.set('locations',locations);
    });
  }
});
