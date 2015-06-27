import DS from 'ember-data';

var Meeting = DS.Model.extend({
  date: DS.attr('string'),
  location: DS.belongsTo('location', { async: true }),
  pairings: DS.hasMany('pairing', { async: true })
});


export default Meeting;
