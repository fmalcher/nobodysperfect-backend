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
    const body = req.body;
    console.log(body);
    dataService.setQuestion(body.question);
    res.sendStatus(200);
});

app.post('/setanswer', (req, res, next) => {
    const body = req.body;
    dataService.setAnswer(body.answer);
    res.sendStatus(200);
});

app.post('/setanswers', (req, res, next) => {
    const body = req.body;
    dataService.setAnswers(body.answers);
    res.sendStatus(200);
});

app.post('/setstate', (req, res, next) => {
    const body = req.body;
    dataService.setState(body.state);
    res.sendStatus(200);
});

app.post('/reset', (req, res, next) => {
    dataService.reset();
    res.sendStatus(200);
});

app.post('/chooseanswer', (req, res, next) => {
    const body = req.body;
    dataService.chooseAnswer(body.playerName, body.answerName);
    res.sendStatus(200);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Backend is running on port', port));