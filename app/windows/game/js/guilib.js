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

  /* Controls */
  $('.building').on('click', function() {
    var target = $(this);
    var building = target.attr('data-building');

    if(typeof building == 'undefined') {
      $('.buildingContainer').toggleClass('list-show');
      $(this).toggleClass('buildinglist-selected');
    }
    else {
      $('.buildingContainer').removeClass('list-show');
      $('.buildinglist-selected').removeClass('buildinglist-selected');
      gui.showBuildingInfo(target);
    }
  });

  $('.buildingSlot').on('click', function(){
    var target = $(this);
    var building = target.attr('data-building');

    if(typeof building == 'undefined') {
      console.log('Budować?')
    }
    else {
      gui.showBuildingInfo(target);
    }
  });
}
