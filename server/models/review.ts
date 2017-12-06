import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Review = Schema({
    rvname: String,//レビューの名前（被りあり）
    hostid: {type:Schema.Types.ObjectId, index:true},//obj_idから主催者のデータを拾う
    host: String,//ユーザーのIDを格納
    count: Number,//アクセスされた回数
    uday: {type:Date, index:true},//アップロードした日
    review: String,//レビュワーが入力(質問内容)
    abaid: [{type:Schema.Types.ObjectId, index:true}],//ベストアンサーに選ばれた回答者のIDを記録
    tag: [String],//この中に言語も記述してもらう(ニコ動のタグみたいなもの)
    fav:[{type:Schema.Types.ObjectId, index:true}],//ファボした人のオブジェクトIDを格納
    com: [{type: Schema.Types.ObjectId, ref: 'ReviewCom'}]
},{collection: 'review'});

const ReviewCom = Schema({
    //reviewcomの_idはreviewのIDと同じになる
    mfo: {type:Schema.Types.ObjectId, ref: 'Review', index:true},
    _conid: {type:Schema.Types.ObjectId, index:true},//コンテンツID
    com: {type:Schema.Types.ObjectId, index:true},//コメンターID
    name: {type:String, index:true},//ユーザーが決めた自由な名前
    prop: String,//プロフィールの画像？
    cuday: {type:Date, default: Date.now},//コンテンツを上げた日
    chday: Date,//内容を編集した日
    text: String//レビューに対してコメンターが入力(回答内容)
},{collection:'reviewcom'});

export { Review };
export { ReviewCom };