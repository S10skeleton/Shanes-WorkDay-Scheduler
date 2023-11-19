          // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
          // the code isn't run until the browser has finished rendering all the elements
          // in the html.
$(function () {
          // TODO: Add a listener for click events on the save button. This code should
          // use the id in the containing time-block as a key to save the user input in
          // local storage. HINT: What does `this` reference in the click listener
          // function? How can DOM traversal be used to get the "hour-x" id of the
          // time-block containing the button that was clicked? How might the id be
          // useful when saving the description in local storage?
          //
          
          
          
          // TODO: Add code to apply the past, present, or future class to each time
          // block by comparing the id to the current hour. HINTS: How can the id
          // attribute of each time-block be used to conditionally add or remove the
          // past, present, and future classes? How can Day.js be used to get the
          // current hour in 24-hour time?
          //

  // Created code to modify background color of scheduled events 
  // to represent if the event is in the future or the past 
  function updateHourlyBlocks() {
    var currentHour = dayjs().hour();
    $('.time-block').each(function() {
      var blockHour = parseInt($(this).attr('id').replace('hour-'));
      if (blockHour < currentHour) {
        $(this).addClass('past').removeClass('present future');
      } else if (blockHour === currentHour) {
      } else {
        $(this).addClass('future').removeClass('past present');
      }
    });
  }
// Set code to get current hour every 10 minuts 
  updateHourlyBlocks();

  setInterval(updateHourlyBlocks, 600000);
          
          
          
          // TODO: Add code to get any user input that was saved in localStorage and set
          // the values of the corresponding textarea elements. HINT: How can the id
          // attribute of each time-block be used to do this?
          //
          
          
          // TODO: Add code to display the current date in the header of the page.

  // Created a function to display current date and time using dayjs, 
  // and made sure current time updated every 10 Sec 
  // added CSS style to underline the current date/time and make it stand out.  
  $(function () {
    function updateDateTime() {
    $('#currentDay').text(dayjs().format('dddd, MMMM D, h:mm A'))
    }
    updateDateTime();
    setInterval(updateDateTime, 10000); 
  });



});
 