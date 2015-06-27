import config from '../config/environment';
import DS from 'ember-data';
import Firebase from 'firebase';
import FirebaseAdapter from 'emberfire/adapters/firebase';


var ApplicationAdapter;

if(config.environment === "test"){
  ApplicationAdapter = DS.FixtureAdapter.extend();
} else {
  ApplicationAdapter = FirebaseAdapter.extend({
    firebase: new Firebase(config.firebase)
  });
}

export default ApplicationAdapter;




