// Add event listener to handle form submission
document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let dob = document.getElementById('dob').value;
    let acceptTerms = document.getElementById('acceptTerms').checked;

    // Validation: Check if the user is between 18 and 55 years old
    let dobDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    let m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        document.getElementById('errorMessage').textContent = "You must be between 18 and 55 years old.";
        document.getElementById('errorMessage').style.display = "block";
        return;
    } else {
        document.getElementById('errorMessage').style.display = "none";
    }

    // If form is valid, save the data to localStorage
    let userData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        acceptTerms: acceptTerms
    };

    // Get existing data from localStorage, or initialize an empty array
    let savedData = localStorage.getItem('userData');
    savedData = savedData ? JSON.parse(savedData) : [];

    // Push new data to the array and save back to localStorage
    savedData.push(userData);
    localStorage.setItem('userData', JSON.stringify(savedData));

    // Load saved data to the table immediately after submitting
    addRowToTable(userData);

    document.getElementById('userForm').reset(); // Reset the form
});

// Function to add a single row to the table
function addRowToTable(user) {
    let tableBody = document.querySelector('#dataTable tbody');
    let row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.acceptTerms ? 'Yes' : 'No'}</td>
    `;
    tableBody.appendChild(row);
}

// Function to load all saved data from localStorage into the table
function loadSavedData() {
    let savedData = localStorage.getItem('userData');
    savedData = savedData ? JSON.parse(savedData) : [];

    let tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear existing table content

    // Loop through all saved data and add rows to the table
    savedData.forEach(function (user) {
        addRowToTable(user);
    });
}

// Load saved data when the page is loaded
window.onload = function () {
    loadSavedData();
};
