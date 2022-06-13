import * as PIXI from "pixi.js";
import { Location } from "./location";
import { Enemy } from "./enemy"
import { Player } from "./player";

import backgroundImage from "./images/background_nl.png";
import locationImage from "./images/location.png";
import selectedImage from "./images/selected.png";
import enemyImage from "./images/shark.png"
import deadImage from "./images/bones.png"
import playerImage from "./images/spacecraft.png";

export class Game {

    pixi: PIXI.Application;
    loader: PIXI.Loader;
    background: PIXI.Sprite;
    locations: Location[] = [];
    enemies: Enemy[] = [];
    player: Player;

    constructor() {
        this.pixi = new PIXI.Application({
            width: screen.width,
            height: screen.height
        });
        document.body.appendChild(this.pixi.view);
        
        this.loader = new PIXI.Loader();
        this.loader
            .add("playerTexture", playerImage)
            .add("locationTexture", locationImage)
            .add("selectedTexture", selectedImage)
            .add("enemytexture", enemyImage)
            .add("deadTexture", deadImage)
            .add("backgroundTexture", backgroundImage);
        document.body.appendChild(this.pixi.view)

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

        //Province
        for (let i = 0; i < 1; i++) {
            let location = new Location(this.loader.resources["locationTexture"].texture!, this);
            this.locations.push(location);
            this.pixi.stage.addChild(location);
        }

        //Player
        this.player = new Player(this, this.loader.resources["playerTexture"].texture!);
        this.pixi.stage.addChild(this.player)

        this.pixi.stage.x = this.pixi.screen.width / 2
        this.pixi.stage.y = this.pixi.screen.height / 2

        this.pixi.ticker.add((delta) => this.update(delta))


    }

    update(delta: number) {
        this.player.update(delta);

      //Collision
      for (const location of this.locations) {
          location.update(delta);
          if (this.collision(this.player, location)) {
            location.texture = this.loader.resources["selectedTexture"].texture!;
          } else {
            location.texture = this.loader.resources["locationTexture"].texture!;
          }
      }

      for (let enemy of this.enemies) {
        enemy.update(delta)
    }
    }
  
    collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
      const bounds1 = sprite1.getBounds();
      const bounds2 = sprite2.getBounds();
  
      return (
        bounds1.x < bounds2.x + bounds2.width &&
        bounds1.x + bounds1.width > bounds2.x &&
        bounds1.y < bounds2.y + bounds2.height &&
        bounds1.y + bounds1.height > bounds2.y
      );
    }
  }