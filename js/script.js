// Preloader functionality
function hidePreloader() {
    $('#preloader').addClass('fade-out');
    setTimeout(function () {
        $('#preloader').remove();
    }, 500);
}

$(window).on('load', function () {
    // Hide preloader after everything is loaded
    setTimeout(hidePreloader, 1500); // Show preloader for at least 1.5 seconds
});

// Fallback: Hide preloader after 5 seconds if window load doesn't fire
setTimeout(function () {
    if ($('#preloader').length) {
        hidePreloader();
    }
}, 5000);

$(document).ready(function () {
    // Single, clean event handler for weather button
    $('#getWeather').click(function () {
        var city = $('#city').val().trim();

        if (!city) {
            $('#weatherResult').html('<div class="alert alert-warning">Please enter a city name.</div>');
            return;
        }

        $('#weatherResult').html('<div class="alert alert-info"><span class="loading"></span>Loading weather data...</div>');

        $.ajax({
            url: 'src/api.php',
            method: 'GET',
            data: { city: city },
            dataType: 'json',
            timeout: 15000, // 15 second timeout
            success: function (weatherData) {
                console.log('Weather API Response:', weatherData);
                if (weatherData && weatherData.name) {
                    const weatherIcon = getWeatherIcon(weatherData.weather[0].main);
                    $('#weatherResult').html(
                        `<div class="weather-card">
                            <h3><i class="${weatherIcon}"></i> ${weatherData.name}, ${weatherData.sys.country}</h3>
                            <div class="temperature-main">${Math.round(weatherData.main.temp)}°C</div>
                            <div class="weather-description">${weatherData.weather[0].description}</div>
                            <div class="weather-info">
                                <div class="weather-item">
                                    <i class="fas fa-thermometer-half"></i>
                                    <div class="label">Feels Like</div>
                                    <div class="value">${Math.round(weatherData.main.feels_like)}°C</div>
                                </div>
                                <div class="weather-item">
                                    <i class="fas fa-tint"></i>
                                    <div class="label">Humidity</div>
                                    <div class="value">${weatherData.main.humidity}%</div>
                                </div>
                                <div class="weather-item">
                                    <i class="fas fa-wind"></i>
                                    <div class="label">Wind Speed</div>
                                    <div class="value">${weatherData.wind && weatherData.wind.speed ? weatherData.wind.speed + ' m/s' : 'N/A'}</div>
                                </div>
                                <div class="weather-item">
                                    <i class="fas fa-compress-arrows-alt"></i>
                                    <div class="label">Pressure</div>
                                    <div class="value">${weatherData.main.pressure} hPa</div>
                                </div>
                                <div class="weather-item">
                                    <i class="fas fa-eye"></i>
                                    <div class="label">Visibility</div>
                                    <div class="value">${weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) + ' km' : 'N/A'}</div>
                                </div>
                                <div class="weather-item">
                                    <i class="fas fa-cloud"></i>
                                    <div class="label">Cloudiness</div>
                                    <div class="value">${weatherData.clouds && weatherData.clouds.all ? weatherData.clouds.all + '%' : 'N/A'}</div>
                                </div>
                            </div>
                        </div>`
                    );
                    fetchWeatherLogs();
                } else if (weatherData && weatherData.error) {
                    // Handle API errors with better messages
                    let errorMessage = weatherData.error;
                    if (errorMessage.includes('API key')) {
                        errorMessage = 'Weather service is not properly configured. Please contact the administrator.';
                    } else if (errorMessage.includes('City not found')) {
                        errorMessage = 'City not found. Please check the spelling and try again.';
                    } else if (errorMessage.includes('Network')) {
                        errorMessage = 'Network error. Please check your internet connection.';
                    }
                    $('#weatherResult').html(`<div class="alert alert-danger">${errorMessage}</div>`);
                } else {
                    $('#weatherResult').html('<div class="alert alert-danger">Unable to fetch weather data. Please try again.</div>');
                }
            },
            error: function (xhr, status, error) {
                console.error("API Error:", error);
                console.error("XHR Status:", xhr.status);
                console.error("Response Text:", xhr.responseText);
                let errorMessage = 'An error occurred while fetching weather data.';

                if (status === 'timeout') {
                    errorMessage = 'Request timed out. Please check your internet connection and try again.';
                } else if (xhr.status === 404) {
                    errorMessage = 'City not found. Please check the spelling and try again.';
                } else if (xhr.status === 400) {
                    errorMessage = 'Invalid city name. Please use only letters and spaces.';
                } else if (xhr.status === 500) {
                    errorMessage = 'Server error. Please try again later or contact support.';
                } else if (xhr.status === 0) {
                    errorMessage = 'Network error. Please check your internet connection.';
                }

                $('#weatherResult').html(`<div class="alert alert-danger">${errorMessage}</div>`);
            }
        });
    });

    // Handle Enter key press in city input
    $('#city').keypress(function (e) {
        if (e.which == 13) {
            $('#getWeather').click();
        }
    });

    // Real-time input validation
    $('#city').on('input', function () {
        var city = $(this).val();
        if (city && !/^[a-zA-Z\s\-\'\.]+$/.test(city)) {
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
        }
    });

    // Function to fetch weather logs
    function fetchWeatherLogs() {
        $.ajax({
            url: 'src/fetch_weather.php',
            method: 'GET',
            dataType: 'json',
            timeout: 5000,
            success: function (logs) {
                if (logs && logs.length > 0) {
                    var logsHtml = '<h3 class="history-title"><i class="fas fa-history"></i> Recent Searches</h3><div class="weather-logs">';
                    logs.forEach(function (log) {
                        logsHtml += `
                            <div class="log-item">
                                <div class="log-city">${log.city}</div>
                                <div class="log-temp">${Math.round(log.temperature)}°C</div>
                                <div class="log-desc">${log.description}</div>
                                <div class="timestamp">${formatDate(log.created_at)}</div>
                            </div>`;
                    });
                    logsHtml += '</div>';
                    $('#weatherLogs').html(logsHtml);
                } else {
                    $('#weatherLogs').html('');
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching logs:", error);
                $('#weatherLogs').html('<p>Error loading weather logs.</p>');
            }
        });
    }

    // Load weather logs on page load
    fetchWeatherLogs();
});

// Helper function to get weather icon based on weather condition
function getWeatherIcon(weatherMain) {
    const iconMap = {
        'Clear': 'fas fa-sun',
        'Clouds': 'fas fa-cloud',
        'Rain': 'fas fa-cloud-rain',
        'Drizzle': 'fas fa-cloud-drizzle',
        'Thunderstorm': 'fas fa-bolt',
        'Snow': 'fas fa-snowflake',
        'Mist': 'fas fa-smog',
        'Smoke': 'fas fa-smog',
        'Haze': 'fas fa-smog',
        'Dust': 'fas fa-smog',
        'Fog': 'fas fa-smog',
        'Sand': 'fas fa-smog',
        'Ash': 'fas fa-smog',
        'Squall': 'fas fa-wind',
        'Tornado': 'fas fa-tornado'
    };
    return iconMap[weatherMain] || 'fas fa-cloud';
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        return 'Today';
    } else if (diffDays === 2) {
        return 'Yesterday';
    } else if (diffDays <= 7) {
        return `${diffDays - 1} days ago`;
    } else {
        return date.toLocaleDateString();
    }
}
