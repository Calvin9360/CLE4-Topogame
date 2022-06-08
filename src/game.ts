import * as PIXI from "pixi.js"
import { Player } from "./player"
import { Enemy } from "./enemy"
import playerImage from "./images/spacecraft.png"
import backgroundImage from "./images/background_nl.png"
import enemyImage from "./images/shark.png"
import deadImage from "./images/bones.png"



export class Game {

    pixi: PIXI.Application
    loader: PIXI.Loader
    player: Player
    background: PIXI.Sprite
    enemies: Enemy[] = []

    constructor() {
        this.pixi = new PIXI.Application({
            width: screen.width,
            height: screen.height
        });
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("playerTexture", playerImage)
            .add("backgroundTexture", backgroundImage)
            .add("enemytexture", enemyImage)
            .add("deadTexture", deadImage)

        this.loader.load(() => this.doneLoading())
    }


    doneLoading() {
        //Background
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        this.pixi.stage.addChild(this.background)

        //enemy
        for (let i = 0; i < 10; i++) {
            console.log("spawned")
            let enemy = new Enemy(this, this.loader.resources["enemytexture"].texture!, this.loader.resources["deadTexture"].texture!)
            this.pixi.stage.addChild(enemy)
            this.enemies.push(enemy)
        }

        //Player
        this.player = new Player(this, this.loader.resources["playerTexture"].texture!);
        this.pixi.stage.addChild(this.player)

        this.pixi.stage.x = this.pixi.screen.width / 2
        this.pixi.stage.y = this.pixi.screen.height / 2

        this.pixi.ticker.add((delta) => this.update(delta))


    }

    update(delta: number) {
        this.player.update(delta)
        for (let enemy of this.enemies) {
            enemy.update(delta)
        }
    }
}
