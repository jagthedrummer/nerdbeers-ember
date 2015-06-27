import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    save: function() {
      var route = this;
      var promises = [];
      this.currentModel.get('pairings').forEach(function(pairing){
        promises.push(pairing.save());
      });
      Ember.RSVP.all(promises).then(function(){
        route.currentModel.save().then(function() {
          route.transitionTo('meetings');
        }, function() {
          console.log('Failed to save the model');
        });
      },function(error){
        console.log('failed saving some pairings',error);
      });
        
    },
    newPairing: function(){
      var pairing = this.store.createRecord('pairing');
      this.currentModel.get('pairings').addObject(pairing);
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
