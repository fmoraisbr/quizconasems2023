window.onload = function () {
    fetch('respostas.xlsx').then(function (response) {
        return response.arrayBuffer();
    }).then(function (data) {
        let workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        displayQuestions(jsonData);
    });
}

function displayQuestions(data) {
    let questionTableBody = document.getElementById('questionTableBody');
    questionTableBody.innerHTML = '';
    data.forEach((row, index) => {
        if (index === 0) return; // Skip header row
        let question = row[0];
        let answers = [
            { text: row[1], correct: row[4] === 'A' },
            { text: row[2], correct: row[4] === 'B' },
            { text: row[3], correct: row[4] === 'C' },
        ];
        let rowElement = document.createElement('tr');
        let questionCell = document.createElement('td');
        questionCell.innerText = question;
        rowElement.appendChild(questionCell);
        let answersCell = document.createElement('td');
        answers.forEach(answer => {
            let answerElement = document.createElement('div');
            answerElement.innerHTML = (answer.correct ? '<strong>' : '') + answer.text + (answer.correct ? '</strong>' : '');
            answersCell.appendChild(answerElement);
        });
        rowElement.appendChild(answersCell);
        questionTableBody.appendChild(rowElement);
    });
}
