import DS from 'ember-data';

var Location = DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),
  url: DS.attr('string')
});


export default Location;
