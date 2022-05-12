import * as PIXI from "pixi.js"

let game_flg = true;

window.onload = () => {
    
    let app = new PIXI.Application({
        width : 1280,
        height : 720
    })

    app.loader
        .add("background","img/background.png")
        .add("character","img/character.png")
        .add("enemyA","img/enemyA.png")
        .add("enemyB","img/enemyB.png")
        .add("enemyC","img/enemyC.png")
        .add("item","img/item.png")
        .add("ef_itemGet","img/ef_itemGet.png")

    document.getElementById("msg")?.addEventListener("pointerdown", () => {
        
        document.body.removeChild(<HTMLElement>document.getElementById("msg"))

        document.body.appendChild(app.view)
    })

    
}  