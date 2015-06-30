import Ember from "ember";

export default Ember.Object.extend({
  open: function(authorization) {
    console.log('open',authorization);
    // This is what should be done after authentication. As an example, I'm
    // finding current user here.
    let store = this.get("container").lookup("store:main");

    return new Ember.RSVP.Promise((resolve) => {
      return store.find("user", authorization.uid).then(function(user){
        Ember.run.bind(null, resolve({currentUser: user}));
      }, () => {
        store.recordForId('user', authorization.uid).unloadRecord(); // remove the unresolved record
        let newUser = store.createRecord("user", {
          id: authorization.uid,
          handle: this._handleFor(authorization)
        });

        newUser.save().then(function(user) {
          Ember.run.bind(null, resolve({currentUser: user}));
        });
      });
    });
  },

  fetch: function() {
    console.log('fetch');
    // This is what should be done to determin how to fetch a session. Here I am
    // retrieving the auth from firebase and checking if I have a user for that
    // auth. If so, I set currentUser.
    let firebase = this.get("container").lookup("adapter:application").firebase;
    let authData = firebase.getAuth();
    let store = this.get("container").lookup("store:main");

    return new Ember.RSVP.Promise(function(resolve, reject) {
      if(authData) {
        console.log('fetch authData = ',authData);
        store.find("user", authData.uid).then(function(user) {
          console.log('hey we found a user',user);
          Ember.run.bind(null, resolve({currentUser: user}));
        }, function() {
          console.log('hmm no session 1');
          Ember.run.bind(null, reject("no session"));
        });
      } else {
        console.log('hmm no session 2');
        Ember.run.bind(null, reject("no session"));
      }
    });
  },

  close: function() {
    console.log('close');
    // This is what should be done to teardown a session. Here I am unloading my
    // models and setting currentUser to null.
    let firebase = this.get("container").lookup("adapter:application").firebase;
    let store = this.get("container").lookup("store:main");

    return new Ember.RSVP.Promise(function(resolve) {
      store.unloadAll("user");
      //store.unloadAll("message");
      firebase.unauth();
      resolve({currentUser: null});
    });
  },

  _handleFor: function(authorization) {
    if(authorization.github) {
      return authorization.github.username;
    } else if(authorization.facebook) {
      return authorization.facebook.displayName;
    } else if(authorization.twitter) {
      return authorization.twitter.displayName;
    } else if(authorization.google) {
      return authorization.google.displayName;
    } else {
      throw new Error("couldn't find a username!");
    }
  }
});
