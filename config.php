<?php
// Weather API Configuration
define('WEATHER_API_URL', 'http://api.openweathermap.org/data/2.5/weather');
define('WEATHER_API_KEY', '9675d91129832b472fdd7b44849d002b'); // Replace with your actual API key from openweathermap.org

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'weather_app');
define('DB_USER', 'root');
define('DB_PASS', '');

// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// API Configuration
define('API_TIMEOUT', 10);
define('MAX_CITY_LENGTH', 100);
?>
