import Ember from 'ember';

export default function stubAuth(application) {



  
  var sessionData = {userId:'123', accessToken:'12345', currentUser: { handle : 'testguy'}};
  var currentUser = { handle : 'testguy'};

  var session = application.__container__.lookup('torii:session');
  var sm = session.get('stateMachine');
  Ember.run(function() {
    sm.transitionTo('authenticated');
    session.set('content.currentUser', currentUser);
  });


  /*
  application.__container__.unregister('torii:session');
  var stubSession = Ember.Object.create({
    open: function(){
      return new Ember.RSVP.Promise(function(resolve, reject){
        resolve(sessionData);
      });
    },
    fetch: function(){
      return new Ember.RSVP.Promise(function(resolve, reject){
        resolve(sessionData);
      });
    },
    isAuthenticated : true,
  });
  stubSession.setProperties(sessionData);
  application.register('torii:session', stubSession, {instantiate: false});
  */
}
