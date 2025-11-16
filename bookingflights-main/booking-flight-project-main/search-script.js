// ==========================================
// 🔐 USER AUTHENTICATION - ADD THIS AT THE VERY TOP!
// ==========================================
// This code MUST be the FIRST thing in search-script.js
// Add it BEFORE the "// Flight data with prices" comment

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Checking for user login data...');
    
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if user data is in URL (coming from login.php)
    if (urlParams.has('userId')) {
        const userId = urlParams.get('userId');
        const userFirstname = urlParams.get('userFirstname');
        const userLastname = urlParams.get('userLastname');
        const userEmail = urlParams.get('userEmail');
        const userRole = urlParams.get('userRole');
        
        console.log('✅ User data found in URL!');
        console.log('   User ID:', userId);
        console.log('   Name:', userFirstname, userLastname);
        
        // Save to localStorage
        localStorage.setItem('userId', userId);
        localStorage.setItem('userFirstname', userFirstname);
        localStorage.setItem('userLastname', userLastname);
        localStorage.setItem('userName', userFirstname + ' ' + userLastname);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userRole', userRole);
        
        console.log('✅ User logged in:', userFirstname, userLastname);
        console.log('📝 User ID saved:', userId);
        
        // Clean URL (remove parameters for security)
        window.history.replaceState({}, document.title, window.location.pathname);
        console.log('✅ URL cleaned');
    } else {
        console.log('ℹ️ No URL parameters (user already logged in or direct access)');
    }
    
    // Display user's first name on the page
    const userFirstname = localStorage.getItem('userFirstname') || 'User';
    const userNameElement = document.getElementById('user-firstname');
    
    if (userNameElement) {
        userNameElement.textContent = userFirstname;
        console.log('✅ Name displayed on page:', userFirstname);
    } else {
        console.error('❌ Element #user-firstname not found!');
    }
    
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.warn('⚠️ No user logged in');
        // Uncomment below to force redirect to login
        // alert('Please login first');
        // window.location.href = 'index.html';
    } else {
        console.log('✅ User is logged in with ID:', userId);
    }
});

// ==========================================
// YOUR ORIGINAL CODE STARTS HERE
// ==========================================

