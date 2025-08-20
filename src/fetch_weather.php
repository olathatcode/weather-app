<?php
require_once __DIR__ . '/../db.php';

if ($pdo !== null) {
    try {
        $stmt = $pdo->query('SELECT * FROM weather_logs ORDER BY created_at DESC');
        $weatherLogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($weatherLogs);
    } catch (PDOException $e) {
        error_log('Database error: ' . $e->getMessage());
        echo json_encode([]);
    }
} else {
    // Database not available, return empty array
    echo json_encode([]);
}
?>
