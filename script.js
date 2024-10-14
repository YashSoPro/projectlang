// Simple localStorage-based login system

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
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('code-editor').style.display = 'block';
        document.getElementById('currentUser').textContent = username;
        loadCode(); // Load code automatically on login
    } else {
        alert('Incorrect password.');
    }
}

// Save code function
function saveCode() {
    const username = document.getElementById('currentUser').textContent;
    const code = document.getElementById('code').value;

    // Retrieve the user data, update the code, and save back to localStorage
    const userData = JSON.parse(localStorage.getItem(username));
    userData.code = code;
    localStorage.setItem(username, JSON.stringify(userData));

    document.getElementById('status').textContent = 'Code saved successfully!';
}

// Load saved code function
function loadCode() {
    const username = document.getElementById('currentUser').textContent;
    
    // Retrieve the user data and load the saved code
    const userData = JSON.parse(localStorage.getItem(username));

    document.getElementById('code').value = userData.code || '';
    document.getElementById('status').textContent = 'Code loaded successfully!';
    translateCode(); // Automatically translate loaded code
}

// Function to run the interpreter and translate the code
function runInterpreter() {
    const input = document.getElementById('code').value.toLowerCase();
    
    // Translate the input to JavaScript
    const translatedCode = translateToJavaScript(input);

    // Display the translated code
    document.getElementById('translatedCode').textContent = translatedCode;

    // Run the translated code and display the output
    try {
        const output = eval(translatedCode);
        document.getElementById('output').textContent = output !== undefined ? output : 'Code executed successfully!';
    } catch (error) {
        document.getElementById('output').textContent = 'Error: ' + error.message;
    }
}

// Translate input from natural language to JavaScript code
function translateToJavaScript(input) {
    const lines = input.split('\n');
    let jsCode = '';

    lines.forEach(line => {
        // Variable Assignment: "set x to 5"
        if (line.startsWith('set')) {
            const match = line.match(/set (\w+) to (.+)/);
            if (match) {
                const variable = match[1];
                const value = convertToJSExpression(match[2]);
                jsCode += `let ${variable} = ${value};\n`;
            }
        }

        // Conditional: "if age is greater than 18 than print You are an adult"
        else if (line.startsWith('if')) {
            const match = line.match(/if (\w+) is (greater than|less than|equal to) (.+) than (.+)/);
            if (match) {
                const variable = match[1];
                const operator = match[2];
                const value = convertToJSExpression(match[3]);
                const action = match[4];
                const jsOperator = translateOperator(operator);

                jsCode += `if (${variable} ${jsOperator} ${value}) {\n${parseAction(action)}\n}\n`;
            }
        }

        // Print Statement: "print Hello {name}"
        else if (line.startsWith('print')) {
            const message = line.match(/print (.+)/)[1];
            const jsMessage = message.replace(/\{(\w+)\}/g, '"+ $1 +"');
            jsCode += `console.log("${jsMessage}");\n`;
        }

        // Loops: "repeat 5 times print Hello"
        else if (line.startsWith('repeat')) {
            const match = line.match(/repeat (\d+) times (.+)/);
            if (match) {
                const count = parseInt(match[1], 10);
                const action = match[2];
                jsCode += `for (let i = 0; i < ${count}; i++) {\n${parseAction(action)}\n}\n`;
            }
        }

        // Function Definition: "define a function greet with name"
        else if (line.startsWith('define a function')) {
            const match = line.match(/define a function (\w+) with (.+)/);
            if (match) {
                const functionName = match[1];
                const params = match[2].split(' and ').join(', ');
                jsCode += `function ${functionName}(${params}) {\n`;
            }
        }

        // Function End: "end function"
        else if (line.startsWith('end function')) {
            jsCode += `}\n`;
        }

        // Function Call: "call greet with John"
        else if (line.startsWith('call')) {
            const match = line.match(/call (\w+) with (.+)/);
            if (match) {
                const functionName = match[1];
                const args = match[2].split(' and ').map(arg => `"${arg.trim()}"`).join(', ');
                jsCode += `${functionName}(${args});\n`;
            }
        }

        // Array: "set mylist to [1, 2, 3]"
        else if (line.startsWith('set') && line.includes('[')) {
            const match = line.match(/set (\w+) to \[(.+)\]/);
            if (match) {
                const variable = match[1];
                const values = match[2];
                jsCode += `let ${variable} = [${values}];\n`;
            }
        }

        // Add to Array: "add 4 to mylist"
        else if (line.startsWith('add')) {
            const match = line.match(/add (\d+) to (\w+)/);
            if (match) {
                const value = match[1];
                const array = match[2];
                jsCode += `${array}.push(${value});\n`;
            }
        }

        // Input: "ask for user's name"
        else if (line.startsWith('ask for')) {
            const variable = line.match(/ask for (.+)/)[1];
            jsCode += `let ${variable} = prompt("Enter ${variable}:");\n`;
        }
    });

    return jsCode;
}

// Parse Action (for conditional blocks or loops)
function parseAction(action) {
    if (action.startsWith('print')) {
        const message = action.match(/print (.+)/)[1];
        const jsMessage = message.replace(/\{(\w+)\}/g, '"+ $1 +"');
        return `console.log("${jsMessage}");`;
    }
    return '';
}

// Convert natural language expression to JavaScript expressions
function convertToJSExpression(expression) {
    // You can expand this function to handle more complex expressions
    if (!isNaN(expression)) return expression; // If it's a number
    return `"${expression}"`; // Default to string
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

// Function to run the interpreter and translate the code when the "Run" button is clicked
document.getElementById('code').addEventListener('input', runInterpreter);
