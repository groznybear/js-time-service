// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  $.get('/dreams', function(dreams) {
    console.log('client :: ' + dreams);
  });
  
  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val();
    $.post('/time_input?' + $.param({dream: dream}), function(x) {
      if(x)
      {
        $('<li></li>').text(x).appendTo('ul#dreams');      
      }
      $('input').val('');
      $('input').focus();
    });
  });

});
