import * as crypto  from  'crypto';
import * as  randword from 'secure-randword';

//MongoDB接続設定
export const SERVER_PORT = 3000;
export const MONGO_URL_USER = 'mongodb://150.95.148.134:28001/user';
export const MONGO_URL_REVIEW ='mongodb://150.95.148.134:28001/review';
export const MONGO_URL_SESSION ='mongodb://150.95.148.134:28001/sessiondata';
// export const MONGO_URL_USER = 'mongodb://localhost:27017/user';
// export const MONGO_URL_REVIEW ='mongodb://localhost:27017/review';
// export const MONGO_URL_SESSION ='mongodb://localhost:27017/sessiondata';


//googleAPIkey
export const G_USER = 'Recommend911@gmail.com';
export const G_PASS = 'firestack';
export const CLIENT_ID = '945735306455-dqvk4usecssqg0gou4j662lpmd84iipg.apps.googleusercontent.com';
export const CLIENT_SEC ='oeNERGqeNFZR24OyGmRVx5WS ';
export const REFRESH_TOKEN = '1/FTYsEbvr62sUh5g1tOqsnbM4JNsIlgSUZGP5wp2jhlY';

//メールの設定
export const FROM = 'Recommend運営<Recommend@gmail.com>';

//Registerメール文章
export const REGI_SUB = 'Recommendにぶち込んでやるぜ！';

//hash 作成
export function getHash(word:string){
    let sha512 = crypto.createHash('sha512');//hash生成
    sha512.update(word);
    return sha512.digest('hex');
}
//ソルト付きでストレッチング 済みのhashs作成
const STRETCH = 10;//ストレッチ回数の設定
export function perfectHash (word:string){
    let salt = randword.randword(10);
    for(let i = 0 ; i < STRETCH ; i++){
        word = this.getHash(word + salt);
    }
    return [word, salt];
}