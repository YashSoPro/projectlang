document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeBtns = document.getElementsByClassName('close');
    const fileList = document.getElementById('fileList');
    const newFileBtn = document.getElementById('newFileBtn');
    const newFolderBtn = document.getElementById('newFolderBtn');
    const codeEditor = document.getElementById('codeEditor');
    const saveBtn = document.getElementById('saveBtn');
    const runBtn = document.getElementById('runBtn');
    const outputArea = document.getElementById('outputArea');
    const editorPanel = document.getElementById('editorPanel');
    const outputPanel = document.getElementById('outputPanel');
    const tabEditor = document.getElementById('tabEditor');
    const tabOutput = document.getElementById('tabOutput');

    let files = {};
    let currentFile = null;

    // Modal functionality
    loginBtn.onclick = () => loginModal.style.display = 'block';
    signupBtn.onclick = () => signupModal.style.display = 'block';

    Array.from(closeBtns).forEach(btn => {
        btn.onclick = () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        };
    });

    window.onclick = (event) => {
        if (event.target == loginModal) loginModal.style.display = 'none';
        if (event.target == signupModal) signupModal.style.display = 'none';
    };

    // File Management
    newFileBtn.onclick = () => {
        const fileName = prompt('Enter new file name (include extension):');
        if (fileName) {
            if (files[fileName]) {
                alert('File already exists!');
            } else {
                files[fileName] = '';
                renderFileList();
            }
        }
    };

    function renderFileList() {
        fileList.innerHTML = '';
        for (let fileName in files) {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-file"></i> ${fileName} <button class="rename-btn">Rename</button> <button class="delete-btn">Delete</button>`;
            li.onclick = () => openFile(fileName);
            fileList.appendChild(li);

            li.querySelector('.rename-btn').onclick = (e) => {
                e.stopPropagation();
                const newFileName = prompt('Enter new file name:', fileName);
                if (newFileName && !files[newFileName]) {
                    files[newFileName] = files[fileName];
                    delete files[fileName];
                    renderFileList();
                    if (currentFile === fileName) {
                        currentFile = newFileName;
                        openFile(currentFile);
                    }
                } else {
                    alert('File name already exists or invalid!');
                }
            };

            li.querySelector('.delete-btn').onclick = (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this file?')) {
                    delete files[fileName];
                    renderFileList();
                    if (currentFile === fileName) {
                        currentFile = null;
                        codeEditor.value = '';
                    }
                }
            };
        }
    }

    function openFile(fileName) {
        currentFile = fileName;
        codeEditor.value = files[fileName];
    }

    // Save File
    saveBtn.onclick = () => {
        if (currentFile) {
            files[currentFile] = codeEditor.value;
            alert('File saved!');
        } else {
            alert('No file selected!');
        }
    };

    // Run Code
    runBtn.onclick = () => {
        if (currentFile) {
            const fileExtension = currentFile.split('.').pop();
            let code = codeEditor.value;
            if (fileExtension === 'html') {
                outputArea.innerHTML = code;
            } else if (fileExtension === 'js') {
                try {
                    outputArea.innerHTML = '';
                    eval(code);
                } catch (error) {
                    outputArea.innerHTML = error;
                }
            } else {
                outputArea.textContent = code;
            }
            switchToOutput();
        } else {
            alert('No file selected!');
        }
    };

    // Tab Switching
    tabEditor.onclick = switchToEditor;
    tabOutput.onclick = switchToOutput;

    function switchToEditor() {
        tabEditor.classList.add('active');
        tabOutput.classList.remove('active');
        editorPanel.style.display = 'block';
        outputPanel.style.display = 'none';
    }

    function switchToOutput() {
        tabEditor.classList.remove('active');
        tabOutput.classList.add('active');
        editorPanel.style.display = 'none';
        outputPanel.style.display = 'block';
    }
});
