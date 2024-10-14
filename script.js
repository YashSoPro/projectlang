// Simple localStorage-based login system

function signup() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (username === '' || password === '') {
        alert('Please fill in both fields.');
        return;
    }

    // Check if user already exists
    if (localStorage.getItem(username)) {
        alert('Username already exists. Please choose a different username.');
    } else {
        // Store user credentials in localStorage
        localStorage.setItem(username, JSON.stringify({ password: password, code: '' }));
        alert('Sign-up successful! You can now log in.');
        window.location.href = 'login.html'; // Redirect to login page
    }
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = localStorage.getItem(username);

    if (!userData) {
        alert('Username not found. Please sign up.');
        return;
    }

    const parsedData = JSON.parse(userData);

    if (parsedData.password === password) {
        // Successful login
        alert('Login successful!');
        window.location.href = 'editor.html'; // Redirect to the editor page
    } else {
        alert('Incorrect password. Please try again.');
    }
}
