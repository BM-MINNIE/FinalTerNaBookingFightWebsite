// ============================================
// FLIGHT DATA REFERENCE
// ============================================
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
// GLOBAL VARIABLES
// ============================================
const passengersData = [];
const outboundFlightData = JSON.parse(localStorage.getItem('outboundFlight'));
const returnFlightData = JSON.parse(localStorage.getItem('returnFlight'));
const isRoundTrip = localStorage.getItem('isRoundTrip') === 'true';
const totalPassengers = parseInt(localStorage.getItem('totalPassengers')) || 1;
const currentUserId = localStorage.getItem('userId') || 1;

let selectedPaymentMethod = null;
let totalAmount = 0;

// ============================================
// INITIALIZATION
// ============================================
window.onload = function() {
    console.log('💳 Payment page loading...');
    init();
};

function init() {
    const savedData = localStorage.getItem('bookingData');
    if (savedData) {
        const data = JSON.parse(savedData);
        passengersData.push(...data);
        console.log('✅ Loaded', passengersData.length, 'passengers');
        console.log('✅ Loaded', passengersData.length, 'passengers');

        // 🔍 ADD THIS DEBUG CODE:
        console.log('═══════════════════════════════════');
        console.log('🔍 DEBUG: Loaded passengersData');
        console.log('Full data:', passengersData);
        if (passengersData[0]) {
            console.log('First passenger:', passengersData[0]);
            console.log('Departure object:', passengersData[0].departure);
            console.log('Departure seat:', passengersData[0].departure?.seat);
            console.log('Seat type:', typeof passengersData[0].departure?.seat);
        }
        console.log('═══════════════════════════════════');
    } else {
        console.error('❌ No booking data found!');
        alert('No booking data found! Please start from the beginning.');
        window.location.href = 'search.html';
        return;
    }

    generateTickets();
    updateSummary();
    console.log('✅ Payment page ready');
}

// ============================================
// HELPER FUNCTION - Format Date
// ============================================
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
}

// ============================================
// HELPER FUNCTION - Get Meal Code
// ============================================
function getMealCode(mealType) {
    if (!mealType) return '';  // ✅ Empty string for no meal (matches DB enum)
    
    // ✅ FIXED: Return values that match database ENUM
    const mealCodes = {
        'normal': 'Norm',        // Changed from 'N' to 'Norm'
        'vegetarian': 'Vegan',   // Changed from 'V' to 'Vegan'
        'low-salt': 'Low',       // Changed from 'L' to 'Low'
        'diabetic': 'Diabetic'   // Changed from 'D' to 'Diabetic'
    };
    
    return mealCodes[mealType] || '';  // Default to empty string
}

// ============================================
// GENERATE TICKETS
// ============================================
function generateTickets() {
    const container = document.getElementById('tickets-container');
    container.innerHTML = '';
    totalAmount = 0;

    passengersData.forEach((passenger, index) => {
        const departureTicket = createTicket(passenger, 'departure', index + 1);
        container.appendChild(departureTicket);

        if (isRoundTrip && returnFlightData) {
            const returnTicket = createTicket(passenger, 'return', index + 1);
            container.appendChild(returnTicket);
        }
    });

    console.log('✅ Generated tickets. Total amount:', totalAmount);
}

