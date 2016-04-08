class Robot {
  constructor(game, x, y) {
    this.game = game;
    this.initialX = x;
    this.initialY = y;
  }

  create() {
    this.sprite = this.game.add.sprite(this.initialX, this.initialY, 'assets', 'robot/1.png');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('robot/', 0, 1, '.png', 1), 2, true, false);
    this.sprite.animations.play('walk');
    this.sprite.body.bounce.y = 0;
    this.sprite.body.gravity.y = 900;
    this.sprite.anchor.setTo(.5, 1);
    this.sprite.scale.setTo(-.5, .5);
  }

  update() {
    this.sprite.body.velocity.x = 0
    console.log(this.initialX, this.sprite.position.x);
    this.sprite.body.velocity.x -= 20;
  }
}
