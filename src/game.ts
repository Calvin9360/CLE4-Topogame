import * as PIXI from "pixi.js"
import { Player } from "./player"
import { Fish } from "./enemy"
import fishImage from "./images/shark.png"
import playerImage from "./images/spacecraft.png"
import backgroundImage from "./images/background_nl.png"
import deadImage from "./images/bones.png"



export class Game {

    pixi: PIXI.Application
    loader: PIXI.Loader
    player: Player
    background: PIXI.Sprite
    fishes: Fish[] = []

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
            .add("fishtexture", fishImage)
            .add("deadTexture", deadImage)

        this.loader.load(() => this.doneLoading())
    }


    doneLoading() {
        //Background
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        this.pixi.stage.addChild(this.background)

         //enemy
            for (let i = 0; i<10; i++) {
            console.log("spawned")
            let fish = new Fish(this, this.loader.resources["fishTexture"].texture!, this.loader.resources["deadTexture"].texture!)
            this.pixi.stage.addChild(fish) 
            this.fishes.push(fish)
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
        for(let fish of this.fishes){
            fish.update(delta)
        }
    }
}
