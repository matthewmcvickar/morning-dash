'use strict';

// Load libraries.
var skycons = new Skycons;

// Make sure configuration is set:
if (typeof(config) === 'undefined') {
  console.log('You need to create a config.js file and fill it in!');
}

// Fill things in.
$(document).ready(function() {

  // Set today's date.
  $('.today-date').html(moment().format('dddd<br>MMMM Do<br>YYYY'));

  // Get bus updates every 30 seconds (10*1000).
  setInterval(getUpcomingBusses, config.busRefreshSeconds * 1000);

  // Get weather updates every 5 minutes (1000*60*5).
  setInterval(getForecast, config.forecastRefreshMinutes * 1000 * 60);

});

// Show a progress bar for the next bus reset.
animateRefreshBar();
function animateRefreshBar () {
  $('.refresh-bar').html('').append('<div class="refresh-bar-progress"></div>');
}

// Get upcoming bus arrivals.
getUpcomingBusses();
function getUpcomingBusses () {

  // Clear out existing arrivals.
  $('.arrivals').removeClass('populated');

  // Wait one second for the previous arrivals to be faded out.
  setTimeout(function() {

    // Restart progess bar.
    animateRefreshBar();

    // Empty out existing arrivals.
    $('.arrivals').html('');

    // Make API request.
    var url = 'http://developer.trimet.org/ws/v2/arrivals?locIDs=' + config.trimetStopIDs + '&appID=' + config.trimetAPIKey;

    $.getJSON(url, function(data) {

        var arrivals = data.resultSet.arrival;

        console.log('Trimet arrivals:', arrivals);

        for (var i = 0; i < 4; i++) {

          // Get the route.
          var route = arrivals[i].route;

          // If an estimate is available.
          if (('estimated' in arrivals[i])) {
            var time = moment(arrivals[i].estimated).subtract(1, 'minutes'),
                time = moment(time).fromNow('mm'),
                timeType = 'estimated';
          }

          // Otherwise, show the scheduled time.
          else {
            var time = moment(arrivals[i].scheduled).subtract(1, 'minutes'),
                time = moment(time).fromNow('mm'),
                timeType = 'scheduled';
          }

          // Show 'NOW' if the bus is arriving now.
          if (time === '1sec') {
            var time = 'now',
                timeType = 'now';
          }

          // Build output.
          var output =
            '<div class="arrival">' +
              '<span class="arrival-route route-' + route + '"><span>' + route + '</span></span>' +
              '<span class="arrival-from-now time-' + timeType + '">' + time + '</span>'
            '</div>';

          // Populate arrivals.
          $('.arrivals').append(output);

          // Wait enough time for arrivals to populate before fading them in.
          setTimeout(function () {
            $('.arrivals').addClass('populated');
          }, 100);

        }

      }).fail(function () {

        console.log('ERROR', data);

      }).always(function () {

        console.log('Trimet API request complete.');

      });

  }, 500);

}

// Get weather.
getForecast();
function getForecast () {
  $('.weather [data-target="weather"]').html('');

  $.ajax({
    url: 'https://api.forecast.io/forecast/' + config.forecastAPIKey + '/' + config.latitudeLongitude,
    dataType: 'jsonp',
    success: function(data) {

      console.log('Forecast:', data);
      console.log('Forecast.io API request complete.');

      var tempNow  = Math.ceil(data.currently.temperature),
          tempLow  = Math.ceil(data.daily.data[0].temperatureMin),
          tempHigh = Math.ceil(data.daily.data[0].temperatureMax),
          summary  = data.daily.data[0].summary,
          iconNow  = data.daily.data[0].icon;

      // Populate text.
      $('.weather-temp-now').append(tempNow);
      $('.weather-temp-low').append(tempLow);
      $('.weather-temp-high').append(tempHigh);
      $('.weather-summary').append(summary);

      // Make icon.
      skycons.set('weather-icon', iconNow);
      skycons.play();
    },
    error: function (error) {

      console.log('ERROR', error);

    }
  });
}

// Customize Moment strings.
moment.updateLocale('en', {
  relativeTime : {
    future: 'in %s',
    past:   '%s ago',
    s:  '1sec',
    m:  '1min',
    mm: '%dmin',
    h:  '1hr',
    hh: '%dhrs'
  }
});