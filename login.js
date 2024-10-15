document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Placeholder login validation (you can expand this)
    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
        window.location.href = 'home.html'; // Redirect to home
    } else {
        alert('Invalid credentials!');
    }
});
