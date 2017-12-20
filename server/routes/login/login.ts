import * as http from 'http'; 
import * as passport from 'passport';
import { Router, Response } from 'express';

import {getHash, getRand, getPhash} from '../../config';

const loginRouter: Router = Router();
loginRouter.post('/' , (req, res, next)  => {
    passport.authenticate('local', {
        successRedirect: '/api/login',
        failureRedirect: '/login.html',
        failureFlash: false,
        session: false
    })(req, res, next);
});

loginRouter.get('/' , (req, res, next)  => {
    let rand = getRand(10);
    let hash = getHash(rand);
    let phash = getPhash(rand);

    console.log("rand: " + rand);
    console.log("hash: " + hash);
    console.log("phash: " + phash);
    //認証後
    if(req.session.uid){
        console.log('compleat');
    }else{
        console.log('failure');
    }
});

//エラーハンドル
function hadInputdataError(req, res) {
    req.session.error_status = 1;
    res.redirect('/email_change');
    // mongoose.disconnect();
}

function hadOverlapError(req, res) {
    req.session.error_status = 2;
    res.redirect('/register');
    // mongoose.disconnect();
}

function hadSendmailError(err, req, res, resp) {
    console.log(err);
    req.session.error_status = 4;
    // res.redirect('/email_change');
    // mongoose.disconnect();
}

function hadDbError(err, res, req) {
    //console.log(err);
    req.session.error_status = 6;
    res.redirect('/email_change');
    // mongoose.disconnect();
}

function hadRateoverError(err, req, res) {
    //req.session.error_status = 13;
    // res.locals = insert.emailchrateover;
    res.render('RedirectError');
    // mongoose.disconnect();
}

export { loginRouter };