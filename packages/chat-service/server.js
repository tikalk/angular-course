import express from 'express';
import getArguments from 'get-arguments-lib';
import {sessionMiddleware} from '@angularcourse/session-manager';

const args = getArguments(process.argv);

const port = args.port;

const app = express();

app.get('/rooms', sessionMiddleware, (req, res) => {
    
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})


