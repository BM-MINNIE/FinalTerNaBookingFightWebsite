// ============================================
// GET CURRENT USER ID
// ============================================
const currentUserId = localStorage.getItem('userId') || 1;

console.log('🎫 Bookings page loading for user:', currentUserId);

// ============================================
// FETCH ALL BOOKINGS FOR THIS USER
// ============================================
async function fetchUserBookings() {
    try {
        console.log('📡 Fetching bookings from database...');
        
        // Fetch all bookings
        const response = await fetch('api.php?action=getBookings');
        const result = await response.json();
        
        if (!result.success) {
            console.error('Failed to fetch bookings:', result.message);
            showNoBookings();
            return;
        }
        
        const allBookings = result.data;
        console.log('📦 Total bookings in database:', allBookings.length);
        
        // Filter bookings for current user
        const userBookings = allBookings.filter(b => b.user_id == currentUserId);
        console.log('📦 User bookings:', userBookings.length);
        
        if (userBookings.length === 0) {
            showNoBookings();
            return;
        }
        
        // Group bookings by booking_id
        const bookingGroups = {};
        userBookings.forEach(booking => {
            if (!bookingGroups[booking.booking_id]) {
                bookingGroups[booking.booking_id] = booking;
            }
        });
        
        console.log('📦 Unique bookings:', Object.keys(bookingGroups).length);
        
        // Display bookings
        displayBookings(Object.values(bookingGroups));
        
    } catch (error) {
        console.error('Error fetching bookings:', error);
        showNoBookings();
    }
}

// ============================================
// DISPLAY BOOKINGS
// ============================================
function displayBookings(bookings) {
    const container = document.getElementById('tickets-container');
    container.innerHTML = '';
    
    // Hide "no bookings" message
    document.getElementById('no-bookings').style.display = 'none';
    
    bookings.forEach((booking, index) => {
        const bookingCard = createBookingCard(booking, index + 1);
        container.appendChild(bookingCard);
    });
    
    console.log('✅ Displayed', bookings.length, 'bookings');
}

// ============================================
// CREATE BOOKING CARD
// ============================================
function createBookingCard(booking, number) {
    const card = document.createElement('div');
    card.className = 'booking-card';
    
    const statusClass = booking.payment_status === 'Paid' ? 'confirmed' : 'pending';
    const statusText = booking.payment_status === 'Paid' ? '✓ Confirmed' : '⏳ Pending';
    
    card.innerHTML = `
        <div class="booking-header">
            <div class="booking-number">Booking #${number}</div>
            <div class="booking-status ${statusClass}">${statusText}</div>
        </div>
        
        <div class="booking-details">
            <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span class="detail-value">${booking.booking_id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Flight:</span>
                <span class="detail-value">${booking.flight_id || 'N/A'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Seat:</span>
                <span class="detail-value">${booking.seat_id || 'Not assigned'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(booking.booking_date)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">${booking.status || 'PENDING'}</span>
            </div>
            ${booking.amount ? `
            <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value">฿${parseFloat(booking.amount).toLocaleString()}</span>
            </div>
            ` : ''}
            ${booking.payment_status ? `
            <div class="detail-row">
                <span class="detail-label">Payment:</span>
                <span class="detail-value">${booking.payment_status}</span>
            </div>
            ` : ''}
        </div>
    `;
    
    return card;
}

// ============================================
// SHOW NO BOOKINGS MESSAGE
// ============================================
function showNoBookings() {
    document.getElementById('no-bookings').style.display = 'flex';
    document.getElementById('tickets-container').innerHTML = '';
    console.log('ℹ️ No bookings found for this user');
}

// ============================================
// FORMAT DATE
// ============================================
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================
function goToHome() {
    window.location.href = 'search.html';
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function printTickets() {
    window.print();
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
window.onload = function() {
    console.log('🎫 === BOOKINGS PAGE LOADED ===');
    fetchUserBookings();
};