// Flight data with prices
const flights = [
  // ✈️ Bangkok (BKK) → Kansai (KIX)
{ flight_id: 'TG640-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '08:30', arrival_time: '13:45', country_from: 'Thailand', country_to: 'Japan', price: 12500 },
{ flight_id: 'TG640-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '13:20', arrival_time: '18:30', country_from: 'Thailand', country_to: 'Japan', price: 11800 },
{ flight_id: 'TG640-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '20:00', arrival_time: '01:10', country_from: 'Thailand', country_to: 'Japan', price: 10900 },

// ✈️ Bangkok (BKK) → Narita (NRT)
{ flight_id: 'TG642-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '07:10', arrival_time: '13:00', country_from: 'Thailand', country_to: 'Japan', price: 13200 },
{ flight_id: 'TG642-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '12:30', arrival_time: '18:15', country_from: 'Thailand', country_to: 'Japan', price: 12600 },
{ flight_id: 'TG642-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '22:00', arrival_time: '04:50', country_from: 'Thailand', country_to: 'Japan', price: 11400 },

// ✈️ Bangkok (BKK) → Fukuoka (FUK)
{ flight_id: 'TG660-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Fukuoka Airport', arrival_airport_id: 'FUK', depart_time: '09:10', arrival_time: '14:40', country_from: 'Thailand', country_to: 'Japan', price: 11700 },
{ flight_id: 'TG660-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Fukuoka Airport', arrival_airport_id: 'FUK', depart_time: '16:00', arrival_time: '21:25', country_from: 'Thailand', country_to: 'Japan', price: 11200 },
{ flight_id: 'TG660-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Fukuoka Airport', arrival_airport_id: 'FUK', depart_time: '23:45', arrival_time: '05:00', country_from: 'Thailand', country_to: 'Japan', price: 9900 },

// ✈️ Bangkok (BKK) → Chubu (NGO)
{ flight_id: 'TG650-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Chubu Centrair International Airport', arrival_airport_id: 'NGO', depart_time: '10:00', arrival_time: '14:30', country_from: 'Thailand', country_to: 'Japan', price: 11900 },
{ flight_id: 'TG650-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Chubu Centrair International Airport', arrival_airport_id: 'NGO', depart_time: '15:30', arrival_time: '20:00', country_from: 'Thailand', country_to: 'Japan', price: 11300 },
{ flight_id: 'TG650-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Chubu Centrair International Airport', arrival_airport_id: 'NGO', depart_time: '23:50', arrival_time: '04:20', country_from: 'Thailand', country_to: 'Japan', price: 10500 },

// ✈️ Bangkok (BKK) → Okinawa (OKA)
{ flight_id: 'TG670-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Naha Airport', arrival_airport_id: 'OKA', depart_time: '07:00', arrival_time: '12:20', country_from: 'Thailand', country_to: 'Japan', price: 12100 },
{ flight_id: 'TG670-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Naha Airport', arrival_airport_id: 'OKA', depart_time: '13:50', arrival_time: '19:00', country_from: 'Thailand', country_to: 'Japan', price: 11600 },
{ flight_id: 'TG670-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Naha Airport', arrival_airport_id: 'OKA', depart_time: '22:30', arrival_time: '03:40', country_from: 'Thailand', country_to: 'Japan', price: 10800 },

// ✈️ Don Mueang (DMK) → Kansai (KIX)
{ flight_id: 'XJ600-1', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '06:50', arrival_time: '11:30', country_from: 'Thailand', country_to: 'Japan', price: 8900 },
{ flight_id: 'XJ600-2', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '14:10', arrival_time: '19:00', country_from: 'Thailand', country_to: 'Japan', price: 8500 },
{ flight_id: 'XJ600-3', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '21:30', arrival_time: '02:15', country_from: 'Thailand', country_to: 'Japan', price: 7800 },

// ✈️ Don Mueang (DMK) → Narita (NRT)
{ flight_id: 'XJ610-1', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '07:20', arrival_time: '12:10', country_from: 'Thailand', country_to: 'Japan', price: 9200 },
{ flight_id: 'XJ610-2', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '15:00', arrival_time: '20:10', country_from: 'Thailand', country_to: 'Japan', price: 8800 },
{ flight_id: 'XJ610-3', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '22:45', arrival_time: '04:00', country_from: 'Thailand', country_to: 'Japan', price: 8100 },

// ✈️ Don Mueang (DMK) → Chitose (CTS)
{ flight_id: 'XJ620-1', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'New Chitose Airport', arrival_airport_id: 'CTS', depart_time: '06:00', arrival_time: '12:30', country_from: 'Thailand', country_to: 'Japan', price: 9700 },
{ flight_id: 'XJ620-2', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'New Chitose Airport', arrival_airport_id: 'CTS', depart_time: '13:40', arrival_time: '20:10', country_from: 'Thailand', country_to: 'Japan', price: 9400 },
{ flight_id: 'XJ620-3', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'New Chitose Airport', arrival_airport_id: 'CTS', depart_time: '22:10', arrival_time: '05:00', country_from: 'Thailand', country_to: 'Japan', price: 8900 },

// ✈️ Narita (NRT) → Bangkok (BKK)
{ flight_id: 'JL718-1', depart_airport_name: 'Narita International Airport', depart_airport_id: 'NRT', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '10:20', arrival_time: '15:00', country_from: 'Japan', country_to: 'Thailand', price: 13500 },
{ flight_id: 'JL718-2', depart_airport_name: 'Narita International Airport', depart_airport_id: 'NRT', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '16:50', arrival_time: '21:30', country_from: 'Japan', country_to: 'Thailand', price: 12900 },
{ flight_id: 'JL718-3', depart_airport_name: 'Narita International Airport', depart_airport_id: 'NRT', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '22:30', arrival_time: '03:15', country_from: 'Japan', country_to: 'Thailand', price: 11700 },

// ✈️ Kansai (KIX) → Bangkok (BKK)
{ flight_id: 'JL728-1', depart_airport_name: 'Kansai International Airport', depart_airport_id: 'KIX', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '09:00', arrival_time: '14:20', country_from: 'Japan', country_to: 'Thailand', price: 12800 },
{ flight_id: 'JL728-2', depart_airport_name: 'Kansai International Airport', depart_airport_id: 'KIX', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '17:40', arrival_time: '22:55', country_from: 'Japan', country_to: 'Thailand', price: 12200 },
{ flight_id: 'JL728-3', depart_airport_name: 'Kansai International Airport', depart_airport_id: 'KIX', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '23:10', arrival_time: '04:30', country_from: 'Japan', country_to: 'Thailand', price: 11100 },

// ✈️ Fukuoka (FUK) → Bangkok (BKK)
{ flight_id: 'JL738-1', depart_airport_name: 'Fukuoka Airport', depart_airport_id: 'FUK', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '08:40', arrival_time: '13:20', country_from: 'Japan', country_to: 'Thailand', price: 12000 },
{ flight_id: 'JL738-2', depart_airport_name: 'Fukuoka Airport', depart_airport_id: 'FUK', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '15:10', arrival_time: '19:50', country_from: 'Japan', country_to: 'Thailand', price: 11400 },
{ flight_id: 'JL738-3', depart_airport_name: 'Fukuoka Airport', depart_airport_id: 'FUK', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '21:00', arrival_time: '01:40', country_from: 'Japan', country_to: 'Thailand', price: 10800 },

// ✈️ Chubu (NGO) → Bangkok (BKK)
{ flight_id: 'TG651-1', depart_airport_name: 'Chubu Centrair International Airport', depart_airport_id: 'NGO', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '08:30', arrival_time: '12:50', country_from: 'Japan', country_to: 'Thailand', price: 12100 },
{ flight_id: 'TG651-2', depart_airport_name: 'Chubu Centrair International Airport', depart_airport_id: 'NGO', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '15:20', arrival_time: '19:40', country_from: 'Japan', country_to: 'Thailand', price: 11500 },
{ flight_id: 'TG651-3', depart_airport_name: 'Chubu Centrair International Airport', depart_airport_id: 'NGO', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '22:00', arrival_time: '02:10', country_from: 'Japan', country_to: 'Thailand', price: 10700 },

// ✈️ Okinawa (OKA) → Bangkok (BKK)
{ flight_id: 'JL748-1', depart_airport_name: 'Naha Airport', depart_airport_id: 'OKA', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '09:30', arrival_time: '14:00', country_from: 'Japan', country_to: 'Thailand', price: 11800 },
{ flight_id: 'JL748-2', depart_airport_name: 'Naha Airport', depart_airport_id: 'OKA', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '17:00', arrival_time: '21:20', country_from: 'Japan', country_to: 'Thailand', price: 11200 },
{ flight_id: 'JL748-3', depart_airport_name: 'Naha Airport', depart_airport_id: 'OKA', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '23:15', arrival_time: '03:40', country_from: 'Japan', country_to: 'Thailand', price: 10400 },

// ✈️ New Chitose (CTS) → Don Mueang (DMK)
{ flight_id: 'XJ621-1', depart_airport_name: 'New Chitose Airport', depart_airport_id: 'CTS', arrival_airport_name: 'Don Mueang International Airport', arrival_airport_id: 'DMK', depart_time: '07:20', arrival_time: '13:00', country_from: 'Japan', country_to: 'Thailand', price: 9800 },
{ flight_id: 'XJ621-2', depart_airport_name: 'New Chitose Airport', depart_airport_id: 'CTS', arrival_airport_name: 'Don Mueang International Airport', arrival_airport_id: 'DMK', depart_time: '14:40', arrival_time: '20:10', country_from: 'Japan', country_to: 'Thailand', price: 9400 },
{ flight_id: 'XJ621-3', depart_airport_name: 'New Chitose Airport', depart_airport_id: 'CTS', arrival_airport_name: 'Don Mueang International Airport', arrival_airport_id: 'DMK', depart_time: '21:30', arrival_time: '03:00', country_from: 'Japan', country_to: 'Thailand', price: 9000 },
];




// Get unique airports with countries
const airports = [];
flights.forEach(flight => {
    if (!airports.find(a => a.code === flight.depart_airport_id)) {
        airports.push({ 
            code: flight.depart_airport_id, 
            name: flight.depart_airport_name,
            country: flight.country_from
        });
    }
    if (!airports.find(a => a.code === flight.arrival_airport_id)) {
        airports.push({ 
            code: flight.arrival_airport_id, 
            name: flight.arrival_airport_name,
            country: flight.country_to
        });
    }
});

// Passenger counts
let passengerCounts = {
    adult: 1,
    child: 0,
    infant: 0
};

// Current trip type
let currentTripType = 'oneway';

// Selected flights for round trip
let selectedOutboundFlight = null;
let searchParams = null;

// Swap airports function
function swapAirports() {
    const fromInput = document.getElementById('from-airport');
    const toInput = document.getElementById('to-airport');
    
    const fromValue = fromInput.value;
    const fromCode = fromInput.dataset.code;
    
    fromInput.value = toInput.value;
    fromInput.dataset.code = toInput.dataset.code;
    
    toInput.value = fromValue;
    toInput.dataset.code = fromCode;
}

// Toggle profile menu
function toggleProfileMenu() {
    const menu = document.getElementById('profile-menu');
    menu.classList.toggle('active');
}

// Close profile menu when clicking outside
document.addEventListener('click', function(event) {
    const profileIcon = document.querySelector('.profile-icon');
    const profileMenu = document.getElementById('profile-menu');
    
    if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
        profileMenu.classList.remove('active');
    }
});

// Select trip type
function selectTripType(type) {
    currentTripType = type;
    
    // Update button styles
    document.querySelectorAll('.trip-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-trip="${type}"]`).classList.add('active');
    
    // Show/hide return date
    const returnDateGroup = document.getElementById('return-date-group');
    if (type === 'roundtrip') {
        returnDateGroup.style.display = 'block';
        document.getElementById('return-date').required = true;
    } else {
        returnDateGroup.style.display = 'none';
        document.getElementById('return-date').required = false;
    }
}

// Airport autocomplete with country search
function setupAirportAutocomplete(inputId, dropdownId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    
    input.addEventListener('input', function() {
        const value = this.value.toLowerCase().trim();
        
        if (value.length === 0) {
            dropdown.classList.remove('active');
            return;
        }
        
        // Search by country name or airport name or code
        const filtered = airports.filter(airport => 
            airport.country.toLowerCase().includes(value) ||
            airport.name.toLowerCase().includes(value) || 
            airport.code.toLowerCase().includes(value)
        );
        
        if (filtered.length > 0) {
            dropdown.innerHTML = filtered.map(airport => `
                <div class="airport-option" onclick="selectAirport('${inputId}', '${airport.code}', '${airport.name}', '${airport.country}')">
                    <strong>${airport.code} - ${airport.country}</strong>
                    <small>${airport.name}</small>
                </div>
            `).join('');
            dropdown.classList.add('active');
        } else {
            dropdown.classList.remove('active');
        }
    });
    
    input.addEventListener('focus', function() {
        if (this.value.length > 0) {
            const event = new Event('input');
            this.dispatchEvent(event);
        }
    });
}

function selectAirport(inputId, code, name, country) {
    const input = document.getElementById(inputId);
    input.value = `${code} - ${country}`;
    input.dataset.code = code;
    
    const dropdownId = inputId.replace('-airport', '-dropdown');
    document.getElementById(dropdownId).classList.remove('active');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.input-group')) {
        document.querySelectorAll('.airport-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Passenger menu
function togglePassengerMenu() {
    const menu = document.getElementById('passenger-menu');
    menu.classList.toggle('active');
    updatePassengerDisplay();
}

function changePassenger(type, delta) {
    const currentCount = passengerCounts[type];
    const newCount = currentCount + delta;
    
    // Validation
    if (newCount < 0) return;
    if (type === 'adult' && newCount === 0 && (passengerCounts.child > 0 || passengerCounts.infant > 0)) {
        alert('At least one adult is required when traveling with children or infants');
        return;
    }
    if (type === 'infant' && newCount > passengerCounts.adult) {
        alert('Number of infants cannot exceed number of adults');
        return;
    }
    
    passengerCounts[type] = newCount;
    document.getElementById(`${type}-count`).textContent = newCount;
    updatePassengerDisplay();
}

function updatePassengerDisplay() {
    const total = passengerCounts.adult + passengerCounts.child + passengerCounts.infant;
    const display = document.getElementById('passenger-display');
    
    if (total === 1) {
        display.textContent = '1 Passenger';
    } else {
        display.textContent = `${total} Passengers`;
    }
}

// Calculate flight duration
function calculateDuration(departTime, arrivalTime) {
    const [dh, dm] = departTime.split(':').map(Number);
    const [ah, am] = arrivalTime.split(':').map(Number);
    
    let totalMinutes = (ah * 60 + am) - (dh * 60 + dm);
    
    // Handle overnight flights
    if (totalMinutes < 0) {
        totalMinutes += 24 * 60;
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}m`;
}

// Search flights
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fromAirport = document.getElementById('from-airport').dataset.code;
    const toAirport = document.getElementById('to-airport').dataset.code;
    const departDate = document.getElementById('depart-date').value;
    const isRoundTrip = currentTripType === 'roundtrip';
    const returnDate = isRoundTrip ? document.getElementById('return-date').value : null;
    
    if (!fromAirport || !toAirport) {
        alert('Please select both departure and arrival airports');
        return;
    }
    
    if (fromAirport === toAirport) {
        alert('Departure and arrival airports must be different');
        return;
    }
    
    if (!departDate) {
        alert('Please select a departure date');
        return;
    }
    
    if (isRoundTrip && !returnDate) {
        alert('Please select a return date');
        return;
    }
    
    // Reset selection
    selectedOutboundFlight = null;
    searchParams = { fromAirport, toAirport, departDate, returnDate, isRoundTrip };
    
    searchFlights(fromAirport, toAirport, departDate, isRoundTrip);
});

function searchFlights(from, to, departDate, isRoundTrip) {
    const resultsSection = document.getElementById('results-section');
    const resultsDiv = document.getElementById('flight-results');
    const returnResultsSection = document.getElementById('return-results-section');
    
    // Hide return section initially
    returnResultsSection.style.display = 'none';
    
    // Filter outbound flights
    const outboundFlights = flights.filter(flight => 
        flight.depart_airport_id === from && 
        flight.arrival_airport_id === to
    );
    
    let html = '';
    
    if (outboundFlights.length > 0) {
        html += '<div class="flights-grid">';
        outboundFlights.forEach(flight => {
            html += createFlightCard(flight, departDate, 'outbound');
        });
        html += '</div>';
    } else {
        html += '<div style="background: #fff; padding: 30px; border-radius: 16px; text-align: center;"><p style="color: #666;">No departure flights found for the selected route.</p></div>';
    }
    
    resultsDiv.innerHTML = html;
    resultsSection.style.display = 'block';
    
    // Update title based on trip type
    document.getElementById('outbound-title').textContent = isRoundTrip ? 'Select Departure Flight' : 'Available Flights';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showReturnFlights() {
    const returnResultsSection = document.getElementById('return-results-section');
    const returnResultsDiv = document.getElementById('return-flight-results');
    
    const returnFlights = flights.filter(flight => 
        flight.depart_airport_id === searchParams.toAirport && 
        flight.arrival_airport_id === searchParams.fromAirport
    );
    
    let html = '';
    
    if (returnFlights.length > 0) {
        html += '<div class="flights-grid">';
        returnFlights.forEach(flight => {
            html += createFlightCard(flight, searchParams.returnDate, 'return');
        });
        html += '</div>';
    } else {
        html += '<div style="background: #fff; padding: 30px; border-radius: 16px; text-align: center;"><p style="color: #666;">No return flights found for the selected route.</p></div>';
    }
    
    returnResultsDiv.innerHTML = html;
    returnResultsSection.style.display = 'block';
    
    // Scroll to return flights
    returnResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createFlightCard(flight, date, type) {
    const duration = calculateDuration(flight.depart_time, flight.arrival_time);
    
    return `
        <div class="flight-card" onclick="selectFlightCard('${flight.flight_id}', '${date}', ${flight.price}, '${type}', this)">
            <div class="flight-main">
                <div class="flight-id-section">
                    <div class="flight-id">${flight.flight_id}</div>
                    <div class="flight-date">${formatDate(date)}</div>
                </div>
                
                <div class="flight-route">
                    <div class="airport-info">
                        <div class="flight-time">${flight.depart_time}</div>
                        <div class="airport-code">${flight.depart_airport_id}</div>
                        <div class="airport-name">${flight.depart_airport_name}</div>
                    </div>
                    
                    <div class="flight-duration">
                        <div class="duration-text">✈${duration}</div>
                        <div class="duration-line"></div>
                        <br> 
                        
                    </div>
                    
                    <div class="airport-info">
                        <div class="flight-time">${flight.arrival_time}</div>
                        <div class="airport-code">${flight.arrival_airport_id}</div>
                        <div class="airport-name">${flight.arrival_airport_name}</div>
                    </div>
                </div>
            </div>
            
            <div class="flight-price-section">
                <div class="price-label">Price</div>
                <div class="flight-price">฿${flight.price.toLocaleString()}</div>
                <button class="select-button" onclick="event.stopPropagation(); selectFlightCard('${flight.flight_id}', '${date}', ${flight.price}, '${type}', this.parentElement.parentElement)">Select</button>
            </div>
        </div>
    `;
}

// function selectFlightCard(flightId, date, price, type, cardElement) {
//     if (type === 'outbound') {
//         // Remove previous selection
//         document.querySelectorAll('#flight-results .flight-card').forEach(card => {
//             card.classList.remove('selected');
//         });
        
//         // Mark as selected
//         cardElement.classList.add('selected');
//         selectedOutboundFlight = { flightId, date, price };
        
//         // If round trip, show return flights
//         if (searchParams.isRoundTrip) {
//             showReturnFlights();
//         } else {
//             // One way - proceed to booking
//             proceedToBooking();
//         }
//     } else {
//         // Return flight selected
//         const totalPassengers = passengerCounts.adult + passengerCounts.child + passengerCounts.infant;
//         const outboundTotal = selectedOutboundFlight.price * totalPassengers;
//         const returnTotal = price * totalPassengers;
//         const grandTotal = outboundTotal + returnTotal;
        
//         alert(`Flights selected!\n\nOutbound: ${selectedOutboundFlight.flightId} on ${formatDate(selectedOutboundFlight.date)}\nReturn: ${flightId} on ${formatDate(date)}\n\nPassengers:\n- Adults: ${passengerCounts.adult}\n- Children: ${passengerCounts.child}\n- Infants: ${passengerCounts.infant}\n\nOutbound price: ฿${outboundTotal.toLocaleString()}\nReturn price: ฿${returnTotal.toLocaleString()}\nTotal price: ฿${grandTotal.toLocaleString()}\n\nThis would proceed to booking page.`);
//     }
// }
function selectFlightCard(flightId, date, price, type, cardElement) {
    if (type === 'outbound') {
        // Remove previous selection
        document.querySelectorAll('#flight-results .flight-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Mark as selected
        cardElement.classList.add('selected');
        selectedOutboundFlight = { flightId, date, price };
        
        // If round trip, show return flights
        if (searchParams.isRoundTrip) {
            showReturnFlights();
        } else {
            // One way - proceed to seat selection
            proceedToSeatSelection();
        }
    } else {
        // Return flight selected - proceed to seat selection
        const returnFlight = { flightId, date, price };
        proceedToSeatSelection(returnFlight);
    }
}

function proceedToSeatSelection(returnFlight = null) {
    const totalPassengers = passengerCounts.adult + passengerCounts.child + passengerCounts.infant;
    
    // Store booking data in localStorage for next page
    localStorage.setItem('totalPassengers', totalPassengers);
    localStorage.setItem('passengerCounts', JSON.stringify(passengerCounts));
    localStorage.setItem('outboundFlight', JSON.stringify(selectedOutboundFlight));
    if (returnFlight) {
        localStorage.setItem('returnFlight', JSON.stringify(returnFlight));
    }
    localStorage.setItem('isRoundTrip', searchParams.isRoundTrip);
    
    // Redirect to seat selection page
    window.location.href = 'seat&service.html';
}
function proceedToBooking() {
    const totalPassengers = passengerCounts.adult + passengerCounts.child + passengerCounts.infant;
    const totalPrice = selectedOutboundFlight.price * totalPassengers;
    
    alert(`Flight ${selectedOutboundFlight.flightId} on ${formatDate(selectedOutboundFlight.date)} selected!\n\nPassengers:\n- Adults: ${passengerCounts.adult}\n- Children: ${passengerCounts.child}\n- Infants: ${passengerCounts.infant}\n\nTotal price: ฿${totalPrice.toLocaleString()}\n\nThis would proceed to booking page.`);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Profile functions
function showProfile() {
    alert('Profile page - This would show user information');
    toggleProfileMenu();
}

// function showBookingHistory() {
//     alert('Booking History page - This would show past bookings');
//     toggleProfileMenu();
// }

function showSettings() {
    alert('Settings page - This would show user settings');
    toggleProfileMenu();
}

// Initialize
setupAirportAutocomplete('from-airport', 'from-dropdown');
setupAirportAutocomplete('to-airport', 'to-dropdown');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('depart-date').min = today;
document.getElementById('return-date').min = today;

// Update return date minimum when depart date changes
document.getElementById('depart-date').addEventListener('change', function() {
    document.getElementById('return-date').min = this.value;
});

// Load user firstname from localStorage (set during registration)
const userFirstname = localStorage.getItem('userFirstname') || 'User';
document.getElementById('user-firstname').textContent = userFirstname;S