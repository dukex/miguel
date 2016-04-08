class GoSchoolState extends Base {
  create() {
    const WORLD_WIDTH = 1920*5;

    this.game.world.setBounds(0, 0, WORLD_WIDTH, this.game.height)

    this.background = this.game.add.tileSprite(0, 0, WORLD_WIDTH, 1080, '8_background');
    this.sky        = this.game.add.sprite(0, 0, '7_sky');
    this.building1  = this.game.add.tileSprite(0, 0, WORLD_WIDTH, 1080, '6_buildings_shadow');
    this.building2  = this.game.add.tileSprite(0, 0, WORLD_WIDTH, 1080, '5_buildings_shadow');
    this.building3  = this.game.add.tileSprite(0, 0, WORLD_WIDTH, 1080, '4_buildings_shadow');
    this.building4  = this.game.add.tileSprite(0, 0, WORLD_WIDTH, 1080, '3_buildings');
    this.trees      = this.game.add.tileSprite(0, 0, WORLD_WIDTH, 1080, '2_trees');
    this.street     = this.game.add.tileSprite(0, 0, WORLD_WIDTH, 239, '1_street');

    const ratio = this.scaleImage(this.background)
    this.scaleImage(this.sky)
    this.scaleImage(this.building1)
    this.scaleImage(this.building2)
    this.scaleImage(this.building3)
    this.scaleImage(this.building4)
    this.scaleImage(this.trees)
    this.scaleImage(this.street, ratio);
    this.street.y = this.game.height-MiguelGame.GROUND_HEIGHT();

    this.game.physics.arcade.enable(this.street);
    this.street.body.immovable = true;

    for (var i = 0; i <= 5; i++) {
      const x = (this.game.world.height/2)+(i * 400)
      this.addCreature(new Robot(this.game, x, 0));
    }

    this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT );

    super.create();
  }

  scaleImage(image, ratio) {
    ratio = ratio === undefined ? this.game.height / image.height : ratio;
    image.scale.setTo(ratio, ratio)
    return ratio;
  }

  hitRobot(player, robot) {
    player.kill()
  }

  update() {
    this.game.physics.arcade.collide(this.player.sprite, this.street);

    this.creatures.forEach((creature) => {
      this.game.physics.arcade.collide(this.player.sprite, creature.sprite, this.hitRobot.bind(this));
      this.game.physics.arcade.collide(creature.sprite, this.street);
    });

    super.update();
  }
}

