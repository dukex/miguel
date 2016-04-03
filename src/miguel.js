class MiguelGame {
  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
      preload: this.preload.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this)
    });
  }

  preload() {
    this.game.load.atlasXML('seacreatures', 'assets/bgElements_spritesheet.png', 'assets/bgElements_spritesheet.xml');
    this.game.load.image('road', 'assets/road.png');
    this.game.load.atlas('miguel', 'assets/miguel_s.png', 'assets/miguel.json');
  }

  playerMoviment(move) {
    switch(move) {
      case 'left':
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
    // this.game.stage.backgroundColor = '#4488AA';
    this.game.stage.backgroundColor = '#F9F9F9';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = this.game.add.sprite(  this.game.world.height / 2, 0, 'miguel');
    this.game.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0;
    this.player.body.gravity.y = 600;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('run__left', this.playerMoviment('left'), 10, true);
    this.player.animations.add('run__right', this.playerMoviment('left'), 10, true);
    this.player.animations.add('jump', this.playerMoviment('jump'), 10, true);
    this.player.animations.add('idle', this.playerMoviment('idle'), 1, true);

    this.road = this.game.add.group();
    this.road.enableBody = true;

    var road = this.road.create(0, this.game.world.height - 20, 'road');
    road.scale.setTo(this.game.world.width, 1);
    road.body.immovable = true;

    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Miguel");
    text.anchor.setTo(0.5);

    text.font = 'Cinzel Decorative';
    text.fontSize = 160;
    text.align = 'center';
    text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
  }


  update() {
    var player = this.player;
    var cursors = this.game.input.keyboard.createCursorKeys();

    player.body.velocity.x = 0;

    this.game.physics.arcade.collide(player, this.road);

    var isNotUpping = player.body.y > 499;

    if (cursors.left.isDown) {
      if(!player.isFlipped) {
        player.anchor.setTo(.5, .5)
        player.scale.x = -1;
        player.isFlipped = true;
      }
      player.body.velocity.x = -150;
      isNotUpping && player.animations.play('run__left', 15, true);
    } else if (cursors.right.isDown) {
      if(player.isFlipped) {
        player.scale.x = 1;
        player.isFlipped = false;
      }
      player.body.velocity.x = 150;
      isNotUpping && player.animations.play('run__left', 15, true);
    } else if (cursors.up.isDown && isNotUpping) {
      player.animations.stop();
      player.body.velocity.y = -400;
      player.animations.play('jump', 3, false);
    } else if (isNotUpping) {
      player.animations.play('idle');
    }
  }
}
