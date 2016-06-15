function _gui() {
  this.showBuildingInfo = function(target){
    var building = target.attr('data-building');

    if(typeof $('.building-selected') != 'undefined') {
      if($('.building-selected').attr('data-building') == target.attr('data-building')) {
        target.removeClass('building-selected');
      }
      else {
        $('.building-selected').removeClass('building-selected');
        target.addClass('building-selected');
      }
    }

    if(typeof $('.building-selected').attr('data-building') == 'undefined') {
      $('.buildingInformation').removeClass('info-show');
    }
    else {
      $('.buildingInformation').addClass('info-show');
    }
  }

  this.buildingClick = function(target) {
    if(target.hasClass('building')){
      var building = target.attr('data-building');

      if(typeof building == 'undefined') {
        $('.buildingContainer').toggleClass('list-show');
        target.toggleClass('buildinglist-selected');
      }
      else {
        $('.buildingContainer').removeClass('list-show');
        $('.buildinglist-selected').removeClass('buildinglist-selected');
        gui.showBuildingInfo(target);
      }
    }
    else if(target.hasClass('buildingSlot')){
      var building = target.attr('data-building');

      if(typeof building == 'undefined') {
        console.log('Budować?')
      }
      else {
        gui.showBuildingInfo(target);
      }
    }
  }
}
