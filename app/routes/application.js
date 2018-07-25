import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    this.get("session").fetch().catch(function() {
      //console.log('fetchData = ',fetchData);
      //console.log('session.content',this.get("session.content"));
    });
    console.log('session.content',this.get("session.content"));
  },

  actions: {
    signIn: function(authWith) {
      this.get("session").open("firebase", { authWith: authWith});
    },

    logout: function() {
      this.get("session").close();
    }
  }

});
