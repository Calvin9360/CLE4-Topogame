import * as PIXI from "pixi.js"
import { Game } from "./game"


export class Enemy extends PIXI.Sprite {

    deadTexture : PIXI.Texture
    game: Game
    private alive : boolean = true
    
    constructor(game: Game,texture: PIXI.Texture, deadTexture: PIXI.Texture) {
        super(texture)
        this.game = game
        this.interactive = true
        this.buttonMode = true
        this.deadTexture = deadTexture
        this.on('pointerdown', () => this.killfish())
        this.x = Math.random() * 1000
        this.y = Math.random() * 500
        this.scale.set(0.5 +Math.random()*1.5)
        const myfilter = new PIXI.filters.ColorMatrixFilter()
        this.filters = [myfilter]
        myfilter.hue(Math.random()*360, false)
    }

    update(delta:number) {
        if (this.alive) {
            this.x += Math.random() * 4 - 2;
            this.y += Math.random() * 4 - 2;
          }
    }
    
    killfish() {
        console.log("click!")
        this.alive = false
        this.rotation = 0
        this.texture = this.deadTexture
    }
}