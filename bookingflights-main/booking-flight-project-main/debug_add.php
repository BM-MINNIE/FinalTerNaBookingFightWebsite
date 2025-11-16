<?php
// Debug file to test add operations
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db_config.php';

$test = $_GET['test'] ?? 'flight';

try {
    $conn = getDBConnection();
    
    if ($test === 'flight') {
        // Test adding a flight
        $data = [
            'flight_id' => 'TEST001',
            'airplane_id' => 'AP001',
            'source_airport_id' => 'BKK',
            'destination_airport_id' => 'NRT',
            'departure_time' => '10:00:00',
            'arrival_time' => '15:00:00',
            'price' => 12000.50,
            'availables_seats' => 150
        ];
        
        $sql = "INSERT INTO flights (flight_id, airplane_id, source_airport_id, 
                destination_airport_id, departure_time, arrival_time, price, availables_seats) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
            exit;
        }
        
        $stmt->bind_param("ssssssdi", 
            $data['flight_id'],
            $data['airplane_id'],
            $data['source_airport_id'],
            $data['destination_airport_id'],
            $data['departure_time'],
            $data['arrival_time'],
            $data['price'],
            $data['availables_seats']
        );
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Test flight added', 'data' => $data]);
        } else {
            echo json_encode(['success' => false, 'error' => $stmt->error, 'errno' => $stmt->errno]);
        }
        
    } elseif ($test === 'airplane') {
        // Test adding an airplane
        $data = [
            'airplane_id' => 'APTEST',
            'model' => 'Test Model 123',
            'capacity' => 200,
            'status' => 'Active'
        ];
        
        $sql = "INSERT INTO airplane (airplane_id, model, capacity, status) 
                VALUES (?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
            exit;
        }
        
        $stmt->bind_param("ssis", 
            $data['airplane_id'],
            $data['model'],
            $data['capacity'],
            $data['status']
        );
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Test airplane added', 'data' => $data]);
        } else {
            echo json_encode(['success' => false, 'error' => $stmt->error, 'errno' => $stmt->errno]);
        }
        
    } elseif ($test === 'passenger') {
        // Test adding a passenger (need valid booking_id first)
        
        // First create a test booking
        $sql = "INSERT INTO bookings (user_id, flight_id, booking_date) VALUES (1, 'JL718-1', NOW())";
        if ($conn->query($sql)) {
            $booking_id = $conn->insert_id;
            
            $data = [
                'booking_id' => $booking_id,
                'flight_id' => 'JL718-1',
                'fname' => 'Test',
                'lname' => 'Passenger',
                'passport_no' => 'TEST123',
                'seat_no' => '99A',
                'luggage_weight' => 20,
                'meal' => 'Norm',
                'wifi' => 1
            ];
            
            $sql = "INSERT INTO passengers (booking_id, flight_id, fname, lname, passport_no, 
                    seat_no, luggage_weight, Meal, Wifi) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $conn->prepare($sql);
            if (!$stmt) {
                echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
                exit;
            }
            
            $stmt->bind_param("isssssiis", 
                $data['booking_id'],
                $data['flight_id'],
                $data['fname'],
                $data['lname'],
                $data['passport_no'],
                $data['seat_no'],
                $data['luggage_weight'],
                $data['meal'],
                $data['wifi']
            );
            
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Test passenger added', 'data' => $data]);
            } else {
                echo json_encode(['success' => false, 'error' => $stmt->error, 'errno' => $stmt->errno]);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Could not create test booking: ' . $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid test parameter. Use ?test=flight or ?test=airplane or ?test=passenger']);
    }
    
    closeDBConnection($conn);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
