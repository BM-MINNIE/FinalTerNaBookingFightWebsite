// ============================================
// LOAD BOOKING DATA FROM LOCALSTORAGE
// ============================================

// Get booking reference and other data saved after payment
const bookingReference = localStorage.getItem('bookingReference');
const totalAmount = localStorage.getItem('bookingAmount');
const paymentMethod = localStorage.getItem('paymentMethod');

// Get complete booking data
const passengersData = JSON.parse(localStorage.getItem('bookingData')) || [];
const passengerCounts = JSON.parse(localStorage.getItem('passengerCounts')) || { adult: 1, child: 0, infant: 0 };
const outboundFlightData = JSON.parse(localStorage.getItem('outboundFlight'));
const returnFlightData = JSON.parse(localStorage.getItem('returnFlight'));
const isRoundTrip = localStorage.getItem('isRoundTrip') === 'true';
const totalPassengers = parseInt(localStorage.getItem('totalPassengers')) || 1;

// Flight data (same as in other files)
const flights = [
    { flight_id: 'TG640-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '08:30', arrival_time: '13:45', country_from: 'Thailand', country_to: 'Japan', price: 12500 },
    { flight_id: 'TG640-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '13:20', arrival_time: '18:30', country_from: 'Thailand', country_to: 'Japan', price: 11800 },
    { flight_id: 'TG640-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '20:00', arrival_time: '01:10', country_from: 'Thailand', country_to: 'Japan', price: 10900 },
    { flight_id: 'TG642-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '07:10', arrival_time: '13:00', country_from: 'Thailand', country_to: 'Japan', price: 13200 },
    { flight_id: 'TG642-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '12:30', arrival_time: '18:15', country_from: 'Thailand', country_to: 'Japan', price: 12600 },
    { flight_id: 'TG642-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '22:00', arrival_time: '04:50', country_from: 'Thailand', country_to: 'Japan', price: 11400 },
    { flight_id: 'XJ600-1', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '06:50', arrival_time: '11:30', country_from: 'Thailand', country_to: 'Japan', price: 8900 },
    { flight_id: 'XJ600-2', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '14:10', arrival_time: '19:00', country_from: 'Thailand', country_to: 'Japan', price: 8500 },
    { flight_id: 'XJ600-3', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '21:30', arrival_time: '02:15', country_from: 'Thailand', country_to: 'Japan', price: 7800 },
    { flight_id: 'XJ610-1', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '07:20', arrival_time: '12:10', country_from: 'Thailand', country_to: 'Japan', price: 9200 },
    { flight_id: 'XJ610-2', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '15:00', arrival_time: '20:10', country_from: 'Thailand', country_to: 'Japan', price: 8800 },
    { flight_id: 'XJ610-3', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '22:45', arrival_time: '04:00', country_from: 'Thailand', country_to: 'Japan', price: 8100 },
    { flight_id: 'JL728-1', depart_airport_name: 'Kansai International Airport', depart_airport_id: 'KIX', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '09:00', arrival_time: '14:20', country_from: 'Japan', country_to: 'Thailand', price: 12800 },
    { flight_id: 'JL728-2', depart_airport_name: 'Kansai International Airport', depart_airport_id: 'KIX', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '17:40', arrival_time: '22:55', country_from: 'Japan', country_to: 'Thailand', price: 12200 },
    { flight_id: 'JL728-3', depart_airport_name: 'Kansai International Airport', depart_airport_id: 'KIX', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '23:10', arrival_time: '04:30', country_from: 'Japan', country_to: 'Thailand', price: 11100 },
    { flight_id: 'JL718-1', depart_airport_name: 'Narita International Airport', depart_airport_id: 'NRT', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '10:20', arrival_time: '15:00', country_from: 'Japan', country_to: 'Thailand', price: 13500 },
    { flight_id: 'JL718-2', depart_airport_name: 'Narita International Airport', depart_airport_id: 'NRT', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '16:50', arrival_time: '21:30', country_from: 'Japan', country_to: 'Thailand', price: 12900 },
    { flight_id: 'JL718-3', depart_airport_name: 'Narita International Airport', depart_airport_id: 'NRT', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '22:30', arrival_time: '03:15', country_from: 'Japan', country_to: 'Thailand', price: 11700 },
    { flight_id: 'FD300-1', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Fukuoka Airport', arrival_airport_id: 'FUK', depart_time: '05:45', arrival_time: '10:00', country_from: 'Thailand', country_to: 'Japan', price: 7500 },
    { flight_id: 'FD300-2', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Fukuoka Airport', arrival_airport_id: 'FUK', depart_time: '14:20', arrival_time: '18:40', country_from: 'Thailand', country_to: 'Japan', price: 7200 },
    { flight_id: 'FD300-3', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Fukuoka Airport', arrival_airport_id: 'FUK', depart_time: '22:10', arrival_time: '02:20', country_from: 'Thailand', country_to: 'Japan', price: 6800 },
    { flight_id: 'FD301-1', depart_airport_name: 'Fukuoka Airport', depart_airport_id: 'FUK', arrival_airport_name: 'Don Mueang International Airport', arrival_airport_id: 'DMK', depart_time: '08:00', arrival_time: '12:10', country_from: 'Japan', country_to: 'Thailand', price: 7600 },
    { flight_id: 'FD301-2', depart_airport_name: 'Fukuoka Airport', depart_airport_id: 'FUK', arrival_airport_name: 'Don Mueang International Airport', arrival_airport_id: 'DMK', depart_time: '14:45', arrival_time: '19:00', country_from: 'Japan', country_to: 'Thailand', price: 7300 },
    { flight_id: 'FD301-3', depart_airport_name: 'Fukuoka Airport', depart_airport_id: 'FUK', arrival_airport_name: 'Don Mueang International Airport', arrival_airport_id: 'DMK', depart_time: '21:30', arrival_time: '01:40', country_from: 'Japan', country_to: 'Thailand', price: 6900 },
    { flight_id: 'TG650-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Chubu Centrair International Airport', arrival_airport_id: 'NGO', depart_time: '10:00', arrival_time: '14:30', country_from: 'Thailand', country_to: 'Japan', price: 11900 },
    { flight_id: 'TG650-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Chubu Centrair International Airport', arrival_airport_id: 'NGO', depart_time: '15:30', arrival_time: '20:00', country_from: 'Thailand', country_to: 'Japan', price: 11300 },
    { flight_id: 'TG650-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Chubu Centrair International Airport', arrival_airport_id: 'NGO', depart_time: '23:50', arrival_time: '04:20', country_from: 'Thailand', country_to: 'Japan', price: 10500 },
    { flight_id: 'TG651-1', depart_airport_name: 'Chubu Centrair International Airport', depart_airport_id: 'NGO', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '08:30', arrival_time: '12:50', country_from: 'Japan', country_to: 'Thailand', price: 12100 },
    { flight_id: 'TG651-2', depart_airport_name: 'Chubu Centrair International Airport', depart_airport_id: 'NGO', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '15:20', arrival_time: '19:40', country_from: 'Japan', country_to: 'Thailand', price: 11500 },
    { flight_id: 'TG651-3', depart_airport_name: 'Chubu Centrair International Airport', depart_airport_id: 'NGO', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '22:00', arrival_time: '02:10', country_from: 'Japan', country_to: 'Thailand', price: 10700 }
];

// ============================================
// INITIALIZE PAGE
// ============================================

//function init() {
    // Check if there's any booking data
    //if (!bookingReference || passengersData.length === 0) {
        // No bookings found - show message
        //showNoBookings();
       // return;
   // }
    
    // Load and display booking information
//displayBookingInfo();
//generateTickets();
//}

function getFlightById(flightId) {
    return flights.find(f => f.flight_id === flightId);
}

// ============================================
// MAIN INITIALIZATION
// ============================================
window.onload = function() {
    console.log('🎫 === BOOKING PAGE LOADING ===');
    
    // ✅ Get data from the NEW save location
    const lastBooking = JSON.parse(localStorage.getItem('lastBooking'));
    
    console.log('📦 Last Booking:', lastBooking);
    
    // Check if we have data
    if (!lastBooking || !lastBooking.passengers || lastBooking.passengers.length === 0) {
        console.log('❌ Missing data');
        showNoBookings();
        return;
    }

    // ✅ Extract data from lastBooking
    const passengers = lastBooking.passengers;
    const outboundFlight = lastBooking.outboundFlight;
    const returnFlight = lastBooking.returnFlight;
    const isRoundTrip = lastBooking.isRoundTrip;
    
    // Create payment info object
    const paymentInfo = {
        bookingRef: lastBooking.bookingReference,
        totalPassengers: lastBooking.totalPassengers,
        totalFlights: isRoundTrip ? 2 : 1,
        totalAmount: '฿' + lastBooking.totalAmount.toLocaleString(),
        paymentMethod: lastBooking.paymentMethod || 'card'
    };
    
    console.log('✅ Data extracted successfully');
    console.log('Payment Info:', paymentInfo);
    console.log('Passengers:', passengers);
    console.log('Flights:', { outbound: outboundFlight, return: returnFlight });

    // Display booking summary
    displayBookingSummary(paymentInfo);
    
    // Generate tickets with ALL services
    generateAllTickets(passengers, outboundFlight, returnFlight, isRoundTrip);
    
    console.log('✅ Booking page loaded successfully');
};

// ============================================
// DISPLAY BOOKING SUMMARY
// ============================================
function displayBookingSummary(paymentInfo) {
    document.getElementById('booking-reference').textContent = paymentInfo.bookingRef || 'N/A';
    document.getElementById('total-passengers').textContent = paymentInfo.totalPassengers || '0';
    document.getElementById('total-flights').textContent = paymentInfo.totalFlights || '0';
    document.getElementById('total-amount').textContent = paymentInfo.totalAmount || '฿0';
    document.getElementById('payment-method').textContent = (paymentInfo.paymentMethod || 'cash').toUpperCase();
}

// ============================================
// GENERATE ALL TICKETS
// ============================================
function generateAllTickets(passengers, outboundFlight, returnFlight, isRoundTrip) {
    const container = document.getElementById('tickets-container');
    container.innerHTML = '';
    
    passengers.forEach((passenger, index) => {
        // Create outbound ticket
        if (outboundFlight && passenger.departure) {
            const ticket = createTicket(passenger, outboundFlight, passenger.departure, index + 1, 'Outbound');
            container.appendChild(ticket);
        }
        
        // Create return ticket if round trip
        if (isRoundTrip && returnFlight && passenger.return) {
            const ticket = createTicket(passenger, returnFlight, passenger.return, index + 1, 'Return');
            container.appendChild(ticket);
        }
    });
}

// ============================================
// CREATE TICKET WITH ALL SERVICES
// ============================================
function createTicket(passenger, flightData, serviceData, passengerNum, tripType) {
    // Get flight details
    const flightDetails = getFlightById(flightData.flight_id || flightData.flightId);
    
    if (!flightDetails) {
        console.error('Flight not found:', flightData.flight_id);
        return document.createElement('div');
    }
    
    console.log(`🎫 Creating ticket for Passenger ${passengerNum} (${tripType}):`, {
        passenger,
        serviceData
    });
    
    // Calculate prices
    const basePrice = flightDetails.price || 0;
    const luggagePrice = serviceData.luggage?.price || 0;
    const mealPrice = serviceData.meal?.price || 0;
    const wifiPrice = serviceData.wifi?.price || 0;
    const totalPrice = basePrice + luggagePrice + mealPrice + wifiPrice;
    
    // Create ticket
    const ticket = document.createElement('div');
    ticket.className = 'ticket';
    
    ticket.innerHTML = `
        <div class="ticket-header">
            <span class="ticket-type">🎫 ${tripType} Flight Ticket</span>
            <span class="ticket-flight-id">Flight: ${flightData.flight_id || flightData.flightId}</span>
        </div>
        
        <div class="ticket-body">
            <!-- Passenger Info -->
            <div class="passenger-info">
                <div class="info-title">👤 Passenger Information</div>
                <div class="info-row">
                    <span class="info-row-label">Name:</span>
                    <span class="info-row-value">${passenger.title} ${passenger.firstName} ${passenger.lastName}</span>
                </div>
                <div class="info-row">
                    <span class="info-row-label">Passport Number:</span>
                    <span class="info-row-value">${passenger.passportNumber || 'N/A'}</span>
                </div>
                <div class="info-row">
                    <span class="info-row-label">Passenger #:</span>
                    <span class="info-row-value">${passengerNum}</span>
                </div>
            </div>

            <!-- Flight Route -->
            <div class="flight-route">
                <div class="route-airport">
                    <div class="route-time">${flightDetails.depart_time}</div>
                    <div class="route-code">${flightDetails.depart_airport_id}</div>
                    <div class="route-date">${formatDate(flightData.date || new Date())}</div>
                </div>
                <div class="route-arrow">→</div>
                <div class="route-airport">
                    <div class="route-time">${flightDetails.arrival_time}</div>
                    <div class="route-code">${flightDetails.arrival_airport_id}</div>
                    <div class="route-date">${formatDate(flightData.date || new Date())}</div>
                </div>
            </div>

            <!-- Services Information - THIS IS THE KEY PART -->
            <div class="services-info">
                <div class="info-title">📋 Booking Details</div>
                <div class="service-item">
                    <span class="service-label">💺 Seat:</span>
                    <span class="service-value">${serviceData.seat || 'Not assigned'}</span>
                </div>
                <div class="service-item">
                    <span class="service-label">🧳 Luggage:</span>
                    <span class="service-value">${serviceData.luggage?.weight || '20'} kg${luggagePrice > 0 ? ` (+฿${luggagePrice.toLocaleString()})` : ' (Included)'}</span>
                </div>
                <div class="service-item">
                    <span class="service-label">🍽️ Meal:</span>
                    <span class="service-value">${serviceData.meal?.selected ? getMealTypeName(serviceData.meal.type) + ' (+฿' + mealPrice + ')' : 'Not selected'}</span>
                </div>
                <div class="service-item">
                    <span class="service-label">📶 WiFi:</span>
                    <span class="service-value">${serviceData.wifi?.selected ? 'Yes (+฿' + wifiPrice + ')' : 'No'}</span>
                </div>
            </div>

            <!-- Ticket Price -->
            <div class="ticket-price">
                <span class="price-label">Ticket Price:</span>
                <span class="price-value">฿${totalPrice.toLocaleString()}</span>
            </div>
        </div>
    `;
    
    return ticket;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getMealTypeName(type) {
    const mealTypes = {
        'normal': 'Normal Meal',
        'vegetarian': 'Vegetarian Meal',
        'low-salt': 'Low Salt Meal',
        'diabetic': 'Diabetic Meal'
    };
    return mealTypes[type] || type;
}

function formatDate(dateString) {
    if (!dateString) return new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

function showNoBookings() {
    document.querySelector('.booking-details-card').style.display = 'none';
    document.querySelector('.tickets-section').style.display = 'none';
    document.querySelector('.action-buttons').style.display = 'none';
    document.getElementById('no-bookings').style.display = 'block';
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function goToHome() {
    window.location.href = 'search.html';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
}

function printTickets() {
    window.print();
}
