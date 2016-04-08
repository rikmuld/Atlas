import express = require('express');

export function setup(app: express.Express, io: SocketIO.Server) {
    app.get('/', displayGame)
}

function displayGame(req: express.Request, res: express.Response) {
    res.send('atlas')
}