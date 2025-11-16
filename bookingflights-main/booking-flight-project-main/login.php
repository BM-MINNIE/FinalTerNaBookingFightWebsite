<?php
session_start();
require_once 'db_config.php';

if (isset($_POST['login'])) {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    
    // Input validation
    if (empty($email) || empty($password)) {
        echo "<script>alert('Please fill in Email and password'); window.location.href='index.html';</script>";
        exit();
    }
    
    // Get database connection
    $conn = getDBConnection();
    
    // Get user by email
    $stmt = $conn->prepare("SELECT user_id, fname, lname, password, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        // User not found
        echo "<script>alert('❌ Email or password incorrect!'); window.location.href='index.html';</script>";
        $stmt->close();
        closeDBConnection($conn);
        exit();
    }
    
    $user = $result->fetch_assoc();
    $stmt->close();
    
    // Verify password using password_verify()
    // This works with both plain text (for backward compatibility during migration)
    // and hashed passwords
    $passwordMatch = false;
    
    if (substr($user['password'], 0, 4) === '$2y$' || substr($user['password'], 0, 4) === '$2a$') {
        // Password is hashed - use password_verify()
        $passwordMatch = password_verify($password, $user['password']);
    } else {
        // Password is plain text (old data) - direct comparison
        // ⚠️ Remove this after all passwords are hashed!
        $passwordMatch = ($password === $user['password']);
        
        // If match, hash it now for next time
        if ($passwordMatch) {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE user_id = ?");
            $updateStmt->bind_param("si", $hashedPassword, $user['user_id']);
            $updateStmt->execute();
            $updateStmt->close();
        }
    }
    
    if ($passwordMatch) {
        // Password correct! ✅
        
        // Set session variables
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['fname'] = $user['fname'];
        $_SESSION['lname'] = $user['lname'];
        $_SESSION['email'] = $email;
        $_SESSION['role'] = $user['role'];
        $_SESSION['logged_in'] = true;
        
        // Redirect based on role WITH USER DATA IN URL
        if ($user['role'] === 'admin') {
            header("Location: admin.html?userId=" . $user['user_id'] . 
                   "&userFirstname=" . urlencode($user['fname']) . 
                   "&userLastname=" . urlencode($user['lname']) . 
                   "&userEmail=" . urlencode($email) . 
                   "&userRole=admin");
        } elseif ($user['role'] === 'staff') {
            header("Location: staff.html?userId=" . $user['user_id'] . 
                   "&userFirstname=" . urlencode($user['fname']) . 
                   "&userLastname=" . urlencode($user['lname']) . 
                   "&userEmail=" . urlencode($email) . 
                   "&userRole=staff");
        } else {
            // Customer
            header("Location: search.html?userId=" . $user['user_id'] . 
                   "&userFirstname=" . urlencode($user['fname']) . 
                   "&userLastname=" . urlencode($user['lname']) . 
                   "&userEmail=" . urlencode($email) . 
                   "&userRole=customer");
        }
        exit();
        
    } else {
        // Password incorrect ❌
        echo "<script>alert('❌ Email or password incorrect!'); window.location.href='index.html';</script>";
        exit();
    }
    
    closeDBConnection($conn);
}
?>