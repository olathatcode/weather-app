<?php
include 'config.php';

// Initialize PDO variable
$pdo = null;

// Database configuration
$dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME;
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Log the error but don't die - allow the app to work without database
    error_log('Database connection failed: ' . $e->getMessage());
    $pdo = null;
}
?>
