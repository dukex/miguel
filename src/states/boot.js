class BootState {
  preload() {
    this.game.load.atlasXML('seacreatures', 'assets/bgElements_spritesheet.png', 'assets/bgElements_spritesheet.xml');
    this.game.load.image('road', 'assets/road.png');
    this.game.load.atlas('miguel', 'assets/miguel_s.png', 'assets/miguel.json');
    this.game.load.audio('synthcity', ['assets/audio/synthcity.mp3', 'assets/audio/synthcity.ogg', 'assets/audio/synthcity.flp']);
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.state.start('start');
  }
}
