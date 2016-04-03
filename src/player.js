class Player {
  constructor(game) {
    this.game = game;
  }

  moviment(move) {
    switch(move) {
      case 'walk':
        return  [13, 15, 6, 9, 4, 25];
      case 'swim':
        return [11,18,20,16,17,10];
      case 'jump':
        return [7, 21, 12];
      case 'idle':
        return [2,3];
      case 'atack':
        return [4,24,14];
      case 'down':
        return [19];
      case 'barman':
        return [5];
      case 'scare':
        return [0]
      case '(>':
        return [1]
    }
  }

  create() {
    this._player = this.game.add.sprite(this.game.world.height / 2, 0, 'miguel');
    this.game.physics.arcade.enable(this._player);


    this._player.body.bounce.y = 0;
    this._player.body.gravity.y = 600;
    this._player.body.collideWorldBounds = true;

    this._player.animations.add('walk', this.moviment('walk'), 10, true);
    this._player.animations.add('jump', this.moviment('jump'), 10, true);
    this._player.animations.add('idle', this.moviment('idle'), 1, true);
  }

  __jumpping() {
    return this._player.body.y < 499;
  }

  __flip(original) {
    this._player.anchor.setTo(.5, .5)
    this._player.scale.x = original ? 1 : -1;
  }

  update() {
    const player = this._player;
    const cursors = this.game.input.keyboard.createCursorKeys();

    player.body.velocity.x = 0;

    if(cursors.left.isDown || cursors.right.isDown) {
      this.__flip(cursors.right.isDown)
      player.body.velocity.x = cursors.right.isDown ? 150 : -150;
      !this.__jumpping() && player.animations.play('walk', 15, true);
    }

    if (cursors.up.isDown && !this.__jumpping()) {
      player.animations.stop();
      player.animations.play('jump', 3, false);
      player.body.velocity.y = -400;
    }

    if(!(this.__jumpping() || cursors.up.isDown || cursors.right.isDown || cursors.left.isDown)) {
      player.animations.play('idle');
    }
  }
}
