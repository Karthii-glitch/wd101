// Note: This script is deferred

function getCurrentDateMinusNYears(n) {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - n);
    return currentDate.toISOString().split('T')[0];
}

const dateInput = document.getElementById('dob');
dateInput.setAttribute('min', getCurrentDateMinusNYears(55));
dateInput.setAttribute('max', getCurrentDateMinusNYears(18));


let saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    let userEntry = {
        name, email, password, dob, agreeTerms
    }

    userEntries.push(userEntry);
    localStorage.setItem('user-entries', JSON.stringify(userEntries));
}


function showStoredEntries() {
    let table_body = document.getElementById('entries').getElementsByTagName('tbody')[0]

    table_body.innerHTML = ''
    JSON.parse(localStorage.getItem('user-entries')).forEach(item => {
        const fields = ['name', 'email', 'password', 'dob', 'agreeTerms'];
        const cells = fields.map(field => `<td class="">${item[field]}</td>`).join('');
        table_body.innerHTML += `<tr class="text-center">${cells}</tr>`;
    })
}

let userForm = document.getElementById('registerForm')
let userEntries = JSON.parse(localStorage.getItem('user-entries'))

if (!userEntries) {
    userEntries = [];
} else {
    showStoredEntries()
}

userForm.addEventListener('submit', saveUserForm)
userForm.addEventListener('submit', showStoredEntries)
