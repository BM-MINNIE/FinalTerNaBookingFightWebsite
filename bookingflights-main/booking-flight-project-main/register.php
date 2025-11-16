<?php
session_start();
require_once 'db_config.php';

if (isset($_POST['register'])) {
    $firstname = trim($_POST['firstname']);
    $lastname = trim($_POST['lastname']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirmpassword = trim($_POST['confirmpassword']);
    $role = trim($_POST['role']);
    
    // Input validation
    if (empty($firstname) || empty($lastname) || empty($email) || empty($password) || empty($role)) {
        echo "<script>alert('Please fill in all fields'); window.location.href='index.html';</script>";
        exit();
    }
    
    // Check password match
    if ($password !== $confirmpassword) {
        echo "<script>alert('Passwords do not match'); window.location.href='index.html';</script>";
        exit();
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email format'); window.location.href='index.html';</script>";
        exit();
    }
    
    // Validate role
    $validRoles = ['customer', 'admin', 'staff'];
    if (!in_array($role, $validRoles)) {
        echo "<script>alert('Invalid role specified'); window.location.href='index.html';</script>";
        exit();
    }
    
    // ⭐ Check special password for Admin and Staff
    if ($role === 'admin') {
        if ($password !== 'adminnaja555') {
            echo "<script>alert('❌ Invalid Admin password\\n\\nIf you want to register as Admin, please contact the system administrator'); window.location.href='index.html';</script>";
            exit();
        }
    } elseif ($role === 'staff') {
        if ($password !== 'staffnaja555') {
            echo "<script>alert('❌ Invalid Staff password\\n\\nIf you want to register as Staff, please contact the system administrator'); window.location.href='index.html';</script>";
            exit();
        }
    }
    // For customer, any password is allowed
    
    // Get database connection
    $conn = getDBConnection();
    
    // Check if user already exists using stored procedure
    $stmt = $conn->prepare("CALL regis(?, ?, ?, @can)");
    $stmt->bind_param("sss", $firstname, $lastname, $email);
    $stmt->execute();
    $stmt->close();
    
    // Get result
    $result = $conn->query("SELECT @can as can");
    $row = $result->fetch_assoc();
    
    if ($row['can'] == 0) {
        echo "<script>alert('This name or email is already registered'); window.location.href='index.html';</script>";
    } else {
        // 🔐 HASH THE PASSWORD BEFORE SAVING (THIS IS THE FIX!)
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // Insert new user with HASHED password
        $stmt = $conn->prepare("INSERT INTO users (fname, lname, email, password, role) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $firstname, $lastname, $email, $hashedPassword, $role);
        
        if ($stmt->execute()) {
            $roleText = '';
            if ($role === 'admin') $roleText = 'Admin';
            elseif ($role === 'staff') $roleText = 'Staff';
            else $roleText = 'Customer';
            
            echo "<script>alert('✅ $roleText account created successfully!\\nPlease log in'); window.location.href='index.html';</script>";
        } else {
            echo "<script>alert('An error occurred: " . $stmt->error . "'); window.location.href='index.html';</script>";
        }
        
        $stmt->close();
    }
    
    closeDBConnection($conn);
}
?>