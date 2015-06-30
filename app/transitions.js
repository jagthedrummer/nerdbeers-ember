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
}
