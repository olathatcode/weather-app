// Weather App Configuration
const WEATHER_CONFIG = {
    API_KEY: '9675d91129832b472fdd7b44849d002b',
    API_URL: 'https://api.openweathermap.org/data/2.5/weather',
    UNITS: 'metric', // metric, imperial, or kelvin
    TIMEOUT: 15000 // 15 seconds
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WEATHER_CONFIG;
}
