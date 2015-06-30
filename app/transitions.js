export default function(){
  this.transition(
    this.fromRoute('index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.toRoute(['locations.index','meetings.index','pairings.index']),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  var _this = this;
  ['locations','meetings','pairings','users'].forEach(function(modelName){
    _this.transition(
      _this.fromRoute(modelName + '.index'),
      _this.toRoute(function(routeName){ return (new RegExp('^'+modelName+'\.', 'gi')).test(routeName); }),
      _this.use('toLeft'),
      _this.reverse('toRight')
    );
  });
  /*
  this.transition(
    this.fromRoute('locations.index'),
    this.toRoute(function(routeName){ return /^locations\./.test(routeName); }),
    this.use('toLeft'),
    this.reverse('toRight'),
    this.debug()
  );
  */
}
