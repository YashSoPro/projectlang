// Modals
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const closeBtns = document.getElementsByClassName("close");

loginBtn.onclick = () => fadeIn(loginModal);
signupBtn.onclick = () => fadeIn(signupModal);

Array.from(closeBtns).forEach(btn => {
    btn.onclick = () => {
        fadeOut(loginModal);
        fadeOut(signupModal);
    }
});

window.onclick = (event) => {
    if (event.target === loginModal || event.target === signupModal) {
        fadeOut(loginModal);
        fadeOut(signupModal);
    }
};

// Fade in and out for modals
function fadeIn(element) {
    element.style.display = "block";
    setTimeout(() => {
        element.style.opacity = 1;
    }, 10);
}

function fadeOut(element) {
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.display = "none";
    }, 300);
}

// Translation functionality
document.getElementById('translateBtn').onclick = () => {
    const englishText = document.getElementById('englishCode').value;
    const javaOutput = translateToJava(englishText);
    document.getElementById('javaCode').textContent = javaOutput;
};

function translateToJava(english) {
    // Dummy translation logic for demonstration purposes
    if (english.includes("if")) {
        return "if (condition) {\n    System.out.println(\"I am an adult\");\n}";
    }
    return "// Translation not found";
}

// Clear button functionality
document.getElementById('clearBtn').onclick = () => {
    document.getElementById('englishCode').value = '';
    document.getElementById('javaCode').textContent = '';
    document.getElementById('outputArea').textContent = '';
};

// Run button functionality
document.getElementById('runBtn').onclick = () => {
    const output = document.getElementById('outputArea');
    output.textContent = 'Running code... (This is a placeholder for execution simulation.)';
};
