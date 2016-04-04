class PlayerState {
  constructor(game) {
    this.player = new Player(game);
  }

  create() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player.create();
    this.character = this.player.character;
  }

  update() {
    this.player.update();
  }

}
