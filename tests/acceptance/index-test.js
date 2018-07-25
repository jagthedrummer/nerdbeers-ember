import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'nerdbeers-ember/tests/helpers/start-app';
import stubAuth from '../helpers/authentication';

var application;

module('Acceptance: Index', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting / when signed out should prompt you to sign in', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('button:contains(Sign in with github)').length, 1);
  });
});

test('visiting / when signed in should not prompt you to sign in', function(assert) {
  stubAuth(application);
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('button:contains(Sign in with github)').length, 0);
    assert.equal(find('p:contains(Signed in as : testguy)').length, 1);
  });
});
