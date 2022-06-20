import * as PIXI from "pixi.js"
import { Game } from "./game"


export class Enemy extends PIXI.Sprite {

    deadTexture : PIXI.Texture
    game: Game
    private alive : boolean = true
    speedx: number
    speedy: number
    direction: number
    
    constructor(game: Game,texture: PIXI.Texture, deadTexture: PIXI.Texture) {
        super(texture)
        this.game = game
        this.interactive = true
        this.buttonMode = true
        this.deadTexture = deadTexture
        this.speedx = 2 + Math.random() * 1
        this.speedy = 2 + Math.random() * 1
        this.x = Math.random() * 2000
        this.y = Math.random() * 2000
        this.direction = Math.random()*1
        this.on('pointerdown', () => this.killfish())
        this.scale.set(0.5 +Math.random()*1)
        const myfilter = new PIXI.filters.ColorMatrixFilter()
        this.filters = [myfilter]
        myfilter.hue(Math.random()*360, false)
        if(this.direction<0.5){
            this.direction = this.direction * 1
        } else {
            this.direction = this.direction * -1
        }
    }

    update(delta:number) {
        if (this.alive) {
            this.x += this.speedx * this.direction
            this.y += this.speedy * this.direction
            if (this.x > 2000){ 
                this.x = 0
            } else if (this.x < 0){
                this.x = 2000
            }
            if (this.y > 2000){ 
                this.y = 0
            } else if (this.y < 0){
                this.y = 2000
            }
          }
    }
    
    killfish() {
        console.log("click!")
        this.alive = false
        this.rotation = 0
        this.texture = this.deadTexture
    }
}