import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Location extends PIXI.Sprite {

    locationPositions = [
        1290, 400, // Drente
        939, 688, // Flevoland
        1001, 267, // Friesland
        892, 728, // Gelderland
        1282, 250, // Groningen
        1048, 1165, // Limburg
        626, 1134, // Noord-Brabant
        735, 516, // Noord-Holland
        1142, 594, // Overijsel
        837, 884, // Utrecht
        329, 1172, // Zeeland
        501, 860, // Zuid-Holland
    ];
    game: Game;

    constructor(texture: PIXI.Texture, game: Game) {
      super(texture);
      this.game = game;

      for (let i = 0; i < 12; i++){
        this.x = this.locationPositions[i * 2];
        this.y = this.locationPositions[i * 2 + 1];
      }
  
      this.interactive = true;
      // this.on("pointerdown", () => this.onClick());
    }
  
    //Click
    // private onClick() {
    //   console.log("Click");
    // }
  
    public update(delta: number) {
    }
  }
  