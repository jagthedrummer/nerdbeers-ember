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

module('Acceptance: Location', {
  beforeEach: function() {
    application = startApp();
    defineFixturesFor('location', []);
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

test('visiting /locations without data', function(assert) {
  visit('/locations');

  andThen(function() {
    assert.equal(currentPath(), 'locations.index');
    assert.equal(find('#blankslate').text().trim(), 'No Locations found');
  });
});

test('visiting /locations with data', function(assert) {
  defineFixturesFor('location', [{ id: 1, name: 'MyString', address: 'MyString', url: 'MyString' }]);
  visit('/locations');

  andThen(function() {
    assert.equal(currentPath(), 'locations.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new location', function(assert) {
  visit('/locations');
  click('a:contains(New Location)');

  andThen(function() {
    assert.equal(currentPath(), 'locations.new');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Address) input', 'MyString');
    fillIn('label:contains(Url) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing location', function(assert) {
  defineFixturesFor('location', [{ id: 1 }]);
  visit('/locations');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'locations.edit');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Address) input', 'MyString');
    fillIn('label:contains(Url) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing location', function(assert) {
  defineFixturesFor('location', [{ id: 1, name: 'MyString', address: 'MyString', url: 'MyString' }]);
  visit('/locations');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'locations.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Address:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Url:)').next().text(), 'MyString');
  });
});

test('delete a location', function(assert) {
  defineFixturesFor('location', [{ id: 1, name: 'MyString', address: 'MyString', url: 'MyString' }]);
  visit('/locations');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'locations.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
