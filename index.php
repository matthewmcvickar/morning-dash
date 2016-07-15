<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="shortcut icon" href="img/favicon.png">
  <link rel="icon" href="img/favicon.png" sizes="16x16" type="image/png">
  <link rel="icon" href="img/favicon.png" sizes="32x32" type="image/png">
  <link rel="icon" href="img/favicon.png" sizes="48x48" type="image/png">
  <link rel="icon" href="img/favicon.png" sizes="62x62" type="image/png">
  <link rel="icon" href="img/favicon.png" sizes="192x192" type="image/png">

  <link rel="apple-touch-icon" href="img/favicon.png">
  <link rel="apple-touch-icon-precomposed" href="img/favicon.png">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Morning Dash">

  <link rel="stylesheet" href="style.css">

  <title>Morning Dash</title>

</head>

<body>

<?php
function get_svg($name) {
  echo '<span class="icon icon-' . $name . '">';
  include('img/' . $name . '.svg');
  echo '</span>';
}
?>

<div class="site-container">

  <div class="left-column">
    <div class="arrivals-overlay">
      <div class="arrivals-start-button">Show Busses</div>
    </div>
    <div class="arrivals"></div>
    <div class="refresh-bar"></div>
    <a class="refresh-button" href="./"><?php get_svg('refresh'); ?></a>
  </div>

  <div class="right-column">
    <div class="clock"><?php echo date('g:i'); ?><span><?php echo date('s'); ?></span></div>
    <h1 class="today-date"><?php echo date('N, F d') ?></h1>

    <div class="weather">
      <div data-target="weather" class="weather-temp-now">…</div>
      <div class="weather-temp-high-and-low">
        <div class="weather-temp-low-container"><?php get_svg('arrow-down'); ?><span data-target="weather" class="weather-temp-low">…</span></div>
        <div class="weather-temp-high-container"><?php get_svg('arrow-up'); ?><span data-target="weather" class="weather-temp-high">…</span></div>
      </div>
      <div class="weather-icon-container"><canvas id="weather-icon" width="128" height="128"></canvas></div>
      <div data-target="weather" class="weather-summary-now"></div>
      <div data-target="weather" class="weather-summary-day"></div>
    </div>
  </div>

</div>

<script src="./lib.js"></script>
<script src="./config.js"></script>
<script src="./script.js"></script>

</body>

</html>
