function hashPassword(password) {
    // This is just a placeholder. Use a proper hashing function in production.
    return btoa(password); // Base64 encoding as a simple hash
}

// Display messages in the UI
function showMessage(elementId, message) {
    const messageElement = document.getElementById(elementId);
    messageElement.innerText = message;
    messageElement.style.display = 'block'; // Show the message
}

// Clear messages
function clearMessages() {
    const messageElements = document.querySelectorAll('.message');
    messageElements.forEach(el => el.style.display = 'none');
}

// Login Handler
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    clearMessages();
    
    const username = document.querySelector("#loginForm input[type='text']").value;
    const password = hashPassword(document.querySelector("#loginForm input[type='password']").value);

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(user => user.username === username && user.password === password);

    if (user) {
        showMessage("loginMessage", "Login successful! Redirecting...");
        setTimeout(() => {
            window.location.href = "index.html"; // Redirect to homepage
        }, 2000);
    } else {
        showMessage("loginMessage", "Invalid username or password.");
    }
});

// Signup Handler
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    clearMessages();
    
    const username = document.querySelector("#signupForm input[type='text']").value;
    const email = document.querySelector("#signupForm input[type='email']").value;
    const password = hashPassword(document.querySelector("#signupForm input[type='password']").value);
    const confirmPassword = hashPassword(document.querySelector("#signupForm input[type='password']:last-child").value);

    if (password !== confirmPassword) {
        showMessage("signupMessage", "Passwords do not match.");
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.find(user => user.username === username);
    
    if (userExists) {
        showMessage("signupMessage", "Username already exists. Please choose another.");
    } else {
        storedUsers.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(storedUsers));
        showMessage("signupMessage", "Sign up successful! You can now log in.");
        setTimeout(() => {
            window.location.href = "login.html"; // Redirect to login page after signup
        }, 2000);
    }
});
