// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  $('form').submit(function(event) {
    event.preventDefault();
    var dateInput = $('input').val();
    $.post('/time_input?' + $.param({date: dateInput}), function(x) {
      if(x)
      {
        $('<li></li>').text(x).appendTo('ul#dates');      
      }
      $('input').val('');
      $('input').focus();
    });
  });

});
