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

class StartState {
  constructor(game) {
    this.player = new Player(game);
  }

  startGame() {
    debugger
  }

  create() {
    this.game.stage.backgroundColor = '#F9F9F9';
    this.player.create();

    const { height, world: { centerX, centerY} } = this.game;


    const text = this.game.add.text(centerX, 0, "Miguel", {
      font: 'Cinzel Decorative',
      fontSize: 140,
      align: 'center'
    });
    text.anchor.setTo(0.5);
    text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    this.game.add.tween(text).to({ y: centerY }, 2400, Phaser.Easing.Elastic.Out, true)

    this.game.add.button(centerX, height-(height * 30 / 100), 'start', this.startGame, this, 0,1,2,3)

    const music = this.game.add.audio('synthcity');
    music.play('', 5, true);
  }

  update() {
    this.player.update();
  }
}


class BootState {
  preload() {
    this.game.load.atlasXML('seacreatures', 'assets/bgElements_spritesheet.png', 'assets/bgElements_spritesheet.xml');
    this.game.load.image('road', 'assets/road.png');
    this.game.load.atlas('miguel', 'assets/miguel_s.png', 'assets/miguel.json');
    this.game.load.audio('synthcity', ['assets/audio/synthcity.mp3', 'assets/audio/synthcity.ogg', 'assets/audio/synthcity.flp']);
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.state.start('start');
  }
}

class MiguelGame {
  constructor() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');

    game.state.add('boot', BootState);
    game.state.add('start', StartState);
    game.state.start('boot', true);
  }

  create() {
    this.road = this.game.add.group();
    this.road.enableBody = true;

    var road = this.road.create(0, this.game.world.height - 20, 'road');
    road.scale.setTo(this.game.world.width, 1);
    road.body.immovable = true;
  }


  update() {
    this.game.physics.arcade.collide(player, this.road);
  }
}
