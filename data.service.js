const fs = require('fs');

const dataFile = './data/data.json';
const defaultDataFile = './data.default.json';

function createFileIfNotExists() {
    if (!fs.existsSync(dataFile)) {
        fs.copyFileSync(defaultDataFile, dataFile);
    }
}

function writeFile(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data));
}

function readFile() {
    return JSON.parse(fs.readFileSync(dataFile).toString());
}

function setQuestion(question) {
    const data = readFile();
    const d = { ...data, question }
    writeFile(d);
}

function reset() {
    const data = readFile();
    const d = {
        ...data,
        state: 0,
        answers: [],
        question: ''
    };
    writeFile(d);
}

function setAnswers(answers) {
    const data = readFile();
    const d = { ...data, answers };
    writeFile(d);
}

function setState(state) {
    const data = readFile();
    const d = { ...data, state: parseInt(state, 10) };
    writeFile(d);
}

function setAnswer(answer) {
    const data = readFile();
    const answers = data.answers.filter(a => a.name !== answer.name);
    answers.push(answer);
    shuffleArray(answers);
    const d = { ...data, answers };
    writeFile(d);
}

function chooseAnswer(playerName, answerName) {
    const data = readFile();
    const answers = data.answers;
    const newAnswers = answers.map(a => {
        if (a.name === answerName) {
            const answeredBy = (a.answeredBy || []).filter(n => n !== playerName);
            return { ...a, answeredBy: [...answeredBy, playerName] }
        } else {
            return a;
        }
    });

    const d = { ...data, answers: newAnswers };
    writeFile(d);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


module.exports = { createFileIfNotExists, setState, setAnswers, setQuestion, setAnswer, reset, chooseAnswer };