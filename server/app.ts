import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as connect from 'connect';
import * as mongoose from 'mongoose';

import { perfectHash, MONGO_URL_REVIEW, MONGO_URL_USER } from './config';
import { MONGO_URL_SESSION } from './config';

const ConnectMongoDB = require('connect-mongo')(session);
const store = new ConnectMongoDB({ //セッション管理用DB接続設定
  url: MONGO_URL_SESSION,
  ttl: 60 * 60 //1hour
});

import * as passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import { User } from './models/user';

import { registerRouter } from './routes/register/register';
import { registerRouter_end } from './routes/register/register_end';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.set('trust proxy', 1);// プロキシで通信をする

    // 接続する MongoDB の設定
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_URL_USER || MONGO_URL_USER || MONGO_URL_REVIEW, {
      useMongoClient: true,
    });
    process.on('SIGINT', () => { 
      mongoose.disconnect(); 
    });

    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(logger('dev'));//ログ用
    this.express.use(session({
        secret: 'iou kitty',
        store: store,
        proxy: false,
        resave: true,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 1000
        }
    }));
    // 認証
    passport.use(new LocalStrategy({
      usernameField: 'name',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, name, password, done) => {
      process.nextTick(() => {
          User.findOne({ $or: [{email:name},{uid:name}] }, (err, account) => {
              if (err) return done(err);
              if (!account) {
                  req.flash('error', 'ユーザーが見つかりませんでした。');
                  req.flash('input_id', name);
                  req.flash('input_password', password);
                  return done(null, false);
              }
              let hashedPassword = perfectHash(password);
              if (account.password != hashedPassword
                  && account.password != password) {
                  req.flash('error', 'パスワードが間違っています。');
                  req.flash('input_id', name);
                  req.flash('input_password', password);
                  return done(null, false);
              }
              return done(null, account);
          });
      })
    }
    ));
  }

  private routes(): void {
    // 静的資産へのルーティング
    this.express.use(express.static(path.join(__dirname, 'public')));
    // this.express.use('/api/messages', messageRouter);
    this.express.use('/api/register',  registerRouter);
    this.express.use('/api/register_end', registerRouter_end);

    //ミドルウェアを使いつくしたので404を生成 
    this.express.use((err, req, res, next) => {
      // var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

      // error handlers
    // development error handler
    // will print stacktrace
    if (this.express.get('env') === 'development') {
      this.express.use((err, req, res, next) => {
          res.status(err.status || 500);
          console.log(err.message);
          console.log(err);
      });
    }

    // production error handler
    // no stacktraces leaked to user
    this.express.use((err, req, res, next) => {
      res.status(err.status || 500);
        console.log(err.message);
        console.log(err);
    });
  }
}

export default new App().express;