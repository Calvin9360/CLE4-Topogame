import * as PIXI from "pixi.js";
import { Game } from "./game";


export class UI extends PIXI.Container {

    game: Game;
    textField: PIXI.Text;
    scoreField: PIXI.Text;
    xspeed = 0;
    yspeed = 0;

    constructor(game:Game) {
        super();
        this.game = game;
        this.x = game.pixi.screen.width/2;
        this.y = game.pixi.screen.height/2;

        //Text Box
        const textBox = new PIXI.Graphics();
        textBox.beginFill(0xFFFFFF);
        textBox.lineStyle(8, 0x1E1E1E);
        textBox.drawRect(-200, -380, 400, 50);
        this.addChild(textBox);

        //Box Lines Text Box
        const textBox_line_l1 = new PIXI.Graphics();
        const textBox_line_l2 = new PIXI.Graphics();
        const textBox_line_l3 = new PIXI.Graphics();
        const textBox_line_r1 = new PIXI.Graphics();
        const textBox_line_r2 = new PIXI.Graphics();
        const textBox_line_r3 = new PIXI.Graphics();
        textBox_line_l1.lineStyle(5, 0x1E1E1E);
        textBox_line_l2.lineStyle(5, 0x1E1E1E);
        textBox_line_l3.lineStyle(5, 0x1E1E1E);
        textBox_line_r1.lineStyle(5, 0x1E1E1E);
        textBox_line_r2.lineStyle(5, 0x1E1E1E);
        textBox_line_r3.lineStyle(5, 0x1E1E1E);
        textBox_line_l1.drawRect(-290 , -375, 75, 5);
        textBox_line_l2.drawRect(-265 , -357.5, 50, 5);
        textBox_line_l3.drawRect(-240 , -340, 25, 5);
        textBox_line_r1.drawRect( 215 , -375, 75, 5);
        textBox_line_r2.drawRect( 215 , -357.5, 50, 5);
        textBox_line_r3.drawRect( 215 , -340, 25, 5);
        this.addChild(textBox_line_l1);
        this.addChild(textBox_line_l2);
        this.addChild(textBox_line_l3);
        this.addChild(textBox_line_r1);
        this.addChild(textBox_line_r2);
        this.addChild(textBox_line_r3);

        //Text
        const style = new PIXI.TextStyle({
            fontFamily: 'Silkscreen',
            fontSize: 40,
            fontWeight: 'bold',
            fill: ['#1e1e1e']
        });

        this.textField = new PIXI.Text(`Zuid-Holland`, style);
        this.textField.x = -150;
        this.textField.y = -378;
        this.addChild(this.textField);

        //Score Box
        const scoreBox = new PIXI.Graphics();
        scoreBox.beginFill(0xFFFFFF);
        scoreBox.lineStyle(8, 0x1E1E1E);
        scoreBox.drawRect(650, -380, 80, 50);
        this.addChild(scoreBox);

        //Box Line Score Box
        const scoreBox_line_1 = new PIXI.Graphics();
        const scoreBox_line_2 = new PIXI.Graphics();
        const scoreBox_line_3 = new PIXI.Graphics();
        scoreBox_line_1.lineStyle(5, 0x1E1E1E);
        scoreBox_line_2.lineStyle(5, 0x1E1E1E);
        scoreBox_line_3.lineStyle(5, 0x1E1E1E);
        scoreBox_line_1.drawRect(560 , -375, 75, 5);
        textBox_line_l2.drawRect(585 , -357.5, 50, 5);
        textBox_line_l3.drawRect(610 , -340, 25, 5);
        this.addChild(scoreBox_line_1);
        this.addChild(scoreBox_line_2);
        this.addChild(scoreBox_line_3);
        
        //Score
        const score = new PIXI.TextStyle({
            fontFamily: 'Silkscreen',
            fontSize:  30,
            fontWeight: 'bold',
            fill: ['#1e1e1e']
        });

        this.scoreField = new PIXI.Text(`000`, score);
        this.scoreField.x = 658;
        this.scoreField.y = -372;
        this.addChild(this.scoreField);


        //Lives Box
        const livesBox = new PIXI.Graphics();
        // const livesHitBox = new PIXI.Graphics();
        livesBox.beginFill(0x54CD86);
        // livesHitBox.beginFill(0xc71818);
        livesBox.lineStyle(8, 0x1E1E1E);
        livesBox.drawRect(-725, 225, 250, 20);
        // livesHitBox.drawRect(-721, 229, 242, 12);
        this.addChild(livesBox);
        // this.addChild(livesHitBox); 

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