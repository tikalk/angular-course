import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import getArguments from 'get-arguments-lib';
import {clearSession, sessionMiddleware} from "@angularcourse/session-manager";

const args = getArguments(process.argv);

const users = {};

const port = args.port || 3000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json())
app.use(sessionMiddleware());

app.get('/users', (req, res) => {
    const returnedUsers = {...users};
    Object.keys(returnedUsers).forEach(key => {
        returnedUsers[key] = {...returnedUsers[key], password: null}
    })
    res.status(200).send(returnedUsers);
})

app.get('/currentUser', (req, res) => {
    const currentUser = req.session.user;
    res.status(200).send(currentUser ? {...currentUser, password: null}: null);
})

app.get('/user/:id',   (req, res) => {
    const id = req.params['id'];

    const user = users[id];

    if (!user) {
        res.status(404).send(null);
        return;
    }
    res.status(200).send({...user, password: null});
});
app.post('/logout', (req, res) => {
    clearSession(req, res);
    res.status(200).send(null);

})
app.post('login', (req, res) => {
    const {username} = req.body;
    // This is only demo, no password required;

    const user = users[username];

    if (!user) {
        res.status(404).send('Please register');
        return;
    }
    req.session.user = user;
    res.status(200).send('OK');
});

app.put('/user/:id',   (req, res) => {
    const id = req.params['id'];

    const user = users[id];
    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    users[id] = req.body;


    res.status(200).send({...req.body, password: null} || {});
})

app.post('/register',  (req, res) => {
    const userId = req.body.username;

    if (users[userId]) {
        res.status(400).send({error: 'User already exist'});
        return;
    }
    users[userId] = req.body;

    req.session.user = req.body;

    res.status(201).send({...req.body, password: null});

})


app.listen(port, () =>
    console.log(`Listenning on port ${port}, press ^c to stop`))

