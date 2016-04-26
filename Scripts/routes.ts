import express = require('express');

export function setup(app: express.Express, io: SocketIO.Server) {
    app.get('/', displayGame)
    app.get('/example/*', displayExample)
}

function displayGame(req: express.Request, res: express.Response) {
    res.render('atlas')
}

function displayExample(req: express.Request, res: express.Response) {
    let index = req.url.indexOf("/example/")
    res.render('example', { example: req.url.substr(index + 9) })
}