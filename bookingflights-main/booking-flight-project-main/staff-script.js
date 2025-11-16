// ===========================
// Global Variables
// ===========================
let flights = [];
let bookings = [];
let passengers = [];
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
    if (action.includes('Booking')) return 'booking_id';
    if (action.includes('Passenger')) return 'passenger_id';
    return 'id';
}

// ===========================
// Initialize Data
// ===========================
async function init() {
    showNotification('Loading data...', 'info');
    
    flights = await fetchData('getFlights');
    bookings = await fetchData('getBookings');
    passengers = await fetchData('getPassengers');
    airports = await fetchData('getAirports');
    
    renderFlights();
    renderBookings();
    renderPassengers();
    
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
            <td>${flight.source_name || flight.source_airport_id}</td>
            <td>${flight.destination_name || flight.destination_airport_id}</td>
            <td>${flight.departure_time}</td>
            <td>${flight.arrival_time}</td>
            <td>
                <button class="btn-action btn-view" onclick="viewFlight('${flight.flight_id}')">View</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderBookings() {
    const tbody = document.getElementById('bookingTableBody');
    tbody.innerHTML = '';

    bookings.forEach((booking) => {
        const row = document.createElement('tr');
        const statusClass = booking.payment_status === 'Paid' ? 'status-paid' : 
                           booking.payment_status === 'Failed' ? 'status-failed' : 'status-pending';
        const paymentStatus = booking.payment_status || 'Pending';
        
        row.innerHTML = `
            <td>${booking.booking_id}</td>
            <td>${booking.user_id}</td>
            <td>${booking.flight_id}</td>
            <td><span class="status-badge ${statusClass}">${paymentStatus}</span></td>
            <td>
                <button class="btn-action btn-edit" onclick="editBooking(${booking.booking_id})">Edit</button>
                <button class="btn-action btn-delete" onclick="deleteBooking(${booking.booking_id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderPassengers() {
    const tbody = document.getElementById('passengerTableBody');
    tbody.innerHTML = '';

    passengers.forEach((passenger) => {
        const row = document.createElement('tr');
        const wifiDisplay = passenger.Wifi == 1 ? 'Yes' : 'No';
        const mealDisplay = passenger.Meal || 'Not selected';
        
        row.innerHTML = `
            <td>${passenger.passenger_id}</td>
            <td>${passenger.flight_id}</td>
            <td>${passenger.fname} ${passenger.lname}</td>
            <td>${passenger.passport_no}</td>
            <td>${passenger.seat_no}</td>
            <td>${mealDisplay}</td>
            <td>${wifiDisplay}</td>
            <td>${passenger.luggage_weight} kg</td>
            <td>
                <button class="btn-action btn-edit" onclick="editPassenger(${passenger.passenger_id})">Edit</button>
                <button class="btn-action btn-delete" onclick="deletePassenger(${passenger.passenger_id})">Delete</button>
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
    if (type === 'booking') {
        document.getElementById('bookingModalTitle').textContent = 'Add Booking';
        document.getElementById('bookingForm').reset();
        document.getElementById('bookingEditId').value = '';
        populateFlightDropdown('bookingFlightId');
        openModal('bookingModal');
    } else if (type === 'passenger') {
        document.getElementById('passengerModalTitle').textContent = 'Add Passenger';
        document.getElementById('passengerForm').reset();
        document.getElementById('passengerEditId').value = '';
        populateFlightDropdown('passengerFlightId');
        openModal('passengerModal');
    }
}

function populateFlightDropdown(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = '<option value="">Select Flight</option>';
        flights.forEach(flight => {
            select.innerHTML += `<option value="${flight.flight_id}">${flight.flight_id} - ${flight.source_airport_id} → ${flight.destination_airport_id}</option>`;
        });
    }
}

// ===========================
// Flight Functions
// ===========================
function viewFlight(flightId) {
    const flight = flights.find(f => f.flight_id === flightId);
    if (!flight) return;
    
    alert(`Flight Details:\n\nFlight ID: ${flight.flight_id}\nAirplane: ${flight.airplane_id}\nFrom: ${flight.source_name || flight.source_airport_id}\nTo: ${flight.destination_name || flight.destination_airport_id}\nDeparture: ${flight.departure_time}\nArrival: ${flight.arrival_time}\nPrice: $${flight.price}\nAvailable Seats: ${flight.availables_seats}`);
}

// ===========================
// Booking Functions
// ===========================
function editBooking(bookingId) {
    // Convert bookingId to string for comparison
    const booking = bookings.find(b => b.booking_id == bookingId); // Use == or convert to String
    if (!booking) {
        console.error('Booking not found. Looking for:', bookingId, 'Type:', typeof bookingId);
        console.log('Available bookings:', bookings);
        showNotification('Booking not found', 'error');
        return;
    }
    
    console.log('Editing booking:', booking);
    
    document.getElementById('bookingModalTitle').textContent = 'Edit Booking';
    document.getElementById('bookingEditId').value = booking.booking_id;
    document.getElementById('userId').value = booking.user_id;
    
    populateFlightDropdown('bookingFlightId');
    
    // Set dropdown value after populating
    setTimeout(() => {
        document.getElementById('bookingFlightId').value = booking.flight_id;
    }, 100);
    
    document.getElementById('paymentStatus').value = booking.payment_status || 'Pending';
    document.getElementById('bookingAmount').value = booking.amount || '';
    
    openModal('bookingModal');
}

async function deleteBooking(bookingId) {
    if (confirm(`Are you sure you want to delete booking ${bookingId}?`)) {
        const result = await deleteData('deleteBooking', bookingId);
        if (result.success) {
            showNotification('Booking deleted successfully', 'success');
            await init();
        } else {
            showNotification(result.message, 'error');
        }
    }
}

// ===========================
// Passenger Functions
// ===========================
function editPassenger(passengerId) {
    // Convert passengerId to string for comparison
    const passenger = passengers.find(p => p.passenger_id == passengerId); // Use == or convert to String
    if (!passenger) {
        console.error('Passenger not found. Looking for:', passengerId, 'Type:', typeof passengerId);
        console.log('Available passengers:', passengers);
        showNotification('Passenger not found', 'error');
        return;
    }
    
    console.log('Editing passenger:', passenger);
    
    document.getElementById('passengerModalTitle').textContent = 'Edit Passenger';
    document.getElementById('passengerEditId').value = passenger.passenger_id;
    document.getElementById('passengerBookingId').value = passenger.booking_id;
    
    populateFlightDropdown('passengerFlightId');
    
    // Set dropdown value after populating
    setTimeout(() => {
        document.getElementById('passengerFlightId').value = passenger.flight_id;
    }, 100);
    
    document.getElementById('passengerFirstName').value = passenger.fname;
    document.getElementById('passengerLastName').value = passenger.lname;
    document.getElementById('passportId').value = passenger.passport_no;
    document.getElementById('seat').value = passenger.seat_no;
    document.getElementById('meal').value = passenger.Meal || '';
    document.getElementById('wifiservice').value = passenger.Wifi == 1 ? 'wifi' : 'nowifi';
    document.getElementById('luggageWeight').value = passenger.luggage_weight;
    
    openModal('passengerModal');
}

async function deletePassenger(passengerId) {
    if (confirm(`Are you sure you want to delete passenger ${passengerId}?`)) {
        const result = await deleteData('deletePassenger', passengerId);
        if (result.success) {
            showNotification('Passenger deleted successfully', 'success');
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
    // Booking Form
    document.getElementById('bookingForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const editId = document.getElementById('bookingEditId').value;
        const bookingData = {
            booking_id: editId ? parseInt(editId) : null,
            user_id: parseInt(document.getElementById('userId').value),
            flight_id: document.getElementById('bookingFlightId').value,
            payment_status: document.getElementById('paymentStatus').value,
            amount: parseFloat(document.getElementById('bookingAmount').value) || 0
        };

        const action = editId ? 'updateBooking' : 'addBooking';
        const result = await sendData(action, bookingData);
        
        if (result.success) {
            showNotification(result.message, 'success');
            closeModal('bookingModal');
            this.reset();
            await init();
        } else {
            showNotification(result.message, 'error');
        }
    });

    // Passenger Form
    document.getElementById('passengerForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const editId = document.getElementById('passengerEditId').value;
        const mealSelect = document.getElementById('meal');
        const mealValue = mealSelect.value || '';

        const passengerData = {
            passenger_id: editId ? parseInt(editId) : null,
            booking_id: parseInt(document.getElementById('passengerBookingId').value),
            flight_id: document.getElementById('passengerFlightId').value,
            fname: document.getElementById('passengerFirstName').value,
            lname: document.getElementById('passengerLastName').value,
            passport_no: document.getElementById('passportId').value,
            seat_no: document.getElementById('seat').value,
            meal: mealValue,
            wifi: document.getElementById('wifiservice').value === 'wifi' ? 1 : 0,
            luggage_weight: parseInt(document.getElementById('luggageWeight').value)
        };

        const action = editId ? 'updatePassenger' : 'addPassenger';
        const result = await sendData(action, passengerData);
        
        if (result.success) {
            showNotification(result.message, 'success');
            closeModal('passengerModal');
            this.reset();
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
    .status-paid {
        background: #d4edda;
        color: #155724;
    }
    .status-failed {
        background: #fac9c9;
        color: #ac2929;
    }
    .status-pending {
        background: #fff3cd;
        color: #856404;
    }
    .btn-view {
        background: #e3f2fd;
        color: #2e59a7;
    }
    .btn-view:hover {
        background: #2e59a7;
        color: #ffffff;
    }
`;
document.head.appendChild(style);

console.log('Staff Dashboard initialized successfully');