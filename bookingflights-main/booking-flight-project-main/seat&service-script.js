// ============================================
// LOAD BOOKING DATA FROM PREVIOUS PAGE
// ============================================

// Get flight data from localStorage (set by search page)
const passengerCounts = JSON.parse(localStorage.getItem('passengerCounts')) || { adult: 1, child: 0, infant: 0 };
const outboundFlightData = JSON.parse(localStorage.getItem('outboundFlight'));
const returnFlightData = JSON.parse(localStorage.getItem('returnFlight'));
const isRoundTrip = localStorage.getItem('isRoundTrip') === 'true';

// ✅ NEW: Load pre-selected services from search page
const preSelectedServices = JSON.parse(localStorage.getItem('selectedServices')) || null;

console.log('📦 Pre-selected services from search page:', preSelectedServices);

// Calculate total passengers
const totalPassengers = parseInt(localStorage.getItem('totalPassengers')) || 1;

// Current state tracking
let currentPassengerIndex = 0;
let currentFlightType = 'departure';

// ============================================
// DATA STORAGE FOR ALL PASSENGERS & FLIGHTS
// ============================================

const passengersData = [];

// ✅ FIXED: Initialize with pre-selected services if they exist
for (let i = 0; i < totalPassengers; i++) {
    // Default services (if nothing was pre-selected)
    const defaultLuggage = { weight: '20', price: 0 };
    const defaultMeal = { selected: false, type: '', price: 0 };
    const defaultWifi = { selected: false, price: 0 };
    
    // Use pre-selected services if available, otherwise use defaults
    const luggageData = preSelectedServices?.luggage || defaultLuggage;
    const mealData = preSelectedServices?.meal || defaultMeal;
    const wifiData = preSelectedServices?.wifi || defaultWifi;
    
    passengersData.push({
        title: '',
        firstName: '',
        lastName: '',
        passportNumber: '',
        
        // Departure flight - uses pre-selected or defaults
        departure: {
            seat: null,
            luggage: { ...luggageData },
            meal: { ...mealData },
            wifi: { ...wifiData }
        },
        
        // Return flight - uses pre-selected or defaults
        return: {
            seat: null,
            luggage: { ...luggageData },
            meal: { ...mealData },
            wifi: { ...wifiData }
        }
    });
}

console.log('👥 Initialized passengers with services:', passengersData);

// ... rest of your existing code stays the same ...

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Show flight tabs only if round trip
    if (isRoundTrip) {
        document.getElementById('flight-tabs').style.display = 'flex';
    }
    
    generatePassengerTabs();
    generatePassengerForms();
    generateSeatMap();
    showPassenger(0);
    setupLuggageListeners();
    setupServiceListeners();
    updateFlightInfoBanner();
}

// ============================================
// FLIGHT SWITCHING (for Round Trip)
// ============================================

