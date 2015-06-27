import DS from 'ember-data';

var Pairing = DS.Model.extend({
  beer: DS.attr('string'),
  topic: DS.attr('string')
});

Pairing.reopenClass({
  FIXTURES: []
});

export default Pairing;
