class BootState {
  preload() {
    this.game.load.audio('synthcity', ['assets/audio/synthcity.mp3', 'assets/audio/synthcity.ogg', 'assets/audio/synthcity.flp']);

    this.game.load.atlasJSONHash('miguel', 'assets/miguel.png', 'assets/miguel.json');

    this.game.load.image('8_background', 'assets/state/8_background.png');
    this.game.load.image('7_sky', 'assets/state/7_sky.png');
    this.game.load.image('6_buildings_shadow', 'assets/state/6_buildings_shadow.png');
    this.game.load.image('5_buildings_shadow', 'assets/state/5_buildings_shadow.png');
    this.game.load.image('4_buildings_shadow', 'assets/state/4_buildings_shadow.png');
    this.game.load.image('3_buildings', 'assets/state/3_buildings.png');
    this.game.load.image('2_trees', 'assets/state/2_trees.png');
    this.game.load.image('1_street', 'assets/state/1_street.png');
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.state.start('start');
  }
}
