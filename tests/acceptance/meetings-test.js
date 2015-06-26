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

module('Acceptance: Meeting', {
  beforeEach: function() {
    application = startApp();
    defineFixturesFor('meeting', []);
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

test('visiting /meetings without data', function(assert) {
  visit('/meetings');

  andThen(function() {
    assert.equal(currentPath(), 'meetings.index');
    assert.equal(find('#blankslate').text().trim(), 'No Meetings found');
  });
});

test('visiting /meetings with data', function(assert) {
  defineFixturesFor('meeting', [{ id: 1, date: new Date(), location: 'MyString' }]);
  visit('/meetings');

  andThen(function() {
    assert.equal(currentPath(), 'meetings.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new meeting', function(assert) {
  visit('/meetings');
  click('a:contains(New Meeting)');

  andThen(function() {
    assert.equal(currentPath(), 'meetings.new');

    fillIn('label:contains(Date) input', new Date());
    fillIn('label:contains(Location) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing meeting', function(assert) {
  defineFixturesFor('meeting', [{ id: 1 }]);
  visit('/meetings');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'meetings.edit');

    fillIn('label:contains(Date) input', new Date());
    fillIn('label:contains(Location) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing meeting', function(assert) {
  defineFixturesFor('meeting', [{ id: 1, date: new Date(), location: 'MyString' }]);
  visit('/meetings');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'meetings.show');

    assert.equal(find('p strong:contains(Date:)').next().text(), new Date());
    assert.equal(find('p strong:contains(Location:)').next().text(), 'MyString');
  });
});

test('delete a meeting', function(assert) {
  defineFixturesFor('meeting', [{ id: 1, date: new Date(), location: 'MyString' }]);
  visit('/meetings');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'meetings.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
