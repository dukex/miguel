class GoSchoolState extends PlayerState {
  create() {
    this.road = this.game.add.group();
    this.road.enableBody = true;

    this.background = this.game.add.tileSprite(0,0,1920, 1080, '8_background');
    this.sky        = this.game.add.tileSprite(0,0,1920, 1080, '7_sky');
    this.building1  = this.game.add.tileSprite(0,0,1920, 1080, '6_buildings_shadow');
    this.building2  = this.game.add.tileSprite(0,0,1920, 1080, '5_buildings_shadow');
    this.building3  = this.game.add.tileSprite(0,0,1920, 1080, '4_buildings_shadow');
    this.building4  = this.game.add.tileSprite(0,0,1920, 1080, '3_buildings');
    this.trees      = this.game.add.tileSprite(0,0,1920, 1080, '2_trees');
    this.street     = this.game.add.tileSprite(0,0,1920, 239, '1_street');

    //here we add two tile sprites with parameters(locationX, locationY, width, height, key)
    // this.wall = this.game.add.tileSprite(0, 0, 1026, 418, '/bg_wall.png');
    // this.character = mt.create("character");
    // this.grass = this.game.add.tileSprite(0, 390, 1026, 215, '/grass_tile.png');

    // this.cursors = this.game.input.keyboard.createCursorKeys();

    // this.character.animations.add('stand', [0, 1, 2, 3], 10, true);
    // this.character.animations.add('run', [6, 7, 8, 9, 10, 11], 10, true);
    // this.character.animations.play('stand');

    //
    var scale = this.game.rnd.realInRange(0.5, 1);
		//newobj.scale.x = scale;
		//newobj.scale.y = scale;
		//newobj.health = scale; // for sorting

    const ratio = this.scaleImage(this.background)
    this.scaleImage(this.sky)
    this.scaleImage(this.building1)
    this.scaleImage(this.building2)
    this.scaleImage(this.building3)
    this.scaleImage(this.building4)
    this.scaleImage(this.trees)
    this.scaleImage(this.street, ratio);
    this.street.y = this.game.height-MiguelGame.GROUND_HEIGHT();
    console.log(this.street.height)

    this.game.physics.arcade.enable(this.street);
    this.street.body.immovable = true;
    //this.street.body.allowGravity = false;

    super.create();


    this.game.camera.follow(this.character);
  }

  scaleImage(image, ratio) {
    if(ratio === undefined) {
      ratio = this.game.height / image.height;
    }
    image.scale.setTo(ratio, ratio)
    return ratio;
  }

  update() {
    this.game.physics.arcade.collide(this.character, this.street);

    super.update();

    const walking = this.cursors.left.isDown || this.cursors.right.isDown
    const direction =(this.cursors.left.isDown ? 1 : -1)

    if (walking) {
      this.sky.tilePosition.x       += direction * 0.25;
      this.building1.tilePosition.x += direction * this.player.velocity()/6;
      this.building2.tilePosition.x += direction * this.player.velocity()/5;
      this.building3.tilePosition.x += direction * this.player.velocity()/4;
      this.building4.tilePosition.x += direction * this.player.velocity()/3;
      this.trees.tilePosition.x     += direction * this.player.velocity()/2;
      this.street.tilePosition.x    += direction * this.player.velocity();
    }
  }
}

