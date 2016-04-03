class PlayerState {
  constructor(game) {
    this.player = new Player(game);
    this.character = this.player._player;
  }

  create() {
    this.player.create();
  }

  update() {
    this.player.update();
  }

}
