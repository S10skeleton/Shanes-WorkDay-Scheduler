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
  
  // Created a function to display current date and time using dayjs, 
  // and made sure current time updated every 10 Sec 
  // added CSS style to underline the current date/time and make it stand out.  
  
  function updateDateTime() {
    $('#currentDay').text(dayjs().format('dddd, MMMM D, h:mm A'));
    }

    updateDateTime();
    setInterval(updateDateTime, 10000); 
  

  // Created Code to Save events and also pull events from local storage upon reloading 
  function saveEvent(hour, eventText) {
    localStorage.setItem(hour, eventText);
  }

  function loadEvents() {
    $('.time-block').each(function() {
      var hour = $(this).attr('id');
      var eventText = localStorage.getItem(hour) || '';
      $(this).find('.description').val(eventText);
    });
  }

  loadEvents();

  $('.saveBtn').click(function() {
    var hour = $(this).closest('.time-block').attr('id');
    var eventText = $(this).siblings('.description').val();
    saveEvent(hour, eventText);
  });
          
          
          
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
        $(this).addClass('present').removeClass('past future');
      } else {
        $(this).addClass('future').removeClass('past present');
      }
    });
  }
// Set code to get current hour every 10 minuts 
  updateHourlyBlocks();

  setInterval(updateHourlyBlocks, 10000);

  // Added a seperate function to highlight the next appointment time in red if less than 60 min 
  function updateApptWarning() {
    var currentTime = dayjs();
    $('.Appt').each(function() {
      var apptTimeStr = $(this).attr('data-appt-time');
      var apptTime = dayjs().hour(parseInt(apptTimeStr.split(':')[0])).minute(parseInt(apptTimeStr.split(':')[1])); // Convert to day.js object
  
      if (currentTime.isBefore(apptTime) && apptTime.diff(currentTime, 'minute') <= 30) {
        $(this).css('background-color', 'red'); // Change CSS if current time is within 30 minutes before the appointment
      } else {
        $(this).css('background-color', ''); // Reset CSS if condition doesn't match
      }
    })
  }

   updateApptWarning();
    setInterval(updateApptWarning, 60000);
          
          
          
          // TODO: Add code to get any user input that was saved in localStorage and set
          // the values of the corresponding textarea elements. HINT: How can the id
          // attribute of each time-block be used to do this?
          //
          
          
          // TODO: Add code to display the current date in the header of the page.




});
 