function switchFlight(flightType) {
    // Save current passenger data before switching
    saveCurrentPassengerData();
    
    // Update current flight type
    currentFlightType = flightType;
    
    // Update flight tabs visual
    document.querySelectorAll('.flight-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${flightType}-tab`).classList.add('active');
    
    // Update flight info banner
    updateFlightInfoBanner();
    
    // Reload current passenger data for new flight
    loadPassengerData(currentPassengerIndex);
    
    // Regenerate seat map (different occupied seats for different flights)
    generateSeatMap();
}

// Update the banner showing current flight info
function updateFlightInfoBanner() {
    const banner = document.getElementById('current-flight-info');
    
    if (currentFlightType === 'departure' && outboundFlightData) {
        banner.innerHTML = `Departure Flight: ${outboundFlightData.flightId} on ${formatDate(outboundFlightData.date)}`;
        banner.style.display = 'block';
    } else if (currentFlightType === 'return' && returnFlightData) {
        banner.innerHTML = `Return Flight: ${returnFlightData.flightId} on ${formatDate(returnFlightData.date)}`;
        banner.style.display = 'block';
    } else {
        banner.style.display = 'none';
    }
}

// ============================================
// PASSENGER TABS GENERATION
// ============================================

function generatePassengerTabs() {
    const tabsContainer = document.getElementById('passenger-tabs');
    tabsContainer.innerHTML = '';  // Clear existing
    
    for (let i = 0; i < totalPassengers; i++) {
        const tab = document.createElement('div');
        tab.className = 'passenger-tab';
        if (i === 0) tab.classList.add('active');
        tab.textContent = `Passenger ${i + 1}`;
        tab.onclick = () => switchToPassenger(i);
        tabsContainer.appendChild(tab);
    }
}

// ============================================
// PASSENGER FORMS GENERATION
// ============================================

function generatePassengerForms() {
    const formsContainer = document.getElementById('passenger-forms');
    formsContainer.innerHTML = '';  // Clear existing
    
    for (let i = 0; i < totalPassengers; i++) {
        const form = document.createElement('div');
        form.className = 'passenger-form';
        if (i === 0) form.classList.add('active');
        form.id = `passenger-form-${i}`;
        
        form.innerHTML = `
            <h2>Passenger ${i + 1} Information</h2>
            <div class="form-grid">
                <div class="form-group">
                    <label>Title *</label>
                    <select id="title-${i}" required>
                        <option value="">Select title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>First Name *</label>
                    <input type="text" id="firstname-${i}" placeholder="Enter first name" required>
                </div>
                <div class="form-group">
                    <label>Last Name *</label>
                    <input type="text" id="lastname-${i}" placeholder="Enter last name" required>
                </div>
                <div class="form-group">
                    <label>Passport Number *</label>
                    <input type="text" id="passport-${i}" placeholder="Enter passport number" required>
                </div>
            </div>
        `;
        
        formsContainer.appendChild(form);
    }
}

// ============================================
// SEAT MAP GENERATION
// ============================================

function generateSeatMap() {
    const seatMap = document.getElementById('seat-map');
    seatMap.innerHTML = '';  // Clear existing seats
    
    const rows = 32;  // 32 rows of seats
    const columns = ['A', 'B', 'C', '', 'D', 'E', 'F'];  // Empty string = aisle
    
    // Pre-occupied seats (simulating already booked seats by other customers)
    // Different seats are occupied for departure vs return flight
    const occupiedSeats = currentFlightType === 'departure' 
        ? ['1B', '2A', '3E', '5C', '7D', '8F', '10A', '12E', '15B', '18C', '20D', '22F', '25A', '28E']
        : ['2C', '4A', '6E', '8B', '11D', '13F', '16A', '19E', '21B', '24C', '26D', '29F', '31A'];
    
    // Generate seat map
    for (let row = 1; row <= rows; row++) {
        // Row number label
        const rowNum = document.createElement('div');
        rowNum.className = 'row-number';
        rowNum.textContent = row;
        seatMap.appendChild(rowNum);
        
        // Generate seats in this row
        columns.forEach(col => {
            if (col === '') {
                // Aisle (empty space between seats)
                const aisle = document.createElement('div');
                aisle.className = 'aisle';
                seatMap.appendChild(aisle);
            } else {
                // Create seat
                const seatId = `${row}${col}`;
                const seat = document.createElement('div');
                seat.className = 'seat';
                seat.textContent = seatId;
                seat.dataset.seat = seatId;
                
                // Check if seat is pre-occupied by system
                if (occupiedSeats.includes(seatId)) {
                    seat.classList.add('occupied');
                } else {
                    // Make seat clickable if not occupied
                    seat.onclick = () => selectSeat(seatId);
                }
                
                seatMap.appendChild(seat);
            }
        });
    }
    
    // Update visual display of selected seats
    updateSeatDisplay();
}

// ============================================
// SEAT SELECTION
// ============================================

function selectSeat(seatId) {
    // Get current passenger data for current flight
    const passenger = passengersData[currentPassengerIndex];
    const flightData = passenger[currentFlightType];
    
    // Check if seat is occupied (pre-booked by system)
    const seatElement = document.querySelector(`.seat[data-seat="${seatId}"]`);
    if (seatElement.classList.contains('occupied')) {
        alert('This seat is already occupied!');
        return;
    }
    
    // Check if seat is already taken by another passenger (in current booking, current flight)
    const takenBySomeone = passengersData.some((p, idx) => 
        idx !== currentPassengerIndex && p[currentFlightType].seat === seatId
    );
    
    if (takenBySomeone) {
        alert('This seat is already selected by another passenger in your booking!');
        return;
    }
    
    // Update passenger's seat selection
    flightData.seat = seatId;
    
    // Update visual display
    updateSeatDisplay();
    updateSelectedSeatsInfo();
}

// Update visual display of all seats
function updateSeatDisplay() {
    const allSeats = document.querySelectorAll('.seat');
    
    allSeats.forEach(seat => {
        const seatId = seat.dataset.seat;
        
        // Don't modify occupied seats (pre-booked by system)
        if (seat.classList.contains('occupied')) {
            return;
        }
        
        // Remove all selection classes first
        seat.classList.remove('selected', 'taken');
        
        // Check if this seat is selected by any passenger in current flight
        passengersData.forEach((p, idx) => {
            if (p[currentFlightType].seat === seatId) {
                if (idx === currentPassengerIndex) {
                    // Current passenger's seat
                    seat.classList.add('selected');
                } else {
                    // Another passenger's seat in this booking
                    seat.classList.add('taken');
                }
            }
        });
    });
}

// Update the info banner showing all selected seats
function updateSelectedSeatsInfo() {
    const infoDiv = document.getElementById('selected-seats-info');
    
    // Get all selected seats for current flight
    const selectedSeats = passengersData
        .map((p, idx) => p[currentFlightType].seat ? `Passenger ${idx + 1}: ${p[currentFlightType].seat}` : null)
        .filter(s => s !== null);
    
    if (selectedSeats.length > 0) {
        infoDiv.textContent = `Selected Seats: ${selectedSeats.join(' | ')}`;
        infoDiv.style.display = 'block';
    } else {
        infoDiv.style.display = 'none';
    }
}

// ============================================
// LUGGAGE SELECTION LISTENERS
// ============================================

function setupLuggageListeners() {
    // Listen for luggage radio button changes
    document.querySelectorAll('input[name="luggage-current"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Update visual selection
            document.querySelectorAll('#luggage-options .option-card').forEach(card => {
                card.classList.remove('selected');
            });
            this.parentElement.classList.add('selected');
            
            // Save luggage data for current passenger and flight
            const passenger = passengersData[currentPassengerIndex];
            passenger[currentFlightType].luggage = {
                weight: this.value,
                price: parseInt(this.dataset.price)
            };
        });
    });
}

