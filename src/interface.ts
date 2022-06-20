import * as PIXI from "pixi.js";
import { Game } from "./game";


export class UI extends PIXI.Container {

    game: Game;
    textField: PIXI.Text;
    xspeed = 0;
    yspeed = 0;

    constructor(game:Game) {
        super();
        this.game = game;
        this.x = game.pixi.screen.width/2;
        this.y = game.pixi.screen.height/2;

        //Text Box
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);
        graphics.lineStyle(8, 0x1E1E1E);
        graphics.drawRect(-200, -350, 400, 50);
        this.addChild(graphics);

        //Box Lines
        const graphics_line_l1 = new PIXI.Graphics();
        const graphics_line_l2 = new PIXI.Graphics();
        const graphics_line_l3 = new PIXI.Graphics();
        const graphics_line_r1 = new PIXI.Graphics();
        const graphics_line_r2 = new PIXI.Graphics();
        const graphics_line_r3 = new PIXI.Graphics();
        graphics_line_l1.lineStyle(5, 0x1E1E1E);
        graphics_line_l2.lineStyle(5, 0x1E1E1E);
        graphics_line_l3.lineStyle(5, 0x1E1E1E);
        graphics_line_r1.lineStyle(5, 0x1E1E1E);
        graphics_line_r2.lineStyle(5, 0x1E1E1E);
        graphics_line_r3.lineStyle(5, 0x1E1E1E);
        graphics_line_l1.drawRect(-290 , -345, 75, 5);
        graphics_line_l2.drawRect(-265 , -327.5, 50, 5);
        graphics_line_l3.drawRect(-240 , -310, 25, 5);
        graphics_line_r1.drawRect( 215 , -345, 75, 5);
        graphics_line_r2.drawRect( 215 , -327.5, 50, 5);
        graphics_line_r3.drawRect( 215 , -310, 25, 5);
        this.addChild(graphics_line_l1);
        this.addChild(graphics_line_l2);
        this.addChild(graphics_line_l3);
        this.addChild(graphics_line_r1);
        this.addChild(graphics_line_r2);
        this.addChild(graphics_line_r3);

        //Text
        const style = new PIXI.TextStyle({
            fontFamily: 'Silkscreen',
            fontSize: 40,
            fontWeight: 'bold',
            fill: ['#1e1e1e']
        });

        this.textField = new PIXI.Text(`Friesland`, style);
        this.textField.x = -115;
        this.textField.y = -348;
        this.addChild(this.textField);

        //Temporary ASWD and Arrow Movement
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }


    update(delta: number) {
        let mapwidth = 2000;
        let mapheight = 2000;
        let centerx = 0;
        let centery = 0;

        this.x = this.clamp(this.x + this.xspeed, 0, mapwidth);
        this.y = this.clamp(this.y + this.yspeed, 0, mapheight);

        let mapx = this.clamp(this.x, centerx, mapwidth - centerx);
        let mapy = this.clamp(this.y, centery, mapheight - centery);
        this.game.pixi.stage.pivot.set(mapx, mapy);
    }

    clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }
    

    //Temporary ASWD and Arrows Movement
        //Change This To Mouse Movement
    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -7
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 7
                break
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}