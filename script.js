document.addEventListener('DOMContentLoaded', () => {
    // ... (previous code for modal functionality and form submission remains unchanged)

    const translateBtn = document.getElementById('translateBtn');
    const runBtn = document.getElementById('runBtn');
    const englishCode = document.getElementById('englishCode');
    const javaCode = document.getElementById('javaCode');
    const outputArea = document.getElementById('outputArea');

    if (translateBtn) {
        translateBtn.onclick = () => {
            const english = englishCode.value;
            const java = translateToCode(english);
            javaCode.textContent = java;
        }
    }

    if (runBtn) {
        runBtn.onclick = () => {
            const java = javaCode.textContent;
            const output = simulateRun(java);
            outputArea.textContent = output;
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

    function simulateRun(javaCode) {
        // This is a very simple simulation and won't actually run the code
        // In a real implementation, you'd need a proper Java interpreter
        let output = "Simulated output:\n";
        const printMatches = javaCode.match(/System\.out\.println\(".*?"\)/g);
        if (printMatches) {
            printMatches.forEach(match => {
                const content = match.match(/"(.*?)"/)[1];
                output += content + "\n";
            });
        } else {
            output += "No output generated.";
        }
        return output;
    }

    // ... (rest of the previous code remains unchanged)
});
