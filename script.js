document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const fileList = document.getElementById('fileList');
    const newFileBtn = document.getElementById('newFileBtn');
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

    // File Management
    newFileBtn.onclick = () => {
        const fileType = prompt("Choose file type: 'struct' for Structure, 'style' for Style, or 'logic' for Logic.");
        if (fileType === 'struct' || fileType === 'style' || fileType === 'logic') {
            const fileName = prompt(`Enter new ${fileType} file name (e.g., layout.struct, design.style, behavior.logic):`);
            if (fileName && !files[fileName]) {
                files[fileName] = '';
                renderFileList();
            } else {
                alert('File name already exists or is invalid.');
            }
        } else {
            alert('Invalid file type.');
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
        // Gather content from all files based on their type
        let structureContent = '';
        let styleContent = '';
        let logicContent = '';

        for (let fileName in files) {
            if (fileName.endsWith('.struct')) {
                structureContent += files[fileName] + '\n';
            } else if (fileName.endsWith('.style')) {
                styleContent += files[fileName] + '\n';
            } else if (fileName.endsWith('.logic')) {
                logicContent += files[fileName] + '\n';
            }
        }

        // Simulate the processing of the custom language system
        const combinedOutput = `Structure:\n${structureContent}\nStyles:\n${styleContent}\nLogic:\n${logicContent}`;
        outputArea.textContent = combinedOutput;
        switchToOutput();
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
