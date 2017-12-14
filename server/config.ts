//MongoDB接続設定
export const SERVER_PORT = 3000;
export const MONGO_URL = 'mongodb://150.95.148.134:28001/test';
export const MONGO_URL_SESSION ='mongodb://150.95.148.134:28001/sessiondata';

//googleAPIkey
export const G_USER = 'Recommend911@gmail.com';
export const G_PASS = 'firestack';
export const CLIENT_ID = '945735306455-dqvk4usecssqg0gou4j662lpmd84iipg.apps.googleusercontent.com';
export const CLIENT_SEC ='oeNERGqeNFZR24OyGmRVx5WS ';
export const REFRESH_TOKEN = '1/FTYsEbvr62sUh5g1tOqsnbM4JNsIlgSUZGP5wp2jhlY';

const gmail = {
    user: G_USER,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SEC,
    refreshToken: REFRESH_TOKEN
}

export let OAuth2 = require('xoauth2').createXOAuth2Generator(gmail); //googleの認証用

//メールの設定
export const FROM = 'Recommend運営<Recommend@gmail.com>';

//Registerメール文章
export const REGI_SUB = '新規ユーザ登録';
export const REGI_HTML = 'テスト';