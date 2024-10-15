document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Placeholder sign-up validation (you can expand this)
    if (username && email && password) {
        alert('Sign-up successful!');
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        alert('Please fill out all fields!');
    }
});