// ============================================
// SERVICE SELECTION LISTENERS
// ============================================

function setupServiceListeners() {
    // MEAL SERVICE
    const mealCheckbox = document.getElementById('meal-service-current');
    const mealDropdown = document.getElementById('meal-dropdown');
    const mealTypeSelect = document.getElementById('meal-type-current');
    const serviceCard = mealCheckbox.closest('.service-card');
    
    mealCheckbox.addEventListener('change', function() {
        const passenger = passengersData[currentPassengerIndex];
        const flightData = passenger[currentFlightType];
        
        if (this.checked) {
            // Meal selected
            mealDropdown.classList.add('active');
            serviceCard.classList.add('active');
            flightData.meal.selected = true;
            flightData.meal.price = 100;
        } else {
            // Meal deselected
            mealDropdown.classList.remove('active');
            serviceCard.classList.remove('active');
            mealTypeSelect.value = '';
            flightData.meal.selected = false;
            flightData.meal.type = '';
            flightData.meal.price = 0;
        }
    });
    
    mealTypeSelect.addEventListener('change', function() {
        const passenger = passengersData[currentPassengerIndex];
        passenger[currentFlightType].meal.type = this.value;
    });
    
    // WIFI SERVICE
    const wifiCheckbox = document.getElementById('wifi-service-current');
    const wifiServiceCard = wifiCheckbox.closest('.service-card');
    
    wifiCheckbox.addEventListener('change', function() {
        const passenger = passengersData[currentPassengerIndex];
        const flightData = passenger[currentFlightType];
        
        if (this.checked) {
            wifiServiceCard.classList.add('active');
            flightData.wifi.selected = true;
            flightData.wifi.price = 500;
        } else {
            wifiServiceCard.classList.remove('active');
            flightData.wifi.selected = false;
            flightData.wifi.price = 0;
        }
    });
}

