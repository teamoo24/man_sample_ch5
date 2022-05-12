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
let game_flg = true;
window.onload = () => {
    var _a;
    let app = new PIXI.Application({
        width: 1280,
        height: 720
    });
    app.loader
        .add("background", "img/background.png")
        .add("character", "img/character.png")
        .add("enemyA", "img/enemyA.png")
        .add("enemyB", "img/enemyB.png")
        .add("enemyC", "img/enemyC.png")
        .add("item", "img/item.png")
        .add("ef_itemGet", "img/ef_itemGet.png");
    (_a = document.getElementById("msg")) === null || _a === void 0 ? void 0 : _a.addEventListener("pointerdown", () => {
        document.body.removeChild(document.getElementById("msg"));
        document.body.appendChild(app.view);
    });
};
