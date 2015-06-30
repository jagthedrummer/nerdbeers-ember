import Ember from 'ember';

export default function stubAuth(application) {
  application.__container__.unregister('torii:session');
  application.register('torii:session', {
    open: function(){
      return new Ember.RSVP.Promise(function(resolve, reject){
        resolve({userId:'123', accessToken:'12345'});
      });
    },
    fetch: function(){
      return new Ember.RSVP.Promise(function(resolve, reject){
        resolve({userId:'123', accessToken:'12345'});
      });
    },
    isAuthenticated: function(){
      return true;
    }
  }, {instantiate: false});
}
