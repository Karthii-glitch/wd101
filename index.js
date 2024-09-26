[11:56 pm, 25/9/2024] Deva: function validateDob(dob) {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
}

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;
    if (!validateDob(dob)) {
        alert("Your age must be between 18 and 55.");
        return;
    }
    const data = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        termsAccepted: termsAccepted
    };
    localStorage.setItem('formData', JSON.stringify(data));
    document.getElementById('registrationForm').reset();
    loadData();
});
function loadData() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = `
            <tr>
                <td>${savedData.name}</td>
                <td>${savedData.email}</td>
                <td>${savedData.password}</td>
                <td>${savedData.dob}</td>
                <td>${savedData.termsAccepted ? 'Yes' : 'No'}</td>
            </tr>
        `;
    }
}
window.onload = function () {
    loadData();
};
[11:56 pm, 25/9/2024] Darani Karthik: 
