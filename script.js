// Function to handle dynamic translation of English-like statements to Java
function translateToJava(command) {
    let javaCode = "";

    // Basic conditionals
    if (command.includes("if") && command.includes("then")) {
        const condition = command.substring(
            command.indexOf("if") + 2, 
            command.indexOf("then")
        ).trim();
        const action = command.substring(command.indexOf("then") + 4).trim();
        javaCode = `if (${translateCondition(condition)}) {\n    ${translateAction(action)}\n}`;
    }
    // Print statements
    else if (command.includes("print")) {
        const message = command.substring(command.indexOf("print") + 5).trim();
        javaCode = `System.out.println(${message});`;
    }
    // Arithmetic operations
    else if (command.includes("plus") || command.includes("minus") || command.includes("times") || command.includes("divided by")) {
        javaCode = translateArithmetic(command);
    }
    else {
        javaCode = "Translation not recognized.";
    }

    return javaCode;
}

// Helper function to translate conditions (like comparisons)
function translateCondition(condition) {
    let javaCondition = condition;

    // Replace common English operators with Java equivalents
    javaCondition = javaCondition.replace("equals", "==");
    javaCondition = javaCondition.replace("is greater than", ">");
    javaCondition = javaCondition.replace("is less than", "<");

    return javaCondition.trim();
}

// Helper function to translate actions (like printing)
function translateAction(action) {
    if (action.includes("print")) {
        const message = action.substring(action.indexOf("print") + 5).trim();
        return `System.out.println(${message});`;
    }
    return action;
}

// Helper function to translate arithmetic
function translateArithmetic(command) {
    let javaExpression = command;

    // Replace English operators with Java equivalents
    javaExpression = javaExpression.replace("plus", "+");
    javaExpression = javaExpression.replace("minus", "-");
    javaExpression = javaExpression.replace("times", "*");
    javaExpression = javaExpression.replace("divided by", "/");

    // Build the Java code
    return `int result = ${javaExpression};\nSystem.out.println("Result: " + result);`;
}

// Translate button click event
document.getElementById('translate-button').addEventListener('click', function () {
    const command = document.getElementById('command-input').value.toLowerCase().trim();
    const javaTranslation = translateToJava(command);
    
    // Display the Java translation
    document.getElementById('java-translation').innerText = javaTranslation;

    // Update previous translations
    const historyItem = document.createElement('li');
    historyItem.textContent = `${command} => ${javaTranslation}`;
    document.getElementById('translationHistory').appendChild(historyItem);
});
