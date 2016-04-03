class MiguelGame {
  constructor() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');

    game.state.add('boot', BootState);
    game.state.add('start', StartState);
    game.state.start('boot', true);
  }
}
