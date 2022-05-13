import * as PIXI from "pixi.js"

export class preload{
    constructor (app: PIXI.Application) {
        app.loader
        .add("background","img/background.png")
        .add("player","img/character.png")
        .add("enemyA","img/enemyA.png")
        .add("enemyB","img/enemyB.png")
        .add("enemyC","img/enemyC.png")
        .add("item","img/item.png")
        .add("ef_itemGet","img/ef_itemGet.png")

        app.loader.onProgress.add(this.showProgress);
        app.loader.onComplete.add(this.doneLoading)
        app.loader.onError.add(this.reportingError)
    
        app.loader.load();
    }

    
    public showProgress = (e: { progress: any; }) => {
        console.log(e.progress)
    }
    
    public reportingError = (e: { message: string; }) => {
        console.log("ERROR: " + e.message)
    }
    
    public doneLoading = (e: any) => {
        console.log("DONE LOADING!")
    }
}