// Function to switch between login and register forms
function showForm(formId){
    // Hide all forms by removing 'active' class
    document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
    
    // Show the selected form by adding 'active' class
    document.getElementById(formId).classList.add("active");
    
    // Get the welcome section element
    const welcomeSection = document.querySelector(".welcome-section");
    
    // Show welcome section only on login form
    if (formId === "login-form") {
        welcomeSection.style.display = "block";
    } else {
        welcomeSection.style.display = "none";
    }
}

// Handle login form submission
function handleLogin(event) {
    // Prevent default form submission (prevents page reload)
    event.preventDefault();
    
    // Get email and password values from input fields
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Basic validation - check if fields are not empty
    if (email && password) {
        // In a real application, you would send this data to a server
        // For now, we'll simulate a successful login
        
        // Extract first name from email (simple demo - before @ symbol)
        const firstName = email.split('@')[0];
        
        // Store user's first name in browser's localStorage
        // This allows us to access it on other pages
        localStorage.setItem('userFirstname', firstName);
        
        // Show success message
        // alert('Login successful! Redirecting to search page...');
        
        // Redirect to search page after 0.1 second
        setTimeout(() => {
            window.location.href = 'search.html';
        }, 100);
        
    } else {
        // Show error if fields are empty
        alert('Please fill in all fields');
    }
}

// Handle register form submission
function handleRegister(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get all form values
    const firstname = document.getElementById('register-firstname').value;
    const lastname = document.getElementById('register-lastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirmpassword').value;
    
    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll simulate successful registration
    
    // Store user's first name for later use
    localStorage.setItem('userFirstname', firstname);
    
    // Show success message
    alert('Account created successfully! You can now login.');
    
    // Switch to login form
    showForm('login-form');
    
    // Clear the registration form
    document.getElementById('registerFormElement').reset();
}