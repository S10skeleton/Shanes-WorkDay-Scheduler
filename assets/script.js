$(function () {
  // Created a function to display current date and time using dayjs,
  // and made sure current time updated every 10 Sec
  // added CSS style to underline the current date/time and make it stand out.

  function updateDateTime() {
    $("#currentDay").text(dayjs().format("dddd, MMMM D, h:mm A"));
  }

  updateDateTime();
  setInterval(updateDateTime, 10000);

  // Created code to modify background color of scheduled events
  // to represent if the event is in the future, present, or the past
  // unsure of cause but .replace('hour-', '') wouldnt work so I switched
  // it to .substring(5) to remove potential conflicts and just count string length
  function updateHourlyBlocks() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").substring(5));
      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }
  // Set code to get current hour every 5 minuts
  updateHourlyBlocks();

  setInterval(updateHourlyBlocks, 50000);

  // Created Code to Save events and also pull events from local storage upon reloading
  function saveEvent(hour, eventText) {
    localStorage.setItem(hour, eventText);
  }

  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id");
      var eventText = localStorage.getItem(hour) || "";
      $(this).find(".description").val(eventText);
    });
  }

  loadEvents();

  $(".saveBtn").click(function () {
    var hour = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings(".description").val();
    saveEvent(hour, eventText);
  });

  // Added a seperate function to highlight the next appointment time in red if less than 10 min
  // to give visual warning that the current hour is almost up
  function updateApptWarning() {
    var currentTime = dayjs();
    $(".Appt").each(function () {
      var apptTimeStr = $(this).attr("data-appt-time");
      var apptTime = dayjs()
        .hour(parseInt(apptTimeStr.split(":")[0]))
        .minute(parseInt(apptTimeStr.split(":")[1]));

      if (
        currentTime.isBefore(apptTime) &&
        apptTime.diff(currentTime, "minute") <= 10
      ) {
        $(this).css("background-color", "red");
      } else {
        $(this).css("background-color", "");
      }
    });
  }

  updateApptWarning();
  setInterval(updateApptWarning, 60000);

  // Added a clear all button to reset for each new day 
  // if desired, prompt for confirmation and prompt when cleared 
  // Clear all appointments
  function clearAllAppointments() {
    var isConfirmed = confirm(
      "Are you sure you want to clear all appointments?"
    );

    if (isConfirmed) {
      localStorage.clear();
      $(".description").val("");
      alert("All appointments have been cleared!");
    }
  }

  $(".clearLocalStorage").click(function () {
    clearAllAppointments();
  });
});
