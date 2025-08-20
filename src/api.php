<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

function validateCityName($city) {
    if (empty($city)) {
        return ['valid' => false, 'error' => 'City name is required'];
    }
    
    $city = trim($city);
    
    if (strlen($city) > MAX_CITY_LENGTH) {
        return ['valid' => false, 'error' => 'City name is too long'];
    }
    
    // Allow only letters, spaces, hyphens, and apostrophes
    if (!preg_match('/^[a-zA-Z\s\-\'\.]+$/', $city)) {
        return ['valid' => false, 'error' => 'Invalid city name format'];
    }
    
    return ['valid' => true, 'city' => $city];
}

function getWeatherData($city) {
    // Validate API key
    if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
        return ['error' => 'Weather API key not configured. Please set up your API key in config.php'];
    }
    
    $url = WEATHER_API_URL . "?q=" . urlencode($city) . "&appid=" . WEATHER_API_KEY . "&units=metric";

    // Use file_get_contents with stream context for HTTP requests
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => [
                'Accept: application/json',
                'User-Agent: SimpleWeatherApp/1.0'
            ],
            'timeout' => API_TIMEOUT,
            'ignore_errors' => true
        ]
    ]);

    $response = @file_get_contents($url, false, $context);

    if ($response === false) {
        return ['error' => 'Network error: Unable to fetch weather data'];
    }

    // Get HTTP response code from headers
    $httpCode = 200; // Default to 200
    if (isset($http_response_header)) {
        foreach ($http_response_header as $header) {
            if (preg_match('/^HTTP\/\d\.\d\s+(\d+)/', $header, $matches)) {
                $httpCode = (int)$matches[1];
                break;
            }
        }
    }
    
    $data = json_decode($response, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        return ['error' => 'Invalid response from weather service'];
    }
    
    // Handle API error responses
    if ($httpCode !== 200) {
        if (isset($data['message'])) {
            $message = strtolower($data['message']);
            if (strpos($message, 'city not found') !== false || strpos($message, 'not found') !== false) {
                return ['error' => 'City not found. Please check the spelling and try again.'];
            } elseif (strpos($message, 'invalid api key') !== false) {
                return ['error' => 'Invalid API key. Please check your configuration.'];
            } else {
                return ['error' => 'Weather service error: ' . $data['message']];
            }
        }
        return ['error' => 'Weather service unavailable. Please try again later.'];
    }
    
    // Validate required data structure
    if (!isset($data['name']) || !isset($data['main']['temp']) || !isset($data['weather'][0]['description'])) {
        return ['error' => 'Incomplete weather data received'];
    }
    
    return $data;
}

// Main request handling
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_GET['city'])) {
    http_response_code(400);
    echo json_encode(['error' => 'City parameter is required']);
    exit;
}

// Validate city name
$validation = validateCityName($_GET['city']);
if (!$validation['valid']) {
    http_response_code(400);
    echo json_encode(['error' => $validation['error']]);
    exit;
}

$city = $validation['city'];

// Get weather data
$weatherData = getWeatherData($city);

if (isset($weatherData['error'])) {
    $errorCode = 404;
    if (strpos($weatherData['error'], 'API key') !== false || 
        strpos($weatherData['error'], 'not configured') !== false) {
        $errorCode = 500;
    }
    http_response_code($errorCode);
    echo json_encode(['error' => $weatherData['error']]);
    exit;
}

// Save to database (optional, won't fail the request)
if ($pdo !== null) {
    try {
        $stmt = $pdo->prepare('INSERT INTO weather_logs (city, temperature, description) VALUES (?, ?, ?)');
        $stmt->execute([
            $weatherData['name'],
            $weatherData['main']['temp'],
            $weatherData['weather'][0]['description']
        ]);
    } catch (PDOException $e) {
        // Log database error but don't fail the request
        error_log('Database error: ' . $e->getMessage());
    }
}

// Return successful response
echo json_encode($weatherData);
?>
