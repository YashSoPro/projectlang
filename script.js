document.addEventListener('DOMContentLoaded', () => {
    // Modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeBtns = document.getElementsByClassName('close');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const translateBtn = document.getElementById('translateBtn');
    const javaCode = document.getElementById('javaCode');
    const englishCode = document.getElementById('englishCode');

    // Modal button click events
    loginBtn.onclick = () => loginModal.style.display = "block";
    signupBtn.onclick = () => signupModal.style.display = "block";

    Array.from(closeBtns).forEach(btn => {
        btn.onclick = () => {
            loginModal.style.display = "none";
            signupModal.style.display = "none";
        }
    });

    window.onclick = (event) => {
        if (event.target == loginModal) loginModal.style.display = "none";
        if (event.target == signupModal) signupModal.style.display = "none";
    }

    // Form submission for Login
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            alert('Login successful!');
            loginModal.style.display = "none";
            updateNavForLoggedInUser(user.username);
        } else {
            alert('Invalid email or password');
        }
    }

    // Form submission for Sign Up
    signupForm.onsubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === email)) {
            alert('Email already exists');
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Sign up successful! Please log in.');
        signupModal.style.display = "none";
    }

    // English to Code translation
    if (translateBtn) {
        translateBtn.onclick = () => {
            const english = englishCode.value; // Use .value to get the input
            const java = translateToCode(english);
            javaCode.textContent = java; // Ensure this refers to the correct output element
        }
    }

    function translateToCode(englishCode) {
        // Split the input into lines
        const lines = englishCode.split('\n');
        let javaCode = '';

        lines.forEach(line => {
            // Enhanced translator
            let javaLine = line
                .replace(/if (.*?), then (.*)/g, 'if ($1) {\n    $2;\n}')
                .replace(/is greater than/g, '>')
                .replace(/is less than/g, '<')
                .replace(/is equal to/g, '==')
                .replace(/is not equal to/g, '!=')
                .replace(/and/g, '&&')
                .replace(/or/g, '||')
                .replace(/print '(.*?)'/g, 'System.out.println("$1")')
                .replace(/set (.*?) to (.*)/g, '$1 = $2')
                .replace(/increase (.*?) by (.*)/g, '$1 += $2')
                .replace(/decrease (.*?) by (.*)/g, '$1 -= $2');

            // Replace specific words with Java syntax
            javaLine = javaLine
                .replace(/my age/g, 'age')
                .replace(/the temperature/g, 'temperature')
                .replace(/the time/g, 'time')
                .replace(/the score/g, 'score')
                .replace(/the distance/g, 'distance');

            javaCode += javaLine + '\n';
        });

        return javaCode;
    }

    function updateNavForLoggedInUser(username) {
        const navLinks = document.querySelector('.nav-links');
        navLinks.innerHTML = `
            <span>Welcome, ${username}!</span>
            <a href="#" id="logoutBtn" class="btn btn-secondary">Logout</a>
        `;
        document.getElementById('logoutBtn').onclick = logout;
    }

    function logout() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.innerHTML = `
            <a href="#" id="loginBtn" class="btn btn-primary">Login</a>
            <a href="#" id="signupBtn" class="btn btn-secondary">Sign Up</a>
        `;
        alert('Logged out successfully.');
    }
});
