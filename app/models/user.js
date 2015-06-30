import DS from 'ember-data';

var User = DS.Model.extend({
  handle: DS.attr()
});

User.reopenClass({
  FIXTURES: []
});

export default User;