// ============================================
// PASSENGER NAVIGATION
// ============================================

function showPassenger(index) {
    // Update current passenger index
    currentPassengerIndex = index;
    
    // Update passenger forms visibility
    document.querySelectorAll('.passenger-form').forEach((form, i) => {
        form.classList.toggle('active', i === index);
    });
    
    // Update passenger tabs
    document.querySelectorAll('.passenger-tab').forEach((tab, i) => {
        tab.classList.remove('active');
        if (i === index) tab.classList.add('active');
    });
    
    // Update section titles to show current passenger
    document.getElementById('current-passenger-seat').textContent = `Passenger ${index + 1}`;
    document.getElementById('current-passenger-luggage').textContent = `Passenger ${index + 1}`;
    document.getElementById('current-passenger-services').textContent = `Passenger ${index + 1}`;
    
    // Load passenger data into forms
    loadPassengerData(index);
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Update seat display
    updateSeatDisplay();
    updateSelectedSeatsInfo();
}

// Load passenger data into form fields
function loadPassengerData(index) {
    const passenger = passengersData[index];
    const flightData = passenger[currentFlightType];
    
    // Load personal info (same for all flights)
    document.getElementById(`title-${index}`).value = passenger.title;
    document.getElementById(`firstname-${index}`).value = passenger.firstName;
    document.getElementById(`lastname-${index}`).value = passenger.lastName;
    document.getElementById(`passport-${index}`).value = passenger.passportNumber;
    
    // Load luggage selection for current flight
    document.querySelectorAll('input[name="luggage-current"]').forEach(r => r.checked = false);
    document.querySelectorAll('#luggage-options .option-card').forEach(c => c.classList.remove('selected'));
    
    const luggageRadio = document.querySelector(`input[name="luggage-current"][value="${flightData.luggage.weight}"]`);
    if (luggageRadio) {
        luggageRadio.checked = true;
        luggageRadio.parentElement.classList.add('selected');
    }
    
    // Load meal selection for current flight
    const mealCheckbox = document.getElementById('meal-service-current');
    const mealDropdown = document.getElementById('meal-dropdown');
    const mealTypeSelect = document.getElementById('meal-type-current');
    const mealServiceCard = mealCheckbox.closest('.service-card');
    
    mealCheckbox.checked = flightData.meal.selected;
    mealTypeSelect.value = flightData.meal.type;
    
    if (flightData.meal.selected) {
        mealDropdown.classList.add('active');
        mealServiceCard.classList.add('active');
    } else {
        mealDropdown.classList.remove('active');
        mealServiceCard.classList.remove('active');
    }
    
    // Load WiFi selection for current flight
    const wifiCheckbox = document.getElementById('wifi-service-current');
    const wifiServiceCard = wifiCheckbox.closest('.service-card');
    
    wifiCheckbox.checked = flightData.wifi.selected;
    
    if (flightData.wifi.selected) {
        wifiServiceCard.classList.add('active');
    } else {
        wifiServiceCard.classList.remove('active');
    }
}

// Save current passenger data from form fields
function saveCurrentPassengerData() {
    const index = currentPassengerIndex;
    const passenger = passengersData[index];
    
    // Save personal info (same for all flights)
    passenger.title = document.getElementById(`title-${index}`).value;
    passenger.firstName = document.getElementById(`firstname-${index}`).value;
    passenger.lastName = document.getElementById(`lastname-${index}`).value;
    passenger.passportNumber = document.getElementById(`passport-${index}`).value;
}

