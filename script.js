document.getElementById("translateButton").addEventListener("click", function() {
    const input = document.getElementById("englishInput").value;
    const output = translateToJava(input);
    document.getElementById("javaOutput").textContent = output;

    // Save to history
    saveToHistory(input, output);
});

document.getElementById("toggleDarkMode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Save translation to history
function saveToHistory(input, output) {
    const historyList = document.getElementById("historyList");
    const li = document.createElement("li");
    li.textContent = `${input} → ${output}`;
    historyList.appendChild(li);
}
