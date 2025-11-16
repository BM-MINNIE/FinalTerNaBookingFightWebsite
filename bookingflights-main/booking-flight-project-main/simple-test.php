<?php
// Very simple test - just output JSON
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'PHP is working!',
    'time' => date('Y-m-d H:i:s')
]);
?>