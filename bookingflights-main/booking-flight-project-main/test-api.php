<?php
require_once 'db_config.php';
$conn = getDBConnection();

$sql = "INSERT INTO bookings (user_id, flight_id, seat_id, booking_date) 
        VALUES (?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die(json_encode(['error' => 'Prepare failed: ' . $conn->error]));
}

$user_id = 60;
$flight_id = 'TG642-1';
$seat_id = '99Z';

$stmt->bind_param("iss", $user_id, $flight_id, $seat_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'booking_id' => $conn->insert_id]);
} else {
    echo json_encode(['error' => 'Execute failed: ' . $stmt->error]);
}