import * as PIXI from "pixi.js"
import {preload} from "./preload.js"

const scor_point = 0;//スコアポイント
const sprite_size = 200; //スプライトの大きさ
const horizon = 200; //水平位置
const play_time = 700000; //プレイ時間(ミリ秒数)
const move_dx = 5; //プレーむごと移動幅
const interval_time = 10000; //敵キャラの出現間隔
const player_animated_speed = 0.1;//プレイヤのアニメスピード
const scaleX = window.innerWidth/1280;
const scaleY = window.innerHeight/720;
const walk = {//歩くframeのプロパティ値
    "stop":[0,0,1,1],
    "right":[2,2,3,3],
    "left":[4,4,5,5]
}

let game_flg = true; //ゲーム中かどうかを示す値
let app:PIXI.Application; //Gameオブジェクト
let plyer_base_texture:PIXI.BaseTexture;
let player_animated_data:{
    [name:string]:Array<PIXI.Texture>
} = {}//プレイヤのanimatedスプライト配列

let enemy_animated_data:{
    [name:string]:Array<PIXI.Texture>
} = {}//プレイヤのanimatedスプライト配列

let player:PIXI.AnimatedSprite; //プレイヤのスプライト
let effect = null; //効果のスプライト
let score = null; //スコアラベル
let bg_image = null//背景イメージ
let enemy_data = []; //敵キャラの保管用配列
let item_data = []; //アイテムの保管用配列
let move_point = 0; //プログラムが使用

let touch_flg = false;//自キャラをタッチしたか否か
let touch_dx = 0;//自キャラをタッチした時のジャンプ幅



window.onload = () => {
    
    app = new PIXI.Application({
        width : 1280*scaleX,
        height : 720*scaleY
    })

    new preload(app);
    
    //背景作成
    bg_image = PIXI.Sprite.from(app.loader.resources.background.url);
    bg_image.anchor.set(0);
    bg_image.width = app.view.width;
    bg_image.height = app.view.height;
    bg_image.x = 0;
    bg_image.y = 0;
    bg_image.interactive = true;
    bg_image.on("pointerdown",touch_scene)
    app.stage.addChild(bg_image)

    //プレイヤ作成
    create_player_texture();
    player.x = 100*scaleX;
    player.y = horizon*scaleY;
    player.width = player.width*scaleX;
    player.height = player.height*scaleY;
    player.animationSpeed = player_animated_speed;
    player.interactive = true;
    player.on("pointerdown",touch_player)
    player.play();
    app.stage.addChild(player)

    //効果作成
    effect = PIXI.Sprite.from(app.loader.resources.ef_itemGet.url);
    effect.x = -200*scaleX;
    effect.y = -200*scaleY;
    effect.visible = false;
    app.stage.addChild(effect)

    // スコア作成
    score = new PIXI.Text("SCORE: 0", {
        fill: "#ff0000",
        fontSize: 48,
        fontWeight: "bold",
        fontFamily: 'Times',
    })
    score.width = 500 * scaleX;
    score.x = 50*scaleX;
    score.y = 0;
    app.stage.addChild(score)

    move_point = player.x;

    app.stop();

    document.getElementById("msg")?.addEventListener("pointerdown", () => {
        
        app.start();
        document.body.removeChild(<HTMLElement>document.getElementById("msg"))
        document.body.appendChild(app.view)
        app.ticker.add(gameloop);
        setTimeout(makeEnemy, 1000);
        setTimeout(makeItem, 10000+ Math.floor(Math.random()*10)*1000);
        setTimeout(gameEnd,play_time);
    })
}  

let create_player_texture = () => {
    
    plyer_base_texture = PIXI.BaseTexture.from(app.loader.resources.player.url);

    Object.entries(walk).forEach(([index, object])  => {
        player_animated_data[index] = new Array();

        object.forEach(element => {
            player_animated_data[index].push(new PIXI.Texture(plyer_base_texture, new PIXI.Rectangle(element*sprite_size,0,sprite_size,sprite_size)))
        })
    })
    
    player = new PIXI.AnimatedSprite(player_animated_data.stop);
}

let create_enemy_texture = () => {
    let enemy_base_texture = PIXI.BaseTexture.from(app.loader.resources.player.url);

    Object.entries(walk).forEach(([index, object])  => {
        player_animated_data[index] = new Array();

        object.forEach(element => {
            player_animated_data[index].push(new PIXI.Texture(plyer_base_texture, new PIXI.Rectangle(element*sprite_size,0,sprite_size,sprite_size)))
        })
    })
    
    player = new PIXI.AnimatedSprite(player_animated_data.stop);
}

let gameloop =(delta:any) => {
    move_sprite()
    checkEnemy();
    checkItem();
}

//シーンをタッチ
let touch_scene = (e:any) => {

    let touchX = e.data.global.x;

    console.log(touchX)

    move_point = touchX -  sprite_size/2;

    if(move_point > player.x) {
        player.textures = player_animated_data.right
    } else {
        player.textures = player_animated_data.left
    }

    if(!player.playing) {
        player.play();
    }
}

// プレイヤーをタッチ
let touch_player = (e:any) => {
    touch_flg = true;
    touch_dx = -25;
}

let move_sprite = () => {

    if(Math.abs(move_point - player.x) <= move_dx) {
        if(player.textures != player_animated_data.stop) {
            player.textures = player_animated_data.stop
            player.play()
        }
    }

    if(move_point - player.x >= move_dx) {
        player.x += move_dx;
    }

    if(player.x - move_point >= move_dx) {
        player.x -= move_dx;
    }

    if(touch_flg) {
        player.y += touch_dx;
        touch_dx += 2;
        if(player.y < sprite_size/2 * -1) {
            player.y = sprite_size/2 * -1;
        }
        if(player.y > horizon) {
            player.y = horizon
            touch_flg = false;
            touch_dx = 0;
        }
    }
}

let checkEnemy = () => {

}

let checkItem = () => {

}

let makeEnemy =() => {
}

let makeItem = () => {

}

let gameEnd = () => {
}