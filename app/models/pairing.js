import DS from 'ember-data';

var Pairing = DS.Model.extend({
  beer: DS.attr('string'),
  topic: DS.attr('string'),
  meeting: DS.belongsTo('meeting', { async: true })
});

export default Pairing;
