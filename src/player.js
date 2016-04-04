class Player {
  constructor(game) {
    this.game = game;
  }

  velocity() {
    return this._velocity || 5;
  }

  create() {
    this._player = this.game.add.sprite(this.game.world.height / 2, 0, 'miguel', 'idle/0.png');
    const player = this._player;
    this.game.physics.arcade.enable(player);

    player.anchor.setTo(.5, 1)

    player.body.bounce.y = 0;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    player.animations.add('walk', Phaser.Animation.generateFrameNames('run/', 0, 5, '.png', 1), 10, true, false);
    player.animations.add('idle', Phaser.Animation.generateFrameNames('idle/', 0, 3, '.png', 1), 10, true, false);
    player.animations.add('jump', Phaser.Animation.generateFrameNames('jump/', 0, 3, '.png', 1), 10, true, false);
    player.animations.play('idle', 2, true);
  }

  __jumpping() {
    return this._player.body.y < 499;
  }

  __flip(original) {
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
