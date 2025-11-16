<?php
header('Content-Type: application/json');
require_once 'db_config.php';

$conn = getDBConnection();

// Test 1: Check what enum values are actually defined
$result = $conn->query("SHOW COLUMNS FROM passengers WHERE Field = 'Meal'");
$row = $result->fetch_assoc();
echo "Current Enum Definition:\n";
echo $row['Type'] . "\n\n";

// Test 2: Try inserting with different meal values
$test_cases = [
    ['value' => '', 'description' => 'Empty string'],
    ['value' => 'Norm', 'description' => 'Norm'],
    ['value' => ' Norm', 'description' => 'Norm with leading space'],
    ['value' => 'Norm ', 'description' => 'Norm with trailing space'],
    ['value' => 'Vegan', 'description' => 'Vegan'],
    ['value' => 'Low', 'description' => 'Low'],
    ['value' => 'Diabetic', 'description' => 'Diabetic'],
];

echo "Test Results:\n";
foreach ($test_cases as $test) {
    // First create a test booking
    $conn->query("INSERT INTO bookings (user_id, flight_id, booking_date) VALUES (1, 'JL718-1', NOW())");
    $booking_id = $conn->insert_id;
    
    $stmt = $conn->prepare("INSERT INTO passengers (booking_id, flight_id, fname, lname, passport_no, seat_no, luggage_weight, Meal, Wifi) VALUES (?, 'JL718-1', 'Test', 'User', 'TEST123', '99Z', 20, ?, 0)");
    $stmt->bind_param("is", $booking_id, $test['value']);
    
    if ($stmt->execute()) {
        $passenger_id = $conn->insert_id;
        echo "✓ SUCCESS: {$test['description']} (value: '" . $test['value'] . "', length: " . strlen($test['value']) . ")\n";
        
        // Clean up
        $conn->query("DELETE FROM passengers WHERE passenger_id = $passenger_id");
        $conn->query("DELETE FROM bookings WHERE booking_id = $booking_id");
    } else {
        echo "✗ FAILED: {$test['description']} - Error: {$stmt->error}\n";
    }
}

closeDBConnection($conn);
?>
