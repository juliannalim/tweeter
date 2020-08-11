$(document).ready(function () {
  // --- our code goes here ---
  // console.log(this);

  $('#tweettextID').on('keyup', function () {
    // console.log(this.value);
    let $counter = $(this).siblings('div').children('.counter');
    // let numOfLetter = 140 - $counter.val().length;
    // console.log(numOfLetter);
    $counter.text(`${140 - $(this).val().length}`);
    console.log($(this).val().length);
    if (Number($counter.text()) >= 0) {
      $counter.css('color', 'black');
    } else {
      $counter.css('color', 'red');
    }
  });

});
