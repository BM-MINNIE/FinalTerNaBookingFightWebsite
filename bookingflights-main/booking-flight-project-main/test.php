<?php
// Test file to check if PHP and database are working correctly
header('Content-Type: application/json');

// Test 1: PHP is working
$tests = [
    'php_working' => true,
    'php_version' => phpversion()
];

// Test 2: Check if db_config.php exists
if (file_exists('db_config.php')) {
    $tests['db_config_exists'] = true;
    
    try {
        require_once 'db_config.php';
        $tests['db_config_loaded'] = true;
        
        // Test 3: Try to connect to database
        $conn = getDBConnection();
        $tests['database_connected'] = true;
        $tests['connection_type'] = get_class($conn);
        
        // Test 4: Try a simple query
        $result = $conn->query("SELECT COUNT(*) as count FROM users");
        if ($result) {
            $row = $result->fetch_assoc();
            $tests['query_test'] = 'Success';
            $tests['user_count'] = $row['count'];
        } else {
            $tests['query_test'] = 'Failed: ' . $conn->error;
        }
        
        closeDBConnection($conn);
        
    } catch (Exception $e) {
        $tests['error'] = $e->getMessage();
    }
} else {
    $tests['db_config_exists'] = false;
    $tests['error'] = 'db_config.php file not found';
}

echo json_encode([
    'success' => true,
    'tests' => $tests,
    'message' => 'All tests completed'
], JSON_PRETTY_PRINT);
?>