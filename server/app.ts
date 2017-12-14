import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

var logger = require('morgan');

import { MONGO_URL } from './config';
import { MONGO_URL_SESSION } from './config';

import { registerRouter } from './routes/register';

var ConnectMongoDB = require('connect-mongo')(session);
let store = new ConnectMongoDB({ //セッション管理用DB接続設定
  url: MONGO_URL_SESSION,
  ttl: 60 * 60 //1hour
});

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(logger('dev'));//ログ用
    let secure = true;
    this.express.use(session({
        secret: 'IOU-KITTY',
        resave: false,
        saveUnitialized: true,
        cookie: {
          secure: secure,
          httpOnly: true,
          maxAge: 60 * 60 * 1000
        }, //公開時はtrue
        store: store,
        proxy: true
    }));
    // 接続する MongoDB の設定
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_URL || MONGO_URL, {
      useMongoClient: true,
    });
    process.on('SIGINT', function() { mongoose.disconnect(); });
  }

  private routes(): void {
    // 静的資産へのルーティング
    this.express.use(express.static(path.join(__dirname, 'public')));
    // this.express.use('/api/messages', messageRouter);
    this.express.use('/api/register',  registerRouter);

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