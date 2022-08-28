import express from 'express';

import { userRouter } from './users/users.js';

const port = 8000;
const app = express();

app.get('/hello', (req, res) => {
    throw new Error('Fatal error!');
});

app.use('/users', userRouter);

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send(`Server error! Details: ${err?.message}`);
});

app.listen(port, () => {
    console.log(`Server are working on http://localhost:${port}/`);
});
