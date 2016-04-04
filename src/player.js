class Player {
  constructor(game) {
    this.game = game;
  }

  velocity() {
    return this._velocity || 5;
  }

  create() {
    this.character = this.game.add.sprite(this.game.world.height / 2, 0, 'assets', 'miguel/idle/0.png');
    const player = this.character;

    this.game.physics.arcade.enable(player);

    player.anchor.setTo(.5, 1)

    player.body.bounce.y = 0;
    player.body.gravity.y = 200;
    player.body.collideWorldBounds = true;

    player.animations.add('walk', Phaser.Animation.generateFrameNames('miguel/run/', 0, 5, '.png', 1), 10, true, false);
    player.animations.add('idle', Phaser.Animation.generateFrameNames('miguel/idle/', 0, 3, '.png', 1), 10, true, false);
    player.animations.add('jump', Phaser.Animation.generateFrameNames('miguel/jump/', 0, 3, '.png', 1), 10, true, false);
    player.animations.play('idle', 2, true);

    this.game.camera.follow(player);
  }

  __jumpping() {
    const { body: { y, height } } = this.character;
    return Math.floor(y) !== this.game.height-height-MiguelGame.GROUND_HEIGHT();
  }

  __flip(original) {
    this.character.scale.x = original ? 1 : -1;
  }

  update() {
    const player = this.character;
    const cursors = this.game.input.keyboard.createCursorKeys();
    const walking = cursors.left.isDown || cursors.right.isDown

    player.body.velocity.x = 0;

    if(walking) {
      this.__flip(cursors.right.isDown)
      !this.__jumpping() && player.animations.play('walk', 10, true);
    }

    if (cursors.up.isDown && !this.__jumpping()) {
      player.body.velocity.y = -200;
      player.animations.play('jump', 3, false);
    } else if (cursors.down.isDown && !this.__jumpping() && !walking) {
      player.animations.play('squat');
    }

    if(!(this.__jumpping() || cursors.down.isDown || cursors.up.isDown || walking)) {
      player.animations.play('idle', 2, true);
    }

    // this.game.debug.spriteBounds(player);
  }
}
