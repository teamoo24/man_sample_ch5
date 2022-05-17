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
const sprite_size = 200; //スプライトの大きさ
const horizon = 200; //水平位置
const play_time = 100000; //プレイ時間(ミリ秒数)
const move_dx = 5; //プレーむごと移動幅
const player_animated_speed = 0.1; //プレイヤのアニメスピード
const scaleX = window.innerWidth / 1280;
const scaleY = window.innerHeight / 720;
const walk = {
    "stop": [0, 0, 1, 1],
    "right": [2, 2, 3, 3],
    "left": [4, 4, 5, 5]
};
let game_flg = true; //ゲーム中かどうかを示す値
let app; //Gameオブジェクト
let plyer_base_texture;
let player_animated_data = {}; //プレイヤのanimatedスプライト配列
let enemy_animated_data = {}; //プレイヤのanimatedスプライト配列
let player; //プレイヤのスプライト
let effect; //効果のスプライト
let score; //スコアラベル
let bg_image; //背景イメージ
let enemy_data = []; //敵キャラの保管用配列
let item_data = []; //アイテムの保管用配列
let move_point = 0; //プログラムが使用
let touch_flg = false; //自キャラをタッチしたか否か
let touch_dx = 0; //自キャラをタッチした時のジャンプ幅
let interval_time = 10000; //敵キャラの出現間隔
let score_point = 0; //スコアポイント
let enemy_img = []; //敵のイメージ値
window.onload = () => {
    var _a;
    app = new PIXI.Application({
        width: 1280 * scaleX,
        height: 720 * scaleY
    });
    new preload_js_1.preload(app);
    enemy_img.push(app.loader.resources.enemyA.url);
    enemy_img.push(app.loader.resources.enemyB.url);
    enemy_img.push(app.loader.resources.enemyC.url);
    //背景作成
    bg_image = PIXI.Sprite.from(app.loader.resources.background.url);
    bg_image.anchor.set(0);
    bg_image.width = app.view.width;
    bg_image.height = app.view.height;
    bg_image.x = 0;
    bg_image.y = 0;
    bg_image.interactive = true;
    bg_image.on("pointerdown", touch_scene);
    app.stage.addChild(bg_image);
    //プレイヤ作成
    create_player_texture();
    player.x = 100 * scaleX;
    player.y = horizon * scaleY;
    player.width = player.width * scaleX;
    player.height = player.height * scaleY;
    player.animationSpeed = player_animated_speed;
    player.interactive = true;
    player.on("pointerdown", touch_player);
    player.play();
    app.stage.addChild(player);
    //効果作成
    effect = PIXI.Sprite.from(app.loader.resources.ef_itemGet.url);
    effect.x = -200 * scaleX;
    effect.y = -200 * scaleY;
    effect.alpha = 0;
    app.stage.addChild(effect);
    // スコア作成
    score = new PIXI.Text("SCORE：0", {
        fill: "#ff0000",
        fontSize: 48,
        fontWeight: "bold",
        fontFamily: 'Times',
    });
    score.width = 250 * scaleX;
    score.x = 50 * scaleX;
    score.y = 0;
    app.stage.addChild(score);
    move_point = player.x;
    app.stop();
    enemy_data = new Array();
    (_a = document.getElementById("msg")) === null || _a === void 0 ? void 0 : _a.addEventListener("pointerdown", () => {
        app.start();
        document.body.removeChild(document.getElementById("msg"));
        document.body.appendChild(app.view);
        app.ticker.add(gameloop);
        setTimeout(makeEnemy, 1000);
        setTimeout(makeItem, 10000 + Math.floor(Math.random() * 10) * 1000);
        setTimeout(gameEnd, play_time);
    });
};
let create_player_texture = () => {
    plyer_base_texture = PIXI.BaseTexture.from(app.loader.resources.player.url);
    Object.entries(walk).forEach(([index, object]) => {
        player_animated_data[index] = new Array();
        object.forEach(element => {
            player_animated_data[index].push(new PIXI.Texture(plyer_base_texture, new PIXI.Rectangle(element * sprite_size, 0, sprite_size, sprite_size)));
        });
    });
    player = new PIXI.AnimatedSprite(player_animated_data.stop);
};
let create_enemy_texture = () => {
    let img_num = Math.floor(Math.random() * 3);
    let enemy_base_texture = PIXI.BaseTexture.from(enemy_img[img_num]);
    Object.entries(walk).forEach(([index, object]) => {
        enemy_animated_data[index] = new Array();
        object.forEach(element => {
            enemy_animated_data[index].push(new PIXI.Texture(enemy_base_texture, new PIXI.Rectangle(element * sprite_size, 0, sprite_size, sprite_size)));
        });
    });
};
let gameloop = (delta) => {
    move_sprite();
    checkEnemy();
    checkItem();
};
//シーンをタッチ
let touch_scene = (e) => {
    let touchX = e.data.global.x;
    console.log(touchX);
    move_point = touchX - sprite_size / 2;
    if (move_point > player.x) {
        player.textures = player_animated_data.right;
    }
    else {
        player.textures = player_animated_data.left;
    }
    if (!player.playing) {
        player.play();
    }
};
// プレイヤーをタッチ
let touch_player = (e) => {
    touch_flg = true;
    touch_dx = -25;
};
let move_sprite = () => {
    if (Math.abs(move_point - player.x) <= move_dx) {
        if (player.textures != player_animated_data.stop) {
            player.textures = player_animated_data.stop;
            player.play();
        }
    }
    if (move_point - player.x >= move_dx) {
        player.x += move_dx;
    }
    if (player.x - move_point >= move_dx) {
        player.x -= move_dx;
    }
    enemy_data.forEach((object) => {
        if (object.x < player.x - sprite_size / 2) {
            object.x += move_dx / 2;
        }
        if (object.x > player.x + sprite_size / 2) {
            object.x -= move_dx / 2;
        }
    });
    if (touch_flg) {
        player.y += touch_dx;
        touch_dx += 2;
        if (player.y < sprite_size / 2 * -1) {
            player.y = sprite_size / 2 * -1;
        }
        if (player.y > horizon) {
            player.y = horizon;
            touch_flg = false;
            touch_dx = 0;
        }
    }
};
let checkEnemy = () => {
    enemy_data.forEach((object, index) => {
        if (get_collision(object, player)) {
            if (touch_dx > 0) {
                effect.x = object.x;
                effect.y = object.y;
                degress_opacity(effect);
                update_score(100);
            }
            else {
                update_score(-10);
            }
            app.stage.removeChild(object);
            enemy_data.splice(index, 1);
        }
    });
};
let get_collision = (object_1, object_2) => {
    const bounds1 = object_1.getBounds();
    const bounds2 = object_2.getBounds();
    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
};
let checkItem = () => {
    item_data.forEach((object, index) => {
        if (get_collision(object, player)) {
            effect.x = object.x;
            effect.y = object.y;
            degress_opacity(effect);
            app.stage.removeChild(object);
            item_data.splice(index, 1);
            update_score(300);
        }
    });
};
let makeEnemy = () => {
    create_enemy_texture();
    let enemy;
    let x = Math.floor(Math.random() * app.stage.width - sprite_size);
    enemy = player.x > x ? new PIXI.AnimatedSprite(enemy_animated_data.right) : new PIXI.AnimatedSprite(enemy_animated_data.left);
    enemy.x = x;
    enemy.y = horizon;
    enemy.animationSpeed = 0.1;
    enemy.play();
    enemy_data.push(enemy);
    app.stage.addChild(enemy);
    if (game_flg) {
        interval_time -= interval_time / 10;
        setTimeout(makeEnemy, interval_time);
    }
};
let makeItem = () => {
    let pitem;
    pitem = PIXI.Sprite.from(app.loader.resources.item.url);
    pitem.scale.x *= 0.75;
    pitem.scale.y *= 0.75;
    pitem.x = Math.floor(Math.random() * (app.stage.width - sprite_size));
    pitem.y = horizon - Math.floor(Math.random() * sprite_size);
    app.stage.addChild(pitem);
    item_data.push(pitem);
};
let update_score = (n) => {
    score_point += n;
    score_point = score_point < 0 ? 0 : score_point;
    score.text = "SCORE：" + score_point;
};
let degress_opacity = (object) => {
    object.alpha = 1;
};
let gameEnd = () => {
    game_flg = false;
    let msg = new PIXI.Text("GAME OVER", {
        fill: "red",
        fontFamily: "Times",
        fontSize: 96,
        fontWeight: "bold"
    });
    msg.x = 50;
    msg.y = 50;
    msg.width = 800;
    app.stage.addChild(msg);
    //app.stop();
};
