const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataService = require('./data.service');

const app = express();
app.use(bodyParser());
app.use(cors());

dataService.createFileIfNotExists();

app.use(express.static('./data'));

app.post('/setquestion', (req, res, next) => {
    dataService.setQuestion(req.body.question);
    res.sendStatus(200);
});

app.post('/setanswer', (req, res, next) => {
    dataService.setAnswer(req.body.answer);
    res.sendStatus(200);
});

app.post('/setanswers', (req, res, next) => {
    dataService.setAnswers(req.body.answers);
    res.sendStatus(200);
});

app.post('/setstate', (req, res, next) => {
    dataService.setState(req.body.state);
    res.sendStatus(200);
});

app.post('/reset', (req, res, next) => {
    dataService.reset();
    res.sendStatus(200);
});

app.post('/chooseanswer', (req, res, next) => {
    const { playerName, answerName } = req.body;
    dataService.chooseAnswer(playerName, answerName);
    res.sendStatus(200);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Backend is running on port', port));