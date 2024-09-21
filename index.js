// Create the form dynamically using JavaScript
const formContainer = document.getElementById('formContainer');

const form = document.createElement('form');
form.id = 'userForm';

form.innerHTML = `
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required><br><br>

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required><br><br>

    <label for="password">Password</label>
    <input type="password" id="password" name="password" required><br><br>

    <label for="dob">Date of Birth</label>
    <input type="date" id="dob" name="dob" required><br><br>

    <label for="acceptTerms">Accept Terms & Conditions</label>
    <input type="checkbox" id="acceptTerms" name="acceptTerms" required><br><br>

    <button type="submit">Submit</button>
    <div class="error" id="errorMessage">Please fill out all fields correctly.</div>
`;

formContainer.appendChild(form);

// Handle form submission and validation
document.getElementById('userForm').addEventListener('submit', function(event) {
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

    let savedData = localStorage.getItem('userData');
    savedData = savedData ? JSON.parse(savedData) : [];
    savedData.push(userData);
    localStorage.setItem('userData', JSON.stringify(savedData));

    loadSavedData(); // Load data to the table after saving
    document.getElementById('userForm').reset(); // Reset the form
});

// Function to load saved data from localStorage into the table
function loadSavedData() {
    let savedData = localStorage.getItem('userData');
    savedData = savedData ? JSON.parse(savedData) : [];

    let tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear existing table content

    savedData.forEach(function(user) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptTerms ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Load saved data when the page is loaded
window.onload = function() {
    loadSavedData();
};
