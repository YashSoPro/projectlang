// Simple localStorage-based login system

// Show the code editor
function showEditor() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('code-editor').style.display = 'block';
    document.getElementById('settings').style.display = 'none';
}

// Show the settings
function showSettings() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('code-editor').style.display = 'none';
    document.getElementById('settings').style.display = 'block';
}

// Logout function
function logout() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('code-editor').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
}

// Sign up function
function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
        alert('Sign-up successful! Please log in.');
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
        document.getElementById('currentUser').textContent = username;
        showEditor(); // Show the code editor upon successful login
        loadCode(); // Load any saved code upon login
    } else {
        alert('Incorrect password. Please try again.');
    }
}

// Save code function
function saveCode() {
    const username = document.getElementById('username').value;
    const code = document.getElementById('code').value;

    if (username === '') {
        alert('Please log in to save your code.');
        return;
    }

    const userData = localStorage.getItem(username);
    const parsedData = JSON.parse(userData);
    parsedData.code = code;

    // Update user data in localStorage
    localStorage.setItem(username, JSON.stringify(parsedData));
    alert('Code saved successfully!');
}

// Load code function
function loadCode() {
    const username = document.getElementById('username').value;

    if (username === '') {
        alert('Please log in to load your code.');
        return;
    }

    const userData = localStorage.getItem(username);
    const parsedData = JSON.parse(userData);
    document.getElementById('code').value = parsedData.code || '';
}

// Run code function
function runCode() {
    const code = document.getElementById('code').value;
    const translatedCode = translateToJavaScript(code);
    document.getElementById('translatedCode').textContent = translatedCode;

    // Execute the translated code and display output
    let output = '';
    try {
        eval(translatedCode);
    } catch (e) {
        output = e.message; // Capture any errors during execution
    }
    document.getElementById('output').textContent = output;
}

// Translate natural language to JavaScript code
function translateToJavaScript(code) {
    const lines = code.split('\n');
    let jsCode = '';

    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('if')) {
            const condition = line.match(/if (.+?) than/)[1];
            const action = line.match(/than (.+)/)[1];
            jsCode += `if (${translateCondition(condition)}) {\n`;
            jsCode += `    ${parseAction(action)}\n`;
            jsCode += '}\n';
        } else {
            jsCode += parseAction(line) + '\n';
        }
    }
    return jsCode;
}

// Translate conditions to JavaScript conditions
function translateCondition(condition) {
    const parts = condition.split(' ');
    const variable = parts[0]; // e.g., "age"
    const operator = translateOperator(parts[1] + ' ' + parts[2]); // e.g., "equal to"
    const value = parts[4]; // e.g., "15"
    return `${variable} ${operator} ${value}`;
}

// Parse actions like print statements
function parseAction(action) {
    if (action.startsWith('print')) {
        const message = action.match(/print (.+)/)[1];
        const jsMessage = message.replace(/\{(\w+)\}/g, '"+ $1 +"');
        return `console.log("${jsMessage}");`;
    }
    return '';
}

// Translate natural language operators to JavaScript operators
function translateOperator(operator) {
    switch (operator) {
        case 'greater than':
            return '>';
        case 'less than':
            return '<';
        case 'equal to':
            return '===';
        default:
            return '';
    }
}

// Change theme function
function changeTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = theme; // Change body class based on selected theme
}
