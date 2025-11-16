<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Set JSON header
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    require_once 'db_config.php';
    $conn = getDBConnection();
    $action = $_GET['action'] ?? '';
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Connection error: ' . $e->getMessage()]);
    exit;
}

switch ($action) {
    // ========== FLIGHTS ==========
    case 'getFlights':
        $sql = "SELECT f.*, a.model as airplane_model, 
                src.name as source_name, dst.name as destination_name
                FROM flights f
                LEFT JOIN airplane a ON f.airplane_id = a.airplane_id
                LEFT JOIN airports src ON f.source_airport_id = src.airport_id
                LEFT JOIN airports dst ON f.destination_airport_id = dst.airport_id
                ORDER BY f.flight_id";
        $result = $conn->query($sql);
        $flights = [];
        while ($row = $result->fetch_assoc()) {
            $flights[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $flights]);
        break;

    case 'addFlight':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "INSERT INTO flights (flight_id, airplane_id, source_airport_id, 
                destination_airport_id, departure_time, arrival_time, price, availables_seats) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
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
            echo json_encode(['success' => true, 'message' => 'Flight added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'updateFlight':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE flights SET airplane_id=?, source_airport_id=?, 
                destination_airport_id=?, departure_time=?, arrival_time=?, 
                price=?, availables_seats=? WHERE flight_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssddis", 
            $data['airplane_id'],
            $data['source_airport_id'],
            $data['destination_airport_id'],
            $data['departure_time'],
            $data['arrival_time'],
            $data['price'],
            $data['availables_seats'],
            $data['flight_id']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Flight updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'deleteFlight':
        $flight_id = $_GET['flight_id'] ?? '';
        $sql = "DELETE FROM flights WHERE flight_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $flight_id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Flight deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    // ========== USERS ==========
    case 'getUsers':
        $sql = "SELECT * FROM users ORDER BY user_id";
        $result = $conn->query($sql);
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $users]);
        break;

    case 'addUser':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "INSERT INTO users (password, fname, lname, email, role) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", 
            password_hash($data['password'], PASSWORD_DEFAULT),  // ✅ Hashed,
            $data['fname'],
            $data['lname'],
            $data['email'],
            $data['role']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'User added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'updateUser':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE users SET password=?, fname=?, lname=?, email=?, role=? 
                WHERE user_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssi", 
            password_hash($data['password'], PASSWORD_DEFAULT),  // ✅ Hashed,
            $data['fname'],
            $data['lname'],
            $data['email'],
            $data['role'],
            $data['user_id']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'User updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'deleteUser':
        $user_id = $_GET['user_id'] ?? '';
        $sql = "DELETE FROM users WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    // ========== AIRPLANES ==========
    case 'getAirplanes':
        $sql = "SELECT * FROM airplane ORDER BY airplane_id";
        $result = $conn->query($sql);
        $airplanes = [];
        while ($row = $result->fetch_assoc()) {
            $airplanes[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $airplanes]);
        break;

    case 'addAirplane':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "INSERT INTO airplane (airplane_id, model, capacity, status) 
                VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssis", 
            $data['airplane_id'],
            $data['model'],
            $data['capacity'],
            $data['status']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Airplane added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'updateAirplane':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE airplane SET model=?, capacity=?, status=? 
                WHERE airplane_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("siss", 
            $data['model'],
            $data['capacity'],
            $data['status'],
            $data['airplane_id']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Airplane updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'deleteAirplane':
        $airplane_id = $_GET['airplane_id'] ?? '';
        $sql = "DELETE FROM airplane WHERE airplane_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $airplane_id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Airplane deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    // ========== AIRPORTS (for dropdown) ==========
    case 'getAirports':
        $sql = "SELECT * FROM airports ORDER BY airport_id";
        $result = $conn->query($sql);
        $airports = [];
        while ($row = $result->fetch_assoc()) {
            $airports[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $airports]);
        break;

    // ========== BOOKINGS ==========
    case 'addBooking':
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Get required fields (works for both customer and staff bookings)
        $user_id = isset($data['user_id']) ? intval($data['user_id']) : null;
        $flight_id = isset($data['flight_id']) ? $data['flight_id'] : null;
        $seat_id = isset($data['seat_id']) ? $data['seat_id'] : null;
        
        // Validate required fields
        if (!$user_id || !$flight_id) {
            echo json_encode(['success' => false, 'message' => 'Missing required fields: user_id and flight_id']);
            break;
        }
        
        // Handle null/empty seat_id
        if ($seat_id === 'null' || $seat_id === '' || empty($seat_id)) {
            $seat_id = null;
        }
        
        // ✅ Insert into bookings table (NO booking_reference - doesn't exist in table!)
        $sql = "INSERT INTO bookings (user_id, flight_id, seat_id, booking_date, status) 
                VALUES (?, ?, ?, NOW(), 'PENDING')";
        
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
            break;
        }
        
        $stmt->bind_param("iss", $user_id, $flight_id, $seat_id);
        
        if ($stmt->execute()) {
            $booking_id = $conn->insert_id;
            $stmt->close();
            
            echo json_encode([
                'success' => true, 
                'booking_id' => $booking_id,
                'message' => 'Booking created successfully'
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Execute failed: ' . $stmt->error]);
            $stmt->close();
        }
        break;

    case 'getBookings':
        $sql = "SELECT b.*, u.fname, u.lname, u.email, f.flight_id,
                p.payment_id, p.amount, p.payment_status, p.payment_date
                FROM bookings b
                LEFT JOIN users u ON b.user_id = u.user_id
                LEFT JOIN flights f ON b.flight_id = f.flight_id
                LEFT JOIN payments p ON b.booking_id = p.booking_id
                ORDER BY b.booking_id DESC";
        $result = $conn->query($sql);
        $bookings = [];
        while ($row = $result->fetch_assoc()) {
            $bookings[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $bookings]);
        break;

    case 'updateBooking':
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Get data that staff-script.js actually sends
        $booking_id = isset($data['booking_id']) ? intval($data['booking_id']) : null;
        $user_id = isset($data['user_id']) ? intval($data['user_id']) : null;
        $flight_id = isset($data['flight_id']) ? $data['flight_id'] : null;
        
        if (!$booking_id || !$user_id || !$flight_id) {
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            break;
        }
        
        // ✅ Update bookings table with only the fields that exist
        $sql = "UPDATE bookings SET user_id = ?, flight_id = ? WHERE booking_id = ?";
        
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
            break;
        }
        
        $stmt->bind_param("isi", $user_id, $flight_id, $booking_id);
        
        if ($stmt->execute()) {
            $stmt->close();
            
            // ✅ Handle payment update if payment data is provided
            if (isset($data['payment_status']) || isset($data['amount'])) {
                $payment_status = isset($data['payment_status']) ? $data['payment_status'] : 'Pending';
                $amount = isset($data['amount']) ? floatval($data['amount']) : 0;
                
                // Check if payment record exists
                $checkSql = "SELECT payment_id FROM payments WHERE booking_id = ?";
                $checkStmt = $conn->prepare($checkSql);
                $checkStmt->bind_param("i", $booking_id);
                $checkStmt->execute();
                $result = $checkStmt->get_result();
                
                if ($result->num_rows > 0) {
                    // Update existing payment
                    $row = $result->fetch_assoc();
                    $payment_id = $row['payment_id'];
                    
                    $updatePaymentSql = "UPDATE payments SET amount = ?, payment_status = ? WHERE payment_id = ?";
                    $updateStmt = $conn->prepare($updatePaymentSql);
                    $updateStmt->bind_param("dsi", $amount, $payment_status, $payment_id);
                    $updateStmt->execute();
                    $updateStmt->close();
                } else {
                    // Create new payment record if it doesn't exist
                    $insertSql = "INSERT INTO payments (booking_id, amount, payment_date, payment_status) 
                                 VALUES (?, ?, NOW(), ?)";
                    $insertStmt = $conn->prepare($insertSql);
                    $insertStmt->bind_param("ids", $booking_id, $amount, $payment_status);
                    $insertStmt->execute();
                    $insertStmt->close();
                }
                $checkStmt->close();
            }
            
            echo json_encode(['success' => true, 'message' => 'Booking updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Execute failed: ' . $stmt->error]);
            $stmt->close();
        }
        break;

    // ========== DELETE BOOKING ==========
    case 'deleteBooking':
        $booking_id = $_GET['booking_id'] ?? '';
        
        // First delete related payments
        $sql = "DELETE FROM payments WHERE booking_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $booking_id);
        $stmt->execute();
        $stmt->close();
        
        // Then delete related passengers
        $sql = "DELETE FROM passengers WHERE booking_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $booking_id);
        $stmt->execute();
        $stmt->close();
        
        // Finally delete the booking
        $sql = "DELETE FROM bookings WHERE booking_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $booking_id);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Booking deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        $stmt->close();
        break;

    // ========== PASSENGERS ==========
    case 'addPassenger':
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Get data with proper validation
        $booking_id = isset($data['booking_id']) ? intval($data['booking_id']) : null;
        $flight_id = isset($data['flight_id']) ? $data['flight_id'] : null;
        $fname = isset($data['fname']) ? $data['fname'] : null;
        $lname = isset($data['lname']) ? $data['lname'] : null;
        $passport_no = isset($data['passport_no']) ? $data['passport_no'] : null;
        $seat_no = isset($data['seat_no']) ? $data['seat_no'] : null;
        $luggage_weight = isset($data['luggage_weight']) ? intval($data['luggage_weight']) : null;
        $meal = isset($data['Meal']) ? $data['Meal'] : '';
        $wifi = isset($data['Wifi']) ? intval($data['Wifi']) : 0;
        
        // Validate required fields
        if (!$booking_id || !$flight_id || !$fname || !$lname || !$passport_no || !$seat_no) {
            echo json_encode([
                'success' => false, 
                'message' => 'Missing required fields'
            ]);
            break;
        }
        
        // ✅ Use exact column names from database (Meal and Wifi with capitals)
        $sql = "INSERT INTO passengers (booking_id, flight_id, fname, lname, passport_no, 
                                     seat_no, luggage_weight, Meal, Wifi)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            echo json_encode([
                'success' => false, 
                'message' => 'Prepare failed: ' . $conn->error
            ]);
            break;
        }
        
        $stmt->bind_param("isssssisi", 
            $booking_id,
            $flight_id,
            $fname,
            $lname,
            $passport_no,
            $seat_no,
            $luggage_weight,
            $meal,
            $wifi
        );
        
        if ($stmt->execute()) {
            $passenger_id = $conn->insert_id;
            
            echo json_encode([
                'success' => true, 
                'passenger_id' => $passenger_id,
                'message' => 'Passenger created successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false, 
                'message' => 'Execute failed: ' . $stmt->error
            ]);
        }
        $stmt->close();
        break;

    case 'getPassengers':
        $sql = "SELECT p.*, b.booking_id, f.flight_id 
                FROM passengers p
                LEFT JOIN bookings b ON p.booking_id = b.booking_id
                LEFT JOIN flights f ON p.flight_id = f.flight_id
                ORDER BY p.passenger_id DESC";
        $result = $conn->query($sql);
        $passengers = [];
        while ($row = $result->fetch_assoc()) {
            $passengers[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $passengers]);
        break;

    // ========== UPDATE PASSENGER ==========
    case 'updatePassenger':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $passenger_id = $data['passenger_id'];
        $booking_id = $data['booking_id'];
        $flight_id = $data['flight_id'];
        $fname = $data['fname'];
        $lname = $data['lname'];
        $passport_no = $data['passport_no'];
        $seat_no = $data['seat_no'];
        $luggage_weight = $data['luggage_weight'];
        $meal = $data['Meal'] ?? $data['meal']; // Support both formats
        $wifi = $data['Wifi'] ?? $data['wifi']; // Support both formats
        
        $sql = "UPDATE passengers SET 
                booking_id = ?, flight_id = ?, fname = ?, lname = ?, 
                passport_no = ?, seat_no = ?, luggage_weight = ?, Meal = ?, Wifi = ? 
                WHERE passenger_id = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isssssisii", 
            $booking_id, $flight_id, $fname, $lname, 
            $passport_no, $seat_no, $luggage_weight, $meal, $wifi, 
            $passenger_id
        );
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Passenger updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        $stmt->close();
        break;

    // ========== DELETE PASSENGER ==========
    case 'deletePassenger':
        $passenger_id = $_GET['passenger_id'] ?? '';
        
        $sql = "DELETE FROM passengers WHERE passenger_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $passenger_id);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Passenger deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        $stmt->close();
        break;

    // ========== PAYMENTS ==========
    case 'addPayment':
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Get values with defaults (no strict validation)
        $booking_id = isset($data['booking_id']) ? intval($data['booking_id']) : 0;
        $amount = isset($data['amount']) ? floatval($data['amount']) : 0;
        $payment_status = isset($data['payment_status']) ? $data['payment_status'] : 'Pending';
        
        $sql = "INSERT INTO payments (booking_id, amount, payment_date, payment_status) 
                VALUES (?, ?, NOW(), ?)";
        
        $stmt = $conn->prepare($sql);
        
        // ✅ CHECK if prepare() succeeded
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
            break;
        }
        
        $stmt->bind_param("ids", $booking_id, $amount, $payment_status);
        
        if ($stmt->execute()) {
            $payment_id = $conn->insert_id;
            
            // Update booking to CONFIRMED
            if ($payment_status === 'Paid') {
                $updateSql = "UPDATE bookings SET status = 'CONFIRMED' WHERE booking_id = ?";
                $updateStmt = $conn->prepare($updateSql);
                if ($updateStmt) {
                    $updateStmt->bind_param("i", $booking_id);
                    $updateStmt->execute();
                    $updateStmt->close();
                }
            }
            
            echo json_encode(['success' => true, 'payment_id' => $payment_id]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Execute failed: ' . $stmt->error]);
        }
        $stmt->close();
        break;

    case 'getPayments':
        $sql = "SELECT p.*, b.booking_id, b.user_id, b.flight_id 
                FROM payments p
                LEFT JOIN bookings b ON p.booking_id = b.booking_id
                ORDER BY p.payment_id DESC";
        $result = $conn->query($sql);
        $payments = [];
        while ($row = $result->fetch_assoc()) {
            $payments[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $payments]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}




closeDBConnection($conn);
?>