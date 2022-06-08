import * as PIXI from "pixi.js";
import { Player } from "./player";

import playerImage from "./images/spacecraft.png";
import backgroundImage from "./images/background_nl.png";
import { Application } from "pixi.js";


export class Game {

    pixi: PIXI.Application;
    loader: PIXI.Loader;
    player: Player;
    background: PIXI.Sprite;

    constructor() {this.pixi = new PIXI.Application({ 
            width: screen.width,
            height: screen.height
        });
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader
            .add("playerTexture", playerImage)
            .add("backgroundTexture", backgroundImage);

        this.loader.load(() => this.doneLoading());
    }


    doneLoading() {
        //Background
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        this.pixi.stage.addChild(this.background);

        //Player
        this.player = new Player(this, this.loader.resources["playerTexture"].texture!);
        this.pixi.stage.addChild(this.player);

        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        this.pixi.ticker.add((delta) => this.update(delta));
    }

    update(delta: number) {
        this.player.update(delta);
    }
}
