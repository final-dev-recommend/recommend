import * as http from 'http'; 
import { Router, Response } from 'express';
import { User } from '../models/user';

const nodemailer = require('nodemailer');

import { G_USER, G_PASS } from '../config';
import { CLIENT_ID } from '../config';
import { CLIENT_SEC } from '../config';
import { REFRESH_TOKEN } from '../config';

import { REGI_SUB } from '../config';
import { REGI_HTML } from '../config';
import { OAuth2 } from '../config';//メール送信時の認証

import { generate } from 'rxjs/observable/generate';
import { request } from 'http';

const registerRouter: Router = Router();

registerRouter.get('/' , (req, res, next)  => {
    // let email = req.body.email;
    let email = 'kd1188729@st.kobedenshi.ac.jp';
    let mailOptions = { //メールの送信内容
      from: 'Recommend運営<Recommed911@gmail.com>',
      to: email,
      subject: REGI_SUB,
      html: REGI_HTML
    };
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: G_USER,
            pass: G_PASS
        }
    });
    transporter.sendMail(mailOptions, (err, resp)  => { //メールの送信
        if (err) { //送信に失敗したとき
            //console.log('');
            hadSendmailError(err, req, res, resp);
            transporter.close(); //SMTPの切断
        }
         transporter.close(); //SMTPの切断
         return;
    });
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

export { registerRouter };