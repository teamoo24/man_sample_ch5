"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preload = void 0;
class preload {
    constructor(app) {
        this.showProgress = (e) => {
            console.log(e.progress);
        };
        this.reportingError = (e) => {
            console.log("ERROR: " + e.message);
        };
        this.doneLoading = (e) => {
            console.log("DONE LOADING!");
        };
        app.loader
            .add("background", "img/background.png")
            .add("player", "img/character.png")
            .add("enemyA", "img/enemyA.png")
            .add("enemyB", "img/enemyB.png")
            .add("enemyC", "img/enemyC.png")
            .add("item", "img/item.png")
            .add("ef_itemGet", "img/ef_itemGet.png");
        app.loader.onProgress.add(this.showProgress);
        app.loader.onComplete.add(this.doneLoading);
        app.loader.onError.add(this.reportingError);
        app.loader.load();
    }
}
exports.preload = preload;
