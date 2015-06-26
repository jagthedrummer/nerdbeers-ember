import DS from 'ember-data';

var Meeting = DS.Model.extend({
  date: DS.attr('string'),
  location: DS.belongsTo('location', { async: true })
});


export default Meeting;
