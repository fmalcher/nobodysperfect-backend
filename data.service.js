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

function resetFull() {
    fs.copyFileSync(defaultDataFile, dataFile);
}

function setAnswers(answers) {
    const data = readFile();
    writeFile({ ...data, answers });
}

function setScore(score) {
    const data = readFile();
    writeFile({ ...data, score });
}

function setState(state) {
    const data = readFile();
    writeFile({ ...data, state: parseInt(state, 10) });
}

function setAnswer(answer) {
    const data = readFile();
    const answers = [
        ...data.answers.filter(a => a.name !== answer.name),
        answer
    ];
    shuffleArray(answers);

    writeFile({ ...data, answers });
}

function chooseAnswer(playerName, answerName) {
    const data = readFile();
    const answers = data.answers.map(a => {
        // remove player name from all answers
        let answeredBy = (a.answeredBy || []).filter(n => n !== playerName);
        
        // add player name to chosen answer
        if (a.name === answerName) {
            answeredBy = [...answeredBy, playerName];
        }
        return { ...a, answeredBy };
    });

    writeFile({ ...data, answers });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

module.exports = { createFileIfNotExists, setState, setAnswers, setQuestion, setAnswer, reset, resetFull, setScore, chooseAnswer };