// ============================================
// CREATE TICKET
// ============================================
function createTicket(passenger, flightType, passengerNum) {
    const ticket = document.createElement('div');
    ticket.className = 'ticket';

    const flightData = flightType === 'departure' ? outboundFlightData : returnFlightData;
    const serviceData = passenger[flightType];
    
    const flightDetails = flights.find(f => f.flight_id === flightData.flightId);
    if (!flightDetails) {
        console.error('Flight not found:', flightData.flightId);
        return ticket;
    }

    let ticketPrice = flightData.price;
    ticketPrice += serviceData.luggage?.price || 0;
    ticketPrice += serviceData.meal?.price || 0;
    ticketPrice += serviceData.wifi?.price || 0;
    totalAmount += ticketPrice;

    const getMealTypeName = (type) => {
        const types = {
            'normal': 'Normal Meal',
            'vegetarian': 'Vegetarian Meal',
            'low-salt': 'Low Salt Meal',
            'diabetic': 'Diabetic Meal'
        };
        return types[type] || type;
    };

    ticket.innerHTML = `
        <div class="ticket-header">
            <div class="ticket-type">${flightType === 'departure' ? '✈️ Departure Flight' : '✈️ Return Flight'}</div>
            <div class="ticket-flight-id">${flightData.flightId}</div>
        </div>
        <div class="ticket-body">
            <div class="passenger-info">
                <div class="info-title">👤 Passenger Information</div>
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${passenger.title} ${passenger.firstName} ${passenger.lastName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Passport:</span>
                    <span class="info-value">${passenger.passportNumber}</span>
                </div>
            </div>

            <div class="flight-route">
                <div class="route-airport">
                    <div class="route-time">${flightDetails.depart_time}</div>
                    <div class="route-code">${flightDetails.depart_airport_id}</div>
                    <div class="route-date">${formatDate(flightData.date)}</div>
                </div>
                <div class="route-arrow">→</div>
                <div class="route-airport">
                    <div class="route-time">${flightDetails.arrival_time}</div>
                    <div class="route-code">${flightDetails.arrival_airport_id}</div>
                    <div class="route-date">${formatDate(flightData.date)}</div>
                </div>
            </div>

            <div class="services-info">
                <div class="info-title">📋 Services</div>
                <div class="service-item">
                    <span class="service-label">💺 Seat:</span>
                    <span class="service-value">${serviceData.seat || 'Not assigned'}</span>
                </div>
                <div class="service-item">
                    <span class="service-label">🧳 Luggage:</span>
                    <span class="service-value">${serviceData.luggage?.weight || 20} kg ${(serviceData.luggage?.price || 0) > 0 ? '(+฿' + (serviceData.luggage.price).toLocaleString() + ')' : ''}</span>
                </div>
                <div class="service-item">
                    <span class="service-label">🍽️ Meal:</span>
                    <span class="service-value">${serviceData.meal?.selected ? getMealTypeName(serviceData.meal.type) + ' (+฿' + serviceData.meal.price + ')' : 'Not selected'}</span>
                </div>
                <div class="service-item">
                    <span class="service-label">📶 WiFi:</span>
                    <span class="service-value">${serviceData.wifi?.selected ? 'Yes (+฿' + serviceData.wifi.price + ')' : 'No'}</span>
                </div>
            </div>

            <div class="ticket-price">
                <span class="price-label">Ticket Price:</span>
                <span class="price-value">฿${ticketPrice.toLocaleString()}</span>
            </div>
        </div>
    `;

    return ticket;
}

// ============================================
// UPDATE SUMMARY
// ============================================
function updateSummary() {
    document.getElementById('total-passengers').textContent = totalPassengers;
    
    let totalFlights = totalPassengers;
    if (isRoundTrip) {
        totalFlights *= 2;
    }
    document.getElementById('total-flights').textContent = totalFlights;
    document.getElementById('total-amount').textContent = `฿${totalAmount.toLocaleString()}`;
}

// ============================================
// SELECT PAYMENT METHOD
// ============================================

