import { Router } from "express";
import passport from "passport";
import isRegistered from "./utils/isRegistered.js";
import { singUp} from "./userController.js";
import multer from './utils/multer.js';
import {isAuth, isNotAuth, isAdmin} from "../../utils/Auth.js";

const userRouter  = new Router();

// POST

userRouter.post("/signup", multer.single('photo'), isRegistered, singUp);

userRouter.post(
    '/login',
     passport.authenticate('local', {
        failureRedirect: '/login-error',
        successRedirect: '/'
     }),
);

// GETS

userRouter.get('/signup', isNotAuth, (req, res) => {
    res.render('signup');
});

userRouter.get('/login', isNotAuth, (req, res) => {
    res.render('login');
});

userRouter.get('/login-error', isNotAuth, (req, res) => {
    res.render('login-error');
});

userRouter.get('/profile', isAuth, (req, res) => {
    const user = req.user;
    res.render('profile', {user});
});

userRouter.get('/logout', (req, res) => {
    req.logout();
    res.render('logout');
});

export default userRouter;