// Validate current passenger data before proceeding
function validateCurrentPassenger() {
    const index = currentPassengerIndex;
    const passenger = passengersData[index];
    const flightData = passenger[currentFlightType];
    
    // Save current data first
    saveCurrentPassengerData();
    
    // Check required fields
    if (!passenger.title || !passenger.firstName || !passenger.lastName || !passenger.passportNumber) {
        alert('Please fill in all passenger information fields.');
        return false;
    }
    
    // Check seat selection
    if (!flightData.seat) {
        alert(`Please select a seat for this passenger on the ${currentFlightType} flight.`);
        return false;
    }
    
    // Check meal type if meal is selected
    if (flightData.meal.selected && !flightData.meal.type) {
        alert('Please select a meal type.');
        return false;
    }
    
    return true;
}

// Switch to a different passenger (via tabs)
function switchToPassenger(index) {
    if (index === currentPassengerIndex) return;
    
    // Save current passenger data
    saveCurrentPassengerData();
    
    // Switch to new passenger
    showPassenger(index);
}

// Go to next passenger
function nextPassenger() {
    // Validate before proceeding
    if (!validateCurrentPassenger()) return;
    
    // Mark current passenger as completed for current flight
    const passengerTab = document.querySelectorAll('.passenger-tab')[currentPassengerIndex];
    
    // Check if this passenger is complete for ALL required flights
    const passenger = passengersData[currentPassengerIndex];
    const isDepartureComplete = passenger.departure.seat !== null;
    const isReturnComplete = !isRoundTrip || passenger.return.seat !== null;
    
    if (isDepartureComplete && isReturnComplete) {
        passengerTab.classList.add('completed');
    }
    
    // Move to next passenger if not last
    if (currentPassengerIndex < totalPassengers - 1) {
        showPassenger(currentPassengerIndex + 1);
    }
}

// Go to previous passenger
function previousPassenger() {
    saveCurrentPassengerData();
    if (currentPassengerIndex > 0) {
        showPassenger(currentPassengerIndex - 1);
    }
}

// Update navigation button visibility
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const reviewBtn = document.getElementById('review-btn');
    
    // Show/hide previous button
    if (currentPassengerIndex === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }
    
    // Show/hide next vs review button
    if (currentPassengerIndex === totalPassengers - 1) {
        nextBtn.style.display = 'none';
        reviewBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        reviewBtn.style.display = 'none';
    }
}

// ============================================
// BOOKING REVIEW & CONFIRMATION
// ============================================

// Replace your reviewBooking() function with this:

function reviewBooking() {
    // Validate last passenger
    if (!validateCurrentPassenger()) return;
    
    // Check if ALL passengers have completed ALL required flights
    for (let i = 0; i < totalPassengers; i++) {
        const passenger = passengersData[i];
        
        // Check departure flight
        if (!passenger.departure.seat) {
            alert(`Passenger ${i + 1} has not selected a seat for the departure flight!`);
            showPassenger(i);
            if (isRoundTrip) switchFlight('departure');
            return;
        }
        
        // Check return flight (if round trip)
        if (isRoundTrip && !passenger.return.seat) {
            alert(`Passenger ${i + 1} has not selected a seat for the return flight!`);
            showPassenger(i);
            switchFlight('return');
            return;
        }
    }
    
    // Save all booking data to localStorage
    localStorage.setItem('bookingData', JSON.stringify(passengersData));
    
    // Calculate and save total price
    let totalPrice = 0;
    passengersData.forEach((passenger) => {
        // Departure flight cost
        totalPrice += outboundFlightData.price + 
                     passenger.departure.luggage.price + 
                     passenger.departure.meal.price + 
                     passenger.departure.wifi.price;
        
        // Return flight cost (if round trip)
        if (isRoundTrip && returnFlightData) {
            totalPrice += returnFlightData.price + 
                         passenger.return.luggage.price + 
                         passenger.return.meal.price + 
                         passenger.return.wifi.price;
        }
    });
    
    localStorage.setItem('totalBookingPrice', totalPrice);
    
    // Redirect directly to payment page
    window.location.href = 'payment.html';
}