// ============================================
// ✅ ADDED: sendData FUNCTION (WAS MISSING!)
// ============================================
async function sendData(action, data) {
    try {
        console.log('═══════════════════════════════════');
        console.log(`📡 sendData CALLED with action: ${action}`);
        console.log('📡 Data to send:', JSON.stringify(data, null, 2));
        console.log(`📡 URL: api.php?action=${action}`);
        console.log('═══════════════════════════════════');
        
        const response = await fetch(`api.php?action=${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        console.log(`📡 Response status: ${response.status}`);
        console.log(`📡 Response ok: ${response.ok}`);
        
        const responseText = await response.text();
        console.log('📡 Raw response:', responseText);
        
        const result = JSON.parse(responseText);
        console.log('📡 Parsed response:', result);
        
        if (!result.success) {
            throw new Error(result.message || 'API request failed');
        }
        
        return result;
    } catch (error) {
        console.error('═══════════════════════════════════');
        console.error(`❌ ERROR in sendData(${action}):`, error);
        console.error('Error type:', error.constructor.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('═══════════════════════════════════');
        throw error;
    }
}
function selectPayment(method) {
    selectedPaymentMethod = method;
    console.log('✅ Selected payment method:', method);
    
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.closest('.payment-option').classList.add('selected');
    
    document.getElementById('confirm-btn').disabled = false;
}

// ============================================
// CONFIRM PAYMENT - COMPLETE 3-TABLE SYSTEM
// ============================================
// ============================================
// COMPLETE DEBUG VERSION - payment-script.js
// Replace ENTIRE confirmPayment function (line 223-380)
// ============================================

async function confirmPayment() {
    console.log('💳 Confirming payment...');
    
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert("⚠️ Please select a payment method before confirming!");
        return;
    }

    const paymentMethod = selectedPayment.value;
    const bookingRef = "BK" + Date.now();
    
    console.log('Payment method:', paymentMethod);
    console.log('Total amount:', totalAmount);

    const confirmBtn = document.getElementById('confirm-btn');
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Processing...';

    try {
        // ============================================
        // 🔍 SUPER DEBUG - CHECK ALL DATA
        // ============================================
        console.log('═══════════════════════════════════');
        console.log('🔍 COMPLETE DATA CHECK');
        console.log('═══════════════════════════════════');
        console.log('Current User ID:', currentUserId);
        console.log('Outbound Flight:', outboundFlightData);
        console.log('Return Flight:', returnFlightData);
        console.log('Is Round Trip:', isRoundTrip);
        console.log('Passengers Data:', passengersData);
        console.log('Number of Passengers:', passengersData.length);
        
        // Check first passenger in detail
        if (passengersData.length > 0) {
            console.log('─────────────────────────────────');
            console.log('First Passenger Details:');
            console.log('Full Object:', passengersData[0]);
            console.log('First Name:', passengersData[0].firstName);
            console.log('Last Name:', passengersData[0].lastName);
            console.log('Passport:', passengersData[0].passportNumber);
            console.log('Departure Object:', passengersData[0].departure);
            
            if (passengersData[0].departure) {
                console.log('Departure Seat:', passengersData[0].departure.seat);
                console.log('Departure Luggage:', passengersData[0].departure.luggage);
                console.log('Departure Meal:', passengersData[0].departure.meal);
                console.log('Departure WiFi:', passengersData[0].departure.wifi);
            } else {
                console.error('❌ NO DEPARTURE DATA!');
            }
            
            if (passengersData[0].return) {
                console.log('Return Seat:', passengersData[0].return.seat);
            }
        } else {
            console.error('❌ NO PASSENGERS DATA!');
        }
        console.log('═══════════════════════════════════');
        
        const bookingIds = [];
        
        // ============================================
        // STEP 1: CREATE BOOKING(S) - ONE PER PASSENGER
        // ============================================
        console.log('📝 Step 1: Creating bookings for each passenger...');
        console.log(`Total passengers: ${passengersData.length}`);
        
        // ✅ FIXED: Create 1 booking per passenger (not just 1 booking total)
        for (let i = 0; i < passengersData.length; i++) {
            const passenger = passengersData[i];
            
            console.log(`\n--- Passenger ${i + 1}/${passengersData.length} ---`);
            console.log('Name:', passenger.firstName, passenger.lastName);
            
            // Departure booking for this passenger
            if (passenger.departure) {
                const departureSeat = passenger.departure.seat || null;
                console.log('Departure seat:', departureSeat);
                
                const departureBookingData = {
                    user_id: currentUserId,
                    flight_id: outboundFlightData.flightId,
                    seat_id: departureSeat
                };
                
                const departureResult = await sendData('addBooking', departureBookingData);
                
                if (departureResult.success) {
                    bookingIds.push({ 
                        type: 'departure', 
                        id: departureResult.booking_id,
                        passengerIndex: i
                    });
                    console.log(`✅ Departure booking created for passenger ${i + 1}: ${departureResult.booking_id}`);
                } else {
                    console.error(`❌ Departure booking failed for passenger ${i + 1}:`, departureResult.message);
                    throw new Error(`Failed to create departure booking for passenger ${i + 1}: ` + departureResult.message);
                }
            }
            
            // Return booking for this passenger (if round trip)
            if (isRoundTrip && returnFlightData && passenger.return) {
                const returnSeat = passenger.return.seat || null;
                console.log('Return seat:', returnSeat);
                
                const returnBookingData = {
                    user_id: currentUserId,
                    flight_id: returnFlightData.flightId,
                    seat_id: returnSeat
                };
                
                const returnResult = await sendData('addBooking', returnBookingData);
                
                if (returnResult.success) {
                    bookingIds.push({ 
                        type: 'return', 
                        id: returnResult.booking_id,
                        passengerIndex: i
                    });
                    console.log(`✅ Return booking created for passenger ${i + 1}: ${returnResult.booking_id}`);
                } else {
                    console.error(`❌ Return booking failed for passenger ${i + 1}:`, returnResult.message);
                    throw new Error(`Failed to create return booking for passenger ${i + 1}: ` + returnResult.message);
                }
            }
        }
        
        console.log('\n✅ All bookings created:', bookingIds);
        console.log(`Total bookings: ${bookingIds.length}`);
        
        // ============================================
        // STEP 2: CREATE PASSENGERS
        // ============================================
        console.log('\n👥 Step 2: Creating passengers...');
        
        for (let i = 0; i < passengersData.length; i++) {
            const passenger = passengersData[i];
            
            console.log(`\n--- Linking Passenger ${i + 1} to their bookings ---`);
            
            // ✅ FIXED: Find the booking for THIS SPECIFIC PASSENGER
            const departureBooking = bookingIds.find(b => b.type === 'departure' && b.passengerIndex === i);
            
            if (departureBooking) {
                const departurePassengerData = {
                    booking_id: departureBooking.id,
                    flight_id: outboundFlightData.flightId,
                    fname: passenger.firstName,
                    lname: passenger.lastName,
                    passport_no: passenger.passportNumber,
                    seat_no: passenger.departure.seat || 'Not assigned',
                    luggage_weight: parseInt(passenger.departure.luggage?.weight) || 20,
                    Meal: getMealCode(passenger.departure.meal?.type),
                    Wifi: passenger.departure.wifi?.selected ? 1 : 0
                };
                
                console.log(`📤 Creating departure passenger ${i + 1} for booking ${departureBooking.id}`);
                
                const departurePassResult = await sendData('addPassenger', departurePassengerData);
                
                if (departurePassResult.success) {
                    console.log(`✅ Departure passenger ${i + 1} created (passenger_id: ${departurePassResult.passenger_id})`);
                } else {
                    console.error(`❌ Failed to create departure passenger ${i + 1}:`, departurePassResult.message);
                    throw new Error(`Failed to create departure passenger ${i + 1}`);
                }
            }
            
            // Return passenger (if round trip)
            if (isRoundTrip && returnFlightData) {
                // ✅ FIXED: Find the return booking for THIS SPECIFIC PASSENGER
                const returnBooking = bookingIds.find(b => b.type === 'return' && b.passengerIndex === i);
                
                if (returnBooking) {
                    const returnPassengerData = {
                        booking_id: returnBooking.id,
                        flight_id: returnFlightData.flightId,
                        fname: passenger.firstName,
                        lname: passenger.lastName,
                        passport_no: passenger.passportNumber,
                        seat_no: passenger.return.seat || 'Not assigned',
                        luggage_weight: parseInt(passenger.return.luggage?.weight) || 20,
                        Meal: getMealCode(passenger.return.meal?.type),
                        Wifi: passenger.return.wifi?.selected ? 1 : 0
                    };
                    
                    console.log(`📤 Creating return passenger ${i + 1} for booking ${returnBooking.id}`);
                    
                    const returnPassResult = await sendData('addPassenger', returnPassengerData);
                    
                    if (returnPassResult.success) {
                        console.log(`✅ Return passenger ${i + 1} created (passenger_id: ${returnPassResult.passenger_id})`);
                    } else {
                        console.error(`❌ Failed to create return passenger ${i + 1}:`, returnPassResult.message);
                        throw new Error(`Failed to create return passenger ${i + 1}`);
                    }
                }
            }
        }
        
        // ============================================
        // STEP 3: CREATE PAYMENT FOR EACH BOOKING
        // ============================================
        console.log('💳 Step 3: Creating payments...');
        
        for (const booking of bookingIds) {
            const paymentData = {
                booking_id: booking.id,
                amount: totalAmount,
                payment_status: 'Paid'
            };
            
            console.log(`📤 Creating payment for booking ${booking.id}:`, paymentData);
            
            const paymentResult = await sendData('addPayment', paymentData);
            
            console.log(`📥 Payment response:`, paymentResult);
            
            if (paymentResult.success) {
                console.log(`✅ Payment created for booking ${booking.id}`);
            } else {
                console.error(`❌ Failed to create payment for booking ${booking.id}:`, paymentResult.message);
            }
        }
        
        // ============================================
        // SUCCESS!
        // ============================================
        console.log('🎉 All operations completed!');
        
        // ✅ SAVE booking info for bookings page BEFORE clearing
        const bookingSummary = {
            bookingReference: bookingRef,
            bookingIds: bookingIds,
            totalAmount: totalAmount,
            paymentMethod: selectedPaymentMethod,
            passengers: passengersData,
            outboundFlight: outboundFlightData,
            returnFlight: returnFlightData,
            isRoundTrip: isRoundTrip,
            totalPassengers: totalPassengers,
            bookingDate: new Date().toISOString()
        };
        
        // Save to different key that won't be cleared
        localStorage.setItem('lastBooking', JSON.stringify(bookingSummary));
        localStorage.setItem('bookingReference', bookingRef);
        localStorage.setItem('bookingAmount', totalAmount);
        localStorage.setItem('paymentMethod', selectedPaymentMethod);
        
        console.log('💾 Saved booking summary for bookings page');
        
        alert(`✅ Booking Confirmed!\n\nBooking Reference: ${bookingRef}\n\nThank you for your booking!`);
        
        // Clear OLD data
        localStorage.removeItem('bookingData');
        localStorage.removeItem('outboundFlight');
        localStorage.removeItem('returnFlight');
        localStorage.removeItem('totalBookingPrice');
        
        // Redirect
        window.location.href = 'bookings.html';
        
    } catch (error) {
        console.error('═══════════════════════════════════');
        console.error('❌ BOOKING FAILED!');
        console.error('Error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('═══════════════════════════════════');
        
        alert('❌ Booking failed: ' + error.message + '\n\nPlease check console for details.');
        
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Confirm Payment';
    }
}

// ============================================
// INSTRUCTIONS:
// 1. Replace the ENTIRE confirmPayment function with this
// 2. Save file
// 3. Clear browser cache
// 4. Try booking again
// 5. Open Console (F12)
// 6. Take screenshot of ENTIRE console output
// 7. Send me the screenshot!
// ============================================