function generateOutput() {
    const form = document.getElementById('ipss-form');
    const formData = new FormData(form);

    let ipssTotal = 0;
    const scores = {};
    const questions = ['incomplete_emptying', 'frequency', 'intermittency', 'urgency', 'weak_stream', 'straining', 'nocturia'];

    questions.forEach(question => {
        scores[question] = parseInt(formData.get(question)) || 0;
        ipssTotal += scores[question];
    });

    let severity = '';
    if (ipssTotal >= 0 && ipssTotal <= 7) severity = 'mild';
    else if (ipssTotal >= 8 && ipssTotal <= 19) severity = 'moderate';
    else if (ipssTotal >= 20 && ipssTotal <= 35) severity = 'severe';

    const qualityOfLife = parseInt(formData.get('quality_of_life')) || 0;

    const output = `Total score: ${ipssTotal}/35\n` +
                   `Severity: ${severity}\n` +
                   `Placeholder for storage/voiding\n` +
                   `\n` +
                   `Incomplete Emptying: ${scores['incomplete_emptying']}\n` +
                   `Frequency: ${scores['frequency']}\n` +
                   `Intermittency: ${scores['intermittency']}\n` +
                   `Urgency: ${scores['urgency']}\n` +
                   `Weak Stream: ${scores['weak_stream']}\n` +
                   `Straining: ${scores['straining']}\n` +
                   `Nocturia: ${scores['nocturia']}\n` +
                   `Quality of Life: ${qualityOfLife}`;

    const outputText = document.getElementById('outputText');
    outputText.value = output;
    outputText.style.height = outputText.scrollHeight + 'px';
}

function copyOutput() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
}

document.querySelectorAll('input[type=radio]').forEach(radio => {
    radio.addEventListener('change', generateOutput);
});
