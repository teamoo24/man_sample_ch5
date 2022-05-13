import * as PIXI from "pixi.js"
import {preload} from "./preload.js"

const scaleX = window.innerWidth/1280;
const scaleY = window.innerHeight/720;

const scor_point = 0;//スコアポイント
const sprite_size = 200; //スプライトの大きさ
const horizon = 200*scaleY; //水平位置
const play_time = 700000; //プレイ時間(ミリ秒数)
const move_point = 0; //プログラムが使用
const move_dx = 10; //プレーむごと移動幅
const interval_time = 10000; //敵キャラの出現間隔
const player_animated_speed = 0.1;//プレイヤのアニメスピード

let game_flg = true; //ゲーム中かどうかを示す値
let app:PIXI.Application; //Gameオブジェクト
let plyer_base_texture:PIXI.BaseTexture;
let player_animated_data:Array<PIXI.Texture> //プレイヤのanimatedスプライト配列
let player:PIXI.AnimatedSprite; //プレイヤのスプライト
let effect = null; //効果のスプライト
let score = null; //スコアラベル
let bg_image = null//背景イメージ
let enemy_data = []; //敵キャラの保管用配列
let item_data = []; //アイテムの保管用配列



window.onload = () => {
    
    app = new PIXI.Application({
        width : 1280*scaleX,
        height : 720*scaleY
    })

    new preload(app);

    console.log(app.loader.resources.background.url)
    
    //背景作成
    bg_image = PIXI.Sprite.from(app.loader.resources.background.url);
    bg_image.anchor.set(0);
    bg_image.width = app.view.width;
    bg_image.height = app.view.height;
    bg_image.x = 0;
    bg_image.y = 0;
    app.stage.addChild(bg_image)

    //プレイヤ作成
    create_player_texture();
    player.x = 100*scaleX;
    player.y = horizon;
    player.width = player.width*scaleX;
    player.height = player.height*scaleY;
    player.animationSpeed = player_animated_speed;
    player.play();
    app.stage.addChild(player)

    document.getElementById("msg")?.addEventListener("pointerdown", () => {
        
        document.body.removeChild(<HTMLElement>document.getElementById("msg"))

        document.body.appendChild(app.view)
    })

    app.ticker.add(gameLoop);
    
}  

let create_player_texture = () => {
    plyer_base_texture = PIXI.BaseTexture.from(app.loader.resources.player.url);
    player_animated_data = new Array();

    for(let i=0; i<2; i++) {
        player_animated_data[i] = new PIXI.Texture(plyer_base_texture, new PIXI.Rectangle(i*sprite_size,0,sprite_size,sprite_size))
    }
    player = new PIXI.AnimatedSprite(player_animated_data);
}

let gameLoop = (delta:any) => {
}