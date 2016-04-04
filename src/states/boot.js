class BootState {
  preload() {
    this.game.load.audio('synthcity', ['assets/audio/synthcity.mp3', 'assets/audio/synthcity.ogg', 'assets/audio/synthcity.flp']);

    this.game.load.atlasJSONHash('assets', 'assets/assets.png', 'assets/assets.json');

    this.game.load.image('8_background', 'assets/scenarios/8_background.png');
    this.game.load.image('7_sky', 'assets/scenarios/7_sky.png');
    this.game.load.image('6_buildings_shadow', 'assets/scenarios/6_buildings_shadow.png');
    this.game.load.image('5_buildings_shadow', 'assets/scenarios/5_buildings_shadow.png');
    this.game.load.image('4_buildings_shadow', 'assets/scenarios/4_buildings_shadow.png');
    this.game.load.image('3_buildings', 'assets/scenarios/3_buildings.png');
    this.game.load.image('2_trees', 'assets/scenarios/2_trees.png');
    this.game.load.image('1_street', 'assets/scenarios/1_street.png');
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.state.start('start');
  }
}
