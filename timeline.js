
setTimeout(function () {
  // reposition slider
  $('.tl-timenav-slider').css('left', $('.tl-menubar').width());
  moveMarker();
}, 1000);

function createMarker() {
  if ($('#tl-timenav-marker').length)
  {
    return $('#tl-timenav-marker');
  }
  var marker = $('.tl-timenav-item-container > div.tl-timemarker').first().clone();
  marker.attr('id', 'tl-timenav-marker').css({
    width: '5px',
    top: '5px',
    'background-color': '#F00',
  });
  marker.find('.tl-timemarker-content-container').remove();
  marker.find('.tl-timemarker-timespan-content').remove();
  $('.tl-timenav-item-container').prepend(marker);
  return marker;  
}

function moveMarker() {
  createMarker().css({
    left: timeline._timenav.timescale.getPosition(new Date().getTime())
  });
  goToNowSlide();
  setTimeout(moveMarker, 1000);
}

function goToNowSlide() {
  var now = TL.Date.makeDate(new Date());
  var current = timeline.getCurrentSlide().data;

  if (! (current.start_date instanceof TL.Date)) {
    timeline.goToNext();
    return goToNowSlide();    
  }

  // current slide is before now
  if (current.start_date.isBefore(now)
    && current.end_date.isBefore(now)) {
    timeline.goToNext();
    return goToNowSlide();
  }

  // current slide is after now
  if (current.start_date.isAfter(now)
    && current.end_date.isAfter(now)) {
    timeline.goToPrev();
    return goToNowSlide();
  }

  return true; // don't move
}
