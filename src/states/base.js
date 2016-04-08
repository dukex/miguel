class Base {
  constructor(game) {
    this.player = new Player(game);
    this.creatures = [];
  }

  create() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.creatures.forEach(creature => creature.create());
    this.player.create();
  }

  update() {
    this.creatures.forEach(creature => creature.update());
    this.player.update();
  }

  addCreature(creature) {
    this.creatures.push(creature);
  }
}
