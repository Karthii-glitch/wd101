// This script is deferred

// Function to get the current date minus N years in 'YYYY-MM-DD' format
function getCurrentDateMinusNYears(n) {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - n);
    return currentDate.toISOString().split('T')[0];
}

// Setting the minimum and maximum allowable dates for the 'dob' input field
const dateInput = document.getElementById('dob');
dateInput.setAttribute('min', getCurrentDateMinusNYears(55)); // Minimum age 55 years ago
dateInput.setAttribute('max', getCurrentDateMinusNYears(18)); // Maximum age 18 years ago

// Function to save the form data and store it in localStorage
let saveUserForm = (event) => {
    event.preventDefault(); // Prevents form submission and page reload

    // Get form field values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Create an object to store user information
    let userEntry = { name, email, password, dob, agreeTerms };

    // Add the user entry to the array and store it in localStorage
    userEntries.push(userEntry);
    localStorage.setItem('user-entries', JSON.stringify(userEntries));
}

// Function to display the stored entries in the table
function showStoredEntries() {
    let tableBody = document.getElementById('entries').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear the current table content

    // Retrieve user entries from localStorage and parse them
    const entries = JSON.parse(localStorage.getItem('user-entries')) || [];

    // Loop through each entry and add a row to the table
    entries.forEach(item => {
        const fields = ['name', 'email', 'password', 'dob', 'agreeTerms'];
        const cells = fields.map(field => `<td>${item[field]}</td>`).join('');
        tableBody.innerHTML += `<tr class="text-center">${cells}</tr>`;
    });
}

// Get form and check for stored entries in localStorage
let userForm = document.getElementById('registerForm');
let userEntries = JSON.parse(localStorage.getItem('user-entries')) || []; // Initialize entries from storage

// If there are existing entries, display them
showStoredEntries();

// Event listeners for form submission
userForm.addEventListener('submit', saveUserForm);
userForm.addEventListener('submit', showStoredEntries);
