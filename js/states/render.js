const render = () => {
    game.debug.text('innerWidth       ' + window.innerWidth, 10, 15)
    game.debug.text('innerHeight      ' +  window.innerHeight, 10, 30)
    game.debug.text('devicePixelRatio ' + window.devicePixelRatio, 10, 45)
    game.debug.text('game.width       ' + GAME.width, 10, 60)
    game.debug.text('game.height      ' + GAME.height, 10 ,75)

    game.debug.pointer(game.input.mousePointer)
    game.debug.pointer(game.input.pointer1)
};