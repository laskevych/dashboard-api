import express, { Router } from "express";

const userRouter = express.Router();

userRouter.post('/login', (req, res) => {
    res.send('login');
});

userRouter.post('/registerç', (req, res) => {
    res.send('register');
});

export { userRouter };