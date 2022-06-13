import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Location extends PIXI.Sprite {

    // provincePositions = [
    //     175, 75,
    //     655, 75,
    //     410, 325,
    //     150, 465,
    //     685, 445,
    // ];
    game: Game;

    private speed: number = 0;

    constructor(texture: PIXI.Texture, game: Game) {
      super(texture);
      this.game = game;

      this.x = 400;
      this.y = 400;
  
      this.interactive = true;
      this.on("pointerdown", () => this.onClick());
    }
  
    private onClick() {
      console.log("Click");
      this.game.pixi.stage.removeChild(this);
    }
  
    public update(delta: number) {
      this.keepInScreen();
    }
  
    private keepInScreen() {
      if (this.getBounds().left > this.game.pixi.screen.right) {
        this.x = -this.getBounds().width;
      }
    }
  }
  