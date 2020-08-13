$(document).ready(function () {

  $('#tweettextID').on('keyup', function () {
    let $counter = $(this).siblings('div').children('.counter');
    $counter.text(`${140 - $(this).val().length}`);
    if (Number($counter.text()) >= 0) {
      $counter.css('color', 'black');
    } else {
      $counter.css('color', 'red');
    }
  });

});
