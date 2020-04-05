# Nobody Is Perfect Backend Server

Backend server for the board game ["Nobody is perfect"](https://www.ravensburger.de/produkte/spiele/erwachsenenspiele/nobody-is-perfect-27225/index.html) to make it virtually playable via video conference.
Be aware that this is a rather hacky solution that's supposed to "just work" and nothing more.

## Installation and run

* Clone this repo.
* Install and run an instance of the [frontend application](https://github.com/fmalcher/nobodysperfect-frontend).

```
npm i
npm start
```

The server will start on the port configured in the `PORT` env var or 3000.


## Architecture and Game State

see the [README file of the frontend application](https://github.com/fmalcher/nobodysperfect-frontend/blob/master/README.md)



## Endpoints

This server offers a bunch of HTTP endpoints to send POST requests to.
All those change data in the `data.json` file.
This JSON file can be polled by the frontend to retrieve the latest data.
For the types used in the description, see the frontend code.

| Endpoint  | Description | Body Data |
|---|---|---|
| `/setquestion` | Moderator submits the question | `{ question: string }` |
| `/setanswer` | Players and moderator submit their answer. Identification is done via the `name` property. | `{ answer: GameAnswer }` |
| `/setanswers` | Moderator overrides all answers. Used for editing the submitted answers. | `{ answers: GameAnswer[] }` |
| `/setstate` | Moderator sets the game state, i.e. the phase the game is in. This is used by the frontend to determine what to show to the player. | `{ state: number }` |
| `/reset` | Reset the game and set to state `0` |  |
| `/chooseanswer` | Players choose an answer from the list. `playerName` is the name of the player itself that chooses the answer. `answerName` is the name of the player associated with the chosen answer, as this is the identifier of an answer. | `{ playerName: string, answerName: string }` |