function generateBookingSummary() {
    const summaryContent = document.getElementById('summary-content');
    let totalPrice = 0;
    let html = '';
    
    // Generate summary for each passenger
    passengersData.forEach((passenger, index) => {
        html += `
            <div class="passenger-summary">
                <h3>Passenger ${index + 1}: ${passenger.title} ${passenger.firstName} ${passenger.lastName}</h3>
                <div class="summary-item">
                    <span class="summary-label">Passport Number:</span>
                    <span class="summary-value">${passenger.passportNumber}</span>
                </div>
        `;
        
        // DEPARTURE FLIGHT
        const departurePrice = outboundFlightData.price + passenger.departure.luggage.price + 
                              passenger.departure.meal.price + passenger.departure.wifi.price;
        totalPrice += departurePrice;
        
        html += `
                <div class="summary-item" style="margin-top: 15px; font-weight: 600; color: #2e59a7;">
                    <span class="summary-label">✈️ Departure Flight (${outboundFlightData.flightId}):</span>
                    <span class="summary-value"></span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Seat:</span>
                    <span class="summary-value">${passenger.departure.seat}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Luggage:</span>
                    <span class="summary-value">${passenger.departure.luggage.weight} kg ${passenger.departure.luggage.price > 0 ? `(+฿${passenger.departure.luggage.price.toLocaleString()})` : '(Included)'}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Meal:</span>
                    <span class="summary-value">${passenger.departure.meal.selected ? `${getMealTypeName(passenger.departure.meal.type)} (+฿${passenger.departure.meal.price})` : 'Not selected'}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">WiFi:</span>
                    <span class="summary-value">${passenger.departure.wifi.selected ? `Yes (+฿${passenger.departure.wifi.price})` : 'No'}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Subtotal:</span>
                    <span class="summary-value">฿${departurePrice.toLocaleString()}</span>
                </div>
        `;
        
        // RETURN FLIGHT (if round trip)
        if (isRoundTrip && returnFlightData) {
            const returnPrice = returnFlightData.price + passenger.return.luggage.price + 
                               passenger.return.meal.price + passenger.return.wifi.price;
            totalPrice += returnPrice;
            
            html += `
                <div class="summary-item" style="margin-top: 15px; font-weight: 600; color: #2e59a7;">
                    <span class="summary-label">✈️ Return Flight (${returnFlightData.flightId}):</span>
                    <span class="summary-value"></span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Seat:</span>
                    <span class="summary-value">${passenger.return.seat}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Luggage:</span>
                    <span class="summary-value">${passenger.return.luggage.weight} kg ${passenger.return.luggage.price > 0 ? `(+฿${passenger.return.luggage.price.toLocaleString()})` : '(Included)'}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Meal:</span>
                    <span class="summary-value">${passenger.return.meal.selected ? `${getMealTypeName(passenger.return.meal.type)} (+฿${passenger.return.meal.price})` : 'Not selected'}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">WiFi:</span>
                    <span class="summary-value">${passenger.return.wifi.selected ? `Yes (+฿${passenger.return.wifi.price})` : 'No'}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Subtotal:</span>
                    <span class="summary-value">฿${returnPrice.toLocaleString()}</span>
                </div>
            `;
        }
        
        html += `</div>`;
    });
    
    summaryContent.innerHTML = html;
    document.getElementById('total-price').textContent = `฿${totalPrice.toLocaleString()}`;
}

// Get meal type display name
function getMealTypeName(type) {
    const mealTypes = {
        'normal': 'Normal Meal',
        'vegetarian': 'Vegetarian Meal',
        'low-salt': 'Low Salt Meal',
        'diabetic': 'Diabetic Meal'
    };
    return mealTypes[type] || type;
}

// Cancel booking and return to search
function cancelBooking() {
    if (confirm('Are you sure you want to cancel? All information will be lost.')) {
        window.location.href = 'search.html';
    }
}

// Confirm booking
function confirmBooking() {
    // Calculate total price from summary
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = totalPriceElement.textContent.replace(/[฿,]/g, '');
    localStorage.setItem('totalBookingPrice', totalPrice);
    
    // Save all booking data
    localStorage.setItem('bookingData', JSON.stringify(passengersData));
    
    // Redirect to payment page
    window.location.href = 'payment.html';
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ============================================
// START APPLICATION
// ============================================

// Initialize when page loads
init();
