function hashPassword(password) {
    // Basic hash function (not secure for production)
    return btoa(password); // Base64 encoding as a simple hash
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.querySelector("#loginForm input[type='text']").value;
    const password = hashPassword(document.querySelector("#loginForm input[type='password']").value);

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Login successful!");
        // Redirect to homepage or perform other actions
    } else {
        alert("Invalid username or password.");
    }
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.querySelector("#signupForm input[type='text']").value;
    const email = document.querySelector("#signupForm input[type='email']").value;
    const password = hashPassword(document.querySelector("#signupForm input[type='password']").value);
    const confirmPassword = hashPassword(document.querySelector("#signupForm input[type='password']:last-child").value);

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.find(user => user.username === username);
    
    if (userExists) {
        alert("Username already exists. Please choose another.");
    } else {
        storedUsers.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(storedUsers));
        alert("Sign up successful! You can now log in.");
        window.location.href = "login.html"; // Redirect to login page after signup
    }
});
