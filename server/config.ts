import * as sha512  from 'sha512';
import * as randomstring from 'randomstring';

//MongoDB接続設定
export const SERVER_PORT = 3000;
export const MONGO_URL_USER = 'mongodb://150.95.148.134:28001/user';
export const MONGO_URL_REVIEW ='mongodb://150.95.148.134:28001/review';
export const MONGO_URL_SESSION ='mongodb://150.95.148.134:28001/sessiondata';
// export const MONGO_URL_USER = 'mongodb://localhost:28011/user';
// export const MONGO_URL_REVIEW ='mongodb://localhost:28011/review';
// export const MONGO_URL_SESSION ='mongodb://localhost:28011/sessiondata';


//googleAPIkey
export const G_USER = 'Recommend911@gmail.com';
export const G_PASS = 'firestack';
export const CLIENT_ID = '945735306455-dqvk4usecssqg0gou4j662lpmd84iipg.apps.googleusercontent.com';
export const CLIENT_SEC ='oeNERGqeNFZR24OyGmRVx5WS ';
export const REFRESH_TOKEN = '1/FTYsEbvr62sUh5g1tOqsnbM4JNsIlgSUZGP5wp2jhlY';

//メールの設定
export const FROM = 'Recommend運営<Recommend@gmail.com>';

//メール件名
export const REGI_SUB = 'Recommendにぶち込んでやるぜ！';

//ユーザにメール送信する 際のランダムな文字の文字数
export const REGI_RAND = 10;//register時

//日付と時間を取得
export function getDate(ago_minute = 0){
    let now = new Date();
    now.setMinutes(now.getMinutes() + ago_minute);
    return now;
}

//ランダムな文字列を生成
export function getRand(size){
    let rand = randomstring.generate(size);
    return rand;
}

//hash 作成
export function getHash(word:string){
    let hash = sha512(word)//hash生成
    return hash.toString('hex');
}

//ソルト付きでストレッチング 済みのhashs作成(Phash = PerfectHash)
const STRETCH = 10;//ストレッチ回数の設定
const SALT_LENGTH = 12;//ソルトの文字数の設定
export function getPhash (word:string, salt = randomstring.generate(SALT_LENGTH)){
    for(let i = 0 ; i < STRETCH ; i++){
        word = getHash(word + salt);
    }
    return [word, salt];
}