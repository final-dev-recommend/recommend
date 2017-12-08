import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { MONGO_URL } from './config';
import { MONGO_URL_SESSION } from './config';

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
    this.express.use(session({
        secret: 'IOU-HOHOHO',
        resave: false,
        saveUnitialized: true,
        cookie: {secure: false}, //公開時はtrue
        store: store
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

    // その他のリクエストはindexファイルにルーティング
    this.express.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public/index.html'));
    });
  }
}

export default new App().express;
