const create = () => {
    const circle = game.add.graphics(0, 0)
    circle.beginFill(0xFF0000, 1);
    circle.drawCircle(game.world.centerX, game.world.centerY, 10);

    const rectangle = new Phaser.Rectangle(100, game.world.centerY, 100, 100000)

    const bitmapData = game.add.bitmapData(game.height, game.width)
    bitmapData.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height, '#2d2d2d')

    game.input.addPointer()
    game.input.addPointer()
};

