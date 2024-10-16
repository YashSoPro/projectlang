const translations = {
    "print": "System.out.println()",
    "declare variable": "int x;",
    "if statement": "if (condition) {}",
    // Add more translations as needed
};

document.getElementById('translateButton').addEventListener('click', function() {
    const command = document.getElementById('commandInput').value.toLowerCase();
    const javaTranslation = translations[command] || "Translation not found.";
    document.getElementById('javaOutput').innerText = javaTranslation;

    // Update previous translations
    const historyItem = document.createElement('li');
    historyItem.textContent = `${command} => ${javaTranslation}`;
    document.getElementById('translationHistory').appendChild(historyItem);
});

// Toggle dark mode
document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
