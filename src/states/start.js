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


