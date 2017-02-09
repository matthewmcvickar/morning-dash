var config = {
  // Available for free (after filling out a form) here:
  // https://developer.trimet.org/appid/registration
  trimetAPIKey: '',

  // Four-digit Trimet stop IDs.
  // Comma-separated without spaces, e.g.: 2042,5063,2159
  // https://trimet.org/ride/stop_select_form.html
  trimetStopIDs: '',

  // Dark Sky API.
  // https://darksky.net/dev
  darkSkyAPIKey: '',

  // Latitude/Longitude. Used for getting weather.
  // Comma-separated without spaces, e.g.: -68.5741796,77.9727334
  // https://mynasadata.larc.nasa.gov/latitudelongitude-finder/
  latitudeLongitude: '',

  // Refresh rates. Don't abuse the system! Trimet doesn't give a recommended
  // refresh rate, but any more 1 request than every 10 seconds seems excessive.
  // Forecast.io only allows 1000 requests every 24 hours, and the weather fore-
  // cast doesn't change that much, so take it easy.
  busRefreshSeconds: 30,
  forecastRefreshMinutes: 5,

  // Random image URL. Shows a random image every minute behind the 'Show
  // Arrivals' button. By default, uses the Unsplash.it API.
  // https://unsplash.it/
  randomImageURL: 'https://unsplash.it/g/635/748/?random&gravity=east'
};
