import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

function defineFixturesFor(name, fixtures) {
  var modelClass = application.__container__.lookupFactory('model:' + name);
  modelClass.FIXTURES = fixtures;
}

module('Acceptance: Pairing', {
  beforeEach: function() {
    application = startApp();
    defineFixturesFor('pairing', []);
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /pairings without data', function(assert) {
  visit('/pairings');

  andThen(function() {
    assert.equal(currentPath(), 'pairings.index');
    assert.equal(find('#blankslate').text().trim(), 'No Pairings found');
  });
});

test('visiting /pairings with data', function(assert) {
  defineFixturesFor('pairing', [{ id: 1, beer: 'MyString', topic: 'MyString' }]);
  visit('/pairings');

  andThen(function() {
    assert.equal(currentPath(), 'pairings.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new pairing', function(assert) {
  visit('/pairings');
  click('a:contains(New Pairing)');

  andThen(function() {
    assert.equal(currentPath(), 'pairings.new');

    fillIn('label:contains(Beer) input', 'MyString');
    fillIn('label:contains(Topic) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing pairing', function(assert) {
  defineFixturesFor('pairing', [{ id: 1 }]);
  visit('/pairings');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'pairings.edit');

    fillIn('label:contains(Beer) input', 'MyString');
    fillIn('label:contains(Topic) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing pairing', function(assert) {
  defineFixturesFor('pairing', [{ id: 1, beer: 'MyString', topic: 'MyString' }]);
  visit('/pairings');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'pairings.show');

    assert.equal(find('p strong:contains(Beer:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Topic:)').next().text(), 'MyString');
  });
});

test('delete a pairing', function(assert) {
  defineFixturesFor('pairing', [{ id: 1, beer: 'MyString', topic: 'MyString' }]);
  visit('/pairings');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'pairings.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
