const GAME = {
  width: window.innerWidth,
  height: window.innerHeight,
  engine: Phaser.CANVAS,
  name: 'ex',
  aspectRatio: window.devicePixelRatio
}

const game = new Phaser.Game(
  window.innerWidth * window.devicePixelRatio,
  window.innerHeight * window.devicePixelRatio,
  GAME.engine,
  GAME.name,
  {
    init,
    preload,
    create,
    update,
    render
  })
