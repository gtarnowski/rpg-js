const GAME = {
    width: 1200,
    height: 700,
    engine: Phaser.CANVAS,
    name: 'ex'
};

const game = new Phaser.Game(
    GAME.width,
    GAME.height,
    GAME.engine,
    GAME.name,
    {
        init,
        preload,
        create,
        update,
        render
    })
;



