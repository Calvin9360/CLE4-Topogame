import * as PIXI from "pixi.js";
import { Location } from "./location";
import { Enemy } from "./enemy";
import { Player } from "./player";
import { UI } from "./interface";

import backgroundImage from "./images/background_nl.png";
// import locationImage from "./images/location_drenthe.png";
// import locationImage from "./images/location_flevoland.png";
// import locationImage from "./images/location_friesland.png";
// import locationImage from "./images/location_gelderland.png";
// import locationImage from "./images/location_groningen.png";
// import locationImage from "./images/location_limburg.png";
// import locationImage from "./images/location_noord-brabant.png";
// import locationImage from "./images/location_noord-holland.png";
// import locationImage from "./images/location_overijsel.png";
// import locationImage from "./images/location_utrecht.png";
// import locationImage from "./images/location_zeeland.png";
import locationImage from "./images/location_zuid-holland.png";
import enemyImage from "./images/spacepirate.png";
import destroyedImage from "./images/spacepirate_destroyed.png";
import playerImage from "./images/spacecraft.png";


export class Game {

    pixi: PIXI.Application;
    loader: PIXI.Loader;
    background: PIXI.Sprite;
    locations: Location[] = [];
    enemies: Enemy[] = [];
    player: Player;
    interface : UI;

    constructor() {
        this.pixi = new PIXI.Application({
            width: screen.width,
            height: screen.height
        });
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader
            .add("backgroundTexture", backgroundImage)
            .add("locationTexture", locationImage)
            .add("enemytexture", enemyImage)
            .add("destroyedTexture", destroyedImage)
            .add("playerTexture", playerImage);
        document.body.appendChild(this.pixi.view)

        this.loader.load(() => this.doneLoading());
    }


    doneLoading() {
        //Background
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        this.pixi.stage.addChild(this.background);

        //Location
        for (let i = 0; i < 12; i++) {
            let location = new Location(this.loader.resources["locationTexture"].texture!, this);
            location.scale.x = 1.04;
            location.scale.y = 1.04;
            this.locations.push(location);
            this.pixi.stage.addChild(location);
        }

        //Enemy
        for (let i = 0; i < 10; i++) {
            let enemy = new Enemy(this, this.loader.resources["enemytexture"].texture!, this.loader.resources["destroyedTexture"].texture!);
            this.pixi.stage.addChild(enemy);
            this.enemies.push(enemy);
        }

        //Player
        this.player = new Player(this, this.loader.resources["playerTexture"].texture!);
        this.pixi.stage.addChild(this.player);

        //UI
        this.interface = new UI(this);
        this.pixi.stage.addChild(this.interface);

        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        this.pixi.ticker.add((delta) => this.update(delta));
    }


    update(delta: number) {
        this.player.update(delta);
        this.interface.update(delta);

        //Collision with Locations
        for (const location of this.locations) {
            const color = new PIXI.filters.ColorMatrixFilter()
            location.filters = [color];
            location.update(delta);
            if (this.collision(this.player, location)) {
                color.grayscale(0.2, false);
            } else {
                color.grayscale(0.325, false);
            }
        }

        //
        for (let enemy of this.enemies) {
            if (this.collision(enemy, this.player)) {
                enemy.texture = this.loader.resources["destroyedTexture"].texture!;
                const color_none = new PIXI.filters.ColorMatrixFilter()
                enemy.filters = [color_none]
                color_none.hue(0, false)
              }
            enemy.update(delta);
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