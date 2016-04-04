class PlayerState {
  constructor(game) {
    this.player = new Player(game);
  }

  create() {
    this.player.create();
    this.character = this.player._player;
  }

  update() {
    this.player.update();
  }

}
