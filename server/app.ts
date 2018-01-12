import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as connect from 'connect';
import * as mongoose from 'mongoose';

import { getPhash, getHash, getRand, MONGO_URL_REVIEW, MONGO_URL_USER, MONGO_URL_SESSION } from './config';

var ConnectMongoDB = require('connect-mongo')(session);
var store = new ConnectMongoDB({ //セッション管理用DB接続設定
  url: MONGO_URL_SESSION,
  ttl: 60 * 60 //1hour
});

import * as passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import * as Users   from './models/user';

import { registerRouter } from './routes/register/register';
import { loginRouter } from './routes/login/login';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.set('trust proxy', 1);// プロキシで通信をする

    /**
    * CORSを許可.
    */
    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    // 接続する MongoDB の設定
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_URL_USER || MONGO_URL_USER || MONGO_URL_REVIEW, {
      useMongoClient: true,
    });
    process.on('SIGINT', () => { 
      mongoose.disconnect(); 
    });

    this.express.use(passport.initialize());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(logger('dev'));//ログ用
    this.express.use(session({
        secret: 'ioukitty',
        store: store,
        proxy: true,
        resave: true,
        saveUninitialized: true,
        cookie: {
          secure: false,
          httpOnly: true,
          maxAge: 60 * 60 * 1000
        }
    }));

    // ログイン認証
    passport.use(new LocalStrategy({
      usernameField: 'name',
      passwordField: 'password',
      passReqToCallback: true
    }, (req, name, password, done) => {
      process.nextTick(() => {
          Users.findOne({$or:[{email:name},{uid:name}]}, (err, account) => {
              if (err) return done(console.log(err));
              if (!account) {//アカウントが見つからない
                console.log("ユーザ名かパスワードが間違っています。");
                  return done(null, false);
              }
              //let hashedPassword = perfectHash(password);//本番用
              let hashedPassword = req.body.password;//テスト用
              if (account.hashpass != hashedPassword) { //パスワードが一致しない
                console.log("ユーザ名かパスワードが間違っています。");
                  return done(null, false);
              }
              if(account.ac_st != true){//アカウントの登録が済んでいない
                 console.log("アカウントの認証が済んでいません。");
                 return done(null, false);
              }
              req.session.uid = account.uid;
              return done(null, account);
          });
      })
    }));
  }

  private routes(): void {
    // 静的資産へのルーティング
    this.express.use(express.static(path.join(__dirname, 'public')));
    this.express.use('/api/register',  registerRouter);
    this.express.use('/api/login', loginRouter);

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