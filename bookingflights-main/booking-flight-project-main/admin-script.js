// ===========================
// Global Variables
// ===========================
let flights = [];
let users = [];
let airplanes = [];
let airports = [];

// ===========================
// API Functions
// ===========================
async function fetchData(action) {
    try {
        const response = await fetch(`api.php?action=${action}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('Response is not JSON:', text.substring(0, 200));
            showNotification('Server error: Response is not valid JSON', 'error');
            return [];
        }
        
        if (data.success) {
            return data.data;
        } else {
            showNotification(data.message, 'error');
            return [];
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showNotification('Error fetching data: ' + error.message, 'error');
        return [];
    }
}

async function sendData(action, data) {
    try {
        console.log('Sending data:', action, data);
        
        const response = await fetch(`api.php?action=${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const text = await response.text();
        console.log('Server response:', text);
        
        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error('Response is not JSON:', text.substring(0, 500));
            showNotification('Server error: ' + text.substring(0, 100), 'error');
            return { success: false, message: 'Server returned invalid response' };
        }
        
        return result;
    } catch (error) {
        console.error('Send error:', error);
        showNotification('Error sending data: ' + error.message, 'error');
        return { success: false, message: error.message };
    }
}

async function deleteData(action, id) {
    try {
        const response = await fetch(`api.php?action=${action}&${getIdParam(action)}=${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        showNotification('Error deleting data: ' + error.message, 'error');
        return { success: false, message: error.message };
    }
}

function getIdParam(action) {
    if (action.includes('Flight')) return 'flight_id';
    if (action.includes('User')) return 'user_id';
    if (action.includes('Airplane')) return 'airplane_id';
    return 'id';
}

// ===========================
// Initialize Data
// ===========================
async function init() {
    showNotification('Loading data...', 'info');
    
    flights = await fetchData('getFlights');
    users = await fetchData('getUsers');
    airplanes = await fetchData('getAirplanes');
    airports = await fetchData('getAirports');
    
    renderFlights();
    renderUsers();
    renderAirplanes();
    
    showNotification('Data loaded successfully', 'success');
}

// ===========================
// Render Functions
// ===========================
function renderFlights() {
    const tbody = document.getElementById('flightTableBody');
    tbody.innerHTML = '';
    
    flights.forEach((flight) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${flight.flight_id}</td>
            <td>${flight.airplane_id}</td>
            <td>${flight.source_airport_id} → ${flight.destination_airport_id}</td>
            <td>${flight.source_name || flight.source_airport_id}</td>
            <td>${flight.destination_name || flight.destination_airport_id}</td>
            <td>${flight.departure_time}</td>
            <td>${flight.arrival_time}</td>
            <td>$${parseFloat(flight.price).toFixed(2)}</td>
            <td>${flight.availables_seats}</td>
            <td>
                <button class="btn-action btn-edit" onclick="editFlight('${flight.flight_id}')">Edit</button>
                <button class="btn-action btn-delete" onclick="deleteFlight('${flight.flight_id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderUsers() {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';
    
    users.forEach((user) => {
        const row = document.createElement('tr');
        const roleClass = `role-${user.role.toLowerCase()}`;
        row.innerHTML = `
            <td>${user.user_id}</td>
            <td>${user.email}</td>
            <td>${'*'.repeat(8)}</td>
            <td>${user.fname} ${user.lname}</td>
            <td><span class="role-badge ${roleClass}">${user.role}</span></td>
            <td>${new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
                <button class="btn-action btn-edit" data-user-id="${user.user_id}">Edit</button>
                <button class="btn-action btn-delete" data-user-id="${user.user_id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add event delegation
document.getElementById('userTableBody').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-edit')) {
        const userId = parseInt(e.target.dataset.userId, 10);
        editUser(userId);
    } else if (e.target.classList.contains('btn-delete')) {
        const userId = parseInt(e.target.dataset.userId, 10);
        deleteUser(userId);
    }
});

function renderAirplanes() {
    const tbody = document.getElementById('airplaneTableBody');
    tbody.innerHTML = '';
    
    airplanes.forEach((airplane) => {
        const row = document.createElement('tr');
        const statusClass = `status-${airplane.status.toLowerCase()}`;
        row.innerHTML = `
            <td>${airplane.airplane_id}</td>
            <td>${airplane.model}</td>
            <td>${airplane.capacity}</td>
            <td><span class="status-badge ${statusClass}">${airplane.status}</span></td>
            <td>
                <button class="btn-action btn-edit" onclick="editAirplane('${airplane.airplane_id}')">Edit</button>
                <button class="btn-action btn-delete" onclick="deleteAirplane('${airplane.airplane_id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ===========================
// Modal Functions
// ===========================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function openAddModal(type) {
    if (type === 'flight') {
        document.getElementById('flightModalTitle').textContent = 'Add Flight';
        document.getElementById('flightForm').reset();
        document.getElementById('flightEditId').value = '';
        document.getElementById('flightId').readOnly = false;
        populateAirportDropdowns();
        openModal('flightModal');
    } else if (type === 'user') {
        document.getElementById('userModalTitle').textContent = 'Add User';
        document.getElementById('userForm').reset();
        document.getElementById('userEditId').value = '';
        const passwordField = document.getElementById('userPassword');
        passwordField.setAttribute('required', 'required');
        passwordField.placeholder = 'Enter password';
        openModal('userModal');
    } else if (type === 'airplane') {
        document.getElementById('airplaneModalTitle').textContent = 'Add Airplane';
        document.getElementById('airplaneForm').reset();
        document.getElementById('airplaneEditId').value = '';
        document.getElementById('airplaneId').readOnly = false;
        openModal('airplaneModal');
    }
}

function populateAirportDropdowns() {
    const sourceSelect = document.getElementById('sourceAirport');
    const destSelect = document.getElementById('destinationAirport');
    
    if (sourceSelect && destSelect) {
        sourceSelect.innerHTML = '<option value="">Select Source Airport</option>';
        destSelect.innerHTML = '<option value="">Select Destination Airport</option>';
        
        airports.forEach(airport => {
            sourceSelect.innerHTML += `<option value="${airport.airport_id}">${airport.airport_id} - ${airport.name}</option>`;
            destSelect.innerHTML += `<option value="${airport.airport_id}">${airport.airport_id} - ${airport.name}</option>`;
        });
    }
}

// ===========================
// Flight Functions
// ===========================
function editFlight(flightId) {
    const flight = flights.find(f => f.flight_id === flightId);
    if (!flight) {
        showNotification('Flight not found', 'error');
        return;
    }
    
    console.log('Editing flight:', flight);
    
    document.getElementById('flightModalTitle').textContent = 'Edit Flight';
    document.getElementById('flightEditId').value = flight.flight_id;
    document.getElementById('flightId').value = flight.flight_id;
    document.getElementById('flightId').readOnly = true;
    document.getElementById('flightAirplaneId').value = flight.airplane_id;
    
    populateAirportDropdowns();
    
    // Set dropdown values after populating
    setTimeout(() => {
        document.getElementById('sourceAirport').value = flight.source_airport_id;
        document.getElementById('destinationAirport').value = flight.destination_airport_id;
    }, 100);
    
    document.getElementById('departureTime').value = flight.departure_time;
    document.getElementById('arrivalTime').value = flight.arrival_time;
    document.getElementById('flightPrice').value = parseFloat(flight.price);
    document.getElementById('availableSeats').value = flight.availables_seats;
    
    openModal('flightModal');
}

async function deleteFlight(flightId) {
    if (confirm(`Are you sure you want to delete flight ${flightId}?`)) {
        const result = await deleteData('deleteFlight', flightId);
        if (result.success) {
            showNotification('Flight deleted successfully', 'success');
            await init();
        } else {
            showNotification(result.message, 'error');
        }
    }
}

// ===========================
// User Functions
// ===========================
function editUser(userId) {
    console.log('editUser called with:', userId, 'Type:', typeof userId);
    console.log('Users array:', users);
    console.log('User IDs in array:', users.map(u => ({id: u.user_id, type: typeof u.user_id})));
    
    const user = users.find(u => u.user_id === String(userId));
    if (!user) {
        showNotification('User not found', 'error');
        return;
    }
    
    console.log('Editing user:', user);
    
    document.getElementById('userModalTitle').textContent = 'Edit User';
    document.getElementById('userEditId').value = user.user_id;
    document.getElementById('userFirstName').value = user.fname;
    document.getElementById('userLastName').value = user.lname;
    document.getElementById('userEmail').value = user.email;
    
    const passwordField = document.getElementById('userPassword');
    passwordField.value = '';
    passwordField.placeholder = 'Leave empty to keep current password';
    passwordField.removeAttribute('required');
    
    document.getElementById('userRole').value = user.role;
    
    openModal('userModal');
}

async function deleteUser(userId) {
    if (confirm(`Are you sure you want to delete user ID ${userId}?`)) {
        const result = await deleteData('deleteUser', userId);
        if (result.success) {
            showNotification('User deleted successfully', 'success');
            await init();
        } else {
            showNotification(result.message, 'error');
        }
    }
}

// ===========================
// Airplane Functions
// ===========================
function editAirplane(airplaneId) {
    const airplane = airplanes.find(a => a.airplane_id === airplaneId);
    if (!airplane) {
        showNotification('Airplane not found', 'error');
        return;
    }
    
    console.log('Editing airplane:', airplane);
    
    document.getElementById('airplaneModalTitle').textContent = 'Edit Airplane';
    document.getElementById('airplaneEditId').value = airplane.airplane_id;
    document.getElementById('airplaneId').value = airplane.airplane_id;
    document.getElementById('airplaneId').readOnly = true;
    document.getElementById('airplaneModel').value = airplane.model;
    document.getElementById('airplaneCapacity').value = airplane.capacity;
    document.getElementById('airplaneStatus').value = airplane.status;
    
    openModal('airplaneModal');
}

async function deleteAirplane(airplaneId) {
    if (confirm(`Are you sure you want to delete airplane ${airplaneId}?`)) {
        const result = await deleteData('deleteAirplane', airplaneId);
        if (result.success) {
            showNotification('Airplane deleted successfully', 'success');
            await init();
        } else {
            showNotification(result.message, 'error');
        }
    }
}

// ===========================
// Form Submissions
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Flight Form
    document.getElementById('flightForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const editId = document.getElementById('flightEditId').value;
        const flightData = {
            flight_id: document.getElementById('flightId').value,
            airplane_id: document.getElementById('flightAirplaneId').value,
            source_airport_id: document.getElementById('sourceAirport').value,
            destination_airport_id: document.getElementById('destinationAirport').value,
            departure_time: document.getElementById('departureTime').value,
            arrival_time: document.getElementById('arrivalTime').value,
            price: parseFloat(document.getElementById('flightPrice').value),
            availables_seats: parseInt(document.getElementById('availableSeats').value)
        };

        const action = editId ? 'updateFlight' : 'addFlight';
        const result = await sendData(action, flightData);
        
        if (result.success) {
            showNotification(result.message, 'success');
            closeModal('flightModal');
            this.reset();
            document.getElementById('flightId').readOnly = false;
            await init();
        } else {
            showNotification(result.message, 'error');
        }
    });

    // User Form
    document.getElementById('userForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const editId = document.getElementById('userEditId').value;
        const userData = {
            user_id: editId ? parseInt(editId) : null,
            fname: document.getElementById('userFirstName').value,
            lname: document.getElementById('userLastName').value,
            email: document.getElementById('userEmail').value,
            password: document.getElementById('userPassword').value,
            role: document.getElementById('userRole').value
        };

        const action = editId ? 'updateUser' : 'addUser';
        const result = await sendData(action, userData);
        
        if (result.success) {
            showNotification(result.message, 'success');
            closeModal('userModal');
            this.reset();
            await init();
        } else {
            showNotification(result.message, 'error');
        }
    });

    // Airplane Form
    document.getElementById('airplaneForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const editId = document.getElementById('airplaneEditId').value;
        const airplaneData = {
            airplane_id: document.getElementById('airplaneId').value,
            model: document.getElementById('airplaneModel').value,
            capacity: parseInt(document.getElementById('airplaneCapacity').value),
            status: document.getElementById('airplaneStatus').value
        };

        const action = editId ? 'updateAirplane' : 'addAirplane';
        const result = await sendData(action, airplaneData);
        
        if (result.success) {
            showNotification(result.message, 'success');
            closeModal('airplaneModal');
            this.reset();
            document.getElementById('airplaneId').readOnly = false;
            await init();
        } else {
            showNotification(result.message, 'error');
        }
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Initialize
    init();
});

// ===========================
// Navigation
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            const page = this.getAttribute('data-page');
            
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.remove('active'));
            
            const targetSection = document.getElementById(page + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'index.html';
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const activeSection = document.querySelector('.content-section.active');
            
            if (activeSection) {
                const rows = activeSection.querySelectorAll('.data-table tbody tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    }
});

// ===========================
// Utility Functions
// ===========================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('Admin Dashboard initialized successfully');
