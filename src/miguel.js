class MiguelGame {

  static GROUND_HEIGHT() {
    return 130
  }

  constructor() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');

    game.state.add('boot', BootState);
    game.state.add('start', StartState);
    game.state.add('go-school', GoSchoolState);
    game.state.start('boot', true);
  }
}
