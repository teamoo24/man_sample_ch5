"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = __importStar(require("pixi.js"));
const preload_js_1 = require("./preload.js");
const scaleX = window.innerWidth / 1280;
const scaleY = window.innerHeight / 720;
const scor_point = 0; //スコアポイント
const sprite_size = 200; //スプライトの大きさ
const horizon = 200 * scaleY; //水平位置
const play_time = 700000; //プレイ時間(ミリ秒数)
const move_point = 0; //プログラムが使用
const move_dx = 10; //プレーむごと移動幅
const interval_time = 10000; //敵キャラの出現間隔
const player_animated_speed = 0.1; //プレイヤのアニメスピード
let game_flg = true; //ゲーム中かどうかを示す値
let app; //Gameオブジェクト
let plyer_base_texture;
let player_animated_data; //プレイヤのanimatedスプライト配列
let player; //プレイヤのスプライト
let effect = null; //効果のスプライト
let score = null; //スコアラベル
let bg_image = null; //背景イメージ
let enemy_data = []; //敵キャラの保管用配列
let item_data = []; //アイテムの保管用配列
window.onload = () => {
    var _a;
    app = new PIXI.Application({
        width: 1280 * scaleX,
        height: 720 * scaleY
    });
    new preload_js_1.preload(app);
    console.log(app.loader.resources.background.url);
    //背景作成
    bg_image = PIXI.Sprite.from(app.loader.resources.background.url);
    bg_image.anchor.set(0);
    bg_image.width = app.view.width;
    bg_image.height = app.view.height;
    bg_image.x = 0;
    bg_image.y = 0;
    app.stage.addChild(bg_image);
    //プレイヤ作成
    create_player_texture();
    player.x = 100 * scaleX;
    player.y = horizon;
    player.width = player.width * scaleX;
    player.height = player.height * scaleY;
    player.animationSpeed = player_animated_speed;
    player.play();
    app.stage.addChild(player);
    (_a = document.getElementById("msg")) === null || _a === void 0 ? void 0 : _a.addEventListener("pointerdown", () => {
        document.body.removeChild(document.getElementById("msg"));
        document.body.appendChild(app.view);
    });
    app.ticker.add(gameLoop);
};
let create_player_texture = () => {
    plyer_base_texture = PIXI.BaseTexture.from(app.loader.resources.player.url);
    player_animated_data = new Array();
    for (let i = 0; i < 2; i++) {
        player_animated_data[i] = new PIXI.Texture(plyer_base_texture, new PIXI.Rectangle(i * sprite_size, 0, sprite_size, sprite_size));
    }
    player = new PIXI.AnimatedSprite(player_animated_data);
};
let gameLoop = (delta) => {
};
